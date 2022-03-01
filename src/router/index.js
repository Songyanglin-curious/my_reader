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
      redirect: '/store/shelf',
      children:[
          {
              path: 'shelf',
              component: () => import('@/views/store/StoreShelf')
          },
          {
              path: 'category',
              component: () => import('@/views/store/StoreCategory')
          },
          {
              path: 'home',
              component: () => import('@/views/store/storeHome')
          },
          {
              path: 'list',
              component: () => import('@/views/store/StoreList')
          },
          {
              path: 'detail',
              component: () => import('@/views/store/StoreDetail')
          },
          {
              path: 'speaking',
              component: () => import('@/views/store/StoreSpeaking')
          },
      ]
  },

]

const router = new VueRouter({
  routes
})

export default router
