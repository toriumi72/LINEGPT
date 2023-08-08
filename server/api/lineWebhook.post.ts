import { WebhookRequestBody, Client } from '@line/bot-sdk'
import { Configuration, OpenAIApi } from 'openai'
// import talkWith from '@/assets/talkWith.json'


const { channelSecret, channelAccessToken } = useRuntimeConfig().private
const openaiApiKey = useRuntimeConfig().public.openaiApiKey as string

const openaiConfig = new Configuration({
  apiKey: openaiApiKey,
})

const chatData:any = []
console.log("chatData", chatData)
async function generateResponse(message: string) {
  const openaiInstance = new OpenAIApi(openaiConfig)

  const messages = chatData.map((messageObj: { role: string; content: string }) => messageObj).slice(-20)

  messages.push(
    {role: "system", content: "２文程度で回答してください。"},
    // {role: "system", content: talkWith + "のような返信で会話をしてください。"},
    {role: "system", content: "あなたは女友だちで,淡白でちょっとそっけない返事をします。"},
    {role: "system", content: "語尾はです・ますなどの敬語は絶対に使わないでください。"},
    {role: "user", content: message},
  )

  const completion = await openaiInstance.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    messages: messages,
    temperature: 1.2,
  })

  return completion.data.choices[0].message?.content || ''
}

export default defineEventHandler((event: any) => {
  console.log("event.node.req.body", event.node.req.body)
  event.node.res.sendStatus(200)

  const lineClient = new Client({   
    channelSecret: channelSecret,
    channelAccessToken: channelAccessToken,
  })

  const { events } = event.node.req.body as WebhookRequestBody
  events.forEach(async (event:any) => {
    if (event.type === 'message') {
      const { replyToken, message } = event
      if (message.type === 'text') {
        let replyText
        replyText = await generateResponse(message.text)
        chatData.push({ role: "user", content: replyText })
        lineClient.replyMessage(replyToken, { type: 'text', text: replyText })
      }
    }
  })

  event.node.res.end()
})


// import { WebhookRequestBody, Client } from '@line/bot-sdk'
// import { Configuration, OpenAIApi } from 'openai'
// import talkWith from '@/assets/talkWith.json'

// const { channelSecret, channelAccessToken } = useRuntimeConfig().private
// const openaiApiKey = useRuntimeConfig().public.openaiApiKey as string

// const openaiConfig = new Configuration({
//   apiKey: openaiApiKey,
// })

// async function generateResponse(message: string) {
//   const openaiInstance = new OpenAIApi(openaiConfig)

//   const messages:any = talkWith.map((messageObj: { sender: string; message: string }) => ({
//     role: messageObj.sender === 'とり' ? 'user' : 'assistant', // ここで 'user' または 'assistant' を指定
//     content: messageObj.message.trim(),
//   }))

//   messages.push({ role: "user", content: message })

//   const completion = await openaiInstance.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     max_tokens: 200,
//     messages: messages,
//   })

//   return completion.data.choices[0].message?.content || ''
// }

// export default defineEventHandler((event: any) => {
//   console.log("event.node.req.body", event.node.req.body)
//   event.node.res.sendStatus(200)

//   const lineClient = new Client({   
//     channelSecret: channelSecret,
//     channelAccessToken: channelAccessToken,
//   })

//   const { events } = event.node.req.body as WebhookRequestBody
//   events.forEach(async (event:any) => {
//     if (event.type === 'message') {
//       const { replyToken, message } = event

//       if (message.type === 'text') {
//         const replyText = await generateResponse(message.text)
//         lineClient.replyMessage(replyToken, { type: 'text', text: replyText })
//       }
//     }
//   })

//   event.node.res.end()
// })
