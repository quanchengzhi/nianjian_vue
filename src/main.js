import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/init.css"
import "./assets/js/rem.js"
import 'vant/lib/index.css';
import axios from 'axios'
import {DatetimePicker} from "vant";
Vue.use(DatetimePicker);
import {Area} from 'vant';
Vue.use(Area);
import { Uploader } from 'vant';
Vue.use(Uploader);
import { Image as VanImage } from 'vant';
Vue.use(VanImage);
import { Popup } from 'vant';
Vue.use(Popup);
Vue.prototype.axios = axios
Vue.config.productionTip = false;

//设置cookie,放在main.js
Vue.prototype.setCookie = function (c_name, value, expiredays) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
//获取cookie
Vue.prototype.getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};
//删除cookie
Vue.prototype.delCookie = function (c_name) {
  this.setCookie(c_name, "", -1);
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
