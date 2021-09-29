<template>
    
    <div
      class="modal fade row align-items-center"
      id="TablaDetalle"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">TipoMov</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">PrecioU</th>
                  <th scope="col">SubTotal</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
           <div v-if="loading" class="justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                    </div>
              <tbody v-if="(indice>0)" >
                <tr v-for="(mov, index) in movimientos" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ mov.TipoMovimiento }}</td>
                  <td>{{ mov.DTMDescripcion }}</td>
                  <td>{{ mov.Cantidad }}</td>
                  <td>{{ mov.PrecioU }}</td>
                  <td>{{ mov.SubTotal }}</td>
                  <td>
                    <button   
                   @click="CambiarEstadoDetalle(mov.IdDetalleMovimiento,index)"
                      class="btn btn-md btn-danger"
                    >
                      <i class="icon ion-md-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
               
                    
               
                </table>
          </div>
           <div class="modal-footer d-flex justify-content-center">
              <button
                class="btn btn-md"
                ref="closeTabla"
                @click.self="closeTablaDetalle()"
                data-dismiss="modal"
                style="background-color: #0074fc"
              >
                Cerrar
              </button>
        </div>
        </div>
       
      </div>
    </div>
</template>
<script>
export default {
  name: "CambiarEstadoDetalle",
  props: ["CodDet"],
  data(){
    return {
      movimientos:[],
      dato: { id: this.CodDet},
      loading: false,
    };
  },
  computed: {
      indice:function(){
         this.ListarDetallePrev(this.CodDet)
        return this.CodDet;
      }
  },
  methods: {
       closeTablaDetalle() {
        this.$emit("click");
    },
      ListarDetallePrev(index){
           if(index>0){
               this.ListarDetalle(index);
          
          }
              console.log('Listprev');
          
      },
      ListarDetalle(index){
          this.loading=true;
          this.movimientos=[]
         var params = {
           iddetalle:index
         };
      var url = new URL("http://localhost:5000/api/tasks/listardetalle");
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.loading=false;
         return this.movimientos = this.movimientos.concat(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
  }
,
  CambiarEstadoDetalle(indice,index){
        this.dato.id = indice;
      fetch("http://localhost:5000/api/tasks/CambiarEstadoMovDet", {
        method: "POST",
        body: JSON.stringify(this.dato),
   
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"  },
      })
        .then((res) => res.json())
        .then((data) => {
             this.movimientos.splice(index, 1);
            if(this.movimientos.length==0){

              this.$refs.closeTabla.click();
      
            };
        })
        .catch((err) => {
          console.log("Error");
        });
    },
 
  },
};
</script>
    <style scoped>
.table {
  background-color: #000d21;
  color: white;
}
.modal-footer, .modal-content{
     background-color: #000d21;
  color: white;
}

</style>