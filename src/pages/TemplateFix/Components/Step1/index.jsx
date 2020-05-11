import React from 'react';
import { Form, Button, Divider, Input, Select,Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
// import Template from './Components/Template';

const bidTypes = [
  {value:'coal_miner',label:'采煤机'}
]
const layout = {
  labelCol:{span:8},
  wrapperCol:{span:16}
}
const {Item} = Form
class Step1 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      value:[]
    }
  }
  handleChange(){

  }
  render(){
    const options = (
      bidTypes.map(bidType => (
        <Option value={bidType.value} key={bidType.value}>{bidType.label}</Option>
      ))
    )
    return (
      <>
        <label htmlFor="bid">模版选择：</label>
        <Select onChange={this.handleChange} style={{width:360}} placeholder="标的物" name="bid">
          {options}
        </Select>
        {/* <Template/> */}
      </>
    )
  }
}
export default Step1