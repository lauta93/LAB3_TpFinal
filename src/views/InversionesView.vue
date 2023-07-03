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
    <td>${{ moneda.ganancia }}</td>
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
            }
        })
      })
      this.$store.state.currencies.forEach(moneda=>{
        moneda.dif=moneda.vendido-moneda.comprado
      })
      this.$store.state.currencies.forEach(moneda=>{
        moneda.ganancia=moneda.dif+(moneda.comprado * moneda.cantidad)
      })

    }
  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
    this.calcularGanancias()
  }
  }
</script>