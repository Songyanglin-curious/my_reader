import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
      path: '/ebook',
      component: () => import('@/views/ebook'),
      children:[
        {
            path: ':fileName',
            component: () => import('@c/ebook/EbookReader.vue')
        }
      ]
  },
  {
      path: '/store',
      component: () => import('@/views/store/'),
      redirect: '/store/home',
      children:[
          {
              path: 'home',
              component: () => import('@/views/store/storeHome')
          }
      ]
  }

]

const router = new VueRouter({
  routes
})

export default router
