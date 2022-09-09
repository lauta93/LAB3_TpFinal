import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
    currencies: [
      {id: 'btc', nombre: 'Bitcoin'},
      {id: 'eth', nombre: 'Ethereum'},
      {id: 'dai', nombre: 'DAI'},
      {id: 'usdt', nombre: 'USDT'},        
      {id: 'doge', nombre: 'DogeCoin'}        
    ],
    mostrarPopUp: false     
  },
  getters: {
  },
  mutations: {
    IngresarUsuario(state, usuario){
      state.username= usuario
    }
   
  },
  actions: {
  },
  modules: {
  }
})
