const PORT = 8000
const express= require('express')
const cors=require('cors')
require('dotenv').config()

const app=express();
//this will allow us to work with json
app.use(express.json())
app.use(cors())

const API_KEY=process.env.API_KEY

 app.post('/completions',async(req,res)=>{
    const options={
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:req.body.message}],
            max_tokens:100,
        })
    }
    try {
        const reponse=await fetch('https://api.openai.com/v1/chat/completions',options)
        const data= await reponse.json()
        res.send(data);

        
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT,()=>console.log('server is running on '+PORT))