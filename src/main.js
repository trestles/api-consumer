import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { store } from './store.js';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(Vuex)

Vue.use(VueRouter)

Vue.config.productionTip = false

import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import Bar from './components/Bar'

const routes = [
  { path: '/users', component: UserList },
  { path: '/users/:user_id', name: 'user-detail', component: UserDetail },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router, store,
  render: h => h(App)
}).$mount('#app')
