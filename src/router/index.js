import Vue from 'vue'
import Router from 'vue-router'

const _import = name => require('@/views/' + name + '.vue').default

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: _import('Loading'),
    name: 'Loading'
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/swiper-img',
    component: _import('SwiperImg'),
    name: 'SwiperImg'
  },
  {
    path: '/swiper-animation',
    component: _import('SwiperAnimation'),
    name: 'SwiperAnimation'
  },
  {
    path: '/swiper-info',
    component: _import('SwiperInfo'),
    name: 'SwiperInfo'
  },
  {
    path: '/swiper-next',
    component: _import('SwiperNext'),
    name: 'SwiperNext'
  },
  {
    path: '/popular-science',
    component: _import('PopularScience'),
    name: 'PopularScience'
  },
  {
    path: '/save-img',
    component: _import('SaveImg'),
    name: 'SaveImg'
  },
  {
    path: '/ending',
    component: _import('Ending'),
    name: 'Ending'
  }
]

const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

