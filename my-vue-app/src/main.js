import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css'; // Import global styles

// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Import material design icons

// Create a Vuetify instance with custom configuration
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});

const app = createApp(App);

app.use(router);
app.use(vuetify); // Use Vuetify

app.mount('#app');
