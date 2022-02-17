import CreateAPI from "vue-create-api";
import Vue from 'vue'
import Toast from '@c/common/Toast'
import Popup from '@c/common/Popup'
import GroupDialog from '@c/shelf/ShelfGroupDialog'
Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.createAPI(GroupDialog,true)
// create-api渲染的dom 和app同级，适合做全屏的组件
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
        simpleToast (text) {
            const toast = this.toast({
                text: text
            })
            toast.show()
            toast.updateText(text)
        },
        dialog(settings){
            return this.$createGroupDialog({
                $props: settings
            })
        }
    }
})