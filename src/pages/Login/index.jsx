import React from 'react'
import { Input,Button,message } from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import {login} from './service'
import './style.less'
import router from 'umi/router';
class Login extends React.Component{
  state = {
    username:'',
    password:''
  }
  handleInput = (e) => {
    this.setState({
      username:e.target.value
    })
  }
  handlePassword = (e) => {
    this.setState({
      password:e.target.value
    })
  }
  handleSubmit = () => {
    const {username, password} = this.state;
    if (username == '' || password == '') {
      message.warn('账号密码不能为空');
      return;
    } else {
      login(this.state).then(res => {
          if(res.code == 20000) {
            message.success('登录成功！');
            router.push('/main')
          } else {
            message.error(res.message);
          }
      }).catch(err => {
        message.error('账号或密码错误!');
      })
    }
    
  }
  render(){
    let {username,password} = this.state
    return (
      <>
        <div style={{width:'100%',backgroundColor:'#2d3a4b',overflow:'hidden',height:'100%'}}>
          <div style={{width:'520px',padding: '160px 35px 0', margin:'0 auto',textAlign:'center'}}>
            <h3 style={{letterSpacing: '4px',fontSize:'21px',color:'white'}}>登录</h3>
            <Input size="large" placeholder="用户名" prefix={<UserOutlined />} value={username} onChange={this.handleInput} />
            <br/>
            <br/>
            <Input.Password placeholder="密码" prefix={<LockOutlined />} value={password} onChange={this.handlePassword}/>
            <br/>
            <br/>
            <div>
              <Button type="primary" onClick={this.handleSubmit} style={{width:'100%',letterSpacing:'2px'}}>登录</Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Login