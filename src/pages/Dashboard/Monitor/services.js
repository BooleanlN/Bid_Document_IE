import {request} from '@/services/common';

export const getPureParameters = (params) => {
  return request.get('parameter/pureParameter',{
    params: params
  });
}

export function getBidList () {
  return request.get('bid/bidList').then(res => res)
}