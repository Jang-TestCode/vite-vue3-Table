import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import "./assets/css/bootstrap.min.css";
// 1.导入 axios 
import axios from "axios";

const app = createApp(App)

// 2.将 axios 挂载在全局
app.config.globalProperties.$http = axios

// 3.配置请求根路径
axios.defaults.baseURL = 'https://www.escook.cn'

app.mount('#app')
