<template>
  <h2>Historial de movimientos</h2>  
  <div>
  <table class="table">
    <tr>
      <th>Moneda</th>
      <th>Cantidad</th>
      <th>Precio </th>
      <th>Tipo</th>
      <th>Fecha</th>
    </tr>
    <tr v-for="(movimiento) in movimientos" :key="movimiento">
      <td>{{movimiento.crypto_code.toUpperCase()}}</td>
      <td>{{movimiento.crypto_amount}}</td>
      <td>${{movimiento.money}}</td>
      <td>{{movimiento.action==='sale' ? 'Venta':'Compra'}}</td>
      <td>{{movimiento.datetime.split('T')[0]}}</td>
      <td> | <button @click="modificarMovimiento(movimiento)">Modificar</button><button @click="eliminar(movimiento._id)">Eliminar</button></td>
    </tr>    
  </table>
  </div>
  <modificationComponent :transaccion="movimientoAModificar" v-if="this.$store.state.modificar"></modificationComponent>
  <notificationComponent :message='"Eliminado con exito"' v-if="this.$store.state.mostrarPopUp"></notificationComponent>
</template>
<script>
import serviceDB from '@/services/apiBD.js'
import modificationComponent from '@/components/ModificationComponent.vue'
import notificationComponent from '@/components/NotificationComponent.vue'
export default {
  name: 'Historial',
  data(){
    return {
      movimientos: [],
      movimientoAModificar: {}
      }
  },
  components: {
      modificationComponent,
      notificationComponent
  },
  methods: {
    getMovimientos(){
      if(this.$store.state.username!=''){
        serviceDB.obtenerRegistro(this.$store.state.username).then((response)=>{
        this.movimientos=response.data
      })
      }  
    },
    modificarMovimiento(movimiento){
      this.movimientoAModificar=movimiento
      this.$store.state.modificar= true
    },
    eliminar(id){
      serviceDB.eliminarRegistro(id)
      this.$store.state.mostrarPopUp=true
      this.getMovimientos()
    }
  },  
  mounted(){
    this.getMovimientos()
  }
}
</script>
<style>
.table{
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
</style>
