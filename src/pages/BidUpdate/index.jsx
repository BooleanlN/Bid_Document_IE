import React from 'react'
import UploadBid from './Components/UploadBid'
import HeaderInfo from './Components/HeaderInfo'
import BlankLayout from '@/layout/BlankLayout'
class BidUpdate extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      bidTypes:[
        {value:'coal_miner',label:'采煤机'}
      ]
    }
  }
  render(){
    return (
      <BlankLayout>
        <div style={{marginBottom:'20px'}}>
          <HeaderInfo bidTypes={this.state.bidTypes}/>
        </div>
      <UploadBid/>
      </BlankLayout>
    )
  }
}
export default BidUpdate