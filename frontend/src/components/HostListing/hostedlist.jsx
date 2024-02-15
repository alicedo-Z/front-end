import React from 'react';
import { Col, Row, Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const styles = {
  cardStyle: {
    width: '100%',
  },
  coverStyle: {
    height: '220px',
  },
  colStyle: {
    xs: 12,
    md: 8,
    lg: 6,
    xl: 6,
  },
};

const Hostedlist = ({ dataList = [], onEdit, onDelete }) => {
  return (
    <Row gutter={[24, 16]}>
      {dataList.map(box => (
        <Col key={box.id} {...styles.colStyle}>
          <Card
            style={styles.cardStyle}
            cover={
              <img
                alt="example"
                src={box.thumbnail}
                style={styles.coverStyle}
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" onClick={() => onEdit(box.id)} />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={box.thumbnail} />}
              title={box.title}
              description={
                <>
                  <p>Type: {box.type}</p>
                  <p>Beds: {box.beds}</p>
                  <p>Bathrooms: {box.bathrooms}</p>
                  <p>Rating: {box.rating}</p>
                  <p>Total Reviews: {box.totalReviews}</p>
                  <p>Price: {box.price} per night</p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Hostedlist;
