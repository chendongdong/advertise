import Vue from 'vue'
import Router from 'vue-router'

// const _import = name => require('@/views/' + name + '.vue').default

var Loading = r => require.ensure([], () => r(require('@/views/Loading')), 'Loading')
var SwiperImg = r => require.ensure([], () => r(require('@/views/SwiperImg')), 'SwiperImg')
var SwiperNext = r => require.ensure([], () => r(require('@/views/SwiperNext')), 'SwiperNext')
var PopularScience = r => require.ensure([], () => r(require('@/views/PopularScience')), 'PopularScience')
var Ending = r => require.ensure([], () => r(require('@/views/Ending')), 'Ending')

Vue.use(Router)

export var constantRouterMap = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Loading,
    name: 'Loading'
  },
  {
    path: '/swiper-img',
    component: SwiperImg,
    name: 'SwiperImg'
  },
  {
    path: '/swiper-next',
    component: SwiperNext,
    name: 'SwiperNext'
  },
  {
    path: '/popular-science',
    component: PopularScience,
    name: 'PopularScience'
  },
  {
    path: '/ending',
    component: Ending,
    name: 'Ending'
  }
]

var router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

