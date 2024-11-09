import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVuetify } from 'vuetify/lib/framework.mjs';
import router from './router';

const app = createApp(App);
const vuetify = createVuetify();

app.use(createPinia());
app.use(vuetify).use(router);

app.mount('#app');
