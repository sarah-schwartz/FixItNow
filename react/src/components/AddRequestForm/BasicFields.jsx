import { Form, Input, Row, Col, Select, Spin } from 'antd';
import { getCategoryLabel, PRIORITY_OPTIONS } from '../../constants/constants';

const { Option } = Select;

const BasicFields = ({ categories, loading }) => {
  return (
    <>
      <Form.Item
        name="title"
        label="כותרת הפנייה"
        rules={[{ required: true, message: 'נא להזין כותרת' }]}
      >
        <Input placeholder="הזן כותרת קצרה" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="category"
            label="קטגוריה"
            rules={[{ required: true, message: 'נא לבחור קטגוריה' }]}
          >
            <Select 
              placeholder="בחר קטגוריה"
              loading={loading}
              notFoundContent={loading ? <Spin size="small" /> : 'אין קטגוריות זמינות'}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category.name}>
                  {getCategoryLabel(category.name)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="priority"
            label="רמת דחיפות"
            rules={[{ required: true, message: 'נא לבחור רמת דחיפות' }]}
          >
            <Select placeholder="בחר דחיפות">
              {PRIORITY_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default BasicFields;