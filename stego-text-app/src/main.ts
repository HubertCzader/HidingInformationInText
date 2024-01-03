import { createApp } from "vue";
// import "./styles.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/bootstrap4-dark-purple/theme.css";

const app = createApp(App);
app.use(PrimeVue);
app.mount("#app");
