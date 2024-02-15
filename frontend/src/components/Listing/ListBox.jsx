import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ListBox = ({ dataList = [] }) => {
  const navigate = useNavigate();
  return (
        <>
            <Row className='listBox' gutter={[24, 16]}>
                {
                    dataList.map(box => (
                        <Col key={box.id} xs={12} md={8} lg={6} xl={6} >
                            <Card
                                style={{
                                  width: '100%',
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src={box.thumbnail}
                                        style={{ height: '220px' }}
                                        onClick={() => {
                                          navigate(`/ViewAndEditList/${box.id}/detail`);
                                        }}
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" onClick={() => {
                                      navigate(`/ViewAndEditList/${box.id}/edit`);
                                    }} />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src={box.thumbnail} />}
                                    title={box.title}
                                    description={box.totalReviews}
                                />
                            </Card>
                        </Col>

                    ))
                }
            </Row>

        </>

  )
}

export default ListBox;
