// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: "firebase",
  },
  runtimeConfig: {
    public: {
      apiKey: "AIzaSyD4Ko0Iv9X8iQdeEEgAP4b9hMafny0ltM8",
      authDomain: "linegpt-45523.firebaseapp.com",
      projectId: "linegpt-45523",
      storageBucket: "linegpt-45523.appspot.com",
      messagingSenderId: "240533384262",
      appId: "1:240533384262:web:bf0560009f9a6ce3a9ae47",
      measurementId: "G-PS6ZF6ZM7T",

      openaiApiKey: "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",
    },
    private: {
      CHANNEL_ID:"2000270463",
      channelSecret:"d4219fe02fc63aceb1f2098b39f23482",
      channelAccessToken:"H3ckSK9bG9S36XS4YxwZvomvrBVs9e5ulD1QaEqibjN1LafkEoGRsGF0yqgtfEbQUxsfETOMO9y/BsAynXLioGh9BUen90i5gP1A8rU+mf1QixNj7o0IIU8JsMI2rPqU16+BVkOXAOoelTdKloxKKQdB04t89/1O/w1cDnyilFU="
    }
  }
})
