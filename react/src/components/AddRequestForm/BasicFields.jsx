import { Form, Input, Row, Col, Select } from 'antd';

const { Option } = Select;

const BasicFields = ({ categories }) => (
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
          <Select placeholder="בחר קטגוריה">
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
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
            <Option value="low">נמוכה</Option>
            <Option value="medium">בינונית</Option>
            <Option value="high">גבוהה</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </>
);

export default BasicFields;
