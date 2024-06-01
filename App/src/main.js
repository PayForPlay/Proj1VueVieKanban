//main.js
import { createApp, reactive } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import Router from "./router/index.js";
import VueAxios from "vue-axios";
import axios from "axios";
import VueDragscroll from "vue-dragscroll";
import "./style.css";

import PrimeVue from 'primevue/config';
import Password from 'primevue/password'
import StyleClass from 'primevue/styleclass';
import Dropdown from 'primevue/dropdown';
import Ripple from 'primevue/ripple';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';

const dropdown = {
  root: { class: ' bg-white dark:bg-dark-grey text-black dark:text-white text-sm w-full font-bold rounded px-4 py-2 relative flex items-center border border-medium-grey border-opacity-25 cursor-pointer hover:border-main-purple focus:border-main-purple group' },
  input: {class: ' bg-white dark:bg-dark-grey text-black dark:text-white text-sm  cursor-pointerp placeholder:text-medium-grey '},
  wrapper: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm font-bold'},
  itemGroup: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  item: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm p-4 mt-4 hover:text-black border-medium-grey '},
  trigger: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm absolute right-0'},
  header: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
}
const calendar = {
  root: { class: ' bg-white dark:bg-dark-grey text-black dark:text-white text-sm w-full font-bold rounded px-4 py-2 relative flex items-center border border-medium-grey border-opacity-25 cursor-pointer hover:border-main-purple focus:border-main-purple group' },
  input: {class: ' bg-white dark:bg-dark-grey text-black dark:text-white text-sm  cursor-pointerp placeholder:text-medium-grey '},
  wrapper: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm font-bold'},
  itemGroup: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  item: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm p-4 mt-4 hover:text-black border-medium-grey '},
  trigger: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm absolute right-0'},
  header: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  panel: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
}
const autocomplete = {
  root: { class: ' bg-white dark:bg-dark-grey text-black dark:text-white text-sm w-full font-bold rounded px-4 py-2 relative flex items-center border border-medium-grey border-opacity-25 cursor-pointer hover:border-main-purple focus:border-main-purple group' },
  input: { class: ' bg-white dark:bg-dark-grey text-black dark:text-white text-sm h-6 cursor-pointerp placeholder:text-medium-grey '},
  container: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  token: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  tokenLable: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  container: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  inputToken: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  dropDown: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm border-medium-grey'},
  panel: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  list: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm border-medium-grey'},
  itemGroup: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'},
  item: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm p-4 mt-4 hover:text-black border-medium-grey '},
  emptyMessage: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm h-6 cursor-pointerp placeholder:text-medium-grey '},
  searchResultMessage: {class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm h-6 cursor-pointerp placeholder:text-medium-grey '},
  selectedMessage: { class: 'bg-white dark:bg-dark-grey text-black dark:text-white text-sm'}
  
}
const toast = {
  container: { class: 'min-h-[5vh] p-2'},
  text: { class: 'pl-2' },
}
export const state = reactive({
  connected: false,
});

const pinia = createPinia();
const app = createApp(App).use(pinia).use(Router);
app.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
app.use(VueAxios, axios);
app.use(VueDragscroll);


app.directive('ripple', Ripple);
app.use(PrimeVue, { /* options */ ripple: true, unstyled: false, pt: {dropdown, calendar, autocomplete, toast}});// настройка стилей

app.directive('styleclass', StyleClass);
app.use(ToastService);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('Dropdown', Dropdown);
app.component('AutoComplete', AutoComplete);
app.component('Calendar', Calendar);
(async () => {
  // Ожидание загрузки всех асинхронных компонентов и инициализации роутера
  await Router.isReady();
  app.mount("#app");
})();