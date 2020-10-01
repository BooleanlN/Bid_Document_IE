import {request} from '@/services/common'

export function getBidNumber(){
  return request.get('bid/sumtemplate',{})
}
export function BidDocNumber(){
  return request.get('bid/sumdocs',{})
}
/**
 * 获取标的物原始标书个数
 */
export function DocNumberByBid(){
  return request.get('bid/sumbybid',{})
}