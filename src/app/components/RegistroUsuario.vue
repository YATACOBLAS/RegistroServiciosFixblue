<template>
      <div
        class="modal fade row justify-content-center"
        id="RegistroUsuario"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content" style="background-color: #000d21">
        <div class="modal-body row justify-content-center">
          <form
            v-on:submit.prevent
            class="col-md-12 col-10 col-sm-8 ml-md-1 pb-md-4 row justify-content-center text-center"
          >
            <!--Grid column-->
            <div class="row col-md-10 text-center pt-md-4 mx-md-3">
              <h2>REGISTRARSE</h2>
            </div>

            <div class="row col-md-10 md-form is-invalid mb-0">
              <input
                type="text"
                v-model="user.usuario"
                id="usuario"
                name="usuario"
                class="form-control"
              />
              <label for="name" class="">Usuario </label>
            </div>
            <div class="row col-md-10 md-form is-invalid mb-0">
              <input
                type="text"
                v-model="user.email"
                id="email"
                name="email"
                class="form-control"
              />
              <label for="name" class="">Email</label>
            </div>
            <div class="row col-md-10 md-form mb-0">
              <input
                type="password"
                v-model="user.clave"
                id="password"
                name="password"
                class="form-control"
                autocomplete="on"
              />
              <label for="password" class="">Password</label>
            </div>
            <div class="row col-md-10 md-form mb-0 justify-content-center">
              <button @click="RegistrarUsuario" class="btn color-button">
                Registrar
              </button>
            </div>
            <div
              class="row col-md-10 md-form mb-0 justify-content-center"
              v-if="mensajes.length"
            >
              <p
                v-for="mensaje in mensajes"
                :key="mensaje.id"
                class="text-danger my-1"
              >
                {{ mensaje }}
              </p>
            </div>
            <div
              class="row col-md-10 md-form mb-0 justify-content-center"
              v-if="valido"
            >
              <p class="text-success my-1">Revisa tu Email</p>
            </div>
            <div
              v-if="loading"
              class="row col-md-10 md-form mb-0 justify-content-center"
            >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      user: {
        usuario: "",
        email: "",
        clave: "",
      },
      validacion: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      mensajes: [],
      valido:false,
      loading:false
    };
  },
  watch:{
  },
  methods: {

    async RegistrarUsuario() {
      this.mensajes = await [];

      if (
        this.user.usuario.trim() === "" ||
        this.user.email.trim() === "" ||
        this.user.clave.trim() === ""
      ) {
        this.mensajes.push("Campos Vacios");
      } else {
      console.log(this.validacion.test(this.user.email))
        if (this.validacion.test(this.user.email)) {
       
          if (
            this.user.clave.trim().length > 0 &&
            this.user.clave.trim().length < 7
          ) {
            this.mensajes.push("Clave Debil");
          } else {
             this.loading=true
             let metodo=  await fetch("api/tasks/email", {
              method: "POST",
              body: JSON.stringify(this.user),
              headers: {
                Accept: "application/json",
                "Content-type": "application/json",
              },
            }).then((res) => res.json())
            .then((res) => {return res.message} );
          if(metodo==700){
            this.loading=false
              this.mensajes.push("Ya existe") 
              
          }else{
            this.loading=false, this.valido=true,this.user.usuario='',this.user.email='',this.user.clave='' ,setTimeout(()=>{this.valido=false },3000)
          }
          }
        }else{
        this.mensajes.push("Email Inválido");
        }
     }
    },
  },
};
</script>
<style scoped>
</style>