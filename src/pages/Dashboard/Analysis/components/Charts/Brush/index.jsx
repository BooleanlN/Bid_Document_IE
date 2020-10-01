import { Bar } from 'ant-design-pro/lib/Charts';
import React from 'react'
import {DocNumberByBid} from '../../../service'
class BrushInterval extends React.Component{
  state = {
    data:[]
  }
  componentDidMount(){
    this.doGetData()
  }
  doGetData = () => {
    DocNumberByBid().then(res => {
        const data = res.data.map(item => {
          return {x: item.bidName, y: item.num}
        });
        console.log(data)
        this.setState({
          data: data
        })
    })
  }
  render(){
    return (
      <Bar height={200} title="标书数量" data={this.state.data} />
    )
  }
}
export default BrushInterval