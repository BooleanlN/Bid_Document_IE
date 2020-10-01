import {extend} from 'umi-request'
import router from 'umi/router';
export const request =  extend({
  prefix:'/api/',
  timeout:1000,
  headers:{
    'Content-Type':'application/json'
  },
  errorHandler:() => {
    router.push("/500")
  }
});
export const fileRequest =  extend({
  prefix:'/api/',
  timeout:1000,
  // headers:{
  //   'Content-Type':'multipart/form-data; boundary=<calculated when request is sent>'
  // }
})
export const AppRequest = extend({
  prefix: '/withoutapi/',
  timeout: 10000000
})
