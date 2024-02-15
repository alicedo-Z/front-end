import React, { useState, useEffect } from 'react';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Modal,
} from 'antd';
const { RangePicker } = DatePicker;
const SearchWrap = ({ setShowSearch }) => {
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState('title');
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  useEffect(() => {
    form.setFieldsValue({ type: 'title' })
  }, [])
  return (
        <>

            <Modal title="Search Room" width='50%' open onOk={handleOk} onCancel={() => setShowSearch(false)}>
                <Form
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                    form={form}
                >
                    {/* 搜索条件是 title或者location 或者卧室的数量或者日期(Data)价格 评分 */}
                    <Form.Item label="Search Type" name='type'>
                        <Radio.Group onChange={(e) => { setRadioValue(e.target.value) }}>
                            <Radio value="title"> title </Radio>
                            <Radio value="location"> location </Radio>
                            <Radio value="roomNum"> roomNum </Radio>
                            <Radio value="date"> Date </Radio>
                        </Radio.Group>
                    </Form.Item>
                    {radioValue === 'title' && (
                        <Form.Item label="Title" name='title'>
                            <Input />
                        </Form.Item>
                    )}
                    {radioValue === 'location' && (
                        <Form.Item label="Location" name='location'>
                            <Select>
                                <Select.Option value="shanghai">sydney</Select.Option>
                                <Select.Option value="beijing">melbourne</Select.Option>
                                <Select.Option value="guangzhou">brisbane</Select.Option>
                            </Select>
                        </Form.Item>
                    )}
                    {radioValue === 'date' && (
                        <Form.Item label="Date" name='date'>
                            <RangePicker />
                        </Form.Item>
                    )}
                    {radioValue === 'roomNum' && (
                        <Form.Item label="roomNumber" name='roomNum'>
                            <InputNumber />
                        </Form.Item>
                    )}

                </Form>
            </Modal>
        </>
  )
}

export default SearchWrap;
