<template>
    <div>
        <h2>Inversiones</h2>
    </div>
<table class="table">
<tr>
    <th>Criptomoneda</th>
    <th>Resultado</th>
</tr>
<tr v-for="(moneda) in monedas" :key="moneda">
    <td>{{ moneda.id.toUpperCase() }}</td>
    <td>${{ moneda.ganancia.toFixed(2) }}</td>
</tr>    
</table>
</template>
<script>
export default{
  name: 'InversionesView',
  data() {
    return {
        monedas:this.$store.state.currencies,

    }
  },
  methods: {
    calcularGanancias(){
      this.monedas.forEach(moneda => {
        this.$store.state.transacciones.forEach(transaccion=>{
            if(moneda.id===transaccion.crypto_code){
                if(transaccion.action==='purchase'){
                    moneda.comprado=+transaccion.money
                    moneda.cantidadComprada=+transaccion.crypto_amount
                }
                else{
                    moneda.vendido =+transaccion.money
                    moneda.cantidadVendida =+transaccion.crypto_amount
                }
            }
        })       
      })

      this.$store.state.currencies.forEach(moneda=>{
        if(moneda.vendido===0){
        moneda.ganancia=((moneda.valorVenta*moneda.cantidad)-(moneda.comprado))
        }
        else{
        moneda.precioUnitarioCompra= (moneda.comprado / moneda.cantidadComprada)
        moneda.precioUnitarioVenta= (moneda.vendido / moneda.cantidadVendida)
        moneda.dif=moneda.precioUnitarioVenta - moneda.precioUnitarioCompra
        moneda.ganancia=moneda.dif*moneda.cantidadVendida
        }
      })
      
    }
  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
    this.$store.commit('obtenerPrecioVenta')
    this.calcularGanancias()
  },
  unmounted(){
    this.$store.state.currencies.forEach(moneda=>{
      moneda.dif=0
      moneda.cantidadVendida=0
      moneda.ganancia=0
      })
  }
  }
</script>