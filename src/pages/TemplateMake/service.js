import {request} from '@/services/common';

export async function fakeSubmitForm(params) {
  return request.post('/api/forms', {
    data: params,
  });
}
export const getTemplate = (params) => {
  return request.get('/parameter/cloudTemplate', {
    params: params
  });
}