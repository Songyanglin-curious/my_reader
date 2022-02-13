import CreateAPI from "vue-create-api";
import Vue from 'vue'
import Toast from '@c/common/Toast'
import Popup from '@c/common/Popup'
Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)

Vue.mixin({
    methods: {
        toast (settings) {
            return this.$createToast({
                $props: settings
            })
        },
        popup (settings) {
            return this.$createPopup({
                $props: settings
            })
        },
    }
})