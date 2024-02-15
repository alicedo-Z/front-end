import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Image } from 'antd';

const styles = {
  uploadSection: {
    margin: '40px auto',
  },
  uploadPart: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: '#228B22',
    border: '1px solid #228B22',
    ':hover': {
      color: '#00ce00',
      border: '1px solid #00ce00',
    }
  }
};

export default function UploadImage () {
  const props = {
    name: 'file',
    // 需要改成实际上传服务器的端点
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={styles.uploadSection}>
        <Image
            width={500}
            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSSV3VWaw7sTfKxQl-zP_ti_sL8NhqcVkuMKhvyHd-EX3A1s--m2DAKs2mAsf6FNdJ22wUDhVHir0nipJJVj-UiKodm8wSxTmYy7LVaaA"
        />
        <div style={styles.uploadPart}>
            <Upload {...props} style={{ margin: '0 auto' }}>
                <Button icon={<UploadOutlined />} className='upload-btn' >Click to Upload</Button>
            </Upload>
        </div>
    </div>
  )
}
