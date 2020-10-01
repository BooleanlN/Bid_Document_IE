import {request} from '@/services/common';
export function getBidDocList(params){
  return request.get('bid/listdocbybid',{
    params:params
  })
}