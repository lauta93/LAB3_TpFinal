import axios from "axios"
const apiCryptos =axios.create({})
export default{
	getPrecioBitcoin(){
		return apiCryptos.get("https://criptoya.com/api/argenbtc/usdt/ars/1")
	},
	getMarkets(monedaSeleccionada, cantidad){
		return apiCryptos.get("https://criptoya.com/api/"+monedaSeleccionada+"/ars/"+cantidad)
	}
}
