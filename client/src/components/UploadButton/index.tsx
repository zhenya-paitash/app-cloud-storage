import React from 'react'
import { CloudUploadOutlined } from '@ant-design/icons';
import styles from '@styles/Home.module.scss'
import { Button, Upload, UploadFile, notification } from 'antd';
import Api from '@api';

export const UploadButton: React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      await Api.files.uploadFile(options);
      notification.success({
        message: 'Success!',
        description: 'File success uploaded',
        duration: 2
      })
      setFileList([])
      window.location.reload()
    } catch (e) {
      notification.error({
        message: 'File upload error!',
        description: 'Failed to upload file',
        duration: 2,
      })
    }
  }

  return (
    <Upload
      className={styles.upload}
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button
        type='primary'
        size='large'
        icon={<CloudUploadOutlined />}
      >Upload</Button>
    </Upload>
  );
}