<template>
    <div class="popUp">
        <div class="recuadro-inner">    
        <div> Cantidad de {{moneda}} a vender: <input type="number" v-model="cantidadElegida"></div>
        <div>Elegi el mejor precio para vender</div>
        <select v-model="precioElegido">
            <option v-for="(exchange, key) in exchanges" :key="exchange" 
         v-bind:value="exchange.totalBid">
         {{key}}: AR${{((exchange.totalBid)*cantidadElegida).toFixed(2)}}
         </option>
        </select>
        <div>{{mensaje}}</div>
        <button v-if="!vendido" @click="confirmarVenta">Confirmar</button>
        <button v-if="!vendido" @click="cancelar">Cancelar</button>
        <button v-if="vendido" @click="cancelar">Entendido</button> 
        </div>          
    </div>
    </template>
    <script>
    import service from '@/services/apis.js'
    import serviceDB from '@/services/apiBD.js'
    export default {
      name: 'Venta',
      data(){
        return{   
       mensaje: '',
       cantidadElegida: '',
       precioElegido: 0,
       exchanges: [],
       ventaConfirmada: {}
        }
      },
      props: {
        moneda: {
          required: true,
          type: String
        },
        cantidadTotal:{
            required: true,
            type: Number
        }
      },
      methods:{
        confirmarVenta(){
        if(this.cantidadTotal < this.cantidadElegida){
        this.mensaje= 'No tienes suficientes  '+ this.moneda 
        }
        else if(this.cantidadElegida<=0){
        this.mensaje= 'La cantidad de '+ this.moneda  +' debe ser mayor a cero'
        }else if(this.precioElegido<=0){
        this.mensaje= 'Debes elegir donde vender tus ' + this.moneda
        }
        else{
        this.ventaConfirmada={
                "user_id": this.$store.state.username,
                "action": "sale",
                "crypto_code": this.moneda,
                "crypto_amount": this.cantidadElegida,
                "money": (this.precioElegido*this.cantidadElegida).toFixed(2),
                "datetime": (Date.now() - 10800000)
            }
        serviceDB.registrarCompra(this.ventaConfirmada)
         this.mensaje= 'Venta exitosa'        
        }
           this.$store.dispatch('obtenerTransacciones')      
           this.$store.commit('calcularCantidades')
        },
      cancelar(){
           this.$store.state.vender=false
           this.$store.dispatch('obtenerTransacciones')      
           this.$store.commit('calcularCantidades')
     }
      },
      computed:{
       vendido(){
        return this.mensaje==='Venta exitosa'  ? true:false
       }
      },
      mounted(){
        service.getMarkets(this.moneda, this.cantidadTotal).then((response)=>{
          this.exchanges=response.data         
        })
      },
      unmounted(){
        this.$store.dispatch('obtenerTransacciones')
        this.$store.commit('calcularCantidades')
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