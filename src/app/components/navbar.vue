<template>
  <div class="w-100">
    <nav class="navbar navbar-expand-lg navbar-dark navbar-color">
      <h2 class="text-light">REGISTRAR MOVIMIENTO</h2>
      <h4 class="text-light text-weight-bold">Bienvenido {{ user}}</h4>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown ml-auto">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink-333"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="icon ion-md-funnel"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right dropdown-default dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink-333"
          >
            <router-link to="/home/registrarmovimiento"  style="color:white"><i class="icon ion-md-apps mr-2 lead"></i>Registrar 
        </router-link><br>
          <router-link to="/home/listarmovimiento" style="color:white"><i class="icon ion-md-list mr-2 lead"></i>Listar 
        </router-link><br>
           <router-link to="/home/dashboard" style="color:white"><i class="icon ion-md-paper mr-2 lead"></i>Dashboard
        </router-link>
       <br>
        <hr/>
            <a @click="Salir" class="dropdown-item text-light">LogOut</a>
          </div>
        </li>
      </ul>
    </nav>
  <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Dash from "./dashboard";
import Listar from "./ListarMov";
import RegistroMov from "./RegMov";
export default {
  name: "Navbar",
  props: ["menu"],
  components: { Dash, Listar, RegistroMov },
  data() {
    return {
      booldash: false,
      boolistar: false,
      boolmov: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["LogOut"]),
    Salir() {
      this.LogOut().then((response) => {
        this.$router.push("/");
      });
    },
    CambiarComponente(menu) {
      if (menu == 1) {
        this.booldash = false;
        this.boolistar = true;
        this.boolmov = false;
      }
      else if (menu == 2) {
        this.booldash = false;
        this.boolistar = false;
        this.boolmov = true;
      }
     else if (menu == 3) {
        this.booldash = true;
        this.boolistar = false;
        this.boolmov = false;
      }
    },
  },
};
</script>
<style scoped>
.navbar-color {
  background-color: #000b1c;
}
.dropdown-menu {
  background-color: #000b1c;
}
.dropdown-menu a:hover {
  background: #000b1c;
  color: rgb(223, 213, 213);
}
</style>

