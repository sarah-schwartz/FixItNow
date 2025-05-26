import React from 'react';
import { Button, Row, Col } from 'antd';
import { SendOutlined, ReloadOutlined } from '@ant-design/icons';
import { colors } from '../../theme/colors';

const FormActions = ({ onReset, loading = false }) => (
  <Row justify="end" gutter={16} className="mt-6">
    <Col>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        icon={<SendOutlined />}
        className="submit-button"
        style={{
          backgroundColor: colors?.primary?.main || '#1677ff',
          borderColor: colors?.primary?.main || '#1677ff',
          minWidth: '120px',
          height: '40px'
        }}
        disabled={loading}
      >
        {loading ? 'שולח...' : 'שלח פנייה'}
      </Button>
    </Col>
    
    <Col>
      <Button
        htmlType="button"
        onClick={onReset}
        icon={<ReloadOutlined />}
        disabled={loading}
        style={{ 
          minWidth: '120px',
          height: '40px'
        }}
      >
        איפוס
      </Button>
    </Col>
  </Row>
);

export default FormActions;