import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'

// Create a new store instance.
// const store = createStore({
//   state () {
//     return {
//       count: 0
//     }
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
    createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
