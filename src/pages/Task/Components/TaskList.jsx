import React from 'react';
import {List} from 'antd'

const data = [
  {
    id: '30403943',
    type:'bid',
    createTime:'2019-01-01',
  },
  {
    id: '30403943',
    type:'bid',
    createTime:'2019-01-01',
  },
  {
    id: '30403943',
    type:'bid',
    createTime:'2019-01-01',
  },
  {
    id: '30403943',
    type:'bid',
    createTime:'2019-01-01',
  },
]
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
        <List itemLayout="horizontal"  dataSource={data} renderItem = {getListItem} > 

        </List>
    )
  }
}

export default TaskList