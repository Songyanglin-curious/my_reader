import service from '@/utils/request'
import axios from 'axios'
export function home(){
    return service.request({
        method: 'get',
        url: '/book/home'
    })
}
export function shelf(){
    return service.request({
        method: 'get',
        url: '/book/shelf'
    })
}
export function detail(book) {
    return axios({
      method: 'get',
      url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
      params: {
        fileName: book.fileName
      }
    })
  }
export function list(){
    return service.request({
        method: 'get',
        url: '/book/list'
    })
}
