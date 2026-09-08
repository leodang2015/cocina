import { createApp } from 'vue'
import { Quasar } from 'quasar'
import * as components from 'quasar'

// Estilos de Quasar e Iconos
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './routes/routes.js'

const myApp = createApp(App)

// Registrar Quasar junto con sus componentes
myApp.use(Quasar, {
  components,
  plugins: {}
})

myApp.use(router)
myApp.mount('#app')