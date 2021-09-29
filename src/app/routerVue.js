import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Home from './Home.vue';
import Dashboard from './components/dashboard.vue';
import RegMov from './components/RegMov.vue';
import ListarMov from './components/ListarMov.vue';
import NotFound from './notFound/404'
import store from './store/auth'
Vue.use(Router);



 const router = new Router({
    mode:'history',
 base:process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'Login',
            component: App
         },
        {
            path:'/home',
            name:'home',
            component: Home,
            meta:{Auth:true},
            children:[{
               path:'',
               meta:{Auth:true},
             component: ListarMov           
            },{
               path:'dashboard',
               component: Dashboard,
               meta:{Auth:true}
                } ,{
                  path:'listarmovimiento',
                  component: ListarMov,
                  meta:{Auth:true}
               },
                  {
                     path:'registrarmovimiento',
                     component: RegMov,
                     meta:{Auth:true}
                  }   
            ]
         
         }, {
            path:'*',
            alias:"*",
            name:'notFound',
            component: NotFound
         
         },

        
    ]
    
    });  

    router.beforeEach((to,from,next)=>{
           if(to.meta.Auth){
            if(!store.getters.token()){       
               return next({
                  name:'Login'})
            }
           
            next();
           }else{
              next();
           }
      
   })
    export default router;