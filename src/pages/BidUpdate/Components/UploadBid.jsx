import React from 'react'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
class UploadBid extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽文件进行上传</p>
        <p className="ant-upload-hint">
          支持多文件上传，限定同一标的物，格式要求(.pdf)
        </p>
      </Dragger>
    )
  }
}
export default UploadBid