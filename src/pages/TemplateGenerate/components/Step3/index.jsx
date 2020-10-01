import React, { useState, useEffect } from 'react';
import { Button,Table,message,Progress } from 'antd';
import TableEditable from '@/components/TableEditable';
import {getPureParameters ,triggerParameterCluster,updateBidFilterParameter,removeBidFilterParameter} from '../../service';

const Step3 = (props) => {
  const [datasource, setdatasource] = useState([]);
  const [visible, setvisible] = useState(false);
  const [param, setparam] = useState({});
  const [showtable, setshowtable] = useState(false);
  const [percent, setpercent] = useState(3);
  const handleExtract = () => {
    triggerParameterCluster({ similarity: props.info.similaritymethod,
    titleThreshold: props.info.titlethreshold, parameterThreshold: props.info.parameterthreshold },{
      mainCategory: props.info.mainCategory,
      subCategory: props.info.subCategory,
      detailCategory: props.info.detailCategory
    });
    setshowtable(true);
    const timer = setInterval(async () => {
      setpercent(percent + 3);
      const res = await getPureParameters({
        mainCategory: props.info.mainCategory,
        subCategory: props.info.subCategory,
        detailCategory: props.info.detailCategory
      });
      if (res.data && res.data.length) {
        setpercent(100);
        clearInterval(timer);
        setdatasource(res.data);
      }
    },30000)
  }
  const setColumnsData = (newData, columnData) => {
    setdatasource(newData);
    updateBidFilterParameter(columnData);
  }
  const handleDeleteRow = (record) => {
    const newData = [...datasource]
    const index = newData.findIndex(item => record['parameterId'] == item['parameterId']);
    if (index == -1) return;
    newData.splice(index, 1);
    setdatasource(newData);
    removeBidFilterParameter(record);
  }
  const columns = [
    {
      title:'参数ID',
      dataIndex:'parameterId',
      key:'parameter_id',
      ellipsis: true,
      editable: false
    },
    {
      title:'参数名称',
      dataIndex:'parameterName',
      key:'parameter_name',
      editable: true
    },{
      title:'参数出现频次',
      dataIndex:'parameterRate',
      key:'parameter_rate',
      ellipsis: true,
      editable: true
    },{
      title:'参数类型',
      dataIndex:'parameterType',
      key:'parameter_type',
      editable: true
    },{
      title:'投标时间(latest)',
      dataIndex:'parameterAppearTime',
      key:'parameter_appear_time',
      ellipsis: true,
      editable: true
    },{
      title:'所属标的物',
      dataIndex:'bidName',
      key:'bid_name',
      ellipsis: true,
      editable: true
    },{
      title:'所属类目',
      dataIndex:'parameterSubTitle',
      key:'parameter_sub_title',
      ellipsis: true,
      editable: true
    }
  ]
  return ( 
    <>
      <Button type='primary' onClick={handleExtract}>开始聚合</Button>
      <div style={{display:showtable ? 'block' : 'none'}}>
        <Progress percent={percent} />
        {/* <Table columns={columns} dataSource={datasource}/> */}
        <TableEditable columns={columns} data={datasource} keyColumn="parameterId" setColumnsData={setColumnsData} 
      deleteRow={handleDeleteRow}/>
      </div>
    </>
  );
}
 
export default Step3;