<template>
  <section>
    <div class="container justify-content-center">
      <div class="row mx-md-2 mx-0">
        <div class="col-md-12">
          <div class="card">
            <form @submit.prevent>
              <div class="container pb-4" style="background-color: #000d21">
                <div
                  class="row py-2"
                  style="background-color: #001331; border-radius: 30px"
                >
                  <div class="col-12 col-sm-6 col-md-4 fecha">
                    <select
                      v-model="DGeneral.Movimiento"
                      @change="CambiarValor()"
                      class="selector custom-select custom-select-sm mt-3"
                    >
                      <option disabled value="">Tipo de Movimiento</option>
                      <option class="text-body">Entrada</option>
                      <option class="text-body">Salida</option>
                    </select>
                  </div>
                  <div
                    class="col-12 col-sm-6 col-md-4"
                    :class="{ 'fecha mt-3': DGeneral.Movimiento === 'Entrada' }"
                  >
                    <select
                      v-if="DGeneral.Movimiento === 'Entrada'"
                      v-model="DGeneral.Descripcion"
                      class="selector custom-select custom-select-sm"
                    >
                      <option disabled value="">Selecciona</option>
                      <option>Marketing</option>
                      <option>Hardware y Software</option>
                      <option>Desarrollo de Software</option>
                      <option>CCTV</option>
                    </select>
                    <div
                      v-if="DGeneral.Movimiento === 'Salida'"
                      class="md-form mt-md-0 mt-2"
                    >
                      <input
                        v-model="DGeneral.Descripcion"
                        type="text"
                        id="descripcionGeneral"
                        class="form-control"
                      />
                      <label for="descripcionGeneral">General</label>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-4 mt-3">
                    <select
                      v-if="DGeneral.Movimiento === 'Entrada'"
                      v-model="DDetalle.Movimiento"
                      class="selector custom-select custom-select-sm"
                    >
                      <option disabled value="">Selecciona</option>
                      <option>Venta</option>
                      <option>Servicio</option>
                    </select>
                    <select
                      v-if="DGeneral.Movimiento === 'Salida'"
                      v-model="DDetalle.Movimiento"
                      class="selector custom-select custom-select-sm"
                    >
                      <option disabled value="">Selecciona</option>
                      <option >Compra</option>
                      <option >Gasto</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row container justify-content-center">
                <div class="col-md-5 col-12 col-sm-5">
                  <div class="md-form">
                    <input
                      v-model="DDetalle.DTDescripcion"
                      type="text"
                      id="descripcion"
                      class="form-control"
                    />
                    <label for="descripcion">Descripcion</label>
                  </div>
                </div>
                <div class="col-md-2 col-12 col-sm-5">
                  <div class="md-form">
                    <input
                      v-model="DDetalle.Cant"
                      type="number"
                      id="descripcion"
                      class="form-control"
                      min="0"
                      max="10"
                    />
                    <label for="descripcion">Cantidad</label>
                  </div>
                </div>
                <div class="col-md-2 col-12 col-sm-5">
                  <div class="md-form">
                    <input
                      v-model="DDetalle.PrecU"
                      type="number"
                      id="descripcion"
                      class="form-control"
                      min="0"
                       max="10"
                    />
                    <label for="descripcion">Precio Unitario</label>
                  </div>
                </div>
                <div class="col-md-2 col-12 col-sm-5 fecha pt-3">
                  <button
                    @click="addFiles(DDetalle,event)"
                    style="border-radius: 30px"
                    class="btn btn-md"
                      type="submit"
                  >
                    Listar
                  </button>
                </div>
              </div>
            </form>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">N°</th>
                      <th scope="col">Movimiento</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">P.U.</th>
                      <th scope="col">SubTotal</th>
                      <th scope="col">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mov, index) in mostrarMov" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ mov.Movimiento }}</td>
                      <td>{{ mov.DTDescripcion }}</td>
                      <td>{{ mov.Cant }}</td>
                      <td>{{ mov.PrecU }}</td>
                      <td>{{ mov.PrecU * mov.Cant }}</td>
                      <td>
                        <button
                          
                          v-on:click="Modify(index)"
                           style="  border-radius: 30px;"
                          class=" btn-success"
                        >
                         <i class="icon ion-md-create"></i>
                          
                        </button>
                        <button
                          v-on:click="Eliminar(index)"
                           style="  border-radius: 30px;"
                          class="btn-danger"
                        >
                         <i class="icon ion-md-trash"></i>
                        </button>
                      </td>
                    </tr>

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
              <div class="container fecha text-center">
                <div v-show="loading" class="justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  <div v-show="error">
                  <h3  class="text-danger">Error</h3>
                  </div>  
                  <div v-if="listo">
                  <h3  class="text-success">Registrado</h3>
                  </div>                
                <button v-else v-on:click="addMovimiento()" style="border-radius: 30px" class="btn btn-md">
                  Confirmar
                </button>
                    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ListMovimiento",

  data() {
    return {
      error:false,
      listo:false,
      movs: [],
      page: 1,
      loading: false,
      perPage: 10,
      DGeneral: {
        Movimiento: "",
        Descripcion: "",
      },
      DDetalle: {},
    };
  },
  computed: {
    mostrarMov() {
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      this.loading = false;
      return this.movs.slice(start, end);
    },
  },
  mounted() {},
  methods: {
    CambiarValor() {
      this.DGeneral.Descripcion = "";
    },
    Eliminar(index) {
      this.movs.splice(index, 1);
    },
    Modify(index){
 console.log(this.movs[index]);
          this.DDetalle.DTDescripcion=this.movs[index].DTDescripcion;
          this.DDetalle.Cant=this.movs[index].Cant;
          this.DDetalle.Movimiento=this.movs[index].Movimiento;
          this.DDetalle.PrecU=this.movs[index].PrecU;
          this.Eliminar(index);
    },
    addFiles(form,event) {
      if (Object.keys(form).length > 3) {
        form["SubTotal"] = form.PrecU * form.Cant;
        this.movs = this.movs.concat(form);
        this.DDetalle = {};
      } else {
        alert("Llena el Formulario");
      }
    },
    addMovimiento() {
      this.loading = true;
      this.DGeneral["detmovimiento"] =this.movs; 

      var url ="http://localhost:5000/api/tasks/insertar";
    
      fetch(url,{
              method: "POST",
              body: JSON.stringify(this.DGeneral),
              headers: {
                Accept: "application/json",
                "Content-type": "application/json" }
        })
        .then((res) =>res.json() )
        .then((data) => {
          this.loading = false;
          console.log('lol'+data[0][0].IdMovimiento)
          if(data[0][0].IdMovimiento>0){
              this.listo=true
               setTimeout(()=>{this.listo=false },3000) 
               }
          else{
            console.log('Error Inesperado')
          }
          
         
          //console.log(data[0][0].IdMovimiento);
          
        })
        .catch((err) => {
          console.log(err)
           this.error=true
            setTimeout(()=>{this.error=false },3000)
        });
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
      let size= length / this.perPage;
      return size<1 ?  1 : ((size % 1)>0 ? size-(size % 1)+1 :size );
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
  color: #a2a3a5;
}
.form-fecha {
  background-color: #001331;
  border-radius: 30px;
}
.icon-search {
  color: #0074fc;
}
.selector {
  border-radius: 30px;
}
.md-form input{
  color: white;
}
</style>
