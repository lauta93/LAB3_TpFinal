<template>
  <div class="home">
    
  </div>
</template>
<script>
export default{
  name: 'HomeView',
  data() {
    return {
      transacciones: []      
    }
  },
  computed:{
   modificado(){
    return this.mensaje==='Modificado con exito' ? true:false
   }
  },
  methods: {
    getCantidadesCrypto(){      
      console.log(this.$store.state.transacciones)      
    }
  },
  mounted(){
    this.$store.dispatch('obtenerTransacciones')
  }
  }
</script>
