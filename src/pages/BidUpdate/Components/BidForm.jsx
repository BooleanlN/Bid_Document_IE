import { Form, Input, Button, message} from 'antd';
import {addNewBid} from '../service';
import {useState} from 'react';
const origin = {
  bidName:'',
  mainCategory: '',
  subCategory: '',
  detailCategory: '',
  bidDesc: ''
}
const BidForm = () => {
  const [bidInfo,setBidInfo] = useState(origin)
  const handleSubmit = () => {
    addNewBid(bidInfo).then(res => {
      if(res.code === 20000) {
        message.success('添加成功！')
      } else {
        message.error('添加失败！')
      }
    });
  }
  return (
    <Form name="bid" labelCol={ {span:4 }} wrapperCol={ {span: 20} } labelAlign='left'>
      <Form.Item label="名称" name="bid_name" rules={{required: true, message: '标的物名称'}}>
          <Input value={bidInfo.bidName} onChange={(e) => {setBidInfo({...bidInfo, bidName:e.target.value})}}/>
      </Form.Item>
      <Form.Item label="大类" name="main_category" rules={{required: true, message: '请输入标的物大类'}}>
          <Input value={bidInfo.mainCategory} onChange={(e) => {setBidInfo({...bidInfo, mainCategory:e.target.value})}}/>
      </Form.Item>
      <Form.Item label="中类" name="sub_category" rules={{required: true, message: '请输入标的物中类'}}>
          <Input value={bidInfo.subCategory} onChange={(e) => {setBidInfo({...bidInfo, subCategory:e.target.value})}}/>
      </Form.Item>
      <Form.Item label="小类" name="detail_category" rules={{required: true, message: '请输入标的物小类'}}>
          <Input value={bidInfo.detailCategory} onChange={(e) => {setBidInfo({...bidInfo, detailCategory:e.target.value})}}/>
      </Form.Item>
      <Form.Item label="简要描述" name="bid_desc" rules={{required: true, message: '标的物简要描述'}}>
          <Input value={bidInfo.bidDesc} onChange={(e) => {setBidInfo({...bidInfo, bidDesc:e.target.value})}}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BidForm