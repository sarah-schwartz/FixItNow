import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import FormHeader from './FormHeader';
import FormSteps from './FormSteps';
import BasicFields from './BasicFields';
import CategoryFields from './CategoryFields';
import DescriptionField from './DescriptionField';
import FormActions from './FormActions';

import {
  fetchCategories,
  submitNewRequest,
  setFormField,
  setCategoryFields,
  setSelectedCategory,
  calculateStep,
  resetForm,
  clearError,
  clearSubmitSuccess
} from '../../Store/RequestSlice';

import { getFieldLabel } from '../../constants/constants';
import UserSlice from "../../Store/UserSlice.jsx";
// import { getCurrentUserId, getDefaultAssigneeId } from '../utils/userHelper';

const AddRequestForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const token = useSelector(state => state.UserSlice.token);

  const {
    categories,
    selectedCategory,
    formData,
    currentStep,
    loading,
    error,
    submitLoading,
    submitSuccess
  } = useSelector(state => state.newRequest);

  // Load categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (submitSuccess) {
      message.success('הבקשה נשלחה בהצלחה!');
      form.resetFields();
      dispatch(clearSubmitSuccess());
    }
  }, [submitSuccess, form, dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    dispatch(setFormField({ field, value }));
    dispatch(calculateStep());
  };

  // Handle category field changes
  const handleCategoryFieldChange = (fieldName, value) => {
    dispatch(setCategoryFields({ [fieldName]: value }));
    dispatch(calculateStep());
  };

  // Handle category selection
  const handleCategoryChange = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
    dispatch(calculateStep());
  };

  // Handle form submission
  const handleSubmit = (values) => {
    // Get category fields data
    const categoryFieldsData = Object.keys(values)
        .filter(key => !['title', 'description', 'priority', 'category'].includes(key))
        .reduce((acc, key) => {
          if (values[key]) {
            const field = selectedCategory?.fields?.find(f => f.fieldName === key);
            const fieldLabel = field ? getFieldLabel(field.labelKey) : key;
            acc[fieldLabel] = values[key];
          }
          return acc;
        }, {});

    const requestData = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      category: selectedCategory?.name,
      categoryFields: categoryFieldsData,
      createdBy: token,
      assignedTo: token
    };

    dispatch(submitNewRequest(requestData));
  };

  // Helper functions for getting user IDs
  // const getUserId = () => getCurrentUserId();
  // const getAssigneeId = () => getDefaultAssigneeId();
  // const getUserId = () => "67eda8fc2b6e420787c7c907";


  // Handle form reset
  const handleReset = () => {
    form.resetFields();
    dispatch(resetForm());
  };

  // Handle form values change
  const handleValuesChange = (changedValues, allValues) => {
    Object.keys(changedValues).forEach(key => {
      if (key === 'category') {
        handleCategoryChange(changedValues[key]);
      } else if (['title', 'priority', 'description'].includes(key)) {
        handleFieldChange(key, changedValues[key]);
      } else {
        // Category-specific field
        handleCategoryFieldChange(key, changedValues[key]);
      }
    });
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
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
            requiredMark={false}
            initialValues={formData}
        >
          <FormHeader title="הגשת בקשה חדשה" />

          <FormSteps currentStep={currentStep} />

          <BasicFields
              categories={categories}
              loading={loading}
          />

          {selectedCategory && selectedCategory.fields.length > 0 && (
              <CategoryFields
                  category={selectedCategory}
              />
          )}

          <DescriptionField />

          <FormActions
              onReset={handleReset}
              loading={submitLoading}
          />
        </Form>
      </div>
  );
};

export default AddRequestForm;