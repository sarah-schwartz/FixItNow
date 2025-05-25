import { useParams } from 'react-router-dom';
import { Card, Tag, Typography, Layout, Divider, Row, Col, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const { Paragraph, Text, Title } = Typography;
const { TextArea } = Input;

const TicketDetails = () => {
  const { id } = useParams();
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  // הגדרת טיקט לדוגמה
  const ticket = {
    "_id": "1234567890abcdef",
    "title": "בקשת גישה למסד נתונים",
    "description": "אני צריך גישה למאגר הנתונים של המוצר כדי לבצע חיקויים בנתונים של לקוחות. אשמח לקבל גישה בהקדם האפשרי.",
    "category": "database_access",
    "serverName": "db-server-01",
    "schemaName": "inventory",
    "permission": "read",
    "createdAt": "2025-05-25T10:15:00.000Z",
    "createdBy": "user123",
    "status": "ממתין",
    "priority": "רגילה",
  };

  const initialResponses = [
    {
      content: "תוכלי לשלוח לי צילום מסך של הבעיה?",
      createdAt: "2025-05-24T14:20:00.000Z",
      author: "supportAgent1"
    },
    {
      content: "נשלח",
      createdAt: "2025-05-24T15:00:00.000Z",
      author: "supportAgent2"
    },
    {
      content: "טופל",
      createdAt: "2025-05-24T16:00:00.000Z",
      author: "supportAgent1"
    }
  ];

  const [responses, setResponses] = useState(initialResponses);

  const categories = [
    {
      name: "database_access",
      fields: [
        { fieldName: "serverName", labelKey: "שם שרת" },
        { fieldName: "schemaName", labelKey: "סכמה" },
        { fieldName: "permission", labelKey: "רמת הרשאה" }
      ]
    }
  ];

  const category = categories.find(c => c.name === ticket?.category);
  if (!ticket || !category) return <Text>לא נמצאה פנייה</Text>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ממתין':
        return 'gold';
      case 'בטיפול':
        return 'blue';
      case 'נסגר':
        return 'green';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'נמוך':
        return 'default';
      case 'רגילה':
        return 'blue';
      case 'דחוף':
        return 'red';
      default:
        return 'default';
    }
  };

  const handleReply = () => {
    if (!reply.trim()) {
      message.warning('יש להזין תגובה לפני השליחה');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      debugger
      const newResponse = {
        content: reply,
        createdAt: new Date().toISOString(),
        author: "חי"
        //const count = useSelector((state) => state.counter.value);
      };

      setResponses([...responses, newResponse]); // עדכון נכון של state
      setReply('');
      setLoading(false);
      message.success('המענה נשלח בהצלחה');
    }, 1000);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        alignItems: 'center',
        padding: '40px 16px',
        direction: 'rtl'
      }}
    >
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4} style={{ margin: 0 }}>{ticket.title}</Title>
            <div>
              <Tag color={getStatusColor(ticket.status)}>ממתין</Tag>
              <Tag color={getPriorityColor(ticket.priority)}>רגיל</Tag>
            </div>
          </div>
        }
        bordered
        style={{
          width: '100%',
          maxWidth: 700,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          background: '#fff'
        }}
      >
        <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>נתונים כלליים</Divider>
        <Row gutter={[16, 16]} justify="space-between" style={{ textAlign: 'center', marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Text strong>מספר פנייה</Text><br />
            <Text>{ticket._id}</Text>
          </Col>
          <Col xs={24} sm={8}>
            <Text strong>תאריך</Text><br />
            <Text>{formatDate(ticket.createdAt)}</Text>
          </Col>
          <Col xs={24} sm={8}>
            <Text strong>על ידי</Text><br />
            <Text>{ticket.createdBy}</Text>
          </Col>
        </Row>

        <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>תיאור</Divider>
        <Card type="inner" style={{ backgroundColor: '#fafafa', marginBottom: 24 }}>
          <Paragraph style={{ marginBottom: 0 }}>{ticket.description}</Paragraph>
        </Card>

        <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>פרטי קטגוריה</Divider>
        <div style={{ textAlign: 'right', paddingRight: 8 }}>
          {category.fields.map((field) => (
            <div key={field.fieldName} style={{ marginBottom: 20 }}>
              <Text strong>{field.labelKey}:</Text> {ticket[field.fieldName]}
            </div>
          ))}
        </div>
      </Card>

      {/* תגובות לפנייה */}
      {responses.length > 0 && (
        <div style={{ width: '100%', maxWidth: 700, marginTop: 24 }}>
          <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>תגובות קודמות</Divider>
          {responses.map((res, index) => (
            <Card
              key={index}
              type="inner"
              style={{
                backgroundColor: '#fdfdfd',
                marginBottom: 16,
                borderRight: '5px solid #1677ff',
                direction: 'rtl'
              }}
            >
              <Row justify="space-between" align="top">
                <Col span={16} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: '16px' }}>{res.content}</Text>
                </Col>
                <Col span={8} style={{ textAlign: 'left', fontSize: '12px', color: '#888' }}>
                  <Row gutter={16}>
                    <Col>
                      <Text strong>תאריך</Text><br />
                      <Text>{formatDate(res.createdAt)}</Text>
                    </Col>
                    <Col>
                      <Text strong>ע"י</Text><br />
                      <Text>{res.author}</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}

      {/* טופס מענה */}
      <Card style={{ width: '100%', maxWidth: '700px' }}>
        <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>הוסף תגובה</Divider>
        <Card type="inner" style={{ backgroundColor: '#fafafa' }}>
          <TextArea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            placeholder="כתוב כאן את תגובתך..."
            style={{ marginBottom: 12 }}
          />
          <Button type="primary" onClick={handleReply} loading={loading}>
            שלח מענה
          </Button>
        </Card>
      </Card>
    </Layout>
  );
};

export default TicketDetails;
