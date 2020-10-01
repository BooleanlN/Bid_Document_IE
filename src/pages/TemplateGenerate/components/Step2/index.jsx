import React, { useState, useEffect } from 'react';
import TableEditable from '@/components/TableEditable';
import { Button,Modal,Progress } from 'antd';
import {getBidParameters, triggerParameter,removeBidParameters,updateBidParameter} from '../../service';

const Step2 = (props) => {
  const [datasource, setdatasource] = useState([]);
  const [visible, setvisible] = useState(false);
  const [param, setparam] = useState({});
  const [showtable, setshowtable] = useState(false);
  const [percent, setpercent] = useState(3);
  const handleExtract = () => {
    triggerParameter({pattern: encodeURIComponent(props.info.pattern)},{
      mainCategory: props.info.mainCategory,
      subCategory: props.info.subCategory,
      detailCategory: props.info.detailCategory
    });
    setshowtable(true);
    const timer = setInterval(async () => {
      setpercent(percent + 3);
      const res = await getBidParameters({
        mainCategory: props.info.mainCategory,
        subCategory: props.info.subCategory,
        detailCategory: props.info.detailCategory
      });
      if(res.data && res.data.length){
        setpercent(100);
        clearInterval(timer);
        setdatasource(res.data);
      }
    },30000);
  }
  const handleClick = (e,record) => {
    setparam(record);
    setvisible(true);
  }
  const handleDeleteRow = (record) => {
    const newData = [...datasource]
    const index = newData.findIndex(item => record['parameterId'] == item['parameterId']);
    if (index == -1) return;
    newData.splice(index, 1);
    setdatasource(newData);
    removeBidParameters(record);
  }
  const setColumnsData = (newData, columnData) => {
    setdatasource(newData);
    updateBidParameter(columnData);
  }
  const columns = [
    {
      title:'参数ID',
      key:'parameterId',
      dataIndex:'parameterId',
      ellipsis: true,
      editable: false
    },
    {
      title:'参数名称',
      dataIndex:'parameterName',
      editable: true
    },{
      title:'参数值',
      dataIndex:'parameterValue',
      editable: true
    },{
      title:'参数类型',
      dataIndex:'parameterType',
      editable: true
    },{
      title:'投标时间',
      dataIndex:'time',
      key:'time',
      ellipsis: true,
      editable: true
    },{
      title:'所属标的物',
      dataIndex:'parameterBelongingTo',
      ellipsis: true,
      editable: true
    },{
      title:'所属标包',
      dataIndex:'packetIndex',
      ellipsis: true,
      editable: true
    }
  ];
  return ( 
    <>
      <Button type='primary' onClick={handleExtract}>开始抽取</Button>
      <div style={{display:showtable ? 'block' : 'none'}}>
        <Progress percent={percent} />
        <TableEditable data={datasource} columns={columns} keyColumn="parameterId" 
        setColumnsData={setColumnsData} 
        deleteRow={handleDeleteRow}/>
        {/* <Table columns={columns} dataSource={datasource}/> */}
        <Modal
          title="参数详情"
          visible={visible}
          onOk={() => setvisible(false)}
          onCancel={() => setvisible(false)}
          cancelText='关闭'
          okText='确认'
        >
          <p>参数类型：{param.parameterType}</p>
          <p>参数名称：{param.parameterName}</p>
          <p>参数值：{param.parameterValue}</p>
          <p>生成时间：{param.time}</p>
        </Modal>
      </div>
    </>
  );
}
 
export default Step2;