import { createRouter, createWebHashHistory } from "vue-router";
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import defaultLayout from '../components/defaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Register from '../views/Register.vue'
import Surveys from '../views/Surveys.vue'
import SurveyView from '../views/SurveyView.vue'
import store from "../store";
const routes = [
    {
        path:'/',
        component: defaultLayout,
        // to redirect if the user doesnt have an authorization
        meta:{ requiresAuth:true },
        children:[
            {path: 'dashboard',name:'Dashboard',component:Dashboard},
            {path: 'surveys',name:'Surveys',component:Surveys},
            {path: 'surveys/create',name:'SurveyCreate',component:SurveyView},
            {path: 'surveys/:id',name:'SurveyView',component:SurveyView}
        ]
    },
    {
        path:'/auth',
        redirect:'/login',
        name:'Auth',
        component: AuthLayout,
        // to redirect if the user doesnt have an authorization
        meta:{ isGuest:true },
        children:[
        {
        path:'/login',
        name:'Login',
        component: Login
        },{ 
        path:'/register',
        name:'Register',
        component: Register
        }
    ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
//



router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('TOKEN')) {
        store.state.user.token = sessionStorage.getItem('TOKEN');
    }
    //if user is NOT authorized
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name:'Login'})
        // if user is already authorized
    }else if(store.state.user.token && (to.meta.isGuest)) {
        next({name: 'Dashboard'})
    }
    else{
        next();
    }
})
export default router;