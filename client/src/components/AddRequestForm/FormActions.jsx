import React from 'react';
import { Button, Space } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const FormActions = ({ onSave, loading }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/HomePage');
  };

  return (
    <div style={{ marginTop: '2rem', textAlign: 'left' }}>
      <Space>
       <Button
  type="primary"
  loading={loading}
  onClick={onSave}
>
  שלח פניה <SendOutlined style={{ transform: 'rotate(180deg)', marginRight: 8 }} />
</Button>

        <Button
          danger
          icon={<CloseOutlined />}
          onClick={handleCancel}
        >
          בטל פניה
        </Button>
      </Space>
    </div>
  );
};

export default FormActions;
