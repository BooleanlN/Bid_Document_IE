import React from 'react'
import { Select,Button } from 'antd';
import Space from './Space'

class BidInfo extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  handleChange(value){
    console.log(value)
  }
  handleUpdate(){

  }
  render(){
    const select = (
      <Select onChange={this.handleChange} style={{width:160}} placeholder="标的物">
        {this.props.bidTypes.map(bidType => (
          <Option value={bidType.value} key={bidType.value}>{bidType.label}</Option>
        ))}
      </Select>
    )
    return (
      <Space> 
        {select}
        <Button type="primary" onClick={this.handleUpdate}>上传</Button>
      </Space>
    )
  }
}
export default BidInfo