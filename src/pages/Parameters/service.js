import {request} from '@/services/common';

export function getBidList () {
  return request.get('bid/bidList').then(res => res)
}
export function getBidParameters(params){
  return request.get('parameter/list',{
    params: params
  });
}
export function removeBidParameters(data) {
  return request.post('parameter/remove', {
    data: data
  })
}

export function updateBidParameter(data) {
  return request.post('parameter/update', {
    data: data
  })
}