import React, { useEffect } from 'react';
import { Col, Row, Image, Form, Input, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const ViewAndEditList = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const { pageType } = routeParams;
  console.log(routeParams, 'params');
  const isDetail = pageType === 'detail';
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  useEffect(() => {

  }, []);

  return (
    <>
      <Row justify={'center'}>
        <h2>{isDetail ? 'Detail' : 'Edit'}</h2>
      </Row>
      <Row justify={'center'} style={{ margin: '24px 0px' }}>
        <Col span={8}>
          <Image
            width={'100%'}
            height={300}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col span={8}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ title: 'Editable Image Title' }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label="Title" name="title">
              {isDetail ? 'Editable Image Title' : <Input />}
            </Form.Item>

            <Form.Item label="Types" name="Types">
              Types
            </Form.Item>
            <Form.Item label="Beds" name="Beds">
              Beds
            </Form.Item>
            <Form.Item label="Bathrooms" name="Bathrooms">
              Bathrooms
            </Form.Item>
            <Form.Item label="Rating" name="Rating">
              Rating
            </Form.Item>
            <Form.Item label="Total Reviews" name="TotalReviews">
              Total Reviews
            </Form.Item>
            <Form.Item label="Price" name="Price">
              Price
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              {!isDetail && (<Button type="primary" htmlType="submit">
                Save
              </Button>)}
              <Button style={{ marginLeft: 24 }} onClick={() => navigate('/')}>
                Back
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ViewAndEditList;
