import { Form, Input,Button,Modal,message } from 'antd';
import {createNewApp} from '../service';
import React, {useState,useEffect} from 'react';

const AppEditModal = (props) => {
  const [appName, setAppName] = useState('');
  const handleSubmit = () => {
    createNewApp({appname: appName}).then(res => {
      if ( res.code === 20000 ) {
        message.success('更新成功!')
      } else {
        message.error('更新失败!')
      }
    })
  }
  return (
    <Modal title="APP创建" visible={props.visible} onCancel={props.hiddenEdit} onOk={props.hiddenEdit}>
      <Form>
        <Form.Item label="APP名称">
          <Input value={appName} onChange={ e => setAppName({bidId: e.target.value}) } />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmit} type="primary">提交 </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default AppEditModal;