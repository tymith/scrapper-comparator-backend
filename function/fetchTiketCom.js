import axios from 'axios'

const fetchTiketCom = async () => {
    const data = []
    let url = 'https://www.tiket.com/ms-gateway/tix-flight-search/search?origin=JKTC&destination=DPS&departureDate=2018-11-29&adult=1&child=0&infant=0&cabinClass=ECONOMY&originType=CITY&destinationType=AIRPORT&searchType=ONE_WAY&resultType=ALL'   
    const result = await axios.get(url)
    for (var a = 0; a < 10; a++) {
        data.push({
            plane_vendor: result.data.data.searchList.departureFlights[a].marketingAirline.name,
            price: result.data.data.searchList.departureFlights[a].fareDetail.cheapestFare,
            final_price: result.data.data.searchList.departureFlights[a].fareDetail.cheapestFare,
            departure: result.data.data.searchList.departureFlights[a].departure.time,
            arrival: result.data.data.searchList.departureFlights[a].arrival.time,
            source: {
                source_id: 3,
                source_name: 'Tiket.com'
            }
        })
    }
    return await data

}

export default fetchTiketCom