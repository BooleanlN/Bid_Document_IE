import {request} from '@/services/common'

export function DocNumberByBid(){
  return request.get('bid/sumbybid',{}).then(res => res)
}
