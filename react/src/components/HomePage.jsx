import React, { lazy, Suspense } from 'react';
import { Card, Row, Col, Layout, Button } from 'antd';
import {
    ProfileOutlined,
    PlusCircleOutlined,
    ClockCircleOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const { Content } = Layout;

const cardData = [
    {
        icon: <ProfileOutlined style={{ fontSize: '3.5rem', color: '#1677ff' }} />,
        title: 'הבקשות שלי',
        link: '/MyRequests'
    },
    {
        icon: <PlusCircleOutlined style={{ fontSize: '3.5rem', color: '#1677ff' }} />,
        title: 'הגשת בקשה',
        link: '/new-request'
    },
    {
        icon: <ClockCircleOutlined style={{ fontSize: '3.5rem', color: '#1677ff' }} />,
        title: 'ממתין לאישור',
        link: '/pending-approvals'
    },
];

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Layout
            style={{
                minHeight: '85vh',
                width: '100vw',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                margin: 0,
                background:'rgb(226, 226, 226)',
            }}
        >
            {/* <Header /> */}
            <Content
                style={{
                    flex: '1 0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '24px',
                    margin: 0
                }}
            >
                <Row
                    gutter={[30, 30]}
                    style={{
                        width: '100%',
                        margin: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        padding: 0
                    }}
                >
                    {cardData.map((item, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            lg={8}
                            style={{
                                display: 'flex',
                                padding: '12px'
                            }}
                        >
                            <Card
                                hoverable
                                onClick={() => navigate(item.link)}
                                style={{
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    width: '100%',
                                    height: '36vh',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    // borderColor:' #1677ff',
                                    // borderStyle:'5rem',
                               }}
                            >
                                <div style={{
                                    fontSize: '54px', 
                                    marginBottom: '24px'
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '24px', 
                                    margin: 0
                                }}>
                                    {item.title}
                                </h3>
                                {/* <Button
                                    type="primary"
                                    shape="circle"
                                    icon={}
                                    style={{
                                        position: 'absolute',
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '2.7rem',
                                        height: '2.7rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background:'none'
                                    }}
                                /> */}
                                {/* <LeftOutlined style={{ fontSize: '1rem',color:'#1677ff',position:'absolute',left:'1vw' ,bottom:'17vh'}} /> */}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
            <Footer />
        </Layout>
    );
};

export default HomePage;