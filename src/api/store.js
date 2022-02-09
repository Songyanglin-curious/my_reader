import service from '@/utils/request'

export function home(){
    return service.request({
        method: 'get',
        url: '/book/home'
    })
}