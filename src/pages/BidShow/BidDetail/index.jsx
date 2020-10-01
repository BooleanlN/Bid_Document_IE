import React from 'react'
import DocumentShow from './Components/DocumentShow'
class BidDetail extends React.Component{
  render(){
    return (
      <div style={{width:'50%',margin:'0 auto'}}>
        <DocumentShow filename={this.props.match.params.id}/>
      </div>
    )
  }
}
export default BidDetail