<template>
<div class="recuadro">
    <div class="recuadro-inner">
    <h2>Bienvenido!</h2>
    <h3>Para operar ingresa tu usuario:</h3>
    <input v-model="usuario" type="text" @keypress.enter="ValidarUsuario">
    <button @click="ValidarUsuario">Entrar</button>
    <p>{{mensaje}}</p>
    </div>
</div>
</template>
<script>
import serviceDB from '@/services/apiBD.js'
export default {
  name: 'Login',
  data(){
    return{
   usuario: "",
   mensaje: ""
    }
  },
  methods: {
    ValidarUsuario(){      
     if(this.usuario.toString().trim()===''){
        this.mensaje='Debes ingresar tu usuario'
     }
     else{
      let cantNum=0
      let cantLetras=0
      for(var i=0;i<this.usuario.length;i++){
        if(!isNaN(this.usuario.at(i))){
          cantNum=cantNum+1
        }
        if(isNaN(this.usuario.at(i))){
          cantLetras=cantLetras+1
        }        
      }
      if(cantLetras===0||cantNum===0){
         this.mensaje='El usuario debe ser alfanumerico'
      }else{
        this.$store.commit('IngresarUsuario', this.usuario)
        this.$store.dispatch('obtenerTransacciones')
      
      }        
     }
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
    background: #df7474;
    padding: 30px;
    border-radius: 2%;
}
</style>
