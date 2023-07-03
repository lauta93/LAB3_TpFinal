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
      this.$store.state.currencies.forEach(moneda => {
        this.$store.state.transacciones.forEach(transaccion=>{
            if(moneda.id===transaccion.crypto_code){
                if(transaccion.action==='purchase'){
                    moneda.comprado=+transaccion.money
                }
                else{
                    moneda.vendido=+transaccion.money
                }
                moneda.precioUnitario=(transaccion.money/transaccion.crypto_amount)
            }
        })
      })
      this.$store.state.currencies.forEach(moneda=>{
        moneda.dif=moneda.vendido-moneda.comprado
      })
      this.$store.state.currencies.forEach(moneda=>{
        if(moneda.vendido===0){
          moneda.ganancia=moneda.dif+moneda.comprado
        }else{
          moneda.ganancia=moneda.dif+((moneda.comprado - moneda.precioUnitario ) * moneda.cantidad)
        }
        
      })

    }
  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
    this.calcularGanancias()
  },
  unmounted(){
    this.$store.state.currencies.forEach(moneda=>{
      moneda.dif=0
      })
  }
  }
</script>