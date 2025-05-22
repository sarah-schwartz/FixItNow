import { Steps, theme } from 'antd';

const FormSteps = ({ currentStep }) => {
  const { token } = theme.useToken();

  return (
    <div className="mb-8">
      <Steps
        current={currentStep}
        items={[
          { title: 'התחלה' },
          { title: 'בתהליך' },
          { title: 'הושלם' },
        ]}
        responsive
        style={{
          marginBottom: token.marginLG,
          padding: token.padding,
          background: 'transparent',
          borderRadius: token.borderRadiusLG,
        }}
      />
    </div>
  );
};

export default FormSteps;
