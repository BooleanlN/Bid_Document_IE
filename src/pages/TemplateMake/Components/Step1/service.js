import {request} from '@/services/common';

export function getBidList () {
  return request.get('bid/bidList').then(res => res)
}
