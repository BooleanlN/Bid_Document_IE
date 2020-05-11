import React from 'react'
import {Skeleton,PageHeader,Card,Col,Divider,Tabs} from 'antd'
import styles from './styles.less'
import CensorList from './Components/CensorList'

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);
const {TabPane} = Tabs;
class Censor extends React.Component{
  state = {
    loading:true
  }
  componentDidMount(){
    this.getTaskList()
  }
  getTaskList(){
    setTimeout(()=>{
      this.setState({
        loading:false
      })
    },1000)
  }
  render(){
    return (
      <>
      <div>
        <Card bordered={false}>
          <Col sm={12} xs={24}>
            <Info title="我的待办" value="2个任务" bordered />
          </Col>
          <Col sm={12} xs={24}>
            <Info title="已完成" value="8个任务" bordered />
          </Col>
        </Card>
      </div>
      <Divider></Divider>
      <div>
      <Card style={{
              marginTop: 24,
            }} bordered={false}>
        <Tabs defaultActiveKey="1" size="small" style={{ marginBottom: 32 }}>
            <TabPane tab="我的待办" key="1">
            <Skeleton loading={this.state.loading} >
                <CensorList/>
            </Skeleton> 
            </TabPane>
            <TabPane tab="已完成" key="2">
              <Skeleton loading={this.state.loading} >
                <CensorList/>
            </Skeleton> 
            </TabPane>
        </Tabs>
        
      </Card>
      </div>
      </>
    )
  }
}
export default Censor