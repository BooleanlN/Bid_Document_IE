import React from 'react'
import { Select,Button,Modal } from 'antd';
import Space from './Space'
import BidForm from './Components/BidForm'
import {DocNumberByBid} from '../service'
class BidInfo extends React.Component{
  state = {
    bidTypes: [],
    modalInfo: {
      title: '新建标的物',
      visible: false
    }
  }
  handleConfirm = () => {
    // 新建标的物
  }
  handleCancel = () => {
    this.setState({
      modalInfo: {...modalInfo, visible: false}
    })
    console.log(this.state.modalInfo)
  }
  handleChange = (value)=>{
    console.log(value)
  }
  componentDidMount(){
    this.doGetData()
  }
  doGetData = () => {
    DocNumberByBid().then(res => {
      this.setState({
        bidTypes:res.data.map(item => {
          return {
            value:item.docBid,
            label:item.docBid
          }
        })
      })
    })
  }
  render(){
    const select = (
      <Select onChange={this.handleChange} style={{width:160}} placeholder="标的物">
        {this.state.bidTypes.map(bidType => (
          <Option value={bidType.value} key={bidType.value}>{bidType.label}</Option>
        ))}
      </Select>
    )
    return (
      <Space> 
        {select}
        <Button type="primary" onClick={this.handleUpdate} style={{marginLeft: '20px'}}>上传</Button>
        <Button type="primary" onClick={this.state.modalInfo.visible=true}></Button>
        <Modal title={this.state.modalInfo.title} 
               visible={this.state.modalInfo.visible}
               onOk={this.handleConfirm}
               onCancel={this.handleCancel}>
          <BidForm />
        </Modal>
      </Space>
    )
  }
}
export default BidInfo