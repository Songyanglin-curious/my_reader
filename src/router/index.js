import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ebook'
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
  }

]

const router = new VueRouter({
  routes
})

export default router
