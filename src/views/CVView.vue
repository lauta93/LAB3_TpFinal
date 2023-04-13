<template>       
  <h2>Dar de alta nueva compra</h2>
    <select v-model="monedaSeleccionada"> 
        <option value="">Elegi una moneda</option>          
        <option v-for="moneda in monedas" :key="moneda" v-bind:value="moneda.id">
        {{moneda.nombre}}
        </option>
    </select>
    <div v-if="monedaSeleccionada!=''">
<label> Cuanto {{monedaSeleccionada.toUpperCase()}} desea comprar?
    <input @keypress.enter="getExchanges" type="text" v-model="monto">
</label>
    <button @click="getExchanges">Buscar Markets</button>
    </div>

    <div id="contenedor" v-if="exchanges!=''">
      <div id="compra">
        <h5>Elegi el mejor precio para comprar {{monedaSeleccionada.toUpperCase()}} en los markets aqui abajo  (comisiones incluidas)</h5>
        <table class="table">
            <tr>
                <th>Exchange</th>
                <th>Precio compra</th>
            </tr>
            <tr v-for="(exchange, key) in exchanges" :key="exchange">
            <td>{{ key.toUpperCase() }}</td>
            <td>{{((exchange.totalAsk)*monto).toFixed(2)}}</td>
            <td><button @click="selectedPrice=exchange.totalAsk, exchanges=''">Comprar</button></td>
            </tr>
        </table>
     </div>
   </div>

   <div v-if="selectedPrice!=''">
    <div>
        <p>Estas a punto de dar de alta una compra de {{monto}} {{monedaSeleccionada}} por el valor de  AR${{(selectedPrice*monto).toFixed(2)}} </p>
        <button @click="verificarDatos">Confirmar</button>
        <button @click="cancelar">Cancelar</button>
    </div>   
   </div>
  <notifComponent v-if="this.$store.state.mostrarPopUp" :message="'Compra dada de alta exitosamente'"></notifComponent>
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
computed:{
        
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
            // se podria encapsular en otro metodo          
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
.table{
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
</style>