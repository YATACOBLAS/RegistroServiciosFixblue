<template>
  <div class="d-flex">
    <div id="sidebar-container" class="color-menu">
      <div class="Logo py-3 mr-2 text-center">
        <h4 class="text-light font-weight-bold">FIXBLUE</h4>
      </div>
      <div class="menu mx-3">
       <router-link to="/home/registrarmovimiento" class="my-2"><i class="icon ion-md-apps mr-2 lead"></i>Registrar Movimiento
        </router-link><br>
          <router-link to="/home/listarmovimiento" class="my-2"><i class="icon ion-md-list mr-2 lead"></i>Listar Movimiento
        </router-link><br>
          <router-link to="/home/dashboard" class="my-2"><i class="icon ion-md-paper mr-2 lead"></i>Dashboard
        </router-link>
      </div>
    </div>
    <Navbar  :menu="data" />
  </div>
</template>

<script>
import Navbar from "./components/navbar";
export default {
  name: "HelloWorld",
  components: { Navbar },
  data() {
    return {
      data: 0,
    };
  },
  methods: {
    menu(menu) {
       this.data=menu;
    }
  },
};
</script>
<style  scoped>
:root {
  --menu: #001331;
  --light: #ffffff;
  --grey: #efefef;
}

body {
  overflow: hidden;
  font-family: "Muli", sans-serif;
  font-weight: 300;
  color: var(--primary);
}

router-link:hover {
  text-decoration: none;
}
.color-menu {
  background-color: #001331 !important;
}

#sidebar-container {
  min-height: 100vh;
}
#sidebar-container .logo {
  padding: 0.875rem 1.25rem;
}
#sidebar-container .menu {
  width: 18rem;
}
@media (max-width: 768px) {
  #sidebar-container {
    display: none;
  }
}
</style>