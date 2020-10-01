import React from 'react';
import Template from './Components/Template';


class Step2 extends React.Component{
  
  render(){
    let {dataSource} = this.props
    return (
      <div>
        <Template data={dataSource}/>
      </div>
    )
  }
}
export default Step2