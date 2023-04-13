<template>
<div class="popUp">
    <div class="recuadro-inner">    
    <div> Cantidad de {{transaccion.crypto_code}}: <input type="text" v-model="transaccion.crypto_amount"></div>
    <div> Precio pagado: <input type="text" v-model="transaccion.money"></div>
    <div> Fecha: <input type="date" v-model="transaccion.datetime"></div>
    <div>
      <select v-model="transaccion.action">
      <option value="purchase">Compra</option>
      <option value="sale">Venta</option>
    </select>    
    </div>
   {{mensaje}}
    <button v-if="!modificado" @click="modificar">Confirmar</button>
    <button v-if="!modificado" @click="cancelar">Cancelar</button>    
    <button id="btnEntendido" v-if="modificado" @click="cancelar">Entendido</button>    
    </div>    
</div>
</template>
<script>
import serviceDB from '@/services/apiBD.js'
export default {
  name: 'Modification',
  data(){
    return{   
   mensaje: ''
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
    },
    modificar(){
      if(this.transaccion.crypto_amount <=0){
        this.mensaje= 'La cantidad de  '+ this.transaccion.crypto_code + ' debe ser mayor a cero'
      }else if(this.transaccion.money<1){
        this.mensaje= 'La cantidad de dinero debe ser mayor a uno'
      }else{
         serviceDB.modificarRegistro(this.transaccion._id, this.transaccion)
         this.mensaje= 'Modificado con exito' 
        }
    }
  },
  computed:{
   modificado(){
    return this.mensaje==='Modificado con exito' ? true:false
   }
  }
}


</script>
<style scoped>
.popUp{
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
.btnEntendido{
  flex: auto;
}
</style>