import { TagCloud } from 'ant-design-pro/lib/Charts';
import {React} from 'react';
class ParamCloud extends React.Component{
  render(){
    return (
      <TagCloud data={this.props.param} height={200}/>
    )
  }
}