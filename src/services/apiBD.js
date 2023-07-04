import axios from "axios"
const apiClient = axios.create({
    baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
    headers: {'x-apikey': '60eb09146661365596af552f'}
    })
    export default{
        registrarCompra(obj){
            return apiClient.post("https://laboratorio3-f36a.restdb.io/rest/transactions", obj)
        },
        obtenerRegistro(user){            
            return apiClient.get('https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "'+user+'"} ')
        },
        modificarRegistro(idTransaccion, obj){            
            return apiClient.patch('https://laboratorio3-f36a.restdb.io/rest/transactions/'+idTransaccion, obj)
        },
        eliminarRegistro(idTransaccion){
            return apiClient.delete('https://laboratorio3-f36a.restdb.io/rest/transactions/'+idTransaccion)
        }
        
    }