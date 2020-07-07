import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import scroll from 'vue-infinite-scroll'
import axios from 'axios'
import * as config from '../config'

// FontAwesome
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faMicrochip,
  faHdd,
  faServer,
  faDesktop,
  faWifi,
  faMemory,
  faGamepad,
  faDatabase,
  faNetworkWired,
  faEthernet,
  faKeyboard,
  faSdCard
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faMicrochip, faHdd, faServer, faDesktop, faWifi, faMemory, faGamepad, faDatabase, faNetworkWired, faEthernet, faKeyboard, faSdCard)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install Infinite Scroll Directive
Vue.use(scroll)

// Install Axios as Vue plugin
Vue.use({
  install(Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: config.hostname
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')