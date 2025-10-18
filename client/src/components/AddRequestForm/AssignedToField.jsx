import { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import axiosInstance from '../../services/axiosInstance';

const { Option } = Select;

const AssignedToField = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/user/getAllUsers')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('Response format unexpected:', data);
          setUsers([]);
        }
      })
      .catch(err => {
        console.error('שגיאה בטעינת המשתמשים:', err);
        setUsers([]);
      });
  }, []);

  return (
    <Form.Item
      label="למי להקצות את הפנייה"
      name="assignedTo"
      rules={[{ required: true, message: 'יש לבחור משתמש' }]}
    >
      <Select placeholder="בחר משתמש">
        {users.map(user => (
          <Option key={user._id} value={user._id}>
            {user.userName} ({user.role})
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AssignedToField;
