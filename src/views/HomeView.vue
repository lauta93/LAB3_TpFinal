<template>
  <div class="home">
    <h2>Estado actual de cuenta</h2>
  <table class="table" v-if="monedas!=''" >
<tr>
    <th>Criptomoneda</th>
    <th>Cantidad</th>
    <th>Dinero</th>
</tr>
<tr v-for="(moneda) in monedas" :key="moneda">
    <td>{{ moneda.id.toUpperCase() }}</td>
    <td>{{ moneda.cantidad }}</td>
    <td>${{ ((moneda.valorVenta)*(moneda.cantidad)).toFixed(2) }}</td>
</tr>    
  </table>
  <div>Total ≅ ARS$ {{ total.toFixed(2) }}</div>
  </div>
</template>
<script>
export default{
  name: 'HomeView',
  data() {
    return {
      monedas:this.$store.state.currencies,
      total: 0

    }
  },
  methods: {
    calcularTotal(){
      this.$store.state.currencies.forEach(moneda=>{
      this.total=this.total + (moneda.cantidad * moneda.valorVenta)
      })
    }
  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
    this.$store.commit('calcularCantidades')
    this.$store.commit('obtenerPrecioVenta')
    this.calcularTotal()
  },   
  unmounted(){
    this.$store.state.currencies.forEach(moneda=>{
    moneda.cantidad=0
    })
    this.total=0
  }
  }
</script>
