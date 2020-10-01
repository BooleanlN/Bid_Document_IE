import React from 'react'
import { Upload, message,Select,Button,Modal } from 'antd';
import Space from './Space'
import { InboxOutlined } from '@ant-design/icons';
import BidForm from './BidForm';
import {getBidList,doPostPdf} from '../service';
import Cascader from '@/components/Cascader';
const { Dragger } = Upload;
class UploadBid extends React.Component{
  state = {
    bidType:'',
    file: null,
    title: '新建标的物',
    visible: false,
    bids: []
  }
  handleUpdate= () => {
    const {bidType,file} = this.state;
    let form = new FormData();
    form.append("file",file);
    form.append("mainCategory",bidType[0]);
    form.append("subCategory", bidType[1]);
    form.append("detailCategory", bidType[2]);
    if(bidType !== "" && file !== null){
      doPostPdf(form).then(res => {
        if(res.code == 20000){
          message.success("上传成功！")
        }else{
          message.error("上传失败！")
        }
      })
    }else{
      message.error("请完善信息！")
    }
  }
  componentDidMount(){
    this.doGetData()
  }
  setOption = (value, selectedOptions) => {
    this.setState({
      bidType: value
    });
  }
  doGetData = async () => {
    const res = await getBidList();
    console.log(res);
    this.setState({
      bids: res.data,
      fuck: true
    })
  }
  handleConfirm = () => {
    // 新建标的物
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleCreate = () => {
    this.setState({
      visible: true
    })
  }
  render(){
    let _this = this
    const {bidType} = this.state;
    const props = {
      name: 'file',
      multiple: false,
      action: '',
      data:{
        docBid:bidType
      },
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
      beforeUpload(file,fileList){
        _this.setState({
          file:file
        })
        return false;
      }
    };
    return (
      <>
      <div style={{marginBottom:'20px'}}>
      <Space> 
      <Cascader optionsData={this.state.bids} setOption={this.setOption} option={this.state.bidType}/>
      <Button type="primary" onClick={this.handleUpdate}>上传</Button>
      <Button type="primary" onClick={this.handleCreate}>新建标的物</Button>
      <Modal title={this.state.title} 
               visible={this.state.visible}
               onOk={this.handleConfirm}
               onCancel={this.handleCancel}
               >
          <BidForm />
        </Modal>
    </Space>
      </div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽文件进行上传</p>
        <p className="ant-upload-hint">
          支持多文件上传，限定同一标的物，格式要求(.pdf)
        </p>
      </Dragger>
      </>
    )
  }
}
export default UploadBid