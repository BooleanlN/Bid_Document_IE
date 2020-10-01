import { Table,Popconfirm } from 'antd';
import {getBidList, generate, deleteBid} from '../service';
import React, { useState,useEffect } from 'react';
import BidEditModal from './BidEditModal';
const { Column } = Table;
const BidInfoTable = () => {
  const [bidList, setBidList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [originalValue, setOriginalValue] = useState({});
  useEffect(() => {
    const requestBidList = async () => {
      const bidListData = await getBidList();
      setBidList(bidListData.data);
    };
    requestBidList();
  },[])

  const handleDelete = (record) => {
    const index = bidList.findIndex(item => item.bidId == record.bidId);
    if (index == -1 )return;
    const newData = [...bidList];
    newData.splice(index,1);
    setBidList(newData);
    deleteBid(record)
  };
  const hiddenEdit = () => {
    setVisible(false)
  }
  const handleEdit = (record) => {
    setVisible(true);
    setOriginalValue(record);
  };
  const setBidInfo = (change) => {
    setOriginalValue({...originalValue, ...change});
    const index = bidList.findIndex(item => item.bidId == originalValue.bidId);
    if (index == -1 )return;
    const newData = [...bidList];
    newData.splice(index,1,{
      ...originalValue,
      ...change
    });
    setBidList(newData);
  }
  const handleGenerate = (record) => {
    setGenerating(true);
    generate({bidId: record.bidId})
    .then(res => setGenerating(false))
    .catch(err => setGenerating(false))
  }
  return (
    <>
    <Table dataSource={bidList} rowKey="bidId">
      <Column title="id" dataIndex="bidId"/>
      <Column title="名称" dataIndex="bidName" />
      <Column title="描述" dataIndex="bidDesc"/>
      <Column title="大类" dataIndex="mainCategory" />
      <Column title="中类" dataIndex="subCategory"  />
      <Column title="小类" dataIndex="detailCategory" />
      <Column title="创建时间" dataIndex="createTime" />
      <Column title="修改时间" dataIndex="modifyTime" />
      <Column title="操作"  render={(text, record) => {
        return (
          <div>
            {/* <a onClick={() => handleGenerate(record)} style={{marginRight: 10}}>模版更新/生成</a> */}
            <a onClick={() => handleEdit(record)} style={{marginRight: 10}}>修改</a>
            <Popconfirm onConfirm={() => handleDelete(record)}  okText='确认' cancelText='取消' title="确认删除">
              <a>删除</a>
            </Popconfirm>
           
          </div>
        )
      }}/>
    </Table>
    <BidEditModal visible={visible} hiddenEdit={hiddenEdit} bidInfo={originalValue} setBidInfo={setBidInfo}/>
    </>
  )
}
export default BidInfoTable