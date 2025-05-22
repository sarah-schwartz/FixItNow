

import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Form, Input, Select, Steps, theme } from 'antd';
import { colors } from '../theme/colors';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const FormHeader = ({ title }) => {
  return (
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
};

export const categories = [
  'גישה למסד נתונים',
  'גישה לספריית קבצים',
  'עזרה בקוד',
  'עזרה טכנית',
  'בקשת שינוי',
  'אחר'
];

export const CATEGORY_FIELDS = {
  'גישה למסד נתונים': [
    { name: 'serverName', label: 'שם שרת' },
    { name: 'schemaName', label: 'שם סכמה' },
    { name: 'permission', label: 'רמת הרשאה', type: 'select', options: ['read', 'modify'] },
  ],
  'גישה לספריית קבצים': [
    { name: 'serverName', label: 'שם שרת' },
    { name: 'path', label: 'נתיב' },
    { name: 'folderName', label: 'שם ספריה' },
    { name: 'permission', label: 'רמת הרשאה', type: 'select', options: ['read', 'modify'] },
  ],
  'עזרה בקוד': [
    { name: 'language', label: 'שפת תכנות' },
    { name: 'codeLink', label: 'קישור לקוד' },
  ],
  'עזרה טכנית': [
    { name: 'os', label: 'מערכת הפעלה' },
    { name: 'techDesc', label: 'תיאור טכני' },
  ],
  'בקשת שינוי': [
    { name: 'component', label: 'רכיב לשינוי' },
    { name: 'changeDesc', label: 'תיאור השינוי' },
  ],
  'אחר': [
    { name: 'otherDesc', label: 'נושא הפנייה' },
  ],
};

const FormActions = ({ onReset }) => {
  return (
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
};

const CategoryFields = ({ fields }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="fade-in my-4">
      <Row gutter={16}>
        {fields.map((field) => (
          <Col xs={24} md={12} key={field.name}>
            <Form.Item
              name={field.name}
              label={field.label}
              rules={[{ required: true, message: `${field.label} הוא שדה חובה` }]}
            >
              {field.type === 'select' ? (
                <Select placeholder={`בחר ${field.label}`}>
                  {field.options?.map((opt) => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              ) : (
                <Input placeholder={`הזן ${field.label}`} />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const AddRequestForm = () => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { token } = theme.useToken();

  const items = [
    { title: 'התחלה' },
    { title: 'בתהליך' },
    { title: 'כמעט סיום' },
    { title: 'הושלם' }
  ];

  useEffect(() => {
    const values = form.getFieldsValue();
    const allFields = ['title', 'category', 'priority', 'description'];

    if (category && CATEGORY_FIELDS[category]) {
      CATEGORY_FIELDS[category].forEach(field => {
        allFields.push(field.name);
      });
    }

    const filledFields = allFields.filter(field => values[field]);
    const progress = (filledFields.length / allFields.length) * 100;

    if (progress === 100) {
      setCurrentStep(3);
    } else if (progress >= 75) {
      setCurrentStep(2);
    } else if (progress >= 25) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [form.getFieldsValue(), category]);

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
    <Form 
      layout="vertical" 
      form={form} 
      onFinish={onFinish}
      className="fade-in"
      requiredMark={false}
    >
      <FormHeader title="הגשת בקשה חדשה" />

      <div className="mb-8" style={{ background: 'transparent' }}>
        <Steps
          current={currentStep}
          items={items}
          responsive={true}
          style={{
            marginBottom: token.marginLG,
            padding: token.padding,
            background: 'transparent',
            borderRadius: token.borderRadiusLG,
          }}
        />
      </div>

      <Form.Item 
        name="title" 
        label="כותרת הפנייה" 
        rules={[{ required: true, message: 'נא להזין כותרת' }]}
      >
        <Input placeholder="הזן כותרת קצרה" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item 
            name="category" 
            label="קטגוריה" 
            rules={[{ required: true, message: 'נא לבחור קטגוריה' }]}
          >
            <Select 
              placeholder="בחר קטגוריה" 
              onChange={(value) => setCategory(value)}
            >
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item 
            name="priority" 
            label="רמת דחיפות" 
            rules={[{ required: true, message: 'נא לבחור רמת דחיפות' }]}
          >
            <Select placeholder="בחר דחיפות">
              <Option value="low">נמוכה</Option>
              <Option value="medium">בינונית</Option>
              <Option value="high">גבוהה</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {category && <CategoryFields fields={CATEGORY_FIELDS[category]} />}

      <Form.Item 
        name="description" 
        label="תיאור הפנייה" 
        rules={[{ required: true, message: 'נא להזין תיאור' }]}
      >
        <TextArea rows={4} placeholder="תאר את הבקשה או הבעיה" />
      </Form.Item>

      <FormActions onReset={handleReset} />
    </Form>
  );
};

export default AddRequestForm;
