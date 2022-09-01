<template>
<div class="recuadro">
    <div class="recuadro-inner">    
    <p>{{transaccion}}</p>
    <button @click="cancelar">Cancelar</button>
    </div>
</div>
</template>
<script>
export default {
  name: 'Modification',
  data(){
    return{   
   mensaje: "Modificar..asdasdasd",
   transaccion_id: ''
    }
  },
  props: {
    transaccion: {
      required: true,
      type: Object
    }
  },
  methods:{
    cancelar(){
      this.$store.state.modificar=false
    }
  }
}


</script>
<style scoped>
.recuadro{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.recuadro-inner{
    position: relative;
    background: #FFF;
    padding: 30px;
    border-radius: 2%;
}
</style>