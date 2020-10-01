import {request,AppRequest} from '@/services/common';
/**
 * 获取筛选后的参数
 * @param {*} params 
 */
export const getPureParameters = (params) => {
  return request.get('parameter/pureParameter',{
    params: params
  });
}

export const generatePureParameters = (params) => {
  return AppRequest.post('tech_document/pureParameter',{
    params: params
  });
}