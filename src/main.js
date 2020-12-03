import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueAMap from 'vue-amap'
Vue.config.productionTip = false;
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '6d852741cb773d32a7e18d643c519671',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})
Vue.prototype.getToken = function() {
  const token = localStorage.getItem("token");
  if (token === "" || token == null) {
    this.$message({
      showClose: true,
      message: "请先登录",
      type: "error",
      duration: "3000"
    });
    this.$router.push({ path: "/" });
  }
  return token;
}
Vue.prototype.setToken = function(token) {
  localStorage.setItem("token", token);
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
