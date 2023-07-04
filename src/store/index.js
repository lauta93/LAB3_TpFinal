import { createStore } from 'vuex'
import serviceDB from '@/services/apiBD.js'
import service from '@/services/apis.js'
export default createStore({
  state: {
    username: '',
    currencies: [
      {id: 'btc', nombre: 'Bitcoin', cantidad: 0, valorCompra: 0, valorVenta: 0, ganancia: 0, vendido: 0, comprado: 0, dif: 0, precioUnitarioCompra: 0, precioUnitarioVenta:0, cantidadComprada:0, cantidadVendida: 0},
      {id: 'eth', nombre: 'Ethereum', cantidad: 0, valorCompra: 0, valorVenta: 0, ganancia: 0, vendido: 0, comprado: 0, dif: 0, precioUnitarioCompra: 0, precioUnitarioVenta:0, cantidadComprada:0, cantidadVendida: 0},
      {id: 'dai', nombre: 'DAI', cantidad: 0, valorCompra: 0, valorVenta: 0, ganancia: 0, vendido: 0, comprado: 0, dif: 0, precioUnitarioCompra: 0, precioUnitarioVenta:0, cantidadComprada:0, cantidadVendida: 0},
      {id: 'usdt', nombre: 'USDT', cantidad: 0, valorCompra: 0, valorVenta: 0, ganancia: 0, vendido: 0, comprado: 0, dif: 0, precioUnitarioCompra: 0, precioUnitarioVenta:0, cantidadComprada:0, cantidadVendida: 0},        
      {id: 'doge', nombre: 'DogeCoin', cantidad: 0, valorCompra: 0, valorVenta: 0, ganancia: 0, vendido: 0, comprado: 0, dif: 0, precioUnitarioCompra: 0, precioUnitarioVenta:0, cantidadComprada:0, cantidadVendida: 0}        
    ],
    mostrarPopUp: false,
    modificar: false,
    vender: false,
    transacciones: []  
  },
  getters: {
  },
  mutations: {
    IngresarUsuario(state, usuario){
      state.username= usuario
    },
    CargarTransacciones(state, transacctions){
      state.transacciones=transacctions     

    },
    calcularCantidades(){
      this.state.currencies.forEach(curencie=>{
        curencie.cantidad=0
      })
      this.state.transacciones.forEach(transaccion => {
        this.state.currencies.forEach(moneda=>{
            if(transaccion.crypto_code===moneda.id){
                if(transaccion.action==='purchase'){
                    moneda.cantidad=parseFloat(moneda.cantidad)+parseFloat(transaccion.crypto_amount)
                }
                else{
                    moneda.cantidad=parseFloat(moneda.cantidad)-parseFloat(transaccion.crypto_amount)
                }
            }
        })
    })
    },
    obtenerPrecioVenta(){
      this.state.currencies.forEach(moneda=>{
        service.getPrecioMoneda(moneda.id).then((response)=>{
          moneda.valorVenta=response.data.totalBid   
        })
      })      
    },
    obtenerPrecioCompra(){
      this.state.currencies.forEach(moneda=>{
        service.getPrecioMoneda(moneda.id).then((response)=>{
          moneda.valorCompra=response.data.totalAsk       
        })
      })
    }  
  },
  actions: {
    obtenerTransacciones({commit}){
      serviceDB.obtenerRegistro(this.state.username).then((response)=>{
        commit('CargarTransacciones', response.data)
      })
    }   
  },
  modules: {
  }
})
