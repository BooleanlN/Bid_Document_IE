import React from 'react'
import { Table} from 'antd';
import { Modal} from 'antd';
import {getPureParameters} from './service';
import {getBidList} from '@/services/commonUrl';
import Cascader from '@/components/Cascader';
class Parameters extends React.Component{
  state = {
    visible:false,
    param:{
      parameterName:'',
      parameterRate:'',
      parameterAppearTime:'',
      parameterSubTitle:''
    },
    parameters:[],
    bids:[],
    bidType:''
  }
  setOption = async (value,selected) => {
    this.setState({
      bidType: value
    });
    const res = await getPureParameters({
      mainCategory: value[0],
      subCategory: value[1],
      detailCategory: value[2]
    });
    this.setState({
      parameters: res.data
    })
  }
  handleClick = (e,record) => {
    console.log(record)
    this.setState({
      visible:true,
      param:record
    })
  }
  handleOk = () => {
    this.setState({
      visible:false
    })
  }
  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }
  handleDelete = e => {

  }
  componentDidMount() {
    this.doGetData();
  }
  doGetData = async () => {
    const res = await getBidList();
    this.setState({
      bids: res.data
    })
  }
  render(){
    const columns = [
      {
        title:'参数ID',
        dataIndex:'parameterId',
        key:'parameter_id',
        ellipsis: true,
      },
      {
        title:'参数名称',
        dataIndex:'parameterName',
        key:'parameter_name',
        ellipsis: true,
      },{
        title:'参数出现频次',
        dataIndex:'parameterRate',
        key:'parameter_rate',
        ellipsis: true,
      },{
        title:'参数类型',
        dataIndex:'parameterType',
        key:'parameter_type',
        ellipsis: true,
      },{
        title:'投标时间(latest)',
        dataIndex:'parameterAppearTime',
        key:'parameter_appear_time',
        ellipsis: true,
      },{
        title:'所属标的物',
        dataIndex:'bidName',
        key:'bid_name',
        ellipsis: true,
      },{
        title:'所属类目',
        dataIndex:'parameterSubTitle',
        key:'parameter_sub_title',
        ellipsis: true,
      }
    ]
    let {visible,param,parameters} = this.state
    return (
      <>
      <Cascader optionsData={this.state.bids} setOption={this.setOption} option={this.state.bidType}/>
      <Table columns={columns} dataSource={parameters} onChange={this.onChange} />
      <Modal
          title="参数详情"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText='关闭'
          okText='确认'
        >
          <p>参数名称：{param.parameterName}</p>
          <p>参数出现频次：{param.parameterRate}</p>
          <p>参数出现时间：{param.parameterAppearTime}</p>
          <p>参数类目：{param.parameterSubTitle}</p>
        </Modal>
      </>
    )
  }
}
export default Parameters