import {request,fileRequest,AppRequest} from '@/services/common'

export function DocNumberByBid(){
  return request.get('bid/sumbybid',{})
}
export function doPostPdf(param){
  return fileRequest.post('bid/uploadDocEs',{
    data:param,
    requestType:'form'
  })
}
export function getBidList () {
  return request.get('bid/bidList');
}

export function addNewBid (bidInfo) {
  return request.post('bid/addBid', {
    data:bidInfo,
    requestType: 'json'
  })
}

export function editBidInfo (bidInfo) {
  return request.post('bid/editBid', {
    data: bidInfo,
    requestType: 'json'
  })
}

export function generate(params) {
  return AppRequest.post('tech_document/addTemplate',{
    params: params
  });
}

export function deleteBid(data) {
  return request.post('bid/removeBid', {
    data: data
  })
}