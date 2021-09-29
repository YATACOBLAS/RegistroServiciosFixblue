  <template>
  <!--Grid row-->
  <form
    v-on:submit.prevent
    class="col-md-11 row justify-content-center text-center"
  >
    <!--Grid column-->
    <div
      class="row col-md-10 justify-content-center my-md-4 py-md-4 my-4 py-4 my-sm-4 py-sm-4"
    >
      <h2>BLUE <b>CORE</b></h2>
    </div>

    <div class="row col-md-10 md-form is-invalid mb-0">
      <input
        type="text"
        v-model="user.usuario"
        id="nameLogin"
        name="nameLogin"
        class="form-control"
      />
      <label for="nameLogin" class="">Email </label>
    </div>

    <div class="row col-md-10 md-form mb-0">
      <input
        type="password"
        v-model="user.clave"
        id="passwordLogin"
        name="passwordLogin"
        class="form-control"
        autocomplete="on"
      />
      <label for="passwordLogin" class="">Password</label>
    </div>

    <div
      class="row mt-3 col-xs-8 col-md-8 col-sm-8 col-lg-11 justify-content-center"
    >
      <button @click="Logueo" class="btn color-button">Entrar</button>
      <div></div>
    </div>

    <div class="row mt-3">
      <p class="" style="color: white">
        ¿No Tienes una Cuenta?<a
          class="text-primary"
          data-toggle="modal"
          data-target="#RegistroUsuario"
        >
          Crea una</a
        >
      </p>
    </div>
    <div
      class="row col-md-10 md-form mb-0 justify-content-center"
      v-if="mensajes.length"
    >
      <p v-for="mensaje in mensajes" :key="mensaje.id" class="text-danger my-1">
        {{ mensaje }}
      </p>
    </div>
    <!--Grid column-->
  </form>
</template>

  <script>
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",

  props: {
    msg: String,
  },
  data() {
    return {
      user: {
        usuario: "",
        clave: "",
      },
      validacion: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,

      mensajes: [],
    };
  },
  watch: {},
  methods: {
    ...mapActions(["attempt", "attuser"]),
    Logueo() {
      this.mensajes = [];
      if (this.user.usuario.trim() === "" || this.user.clave.trim() === "") {
        this.mensajes.push("Campos Vacios");
      } else {
        if (this.validacion.test(this.user.usuario)) {
          fetch("api/tasks/LogueoUsuario", {
            method: "POST",
            body: JSON.stringify(this.user),
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.mensaje!= "") {
                this.mensajes.push(res.mensaje);
              } else {
                this.attempt(res).then((response) => {
                  this.$router.push("home");
                });
              }
            });
        } else {
          this.mensajes.push("Email Inválido");
        }
      }
    },
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
