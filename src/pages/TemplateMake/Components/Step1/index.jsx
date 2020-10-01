import React from 'react';
import Cascader from '@/components/Cascader';
import {getBidList} from './service';
class Step1 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      value:[],
      bids:[],
      bidType:''
      // dataSource:[]
    }
    console.log(props)
  }
  componentDidMount(){
    this.doGetData()
  }
  doGetData = async () => {
    const res = await getBidList();
    console.log(res);
    this.setState({
      bids: res.data,
      fuck: true
    })
  }
  render(){
    return (
      <>
        <div>
          <div style={{marginTop: '100px'}}>
            <label htmlFor="bid">模版选择：</label>
            <Cascader optionsData={this.state.bids} setOption={this.props.setOption} option={this.props.bidType}/>
          </div>
        </div>
      </>
    )
  }
}
export default Step1