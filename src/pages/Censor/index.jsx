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
const data = [
  {
    id: '30797877',
    type:'bid',
    createTime:'2020-07-09',
  },
  {
    id: '30797876',
    type:'bid',
    createTime:'2020-07-09',
  },
  {
    id: '30797878',
    type:'bid',
    createTime:'2020-08-01',
  },
  {
    id: '30797879',
    type:'bid',
    createTime:'2020-08-01',
  },
];
const finishData = [
  {
    id: '30797875',
    type:'bid',
    createTime:'2020-07-10',
  },
  {
    id: '30797874',
    type:'bid',
    createTime:'2020-08-01',
  }
]
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
            <Info title="我的待办" value="4个任务" bordered />
          </Col>
          <Col sm={12} xs={24}>
            <Info title="已完成" value="2个任务" bordered />
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
                <CensorList data={data}/>
            </Skeleton> 
            </TabPane>
            <TabPane tab="已完成" key="2">
              <Skeleton loading={this.state.loading} >
                <CensorList data={finishData}/>
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