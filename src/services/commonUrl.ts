import {request} from './common';

/**
 * 获取标的物分类类目
 */
export function getBidList () {
  return request.get('bid/bidList');
}

/**
 * 删除参数
 * @param {*} data 
 */
export const removeParameter = (data) => {
  return request.post('parameter/remove', {
    data: data
  });
}

/**
 * 删除筛选后的参数
 * @param {*} data 
 */
export const removeFilterParameter = (data) => {
  return request.post('parameter/pureParameter/remove', {
    data: data
  });
}