import proxy from './proxy';

export default {
  history: 'hash',
  routes:[
    {
      path:'/',
      redirect: '/main'
    },
    {
      path:'/main',
      component:'../layout/BasicLayout',
      routes:[
        {
          path:'/main',
          redirect:'/main/dashboard/analysis'
        },
        {
          path:'/main/dashboard',
          routes: [
            { path:'/main/dashboard/analysis',component:'Dashboard/Analysis'},
            { path: '/main/dashboard/monitor', component: 'Dashboard/Monitor' }
          ]
        },
        {
          path:'/main/bid',
          routes:[
            {path:'select',component:'BidShow/SelectBid',breadcrumbName:'标的物'},
            {path:'detail/:id',component:'BidShow/BidDetail',breadcrumbName:'标书详情'},
            {path:'list/:id',component:'BidShow/BidList',breadcrumbName:'标书列表'},
            {path:'update',component:'BidUpdate',breadcrumbName:'标书上传'},
            {path:'setting',component:'BidSetting',breadcrumbName:'知识库设置'},
            {path:'search',component:'BidSearch',breadcrumbName:'全文检索'},
            {
              component: '404',
            },
          ]
        },
        {
          path: 'appmng',
          component:'MyApp'
        },
        {
          path:'template',
          component:'TemplateMake'
        },
        {
          path:'parameters',
          component:'Parameters'
        },
        {
          path: 'pureparameters',
          component: 'PureParameters'
        },
        {
          path: 'templategenerate',
          component: 'TemplateGenerate'
        },
        {
          path:'censor',
          component:'Censor'
        },
        {
          path:'task',
          component:'Task'
        },
        {
          name: '500',
          icon: 'smile',
          path: '/exception/500',
          component: '500',
        },
        {
          name: '403',
          icon: 'smile',
          path: '/exception/403',
          component: '403',
        },
        {
          name: '404',
          icon: 'smile',
          path: '/exception/404',
          component: '404',
        },
        {
          component: '404'
        }
      ]
    },
    {
      path:'/login',
      component:'Login'
    },
    {
      path:'/registe',
      component:'Registe'
    },
    {
      component:'404'
    }
  ],
  plugins: [
    ['umi-plugin-react', {
      antd:true,
      // dva:true
    }],
  ],
  proxy:proxy['dev']
};