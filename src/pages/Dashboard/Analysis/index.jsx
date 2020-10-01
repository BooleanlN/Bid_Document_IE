import React from 'react'
import CardNumberInfo from './components/CardNumberInfo'
import BrushChart from './components/Charts/Brush'
import PieChart from './components/Charts/Pie'
import {Skeleton,Card,Col,Row} from 'antd'
import {DocNumberByBid,getBidNumber} from './service'
class Analysis extends React.Component{
  state = {
    loading:false,
    data:[],
    xdata:[]

  }
  componentDidMount(){
    this.doGetData()
  }
  doGetData = () => {
    Promise.all([DocNumberByBid(),getBidNumber()]).then(values => {
      let data = values[0].data.map(item => {return {x:item.bidName,y:item.num}});
      let xdata = [{x:'已转化模版',y:values[1].data},{x:'未转化模版',y:values[0].data.length-values[1].data}]
      console.log(data,xdata)
      this.setState({
        loading:false,
        data:data,
        xdata:xdata
      })
    })
  }
  render () {
    const {data,xdata} = this.state;
     return (
      <>
      <div>
      <Skeleton loading = {this.state.loading}>
        <CardNumberInfo />
      </Skeleton>
      </div>
      <Skeleton loading = {this.state.loading}>
      <div style={{marginTop:'20px'}}>
        <Row gutter={16}>
            <Col span={12}>
            <Card>
          <PieChart data={data} title="样本比重" subTitle="样本比重"/> 
        </Card>
            </Col>
            <Col span={12}>
            <Card>
          <PieChart data={xdata} title="模版比重" subTitle="模版比重"/> 
        </Card>
            </Col>
        </Row>
      </div>
      </Skeleton>
      <div style={{marginTop:'20px'}}>
      <Skeleton loading = {this.state.loading}>
        <BrushChart/>
      </Skeleton>
      </div>
     </>
     )
  }
}
export default Analysis