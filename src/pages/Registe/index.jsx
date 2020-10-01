import React from 'react'
import {
  Form,
  Input,
  message,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import request from '@/services/common.ts'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
class Registe extends React.Component{
  
  state = {
    username:'',
    password:'',
    password_repeat:'',
    email:'',
    phoneNumber:''
  }
  onFinish = values => {
    console.log("验证成功！")
    console.log(values)
  }
  handleSubmit = () => {
    let {username,password,email,phoneNumber,password_repeat} = this.state
    if(username=='' || password == '' || email == '' || phoneNumber == ''){
      message.error('不能为空');
    }
    else if(password_repeat !== password){
      message.error('密码输入不一致!');
    }else{
      this.submit(this.state)
    }
  }
  submit(data){
    request.post("/user/adduser",{
      data:data
    }).then(res => {
      if(res.success){
        message.success("注册成功！")
      }else{
        message.error(res.msg)
      }
    }).catch(error => {
      message.error(error)
    })
  }
  render(){
    return (
      <>
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
        <Form.Item name="email" label="电子邮件地址" rules={
          [{type:'email',message:'该email地址无效'},{required:true,message:"填写Email地址"}]
        }>
           <Input onChange={e => this.setState({email:e.target.value})}/>
        </Form.Item>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名', whitespace: true }]}
      >
        <Input onChange={e => this.setState({username:e.target.value})}/>
      </Form.Item>
      <Form.Item
        name="phone_number"
        label="手机号码"
        rules={[{ required: true, message: '请输入你的手机号码' }]}
      >
        <Input style={{ width: '100%' }} onChange={e => this.setState({phoneNumber:e.target.value})} />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{required:true,message:'请输入密码'}]} hasFeedback>
          <Input.Password onChange={e => this.setState({password:e.target.value})}/>
        </Form.Item>
        <Form.Item name="password_repeat" dependencies={['password']} label="确认密码" rules={[{required:true,message:"请再次输入密码"},({getFieldValue}) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('前后输入密码不一致');
          }
        })]}>
          <Input.Password onChange={e => this.setState({password_repeat:e.target.value})}/>
        </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
          注册
        </Button>
      </Form.Item>
      </Form>
      </>
    )
  }
}
export default Registe