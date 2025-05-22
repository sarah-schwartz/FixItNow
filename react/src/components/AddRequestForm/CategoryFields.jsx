import { useEffect } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';

const { Option } = Select;

const CategoryFields = ({ fields, onChangeProgress }) => {
  useEffect(() => {
    if (fields && fields.length > 0 && onChangeProgress) {
      onChangeProgress();
    }
  }, [fields, onChangeProgress]);

  if (!fields || fields.length === 0) return null;

  return (
    <div className="fade-in my-4">
      <Row gutter={16}>
        {fields.map((field) => (
          <Col xs={24} md={12} key={field.name}>
            <Form.Item
              name={field.name}
              label={field.label}
              rules={[{ required: true, message: `${field.label} הוא שדה חובה` }]}
            >
              {field.type === 'select' ? (
                <Select placeholder={`בחר ${field.label}`}>
                  {field.options?.map((opt) => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              ) : (
                <Input placeholder={`הזן ${field.label}`} />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryFields;
