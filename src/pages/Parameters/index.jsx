import React from 'react'
import { Select,Modal,Button} from 'antd';
const { Option } = Select;
import {getBidList,getBidParameters,removeBidParameters,updateBidParameter} from './service';
import TableEditable from '@/components/TableEditable';
import Cascader from '@/components/Cascader';
import { update } from 'lodash';
class Parameters extends React.Component{
  state = {
    visible:false,
    param:{
      parameter_type:'',
      parameter_name:'',
      time:'',
      parameter_value:''
    },
    parameters:[],
    bids:[],
    bidType:''
  }
  setOption = async (value,selected) => {
    this.setState({
      bidType: value
    });
    const res = await getBidParameters({
      mainCategory: value[0],
      subCategory: value[1],
      detailCategory: value[2]
    });
    this.setState({
      parameters: res.data
    })
  }
  handleChange = (e)=>{
    this.setState({
      parameters:vals[e]
    });
  }
  onChange = () =>{

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
  handleGenerate = record => {

  }
  componentDidMount() {
    this.doGetData();
  }
  doGetData = async () => {
    const res = await getBidList();
    this.setState({
      bids: res.data,
      fuck: true
    })
  }
  setColumnsData = (newData, columnData) => {
    this.setState({ parameters: newData });
    updateBidParameter(columnData);
  }
  handleDeleteRow = (record) => {
    const newData = [...this.state.parameters]
    const index = newData.findIndex(item => record['parameterId'] == item['parameterId']);
    if (index == -1) return;
    newData.splice(index, 1);
    this.setState({ parameters: newData });
    removeBidParameters(record);
  }
  render(){
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
        ellipsis: true,
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
      // },{
      //   title:'操作',
      //   key:'operation',
      //   render: (text, record) => (
      //     <div>
      //       <a style={{marginRight:10}} onClick={(ev) => {this.handleClick(ev,record)}}>查看详情</a>
      //       <a onClick={(ev) => {this.handleDelete(ev,record)}}>删除</a>
      //     </div>
      //   ),
      // }
    ]
    let {visible,param,parameters} = this.state
    return (
      <>
      <Cascader optionsData={this.state.bids} setOption={this.setOption} option={this.state.bidType} />
      {/* <Table columns={columns} dataSource={parameters} onChange={this.onChange} /> */}
      <TableEditable data={parameters} columns={columns} 
      keyColumn="parameterId" setColumnsData={this.setColumnsData} 
      deleteRow={this.handleDeleteRow}
      />
      <Button onClick={this.handleGenerate} type='primary' style={{marginTop:'20px'}}> 参数更新/生成</Button>
      <Modal
          title="参数详情"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText='关闭'
          okText='确认'
        >
          <p>参数类型：{param.parameterType}</p>
          <p>参数名称：{param.parameterName}</p>
          <p>参数值：{param.parameterValue}</p>
          <p>生成时间：{param.time}</p>
        </Modal>
      </>
    )
  }
}
export default Parameters