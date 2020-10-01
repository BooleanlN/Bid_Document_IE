import React from 'react'
import UploadBid from './Components/UploadBid'
// import HeaderInfo from './Components/HeaderInfo'
import BlankLayout from '@/layout/BlankLayout'
import BidInfoTable from './Components/BidInfoTable'
class BidUpdate extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <BlankLayout>
        <UploadBid/>
        <div style={{marginTop:'20px'}}>
          <BidInfoTable/>
        </div>
      </BlankLayout>
    )
  }
}
export default BidUpdate