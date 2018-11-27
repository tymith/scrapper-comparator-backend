import axios from 'axios'

const fetchAiryRooms = async () => {
    const data = []
    const result = await axios.post('https://sky-api.airyrooms.com/v1/search/oneway', { "data": { "journey": { "depAirportOrAreaCode": "JKTA", "arrAirportOrAreaCode": "DPS", "depDate": "11-29-2018" }, "passengers": { "adult": 1, "child": 0, "infant": 0 } }, "context": { "headers": {} }, "trackingContext": { "intf": "WEB", "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36", "deviceType": "MOBILE", "ipAddress": null } })
    for (var a = 0; a < 10; a++) {
        data.push({
            plane_vendor: result.data.data.searchResults[a].journeys[0].segments[0].operatingAirline,
            price: result.data.data.searchResults[a].journeys[0].fareInfo.partnerFare.adultFare.totalFareWithCurrency.amount.toString(),
            final_price: result.data.data.searchResults[a].journeys[0].fareInfo.partnerFare.adultFare.totalFareWithCurrency.amount.toString(),
            departure: result.data.data.searchResults[a].journeys[0].departureDetail.departureTime,
            arrival: result.data.data.searchResults[a].journeys[0].arrivalDetail.arrivalTime,
            source: {
                source_id: 2,
                source_name: 'AiryRooms'
            }
        })
    }
    return await data
}

export default fetchAiryRooms