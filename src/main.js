import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import axios from "axios"
import staticVariables from "./staticVariables.js";

const app = createApp(App)

axios.defaults.baseURL = staticVariables.backendAddress
app.provide("axios", axios)

app.mount('#app')
