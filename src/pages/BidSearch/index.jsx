import React,{useState} from 'react'
import { Input, AutoComplete } from 'antd';
import { SelectProps } from 'antd/es/select';

class BidSearch extends React.Component{
  state = {
    options:['a','ab','abb']
  }
  onSelect(){

  }
  handleSearch(){

  }
  render(){
    const {options} = this.state
    return (
      <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={this.onSelect}
      onSearch={this.handleSearch}
    >
      <Input.Search size="large" placeholder="检索字段" enterButton />
    </AutoComplete>
    )
  }
}

export default BidSearch