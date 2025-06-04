import { useParams } from 'react-router-dom';
import { Card, Tag, Typography, Layout, Divider, Row, Col, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Loader } from 'lucide-react';
import axios from '../services/axiosInstance';
import { getFieldLabel } from "../constants/constants"

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
  const [currentUser, setCurrentUser] = useState({})
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchUserNameById = async (userId) => {
      if (!userId) return null;
      if (usersMap[userId]) return usersMap[userId];
      try {
        debugger
        const res = await axios.get(`http://localhost:8080/api/user/${userId}`);
        console.log("user" + res.data + userId)
        const userName = res.data.user.userName || "שם לא נמצא";
        setUsersMap(prev => ({ ...prev, [userId]: userName }));
        return userName;
      } catch (err) {
        console.error("Error fetching user name for ID:", userId, err);
        setUsersMap(prev => ({ ...prev, [userId]: userId }));
        return userId;
      }
    };

    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log('Fetching profile data...');

        const response = await axios.get('/auth/me', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Profile response:', response);
        setCurrentUser(response.data)
      } catch (err) {
        console.error("שגיאה בשליפת נתוני פרופיל:", err);

        if (err.response?.status === 401) {
          setError('אנא התחבר מחדש למערכת');
          // אפשר להפנות לדף התחברות
          // window.location.href = '/login';
        } else {
          setError('שגיאה בטעינת הפרופיל');
        }
      } finally {
        setLoading(false);
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
                const responseRes = await axios.get(`http://localhost:8080/response/getResponseByID/${responseId}`);
                return responseRes.data;
              } catch (err) {
                console.error(`Error fetching response ${responseId}:`, err);
                return null;
              }
            })
          );
          fullResponses = fullResponses.filter(r => r !== null);
          console.log(fullResponses)
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
    fetchProfile();
    fetchTicket();
  }, [id]);

  const markAsHandled = async () => {
    debugger
    try {
      await axios.put(`http://localhost:8080/Ticket/setStatus/${ticket._id}`, { status: "closed" });
      setTicket(prev => ({ ...prev, status: 'closed' }));
      message.success('הפנייה סומנה כטופלה');
    } catch (err) {
      console.error("שגיאה בעדכון סטטוס:", err);
      message.error('שגיאה בסימון הפנייה כטופלה');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'gold';
      case 'inProgress': return 'blue';
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

    setTimeout(async () => {
      try {
        console.log(currentUser);

        const newResponse = {
          content: reply,
          createdAt: new Date().toISOString(),
          author: currentUser.userName
        };
        console.log(ticket._id, currentUser, newResponse.content)

        const res = await axios.post('http://localhost:8080/response/addResponseToTicket', {
          ticketId: ticket._id,
          createdBy: currentUser.id, // שימי לב: כאן צריך לשלוח את ה־ObjectId של המשתמש, לא את השם
          content: newResponse.content
        });

        // את התגובה שחזרה מהשרת את יכולה להוסיף לרשימה:
        setResponses([...responses, newResponse]);
        setReply('');
        if (currentUser.id == ticket._id) {
          await axios.put(`http://localhost:8080/Ticket/setStatus/${ticket._id}`, { status: "waiting" });
          setTicket(prev => ({ ...prev, status: 'waiting' }));
        }
        else {
          await axios.put(`http://localhost:8080/Ticket/setStatus/${ticket._id}`, { status: "inProgress" });
          setTicket(prev => ({ ...prev, status: 'inProgress' }));
        }
        setLoading(false);
        message.success('המענה נשלח בהצלחה');
      } catch (err) {
        console.error('שגיאה בשליחת מענה:', err);
        message.error('שגיאה בשליחת מענה');
        setLoading(false);
      }
    }, 1000);

  };
  const getFieldValue = (fieldName) => {
    return ticket.fieldValues?.find(f => f.fieldName === fieldName)?.value || '---';
  };
  useEffect(() => {
    const fetchCategory = async () => {
      if (ticket && ticket.fieldValues && ticket.fieldValues.length > 0) {
        try {
          debugger
          const res = await axios.get(`http://localhost:8080/Categories/getCategoryById/${ticket.fieldValues[0].value}`);
          setCategory(res.data);
        } catch (err) {
          console.error('שגיאה בשליפת קטגוריה:', err);
        }
      }
    };
    //const category = categories.find(c => c.name === 'folder_access');

    fetchCategory();
  }, [ticket]);

  // const categories = [
  //   {
  //     name: "folder_access",
  //     fields: [
  //       { fieldName: "path", labelKey: "נתיב תיקייה" },
  //       { fieldName: "permission", labelKey: "הרשאה" },
  //       { fieldName: "folderName", labelKey: "שם תיקייה" }
  //     ]
  //   }
  // ];


  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

  if (loadingTicket) return (
    <div style={{ textAlign: 'center', padding: '200px 0' }}>
      <Spin indicator={antIcon} tip="טוען פנייה..." size="large" />
    </div>
  );

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
                <div key={field.fieldName} style={{ display: 'flex', marginBottom: 12 }}>
                  <div style={{ fontWeight: 'bold', minWidth: 120 }}>{getFieldLabel(field.labelKey)}:</div>
                  <div>{getFieldValue(field.fieldName)}</div>
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

      {ticket.status !== 'closed' && (
        <Card style={{ width: '100%', maxWidth: '700px', marginTop: 24 }}>
          <Divider orientation="left" style={{ borderColor: '#1677ff', color: '#1677ff' }}>הוסף תגובה</Divider>
          <Card type="inner" style={{ backgroundColor: '#fafafa' }}>
            <TextArea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="כתוב כאן את תגובתך..."
              style={{ marginBottom: 12 }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Button type="primary" onClick={handleReply} loading={loading}>
                שלח מענה
              </Button>
              <Button
                type="primary"
                ghost
                onClick={markAsHandled}
                loading={loading}
              >
                סמן כטופלה
              </Button>
            </div>

          </Card>
        </Card>
      )}

    </Layout>
  );
};

export default TicketDetails;
