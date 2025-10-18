import  { useEffect } from 'react';
import { Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import FormHeader from './FormHeader';
import FormSteps from './FormSteps';
import BasicFields from './BasicFields';
import AssignedToField from './AssignedToField'; 
import CategoryFields from './CategoryFields';
import DescriptionField from './DescriptionField';
import FormActions from './FormActions';
import useCurrentUser from '../../hooks/useCurrentUser';

import {
  fetchCategories,
  submitNewRequest,
  setFormField,
  setCategoryFields,
  setSelectedCategory,
  calculateStep,
  resetForm,
  clearError,
} from '../../Store/RequestSlice';



const AddRequestForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (submitSuccess) {
      Swal.fire({
        text: 'הפנייה נשלחה בהצלחה',
        icon: 'success',
        confirmButtonText: 'סגור',
        confirmButtonColor: '#003a70',
        customClass: {
          confirmButton: 'swal2-rtl'
        }
      }).then(() => {
        dispatch(resetForm()); 
        navigate('/HomePage');
      });
    }
  }, [submitSuccess, form, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleFieldChange = (field, value) => {
    dispatch(setFormField({ field, value }));
    dispatch(calculateStep());
  };

  const handleCategoryFieldChange = (fieldName, value) => {
    dispatch(setCategoryFields({ [fieldName]: value }));
    dispatch(calculateStep());
  };

  const handleCategoryChange = (categoryId) => {
    const categoryObject = categories.find(cat => cat._id === categoryId);
    dispatch(setSelectedCategory(categoryObject || null));
    dispatch(calculateStep());
  };

  const handleSubmit = (values) => {
    const {
      title,
      description,
      priority,
      assignedTo,
    } = values;

    const standardFields = ['title', 'description', 'priority'];

    const fieldValues = Object.entries(values)
      .filter(([key]) => !standardFields.includes(key))
      .map(([fieldName, value]) => ({
        fieldName,
        value
      }));

    const requestData = {
      title,
      description,
      priority,
      type: selectedCategory?._id,
      assignedTo,
      createdBy: user?.id,
      fieldValues,
    };

    dispatch(submitNewRequest({ ...requestData }));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(resetForm());
  };

  const handleValuesChange = (changedValues, allValues) => {
    Object.keys(changedValues).forEach(key => {
      if (key === 'category') {
        handleCategoryChange(changedValues[key]);
      } else if (['title', 'priority', 'description'].includes(key)) {
        handleFieldChange(key, changedValues[key]);
      } else {
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
        <FormHeader title="הגשת בקשה חדשה" loading={loading} />

        <FormSteps currentStep={currentStep} loading={loading} />

        <BasicFields
          categories={categories}
          loading={loading}
        />

        {selectedCategory && selectedCategory.fields.length > 0 && (
          <CategoryFields
            category={selectedCategory}
            loading={loading}
          />
        )}
<AssignedToField />
        <DescriptionField
          value={formData.description}
          onChange={(val) => handleFieldChange('description', val)}
          loading={loading}
        />

        <FormActions
          onSave={form.submit}
          loading={submitLoading}
        />
      </Form>
    </div>
  );
};

export default AddRequestForm;
