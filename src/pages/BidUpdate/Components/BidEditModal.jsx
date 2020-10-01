import { Form, Input,Button,Modal,message } from 'antd';
import React  from 'react';
import {editBidInfo} from '../service'
const origin = {
  bidName:'',
  mainCategory: '',
  subCategory: '',
  detailCategory: '',
  bidDesc: ''
}
const BidEditModal = (props) => {
  const handleSubmit = () => {
    editBidInfo(props.bidInfo).then(res => {
      if ( res.code === 20000 ) {
        message.success('更新成功!')
      } else {
        message.error('更新失败!')
      }
    })
  }
  return (
    <Modal title="标的物修改" visible={props.visible} onCancel={props.hiddenEdit} onOk={props.hiddenEdit}>
      <Form>
        <Form.Item label="标的物ID">
          <Input value={props.bidInfo.bidId} onChange={ e => props.setBidInfo({bidId: e.target.value}) } disabled={true}/>
        </Form.Item>
        <Form.Item label="标的物名称">
          <Input value={props.bidInfo.bidName} onChange={ e => props.setBidInfo({bidName: e.target.value}) }/>
        </Form.Item>
        <Form.Item label="标的物大类">
          <Input value={props.bidInfo.mainCategory} onChange={ e => props.setBidInfo({mainCategory: e.target.value}) }/>
        </Form.Item>
        <Form.Item label="标的物中类">
          <Input value={props.bidInfo.subCategory} onChange={ e => props.setBidInfo({subCategory: e.target.value}) }/>
        </Form.Item>
        <Form.Item label="标的物小类">
          <Input value={props.bidInfo.detailCategory} onChange={ e => props.setBidInfo({detailCategory: e.target.value}) }/>
        </Form.Item>
        <Form.Item label="标的物描述">
          <Input value={props.bidInfo.bidDesc} onChange={ e => props.setBidInfo({bidDesc: e.target.value}) }/>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmit} type="primary">提交 </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default BidEditModal;