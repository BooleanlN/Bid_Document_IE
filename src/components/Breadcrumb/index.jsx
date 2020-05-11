import React from 'react'
import { Breadcrumb } from 'antd';

class Breads extends React.Component{
  state = {
    routes:this.props.routes
  }
  render(){
    console.log(this.state.routes)
    const breads = (
      <Breadcrumb>
        {
          this.state.routes.map(route => (
            <Breadcrumb.Item>
              <a href={route.path}>{route.label}</a>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    ) 
    return breads
  }
}
export default Breads