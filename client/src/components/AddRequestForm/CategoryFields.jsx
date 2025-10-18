import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Divider } from 'antd';
import { getFieldLabel } from '../../constants/constants';

const { Option } = Select;
const { TextArea } = Input;

const CategoryFields = ({ category }) => {
  const renderField = (field) => {
    const fieldLabel = getFieldLabel(field.labelKey);
    const commonProps = {
      name: field.fieldName,
      label: fieldLabel,
      rules: field.required ? [
        { required: true, message: `נא למלא את ${fieldLabel}` }
      ] : [],
    };

    switch (field.type) {
      case 'select':
        return (
          <Form.Item key={field.fieldName} {...commonProps}>
            <Select placeholder={`בחר ${fieldLabel}`}>
              {field.options?.map((option) => (
                <Option key={option} value={option}>
                  {option === 'read' ? 'קריאה' : option === 'modify' ? 'שינוי' : option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      
      case 'textarea':
        return (
          <Form.Item key={field.fieldName} {...commonProps}>
            <TextArea 
              rows={4} 
              placeholder={`הכנס ${fieldLabel}`}
              showCount
              maxLength={500}
            />
          </Form.Item>
        );
      
      case 'date':
        return (
          <Form.Item key={field.fieldName} {...commonProps}>
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder={`בחר תאריך עבור ${fieldLabel}`}
              format="DD/MM/YYYY"
            />
          </Form.Item>
        );
      
      case 'number':
        return (
          <Form.Item key={field.fieldName} {...commonProps}>
            <Input 
              type="number" 
              placeholder={`הכנס ${fieldLabel}`}
            />
          </Form.Item>
        );
      
      case 'url':
        return (
          <Form.Item 
            key={field.fieldName} 
            {...commonProps}
            rules={[
              ...commonProps.rules,
              { type: 'url', message: 'נא להזין כתובת תקינה' }
            ]}
          >
            <Input 
              placeholder={`הכנס ${fieldLabel}`}
              prefix="https://"
            />
          </Form.Item>
        );
      
      case 'text':
      default:
        return (
          <Form.Item key={field.fieldName} {...commonProps}>
            <Input 
              placeholder={`הכנס ${fieldLabel}`}
              showCount={field.maxLength ? true : false}
              maxLength={field.maxLength}
            />
          </Form.Item>
        );
    }
  };

  if (!category || !category.fields || category.fields.length === 0) {
    return null;
  }

  return (
    <>
     
      <Row gutter={16}>
        {category.fields.map((field, index) => (
          <Col 
            key={field.fieldName} 
            xs={24} 
            md={category.fields.length > 2 && index < 2 ? 12 : 24}
          >
            {renderField(field)}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryFields;