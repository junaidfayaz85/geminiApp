const express = require('express')
const bodyParser = require('body-parser')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { error } = require('console');
const app = express();

app.use(bodyParser.json())

app.post('/getResponse', async (req, res) => {
console.log(req.body.question)
const genAI = new GoogleGenerativeAI('AIzaSyBQnNvqpS0y-Zr0si3aSg6-LdmHjIY-PFw')
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "write a story about a magic backpack";

model.generateContent(req.body.question).then(result => {
console.log(result.response.text());
const response = result.response.text()
res.status(200).json({
    response: response
})
})

.catch(err=>{
    console.log(err)
    res.status(500).json({
        error: err
    })
})

})

app.get('*', (req, res)=>{
    res.status(404).json({
        msg: 'bad request'
    })
})


module.exports = app;