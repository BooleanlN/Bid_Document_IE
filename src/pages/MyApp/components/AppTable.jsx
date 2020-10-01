import React, {useState,useEffect} from 'react';
import {Table,Tag} from 'antd';
import {getAppList} from '../service'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'APPID',
    dataIndex: 'app_id',
    key: 'appid'
  }, {
    title: '名称',
    dataIndex: 'app_name',
    key: 'appname'
  }, {
    title: 'TOKEN',
    dataIndex: 'app_token',
    key: 'apptoken'
  }, {
    title: '状态',
    dataIndex: 'app_status',
    key: 'appstatus',
  render:app_status => (<> <Tag color={app_status == 0 ? 'green' : 'volcano'}>{app_status == 0 ? '启用' : '禁用' }</Tag> </>)
  }, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'createTime'
  }
];
const dataSource = [
  {
    id: 1,
    app_id: '342345235',
    app_token: '1232432532xsfsd',
    app_name: '神华',
    app_status: 0,
    create_time: '2019-01-01'
  },
  {
    id: 2,
    app_id: '342345235',
    app_token: '1232432532xsfsd',
    app_name: '神华ss',
    app_status: 1,
    create_time: '2019-01-01'
  }
]
const AppTable = () => {
  const [appList,setAppList] = useState([])
  const requestAppList = async () => {
    const appList = await getAppList();
    setAppList(appList.data);
  }
  useEffect(() => {
    requestAppList();
  },[])
  return (
    <Table columns={columns} dataSource={appList}></Table>
  );
};
export default AppTable;