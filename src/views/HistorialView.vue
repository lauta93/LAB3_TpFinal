<template>
  <h2>Historial de movimientos</h2>  
  <div id="tabla">
  <table>
    <tr>
      <th>Moneda</th>
      <th>Cantidad</th>
      <th>Precio pagado</th>
      <th>Tipo de operacion</th>
      <th>Fecha</th>
    </tr>
    <tr v-for="(movimiento) in movimientos" :key="movimiento">
      <td>{{movimiento.crypto_code.toUpperCase()}}</td>
      <td>{{movimiento.crypto_amount}}</td>
      <td>${{movimiento.money}}</td>
      <td>{{movimiento.action}}</td>
      <td>{{movimiento.datetime.split('T')[0]}}</td>
      <td> | <button @click="modificarMovimiento(movimiento)">Modificar</button><button>Eliminar</button></td>
    </tr>    
  </table>  
  </div>
  <modificationComponent :transaccion="movimientoAModificar" v-if="this.$store.state.modificar"></modificationComponent>
</template>

<script>
import serviceDB from '@/services/apiBD.js'
import modificationComponent from '@/components/ModificationComponent.vue'


export default {
  name: 'Historial',
  data(){
    return {
      movimientos: [],
      movimientoAModificar: {}
      }
  },
  components: {
      modificationComponent
  },
  methods: {
    getMovimientos(){
      serviceDB.obtenerRegistro(this.$store.state.username).then((response)=>{
        this.movimientos=response.data
      })
    },
    modificarMovimiento(movimiento){
      this.movimientoAModificar=movimiento
      this.$store.state.modificar= true

    }
  },
  mounted(){
    this.getMovimientos()    
  }

}
</script>


<style>
#tabla{
  display: flex;
  justify-content: center;
}
</style>
