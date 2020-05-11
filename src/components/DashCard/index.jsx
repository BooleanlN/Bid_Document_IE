import React from 'react'
import { Card } from 'antd';
class CardNumberInfo extends React.Component{
  render(){
    return (
      <Card style={{width:300}}>
        {this.props.children}
      </Card>
    )
  }
}
export default CardNumberInfo