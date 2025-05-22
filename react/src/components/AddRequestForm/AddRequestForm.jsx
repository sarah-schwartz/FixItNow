import React, { useState } from 'react';
import { Form } from 'antd';
import FormHeader from './FormHeader';
import FormSteps from './FormSteps';
import BasicFields from './BasicFields';
import CategoryFields from './CategoryFields';
import DescriptionField from './DescriptionField';
import FormActions from './FormActions';

import { categories, CATEGORY_FIELDS } from './FormConstants';

const AddRequestForm = () => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const baseFields = ['title', 'category', 'priority', 'description'];

  const updateStep = (values, newCategory = category) => {
    let allFields = [...baseFields];
    if (newCategory && CATEGORY_FIELDS[newCategory]) {
      allFields = allFields.concat(CATEGORY_FIELDS[newCategory].map(f => f.name));
    }

    const filledFields = allFields.filter(field => values[field]);
    const progress = (filledFields.length / allFields.length) * 100;

    if (progress === 100) setCurrentStep(3);
    else if (progress >= 75) setCurrentStep(2);
    else if (progress >= 25) setCurrentStep(1);
    else setCurrentStep(0);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    form.resetFields();
    setCategory(null);
    setCurrentStep(0);
  };

  const handleReset = () => {
    form.resetFields();
    setCategory(null);
    setCurrentStep(0);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={(changed, allValues) => {
          if (changed.category) {
            setCategory(changed.category);
            updateStep(allValues, changed.category);
          } else {
            updateStep(allValues);
          }
        }}
        requiredMark={false}
      >
        <FormHeader title="הגשת בקשה חדשה" />
        <FormSteps currentStep={currentStep} />
        <BasicFields categories={categories} />

        {category && (
          <CategoryFields
            fields={CATEGORY_FIELDS[category]}
            onChangeProgress={() => updateStep(form.getFieldsValue(), category)}
          />
        )}

        <DescriptionField />
        <FormActions onReset={handleReset} />
      </Form>
    </div>
  );
};

export default AddRequestForm;
