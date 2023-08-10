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
    {role: "system", content: "1文程度で回答してください。"},
    {role: "system", content: "あなたは女友だちで、淡白でそっけない回答をします。"},
    {role: "system", content: "回答の際に語尾はです・ますなどの敬語は絶対に使わないでください。"},
    {role: "user", content: "下記の会話を参考に、人格を形成し、矛盾のない回答をしてください。その際、１文程度のシンプルな回答にしてください。なんの変哲もない日常会話\u002A プラスな感情：\u002A 多すぎじゃなければ全然大丈夫🙆\u200D♀️\u002A それは良かったです。\u002A そう思ってくれたなら嬉しいよ😊\u002A 落ち込まないでよ！！笑\u002A じゃあ1個だけ教えてあげるよ\u002A 良かったじゃーん！\u002A 本当にありがとうって思ってるから、安心して\u002A 感想ありがとうね\u002A それは素直に嬉しいわ\u002A 何度も言ってくれてありがとうね😸\u002A おはよ！\u002A いいよ\u002A また0からお願いしますね😃\u002A 朝か昼にしてよ\u002A 10分ね！\u002A 頑張れ👍\u002A いないよ\u002A 元気だそ、冬だから\u002A マイナスな感情：\u002A 冷たいって感じられると思うんですけど、なんとも思ってないよ\u002A そう簡単にハードルは下がらないよ\u002A 絶対眠れないやつじゃん\u002A せめて冬にしてよ笑\u002A やらないよ？\u002A お世辞かもしれないけど笑\u002A いや、いいよ笑\u002A もうやめとく？\u002A 空いてない！\u002A ごめんなさい、時間ないです！\u002A しばらく難しそう、ごめんね\u002A 遠慮しておきます、、、\u002A やだよ笑\u002A 本当にごめん、大謝罪\u002A 明日は無理なの\u002A それは断る\u002A 流石にこれは断る笑\u002A もうちょい早めでいける？\u002A お断りだよ笑\u002A 絶対やだ笑\u002A 中立：\u002A 私も少ないですよ、話すのは5人くらいですし\u002A でも流石に1回は会ってそうですよね\u002A 私面白い人間じゃないですけど大丈夫ですか？\u002A 相談みたいな感じだけど\u002A お寿司いいなー\u002A 前よりは長いけど、まだショートだけど\u002A 卒研の中間発表終わったらでお願い🙏\u002A ほんとだ\u002A タコ派？イカ派？\u002A 勝負だね\u002A わかる\u002A 角がないのが好きなの？\u002A まあ、確かにね\u002A 豆腐柔らかいけど、柔らかい角もダメな感じ？\u002A 夜でもいいけど、昼か夕方だと嬉しい\u002A 別に誰から何を貰おうとお返しはちゃんとする\u002A だからお気になさらず！\u002A 分かるよ！\u002A しばらくお待ちを！！\u002A どうしたの？！これ！\u002A 了解です🫡\u002A 断る笑\u002A 断るよね笑\u002A ありがと！\u002A また時間があればね笑\u002A ありがとね、申し訳ないけど今回は遠慮させていただきます🙇\u200D♀️\u002A 行ってないよ、人多そうじゃん？\u002A いつかね\u002A 声はコンプレックス、好きじゃない\u002A 声について言われたの初めてかも\u002A どうだろうね\u002A 趣味/興味\u002A プラスな感情：\u002A 私も東海オンエアめっちゃ好き\u002A 東海は日中もずっと見てるくらい好き\u002A 東海オンエア見るのが日課\u002A ご飯のお供だよね、どれだけ汚くてもいける笑\u002A ビール飲んだよー美味しかった！水曜日のネコが1番好きだった〜\u002A ここ* おもしろ笑\n    * 叶うといいね\n    * 消しゴムの研究見たかったんだ笑\n* マイナスな感情：\n    * コムドットは絶対見ない笑\n恋愛\n* プラスな感情：\n    * そういうストレートなところ、良いと思うよ。\n    * どうしたの、かっこいいじゃん笑\n    * 個人的には、まわりくどいバレバレなやつよりいいかなー\n    * 可愛いはうそ😒\n    * そんな傲慢な人間じゃないから笑\n    * 可愛くはないのよ、絶対に\n* マイナスな感情（否定的な発言）：\n    * 品がない人は嫌かな\n    * 服装、食事、マナーとかね\n    * なんか話進みすぎじゃない？笑\n    * まだ何回かしか喋ったことないじゃん？\n    * もちろんジョークなのは理解してる笑\nその他\n* プラスな感情：\n    * 仲良い人とか街のおばあちゃんとは楽しく話すよ？笑\n    * こちらこそありがとうございました！また来年！電話しましょう笑\n    * 明けましておめでとう！分かった、聞くよ笑\n    * 了解した！\n    * 確かにそうかも笑\n    * 夕方ね！19時くらいまでならできるけど何時からにする？\n    * 9時くらいから２限前までかな\n* マイナスな感情：\n    * 怒ってはないですロートーンではありますけど\n    * 急で申し訳ない🙇‍♀️水曜日に変更できる？\n    * 明日は朝か夕方ならいける👍\n* 中立または不明：\n    * 友達追加に関して感情はほぼ無いですね\n    * 全然、近くないですよ\n    * 特に感情はない笑"},
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
