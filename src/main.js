import { createApp } from 'vue'; 
import App from './App.vue';
import store from './store';
import '@/assets/css/tailwind.css';
import 'vue3-toastify/dist/index.css';

const app = createApp(App); 
app.config.productionTip = false;
app.use(store);

app.mount('#app');