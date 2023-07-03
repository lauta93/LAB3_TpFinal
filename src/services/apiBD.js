import axios from "axios"
const apiClient = axios.create({
    baseURL: 'https://labor3-d60e.restdb.io/rest',
    headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'}
    })
    export default{
        registrarCompra(obj){
            return apiClient.post("https://labor3-d60e.restdb.io/rest/transactions", obj)
        },
        obtenerRegistro(user){            
            return apiClient.get('https://labor3-d60e.restdb.io/rest/transactions?q={"user_id": "'+user+'"} ')
        },
        modificarRegistro(idTransaccion, obj){            
            return apiClient.patch('https://labor3-d60e.restdb.io/rest/transactions/'+idTransaccion, obj)
        },
        eliminarRegistro(idTransaccion){
            return apiClient.delete('https://labor3-d60e.restdb.io/rest/transactions/'+idTransaccion)
        }
        
    }