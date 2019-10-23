import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


export default  new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes :[
    //配置默认路由
    {path:'',redirect:'home'},
    //配置home页面路由也就是书架页面
    {path:'/home',name:'home',component:()=>import('@/views/Home')},
    //配置搜索页面的路由
    {path:'/search',name:'search',component:()=>import('@/views/search')},
    // 配置小说详情页面路由
    {path:'/info:id',name:"info",component:()=>import('@/views/read/info')},
    // 配置小说内容页面
    {path:'/read:link',name:"read",component:()=>import('@/views/read/read')},
    // 章节列表页面
    {path:'/catas:id',name:"catas",component:()=>import('@/views/cata/cata')}
  ]
})


