
import Vue from 'vue';
import rutas from './routerVue.js';
//import App from './App';

import Vuex from 'vuex'
import VuexStore from './store/auth';


Vue.use(Vuex)

const store = new Vuex.Store(VuexStore)

Vue.config.productionTip = false

export function createApp(context) {
    const router=rutas;
    const app = new Vue({
     // este se saca porque hay un mount que ya designa el 
     //id de la eqtiqueta html en la que se renderizara este componente  
     //el: '#app',
        router: rutas,
        store
        //este es sin router vue render: h=>h(rout)
    })
    return { app ,router}
}
///usar axios siempre despues de crear el componente vue

/*new Vue({

    router:rutas,
    render: createEle => createEle(App)
}).$mount('#app');


*/