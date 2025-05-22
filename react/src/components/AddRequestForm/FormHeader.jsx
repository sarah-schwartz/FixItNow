import { Typography } from 'antd';
import { colors } from '../../theme/colors';

const { Title } = Typography;

const FormHeader = ({ title }) => (
  <div className="form-header mb-6">
    <Title
      level={3}
      className="text-center mb-2"
      style={{ color: colors.neutral.text }}
    >
      {title}
    </Title>
  </div>
);

export default FormHeader;

