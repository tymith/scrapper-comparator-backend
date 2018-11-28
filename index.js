import express from 'express'
import fetchTiketCom from './function/fetchTiketCom'
import fetchAiryRooms from './function/fetchAiryRooms';

const app = express()
const port = 1234

app.get('/ticket',async (req,res)=>{
    try{
      let data = []
      const resultTiketCom = await fetchTiketCom()
      const resultAiryRooms = await fetchAiryRooms()
      data.push(...resultTiketCom,...resultAiryRooms)
      res.send(data.sort((a, b) => parseInt(a.final_price) - parseInt(b.final_price)))
    }
    catch(e){
      console.log(e)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))