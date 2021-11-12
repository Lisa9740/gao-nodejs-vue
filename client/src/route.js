import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import tokenConfig from './utils/tokenConfig';


Vue.use(VueRouter);

// check if is not authenticated
const isNotAuthenticated = (to, from, next) => {
    if (!tokenConfig.getToken()) {
        return next('/login')
    }
    next()
}

// check if user is connected
const isAuthenticated = (to, from, next) => {
    if (tokenConfig.getToken() != null) {
        return location.href = '/';
    }
    next()
}

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: isNotAuthenticated
    },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: isAuthenticated
        },
    ]
})


export default router;
