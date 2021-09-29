<template>
  <section>
    <div class="container justify-content-center">
      <div class=" row container d-flex justify-content-center form-fecha  my-2">      
          <div class="col-8 col-sm-6 col-md-4 fecha py-2" >
            <label class=" m-1 text-weigth-bold">Desde</label>
            <input class="my-1" type="date" />
          </div>
          <div class="col-8 col-sm-6 col-md-4 fecha py-2">
            <label class="m-1 text-weigth-bold"> Hasta</label>
            <input  class="my-1" type="date" />
          </div>
      </div>
      <div class="row col-md-12">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header" >
              <div  class="row ">
              <div class="col-md-8 col-sm-8 col-8"> 
            <form class="form-inline d-flex justify-content-center md-form form-sm  mt-2">
            <i class="fas fa-search icon-search" aria-hidden="true"></i>
            <input class="form-control  form-control-sm ml-2 w-75" type="text" placeholder="Buscar"
              aria-label="Search">
          </form>  
          </div>
              <div class="col-md-4 fecha col-sm-4 col-4 my-1">
                <button class="btn  btn-md ">Listar</button>
              </div>
            </div>
            </div>
            <div class="card-body">
              <Chart v-if="loaded" :chartdata="chartdata" />
              <button @click="dashGet()">Randomize</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "Dashboard",
  components: { Chart },
  data: () => ({
    loaded: false,
    chartdata: null,
    respuesta: null,
  }),
  mounted() {
    this.dashGet();
  },
  methods: {
    async dashGet() {
      await fetch("http://localhost:5000/api/tasks/dashboard",{ 
        method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.respuesta = data;
          this.chartdata = {
            labels: this.respuesta.map((item) => item.Descripcion),
            datasets: [
              {
                label: "Record Economico",
                data: this.respuesta.map((item) => item.total),
                backgroundColor: "#0074FC",
                //este es para el color al realizar hover en una barra
                hoverBackgroundColor: "white",
                //este es para el grosor de barra
                //barPercentage:0.3
                barPercentage: 0.1,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 4,
              },
            ],
          };
        });
      console.log(this.chartdata);
      this.loaded = true;
    },
  },
};
</script>
<style scoped>
.card {
  background-color: #001331;
  border-bottom: 5px solid #0074fc;
}
/*** 
este espara que el label se mantenga flotando encima del input : datatime-local

.md-form input.form-control[type="datetime-local"] ~ label {
  transform: translateY(-140%);
  font-size: .6rem;
}
*/

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
 /*  
 Es para invertir el color del incono date
 ::-webkit-calendar-picker-indicator {
    filter: invert(1);
}*/
.fecha input:read-write {
  color: #001331;
  text-align: end;
}
.form-fecha {
  background-color: #001331;
  border-radius: 30px;
}
.icon-search{
  color: #0074fc;
}

</style>

