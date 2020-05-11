import React from 'react'
import { List, message, Avatar, Spin,Skeleton } from 'antd';
import Link from 'umi/link'
class BidList extends React.Component{
  state = {
    bidId:this.props.match.params.id,
    page:1,
    pageSize:10,
    bids:[],
    loading:true
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        loading:false
      })
    },1000)
    // 请求该id对应的标的物标书列表
    this.setState({
      bids:[
        {
          name:'xxxx',
          len:800,
          format:'pdf',
          modifyTime:'2019-01-01',
          createTime:'2018-02-02',
          id:1
        },{
          name:'xxxx',
          len:800,
          format:'pdf',
          modifyTime:'2019-01-01',
          createTime:'2018-02-02',
          id:2
        },
        {
          name:'xxxx',
          len:800,
          format:'pdf',
          modifyTime:'2019-01-01',
          createTime:'2018-02-02',
          id:3
        }
      ]
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
        <List.Item.Meta title={<Link to={"/bid/detail/"+item.id}>{item.name}</Link>} description={"创建时间："+item.createTime + "\t修改时间：" + item.modifyTime}/>
        <div>{item.len}</div>
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