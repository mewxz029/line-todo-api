const line = require('@line/bot-sdk');
const express = require('express');
const axios =  require('axios').default;
const dotenv = require('dotenv')
const AppConfig = require('./src/app.config.js')
const TodoService = require('./src/modules/todo/services/todo.service.js')

// create LINE SDK config from env variables
const env = dotenv.config().parsed
const app = express()

app.use(AppConfig)

const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecret: env.SECRET_TOKEN
}
// register a webhook handler with middleware
const client = new line.Client(lineConfig)
// about the middleware, please refer to doc
app.post('/callback', line.middleware(lineConfig), async (req, res) => {
  try{
    const events = req.body.events
    console.log(req.body)
    console.log('event=>>>>',events)
    return events.length > 0 ? await events.map(item => handleEvent(item)) : res.status(200).send("OK")
  }catch (error){
    res.status(500).end()
  }

});

const handleEvent = async (event) =>{
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }
  else if (event.message.text === 'Get Todo') {
    try {
      const todos = await TodoService.getAll()
      return client.replyMessage(event.replyToken,{type:'text',text: `${JSON.stringify(todos)}` })  
    } catch (error) {
      return error
    }
  }
  else if (event.message.text === 'Create Todo') {
    try {
      const todo = {
        title: 'Working',
        isComplete: false
      }
      const created = await TodoService.create(todo)
      return client.replyMessage(event.replyToken,{type:'text',text: `${JSON.stringify(created)}` })  
    } catch (error) {
      return error
    } 
  }
}

app.get('/', async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TEST'
  })
})
// listen on port
app.listen(4000, () => {
  console.log('listening on 4000');
});
