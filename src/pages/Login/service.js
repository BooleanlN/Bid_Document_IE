import {request} from '@/services/common'

export const login = (params) => {
  return request.post('/login',{
    data: params,
  })
}