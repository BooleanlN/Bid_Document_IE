import {request,AppRequest} from '@/services/common';

/**
 * 获取原始标书数目
 * @param {categorys} params 
 */
export function checkInfo(params){
  return request.get('template/check',{
    params:params
  })
}
/**
 * 参数抽取结果
 * @param {*} params 
 */
export function getBidParameters(params){
  return request.get('parameter/list',{
    params: params
  });
}

/**
 * 获取聚合结果
 * @param {*} params 
 */
export const getPureParameters = (params) => {
  return request.get('parameter/pureParameter',{
    params: params
  });
}

/**
 * 模版结果
 * @param {*} params 
 */
export const getTemplate = (params) => {
  return request.get('/parameter/cloudTemplate', {
    params: params
  });
}

/**
 * 触发参数构建
 * @param {*} params 
 */
export const triggerParameter = (params,data) => {
  return AppRequest.post('tech_document/parameter', {
    params: params,
    data: data
  });
}

/**
 * 触发参数聚合
 * @param {} params 
 */
export const triggerParameterCluster = (params,data) => {
  return AppRequest.post('tech_document/pureParameter', {
    params: params,
    data: data
  });
}

/**
 * 模版构建
 * @param {*} params 
 */
export const triggerTemplate = (params,data) => {
  return AppRequest.post('tech_document/addTemplate', {
    params: params,
    data: data
  });
}

/**
 * 更新模版
 * @param {*} data 
 */
export const updateTemplate = (data) => {
  return AppRequest.post('tech_document/template_gene', {
    data: data
  })
}

/**
 * 删除指定BidParam
 * @param {*} data 
 */
export function removeBidParameters(data) {
  return request.post('parameter/remove', {
    data: data
  })
}

/**
 * 更新指定BidParam
 * @param {*} data 
 */
export function updateBidParameter(data) {
  return request.post('parameter/update', {
    data: data
  })
}

/**
 * 删除BidFilterParam
 * @param {*} data 
 */
export function removeBidFilterParameter(data) {
  return request.post('parameter/pureParameter/remove', {
    data: data
  });
}

export function updateBidFilterParameter(params) {
  return request.post('parameter/pureParameter/update', {
    data: data
  });
}