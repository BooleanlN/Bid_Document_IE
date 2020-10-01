import React from 'react'
import { List, Spin,Skeleton } from 'antd';
import Link from 'umi/link'
import {getBidDocList} from './service'
class BidList extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      bids:[],
      bidType:this.props.match.params.id
    }
  }
  componentDidMount(){
    this.doGetData()
    // 请求该id对应的标的物标书列表
  }
  doGetData = () => {
    getBidDocList({bidname:this.props.match.params.id}).then(res => {
      if(res.code == 20000){
        let data = res.templates.map(item => {
          return {
            name:item.docTitle,
            createTime:item.createTime,
            modifyTime:item.lastModifyTime,
            format:'pdf',
          }
        })
        this.setState({
          bids:data,
          loading:false
        })
      }
    })
  }
  handleNextPage(){

  }
  handlePrevPage(){
    
  }
  handleSelect(){

  }
  render(){
    const renderItem = (item) =>(
      <List.Item key={item.id}>
        <Skeleton loading={this.state.loading} active avatar>
        <List.Item.Meta title={<Link to={"/main/bid/detail/"+item.name}>{item.name}</Link>} description={"创建时间："+item.createTime + "\t修改时间：" + item.modifyTime}/>
        {/* <div>{item.len}</div> */}
        </Skeleton>
      </List.Item>
    )
    return (
      <div>
        <List dataSource={this.state.bids} renderItem={renderItem}>
          {this.state.loading  && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </div>
    )
  }
}
export default BidList