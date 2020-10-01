import React from 'react';
import {List} from 'antd'

class TaskList extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const getListItem = item => (
      <List.Item>
         <List.Item.Meta  
         title={<a href="https://ant.design">{item.id}</a>}  
         description={`创建时间：${item.createTime} `}
         />
         <div>类型：{item.type === 'bid' ? '标书审核':'模版审核'}</div>
      </List.Item>
    )
    return (
        <List itemLayout="horizontal"  dataSource={this.props.data} renderItem = {getListItem} > 

        </List>
    )
  }
}

export default TaskList