import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import store from './modules/store'
import getters from './getters'
import actions from './aciotns'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        book,
        store
    },
    getters,
    actions
})
