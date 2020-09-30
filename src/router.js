import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
        path: '/',
        name: 'login',
        meta: {
            title: "登录"
        },
        component: () => import('./components/login.vue')
    }, {
        path: '/index',
        name: 'index',
        meta: {
            title: "年检"
        },
        component: () => import('./components/index.vue')
    }, {
        path: '/commonQuestions',
        name: 'commonQuestions',
        meta: {
            title: "常见问题"
        },
        component: () => import('./components/commonQuestions.vue')
    }, {
        path: '/editCar',
        name: 'editCar',
        meta: {
            title: "编辑车辆信息"
        },
        component: () => import('./components/editCar.vue')
    }, {
        path: '/myCoupons',
        name: 'myCoupons',
        meta: {
            title: "我的优惠券",
            requireAuth:true
        },
        component: () => import('./components/myCoupons.vue')
    }, {
        path: '/handle',
        name: 'handle',
        meta: {
            title: "确认订单",
            requireAuth:true
        },
        component: () => import('./components/handle.vue')
    }, {
        path: '/station',
        name: 'station',
        meta: {
            title: "选择检测站",
            requireAuth:true
        },
        component: () => import('./components/station.vue')
    }, {
        path: '/orders',
        name: 'orders',
        meta: {
            title: "我的订单",
            requireAuth:true
        },
        component: () => import('./components/orders.vue')
    }, {
        path: '/exemptDetails',
        name: 'exemptDetails',
        meta: {
            title: "六年免检",
            requireAuth:true
        },
        component: () => import('./components/exemptDetails.vue')
    }, {
        path: '/visitDetails',
        name: 'visitDetails',
        meta: {
            title: "上门接车代办",
            requireAuth:true
        },
        component: () => import('./components/visitDetails.vue')
    }, {
        path: '/stationDetails',
        name: 'stationDetails',
        meta: {
            title: "站内师傅代办",
            requireAuth:true
        },
        component: () => import('./components/stationDetails.vue')
    }, {
        path: '/supplementInfo',
        name: 'supplementInfo',
        meta: {
            title: "补交资料",
            requireAuth:true
        },
        component: () => import('./components/supplementInfo.vue')
    }, {
        path: '/pay',
        name: 'pay',
        meta: {
            title: "支付",
            requireAuth:true
        },
        component: () => import('./components/pay.vue')
    }, {
        path: '/paySuccess',
        name: 'paySuccess',
        meta: {
            title: "支付成功",
            requireAuth:true
        },
        component: () => import('./components/paySuccess.vue')
    }]

})