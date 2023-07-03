import axios from "axios"
const apiCryptos =axios.create({})
export default{
	getPrecioMoneda(moneda){
		return apiCryptos.get("https://criptoya.com/api/ripio/"+moneda+"/ars/1")
	},
	getMarkets(monedaSeleccionada, cantidad){
		return apiCryptos.get("https://criptoya.com/api/"+monedaSeleccionada+"/ars/"+cantidad)
	}
}
