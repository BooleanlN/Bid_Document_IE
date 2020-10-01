import { Pie,yuan } from 'ant-design-pro/lib/Charts';
import React from 'react'

class PieChart extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Pie
      // hasLegend
      title={this.props.title}
      // subTitle={this.props.subTitle}
      // total={() => (
      //   <span></span>
      // )}
      data={this.props.data}
      valueFormat={val => (<span></span>)}
      height={294}
    />
    )
  }
}
export default PieChart