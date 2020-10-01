import { Link } from 'react-router';
import { Breadcrumb } from 'antd';
import { router } from 'umi';
const routers = [
    {
      path:'/',
      component:'../layout/BasicLayout',
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
            {path:'setting',component:'BidSetting',breadcrumbName:'知识库设置'}
          ]
        },
        {
          path: 'appmng',
          routes: [
            {path:'', component: 'MyApp',breadcrumbName:'App管理'}
          ]
        },
        {
          component: '404',
        },
      ]
    },
    {
      component: '404',
    },
  ]

export default routes
  // function itemRender(route, params, routes, paths) {
  //   const last = routes.indexOf(route) === routes.length - 1;
  //   return last ? (
  //     <span>{route.breadcrumbName}</span>
  //   ) : (
  //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  //   );
  // }
  
  // return <Breadcrumb itemRender={itemRender} routes={routes} />;