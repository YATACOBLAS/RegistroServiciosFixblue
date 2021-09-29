<template>
  <div  class="vh-100  vw-100  d-flex justify-content-center  align-items-center" >
    <div class="d-flex justify-content-center ">
     
    <div class=" col-md-5 col-sm-6 col-lg-5 col-xl-5 col-8  row d-flex justify-content-center mb-5 tarjeta" style="background-color: #000D21">
       <Login/>
       <Registro/>
    
    </div>
       </div>
  </div>
</template>

<script>

import Login from './components/login.vue'
import Registro  from './components/RegistroUsuario.vue'
export default {
  name: 'App',
  components: {
    Login,Registro
  }
}
</script>
