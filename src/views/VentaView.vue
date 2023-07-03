<template>
  <h2>Dar de alta una venta de criptomonedas</h2>
  <table class="table" v-if="monedas!=''" >
<tr>
    <th>Moneda</th>
    <th>Disponible</th>
</tr>
<tr v-for="(moneda) in monedas" :key="moneda">
    <td>{{ moneda.id.toUpperCase() }}</td>
    <td>{{ moneda.cantidad }}</td>
    <td><button @click="vender(moneda.id, moneda.cantidad)">Vender</button></td>
</tr>
    
  </table>
  <VentaComponent :moneda="monedaSeleccionada" :cantidadTotal="cantidad" v-if="this.$store.state.vender"></VentaComponent>
</template>

<script>
import VentaComponent from '@/components/VentaComponent.vue'
export default {
data(){
    return{
        monedas:this.$store.state.currencies,
        monedaSeleccionada: '',
        cantidad: 0
    }
},
  methods: { 
    vender(moneda, cantidadTotal){
     this.monedaSeleccionada=moneda
     this.cantidad=cantidadTotal
     this.$store.state.vender=true
    }
  },
  components: {
    VentaComponent
  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
    this.$store.commit('calcularCantidades')
  }, 
  unmounted(){
    this.$store.state.currencies.forEach(moneda=>{
                moneda.cantidad=0
            })
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