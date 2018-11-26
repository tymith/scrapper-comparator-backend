import express from 'express'
import puppeteer from 'puppeteer'
import $ from 'cheerio'
import finalPrice from './function/finalPrice'
import axios from 'axios'
const url = 'https://www.traveloka.com/en-id/flight/fullsearch?ap=JKTA.DPS&dt=28-11-2018.NA&ps=1.0.0&sc=ECONOMY';


const app = express()
const port = 8000

app.get('/ticket',(req,res)=>{
    const data = []
  axios.default.post('https://sky-api.airyrooms.com/v1/search/oneway', { "data": { "journey": { "depAirportOrAreaCode": "JKTA", "arrAirportOrAreaCode": "DPS", "depDate": "11-29-2018" }, "passengers": { "adult": 1, "child": 0, "infant": 0 } }, "context": { "headers": {} }, "trackingContext": { "intf": "WEB", "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36", "deviceType": "MOBILE", "ipAddress": null } })
    .then(function (result) {
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
    })
    .then(function(){
      axios.default.get('https://www.tiket.com/ms-gateway/tix-flight-search/search?origin=JKTC&destination=DPS&departureDate=2018-11-29&adult=1&child=0&infant=0&cabinClass=ECONOMY&originType=CITY&destinationType=AIRPORT&searchType=ONE_WAY&resultType=ALL')
        .then(function (result) {
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
        })
        .then(function () {
          puppeteer.launch().then(async browser => {
            const page = await browser.newPage()
            await page.goto(url)
            const content = await page.content()
            $('._2fVHM > div', content).each(function (index) {
              data.push({
                plane_vendor: $(this).find('._2HE-b').text(),
                price: $(this).find('._27kIL').text(),
                final_price: finalPrice($(this).find('._27kIL').text()),
                departure: $(this).find('.RZjqh').text().slice(0, 5),
                arrival: $(this).find('.RZjqh').text().slice(18, 23),
                source: {
                  source_id: 1,
                  source_name: 'traveloka'
                },
              })
            })
            await browser.close()
          })
          .then(function(){
            res.send(data.sort((a, b) => parseInt(a.final_price) - parseInt(b.final_price)))
          })
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))