<template>       

    <select v-model="monedaSeleccionada"> 
        <option value="">Elegi una moneda</option>          
        <option v-for="moneda in monedas" :key="moneda" v-bind:value="moneda.id">
        {{moneda.nombre}}
        </option>
    </select>
    <div v-if="monedaSeleccionada!=''">
<label> Cantidad de {{monedaSeleccionada.toUpperCase()}} a comprar:
    <input @keypress.enter="getExchanges" type="text" v-model="monto">
</label>
    <button @click="getExchanges">Buscar Markets</button>
    </div>

    <div id="contenedor" v-if="exchanges!=''">
      <div id="compra">
        <h5>Elegi el mejor precio para comprar {{monedaSeleccionada.toUpperCase()}} aqui abajo  (comisiones incluidas)</h5>
        <select v-model="selectedPrice" >
         <option v-for="(exchange, key) in exchanges" :key="exchange" 
         v-bind:value="exchange.totalAsk">
         {{key}}: AR${{((exchange.totalAsk)*monto).toFixed(2)}}--->Precio comision:{{((exchange.totalAsk - exchange.ask)*monto).toFixed(2)}}
         </option>
        </select>
     </div>
   </div>

   <div v-if="selectedPrice!=''">
    <div>
        <p>Estas a punto de comprar {{monto}} {{monedaSeleccionada}} por el valor de  AR${{(selectedPrice*monto).toFixed(2)}} </p>
        <button @click="verificarDatos">Confirmar</button>
        <button @click="cancelar">Cancelar</button>
    </div>   
   </div>
  <notifComponent v-if="this.$store.state.mostrarPopUp" :message="'Compra exitosa'"></notifComponent>
</template>
<script>
import service from '@/services/apis.js'
import serviceDB from '@/services/apiBD.js'
import notifComponent from  '@/components/NotificationComponent.vue'



export default {
    name: 'CVView',
data() {
   
        return {
            monedas: [],
            monedaSeleccionada: '',            
            monto: '',
            exchanges: [],
            selectedPrice: '',
            compraConfirmada: {}
            
        }
    },
    components:{
         notifComponent
    },
methods:{       
    
    obtenerMonedas(){
            this.monedas=this.$store.state.currencies                       
        },
    getExchanges(){

        if(this.monto>0.000001){
        
        service.getMarkets(this.monedaSeleccionada, this.monto).then((response)=>{
          this.exchanges=response.data
        })
        }
             
    },
    verificarDatos(){        
        
        if(this.monto>0.000001 && (this.selectedPrice*this.monto).toFixed(2)>1){            
            this.compraConfirmada={
                "user_id": this.$store.state.username,
                "action": "purchase",
                "crypto_code": this.monedaSeleccionada,
                "crypto_amount": this.monto,
                "money": (this.selectedPrice*this.monto).toFixed(2),
                "datetime": (Date.now() - 10800000)
            }            
            serviceDB.registrarCompra(this.compraConfirmada)            
            this.cancelar()
            this.$store.state.mostrarPopUp=true

        }

        
    },
    cancelar(){
        this.monto='',
        this.monedaSeleccionada= '',
        this.exchanges='',
        this.selectedPrice=''
    },
    getFecha(){
        let currentDay = new Date()
        let currentMonth=(currentDay.getMonth()+1)
        let dia= currentDay.getDate()
        if(currentMonth<10){
            currentMonth= '0'+(currentDay.getMonth()+1)
        }
        if(dia<10){
            dia='0'+dia

        }
        return dia + "-" + currentMonth + "-" +
        currentDay.getFullYear()+ " " +currentDay.getHours()+ ":" +currentDay.getMinutes()
    }

    },    
created(){
      this.obtenerMonedas()
    }    
}

</script>
<style>
#contenedor{
    display: flex;
    justify-content: center;
   
}
/* #contenedor > div {
    width: 50%;
} */
</style>