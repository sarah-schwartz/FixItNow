import { Form, Input } from 'antd';

const { TextArea } = Input;

const DescriptionField = () => (
  <Form.Item
    name="description"
    label="תיאור הפנייה"
    rules={[{ required: true, message: 'נא להזין תיאור' }]}
  >
    <TextArea rows={4} placeholder="תאר את הבקשה או הבעיה" />
  </Form.Item>
);

export default DescriptionField;
