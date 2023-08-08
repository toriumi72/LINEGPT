import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'
export default defineNuxtPlugin((nuxtApp) => {
  /** firebase app initialize */
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    appId: config.public.appId,
  }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  /** provide things */
  nuxtApp.provide('firebaseApp', app)
  nuxtApp.provide('fireAuth', auth)
  nuxtApp.provide('fireFunctions', getFunctions(app))
})