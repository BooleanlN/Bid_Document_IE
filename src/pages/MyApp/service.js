import {AppRequest} from '@/services/common';

export const getAppList = (params) => {
  return AppRequest.get('tech_document/applist')
}

export const createNewApp = (params) => {
  return AppRequest.get('tech_document/app',{params: params});
}