import React from 'react'
import {Skeleton,Card,Col,Row} from 'antd'
import styles from './styles.less';
import {getBidNumber,BidDocNumber,DocNumberByBid} from '../service'

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);
class CardNumberInfo extends React.Component{
  state = {
    bidTypes:0,
    bidMaterial:0,
    bidTemplate:0
  }
  componentDidMount(){
    this.doGetData()
  }
  doGetData = () => {
    Promise.all([DocNumberByBid(),BidDocNumber(),getBidNumber()]).then(values => {
      console.log(values)
      this.setState({
        bidTypes:values[0].data.length,
        bidMaterial:values[1].sum,
        bidTemplate:values[2].data
      })
    })
    
  }
  render(){
    const {bidTypes,bidMaterial,bidTemplate} = this.state;
    return (
     <>
      <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>

          <Card bordered={true}>
            <Info title="标的物" value={bidTypes+'种'} bordered />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <Info title="原始标书材料" value={bidMaterial+'件'} bordered />
          </Card>

        </Col>
        <Col span={8}>
      
          <Card bordered={true}>
            <Info title="已转化模版" value={bidTemplate+'类'} bordered />
          </Card>
        </Col>
      </Row>
  </div>
 
    </>
    )
  }
}
export default CardNumberInfo