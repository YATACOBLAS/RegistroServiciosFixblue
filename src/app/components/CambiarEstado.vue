<template>
  <div>
    <div
      class="modal fade row align-items-center"
      id="EliminarEstado"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @click.self="close()"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div v-if="EliminadoGeneral" class="modal-body">
            ¿Estas Seguro de eliminar la Transacción? N°{{ Cod }}
          </div>
          <div v-else class="modal-body text-center">
            <i class="icon ion-md-checkmark"></i>
          </div>
          <div
            v-bind:class="{ 'justify-content-center': !EliminadoGeneral }"
            class="modal-footer d-flex"
          >
            <div v-if="EliminadoGeneral" class="mr-auto">
              <button
                v-on:click="CambiarEstado(Cod)"
                class="btn btn-md btn-danger"
              >
                SI
              </button>
            </div>
            <div v-bind:class="{ 'ml-auto': EliminadoGeneral }">
              <button
                class="btn btn-md"
                @click.self="close()"
                data-dismiss="modal"
                style="background-color: #0074fc"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "CambiarEstado",
  props: ["Cod"],
  data(){
    return {
    
      Id:this.Cod,
      dato: { id: 0 },
      EliminadoGeneral: true,
 
    };
  },
  methods: {
    close() {
      if (this.EliminadoGeneral == false) {
        this.$emit("click");
        this.EliminadoGeneral = true;
      }
    },
    async CambiarEstado(indice) {
      this.dato.id = indice;
      let metodo = await fetch("http://localhost:5000/api/tasks/CambiarEstadoMov", {
        method: "POST",
        body: JSON.stringify(this.dato),
     
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "") {
            this.EliminadoGeneral = false;
          }
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
i {
  font-size: 80px;
}
</style>