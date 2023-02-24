<template>
  <div class="home">    
    
  <div><button @click="getCantidadesCrypto">get</button> </div>
  </div>
</template>
<script>

import serviceDB from '@/services/apiBD.js'
export default{
  name: 'HomeView',
  data() {
    return {
      transacciones: []
      
    }
  },
  methods: {
    getCantidadesCrypto(){
      
      console.log(this.transacciones)
      
    }

  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
    this.transacciones = this.$store.state.transacciones
  }
  }
</script>
