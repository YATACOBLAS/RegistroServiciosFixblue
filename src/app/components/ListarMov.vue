<template>
  <section>
    <div class="container justify-content-center">
      <div class="row container d-flex justify-content-center form-fecha my-2">
        <div class="col-8 col-sm-6 col-md-4 fecha py-2">
          <label class="m-1 text-weigth-bold">Desde</label>
          <input v-model="lista.desde" class="my-1" type="date" />
        </div>
        <div class="col-8 col-sm-6 col-md-4 fecha py-2">
          <label class="m-1 text-weigth-bold"> Hasta</label>
          <input v-model="lista.hasta" class="my-1" type="date" />
        </div>
      </div>
      <div class="row col-md-12">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-8 col-sm-8 col-8">
                  <form
                    class="form-inline d-flex justify-content-center md-form form-sm mt-2"
                  >
                    <i class="fas fa-search icon-search" aria-hidden="true"></i>
                    <input
                      class="form-control form-control-sm ml-2 w-75"
                      type="text"
                      placeholder="Buscar"
                      aria-label="Search"
                      v-model="buscador"
                    />
                  </form>
                </div>
                <div class="col-md-4 fecha col-sm-4 col-4 my-1">
                  <button
                    ref="listar"
                    @click="getDataTable()"
                    class="btn btn-md"
                  >
                    Listar
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">N°</th>
                      <th scope="col">Fecha1</th>
                      <th scope="col">Hora</th>
                      <th scope="col">Movimiento</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Total</th>
                      <th scope="col">Detalle</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mov, index) in mostrarMov" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ mov.Fecha1 }}</td>
                      <td>{{ mov.Hora }}</td>
                      <td>{{ mov.Movimiento }}</td>
                      <td>{{ mov.Descripcion }}</td>
                      <td>{{ mov.Total }}</td>
                      <td>
                        <button
                          data-toggle="modal"
                          data-target="#EliminarEstado"
                          @click="EnviarId(mov.IdMovimiento)"
                          class="btn btn-md btn-danger"
                        >
                          <i class="icon ion-md-trash"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          data-toggle="modal"
                          data-target="#TablaDetalle"
                          @click="EnviarIdListar(mov.IdMovimiento)"
                          style="background-color: #0074fc"
                          class="btn btn-md"
                        >
                          <i class="icon ion-md-apps"></i>
                        </button>
                      </td>
                    </tr>
                    <div v-if="loading" class="justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer">
              <div class="my-4">
                <ul
                  class="pagination pagination-md justify-content-center text-center"
                >
                  <li class="page-item" :class="page === 1 ? 'disabled' : ''">
                    <a class="page-link" @click="prevPage">Anterior</a>
                  </li>
                  <li class="page-link" style="background-color: inherit">
                    {{ page }} of {{ lastPage() }}
                  </li>
                  <li
                    class="page-item"
                    :class="page === lastPage() ? 'disabled' : ''"
                  >
                    <a class="page-link" @click="nextPage">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <CambiarEstado @click="getDataTable()" :Cod="Cod" />
      <CambiarEstadoDet @click="getDataTable()" :CodDet="CodDet" />
    </div>
  </section>
</template>

<script>
import CambiarEstado from "./CambiarEstado";
import CambiarEstadoDet from "./CambiarEstadoDetalle";

export default {
  name: "ListMovimiento",
  components: {
    CambiarEstado,
    CambiarEstadoDet,
  },
  data() {
    var fecha = new Date();
    return {
      CodDet: 0,
      Cod: 0,
      lista: {
        desde:
          fecha.getFullYear() +
          "-" +
          (fecha.getMonth() + 1) +
          "-" +
          fecha.getDate(),
        hasta:
          fecha.getFullYear() +
          "-" +
          (fecha.getMonth() + 1) +
          "-" +
          fecha.getDate(),
        descripcion: "",
      },
      movs: [],
      page: 1,
      loading: false,
      perPage: 10,
      buscador: "",
    };
  },

  computed: {
    mostrarMov() {
      var listando = this.movs.filter((mov) =>
        mov.Descripcion.toLowerCase().includes(this.buscador.toLowerCase())
      );
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      this.loading = false;

      return listando.slice(start, end);
    }
  },
  mounted() {
    this.getDataTable();
  },

  methods: {
    EnviarId(index) {
      this.Cod = index;
      // this.movs.splice(index, 1);
    },
    getDataTable() {
      var params = {
        desde: this.desde,
        hasta: this.hasta,
        descripcion: "",
        estado: 1,
      };

      this.loading = true;
      this.movs = [];
      if (this.lista.desde) {
        params.desde = this.lista.desde.split("-").reverse().join("/");
        if (this.lista.hasta) {
          params.hasta = this.lista.hasta.split("-").reverse().join("/");
        }
      }

      var url = new URL("http://localhost:5000/api/tasks/listar");

      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[0])
          this.movs = this.movs.concat(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    EnviarIdListar(index) {
      this.CodDet = index;
    },
    prevPage() {
      this.loading = true;
      this.page--;
    },
    nextPage() {
      this.lastPage();
      this.loading = true;
      this.page++;
    },
    lastPage() {
      let length = this.movs.length;
      let size = length / this.perPage;

      return size < 1 ? 1 : size % 1 > 0 ? size - (size % 1) + 1 : size;
    },
  },
};
</script>
    <style scoped>
a:hover {
  cursor: pointer;
}
.table {
  background-color: #000d21;
  color: white;
}
.card {
  background-color: #001331;
  border-bottom: 5px solid #0074fc;
}
.fecha {
  color: white;
}
.fecha button {
  background-color: #0074fc;
  color: white;
}
.fecha input {
  border-radius: 30px;
}
.fecha input:read-write {
  color: #001331;
  text-align: end;
}
.form-fecha {
  background-color: #001331;
  border-radius: 30px;
}
.icon-search {
  color: #0074fc;
}
</style>

