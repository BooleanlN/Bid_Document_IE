import React from 'react';
import { Form, Button, Result } from 'antd';
import { connect } from 'dva';

class Step3 extends React.Component{
  render(){
    return (
      <Result
      status="success"
      title="提交成功！"
      subTitle="标书编号:0001030499，请等待审核通过"
      >
        
      </Result>
    )
  }
}
export default Step3