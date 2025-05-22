import { Button, Row, Col } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { colors } from '../../theme/colors';

const FormActions = ({ onReset }) => (
  <Row justify="end" gutter={16} className="mt-6">
    <Col>
             <Button 
          type="primary" 
          htmlType="submit"
          className="submit-button"
          style={{ 
            backgroundColor: colors.primary.main,
            borderColor: colors.primary.main,
            minWidth: '120px',
          }}
        >
          שלח פנייה
        </Button>

    </Col>
    <Col>
      <Button
        htmlType="button"
        onClick={onReset}
        style={{ minWidth: '120px' }}
      >
        ביטול
      </Button>
    </Col>
  </Row>
);

export default FormActions;

