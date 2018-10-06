import Vue from 'vue'
import Router from 'vue-router'

// const _import = name => require('@/views/' + name + '.vue').default

const Loading = r => require.ensure([], () => r(require('@/views/Loading')), 'Loading')
const SwiperImg = r => require.ensure([], () => r(require('@/views/SwiperImg')), 'SwiperImg')
const SwiperNext = r => require.ensure([], () => r(require('@/views/SwiperNext')), 'SwiperNext')
const PopularScience = r => require.ensure([], () => r(require('@/views/PopularScience')), 'PopularScience')
const Ending = r => require.ensure([], () => r(require('@/views/Ending')), 'Ending')

Vue.use(Router)

export const constantRouterMap = [
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

const router = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

