import { useParams } from 'react-router-dom';
import { Card, Tag, Typography, Layout, Divider, Row, Col, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import axios from '../services/axiosInstance';

const { Paragraph, Text, Title } = Typography;
const { TextArea } = Input;

const TicketDetails = () => {
  const { id } = useParams();
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [loadingTicket, setLoadingTicket] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState([]);
  const [usersMap, setUsersMap] = useState({}); 

  useEffect(() => {
    const fetchUserNameById = async (userId) => {
      if (!userId) return null;
      if (usersMap[userId]) return usersMap[userId];
      try {
        debugger
        const res = await axios.get(`/api/user/getUserById/${userId}`);
        console.log("user"+res.data+userId)
        const userName = res.data.user.userName || "שם לא נמצא";
        setUsersMap(prev => ({ ...prev, [userId]: userName }));
        return userName;
      } catch (err) {
        console.error("Error fetching user name for ID:", userId, err);
        setUsersMap(prev => ({ ...prev, [userId]: userId })); 
        return userId;
      }
    };

    const fetchTicket = async () => {
      try {
        setLoadingTicket(true);
        setError(null);
        const res = await axios.get(`/Ticket/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        setTicket(res.data);
        let fullResponses = [];
        if (res.data.responses && res.data.responses.length > 0) {
          fullResponses = await Promise.all(
            res.data.responses.map(async (responseId) => {
              try {
                const responseRes = await axios.get(`http:///response/getResponseByID/${responseId}`);
                return responseRes.data;
              } catch (err) {
                console.error(`Error fetching response ${responseId}:`, err);
                return null;
              }
            })
          );
          fullResponses = fullResponses.filter(r => r !== null);
          setResponses(fullResponses);
        } else {
          setResponses([]);
        }

        // שליפת שמות משתמשים לפנייה ולתגובות
        const userIdsToFetch = new Set();

        // מזהה היוצר של הפנייה
        if (res.data.createdBy) userIdsToFetch.add(res.data.createdBy);

        // מזהי היוצרים של התגובות
        fullResponses.forEach(resp => {
          if (resp.createdBy) userIdsToFetch.add(resp.createdBy);
          if (resp.sender) userIdsToFetch.add(resp.sender);
          if (resp.author) userIdsToFetch.add(resp.author);
        });

        await Promise.all([...userIdsToFetch].map(id => fetchUserNameById(id)));

      } catch (err) {
        console.error("שגיאה בשליפת טיקט", err);
        setError(err);
        message.error("שגיאה בטעינת הפנייה");
      } finally {
        setLoadingTicket(false);
      }
    };

    fetchTicket();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'gold';
      case 'in_progress': return 'blue';
      case 'closed': return 'green';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'default';
      case 'medium': return 'blue';
      case 'high': return 'red';
      default: return 'default';
    }
  };

  const handleReply = () => {
    if (!reply.trim()) {
      message.warning('יש להזין תגובה לפני השליחה');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newResponse = {
        content: reply,
        createdAt: new Date().toISOString(),
        author: "חי"
      };

      setResponses([...responses, newResponse]);
      setReply('');
      setLoading(false);
      message.success('המענה נשלח בהצלחה');
    }, 1000);
  };
  const getFieldValue = (fieldName) => {
    return ticket.fieldValues?.find(f => f.fieldName === fieldName)?.value || '---';
  };

  const categories = [
    {
      name: "folder_access",
      fields: [
        { fieldName: "path", labelKey: "נתיב תיקייה" },
        { fieldName: "permission", labelKey: "הרשאה" },
        { fieldName: "folderName", labelKey: "שם תיקייה" }
      ]
    }
  ];

  const category = categories.find(c => c.name === 'folder_access');

  if (loadingTicket) return <Text><Loader/></Text>;
  if (error || !ticket) return <Text>לא נמצאה פנייה</Text>;

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
              <Tag color={getStatusColor(ticket.status)}>{ticket.status}</Tag>
              <Tag color={getPriorityColor(ticket.priority)}>{ticket.priority}</Tag>
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
            <Text>{usersMap[ticket.createdBy] || ticket.createdBy}</Text>
          </Col>
        </Row>

        <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>תיאור</Divider>
        <Card type="inner" style={{ backgroundColor: '#fafafa', marginBottom: 24 }}>
          <Paragraph style={{ marginBottom: 0 }}>{ticket.description}</Paragraph>
        </Card>
{category && (
          <>
            <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>פרטי קטגוריה</Divider>
            <div style={{ textAlign: 'right', paddingRight: 8 }}>
              {category.fields.map((field) => (
                <div key={field.fieldName} style={{ marginBottom: 20 }}>
                  <Text strong>{field.labelKey}:</Text> {getFieldValue(field.fieldName)}
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

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
                  {res.responses ? res.responses.map((text, i) => (
                    <Paragraph key={i} style={{ marginBottom: 4 }}>{text}</Paragraph>
                  )) : <Paragraph>{res.content || ''}</Paragraph>}
                </Col>
                <Col span={8} style={{ textAlign: 'left', fontSize: '12px', color: '#888' }}>
                  <Row gutter={16}>
                    <Col>
                      <Text strong>תאריך</Text><br />
                      <Text>{formatDate(res.createdAt)}</Text>
                    </Col>
                    <Col>
                      <Text strong>נציג</Text><br />
                      <Text>{usersMap[res.sender] || usersMap[res.createdBy] || usersMap[res.author] || res.sender || res.createdBy || res.author}</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}

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
