import { createStore } from 'vuex'
import serviceDB from '@/services/apiBD.js'
export default createStore({
  state: {
    username: '',
    currencies: [
      {id: 'btc', nombre: 'Bitcoin', cantidad: 0},
      {id: 'eth', nombre: 'Ethereum', cantidad: 0},
      {id: 'dai', nombre: 'DAI', cantidad: 0},
      {id: 'usdt', nombre: 'USDT', cantidad: 0},        
      {id: 'doge', nombre: 'DogeCoin', cantidad: 0}        
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
