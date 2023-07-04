import { createApp } from "vue";
import "./assets/main.scss";
import App from "./App.vue";
import router from "./routers/index";
import { initFirebase } from "./firebase/index.js";

const app = createApp(App);
initFirebase();

app.use(router).mount("#app");
