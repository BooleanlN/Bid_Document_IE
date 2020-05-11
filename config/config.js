import proxy from './proxy';

export default {
  hash:true,
  routes:[
    {
      path:'/',
      component:'../layout/BlankLayout',
      routes:[
        {
          path:'/',
          component:'../layout/BasicLayout',
          // redirect:'/dashboard/analysis',
          routes:[
            {
              path:'/',
              redirect:'/dashboard/analysis'
            },
            {
              path:'/dashboard',
              routes: [
                { path:'/dashboard/analysis',component:'Dashboard/Analysis'},
                { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
              ]
            },
            {
              path:'bid',
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
              path:'template',
              component:'TemplateMake'
            },
            {
              path:'templateFix',
              component:'TemplateFix'
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
          ]
        }
      ]
    },
    {
      component: '404',
    },
  ],
  plugins: [
    ['umi-plugin-react', {
      antd:true
    }],
  ],
  proxy:proxy['dev']
};