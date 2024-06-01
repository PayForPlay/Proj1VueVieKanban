<!-- views/AuthForm.vue -->
<template>
  <div class="flex flex-col" data-dragscroll>
    <div class="grid place-items-center mx-60 my-16">
      <div
        class=" px-6 py-10 bg-white dark:bg-dark-grey rounded-lg shadow-mg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 max-w-xs w-11/12 sm:max-w-md">
        <div class="">
          <img src="../assets/hyper.svg" alt="Image" height="50" class="mx-auto h-14 w-auto" />
          <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
            Добро пожаловать
          </h2>
          <div class="text-center" v-if="store.isAdmin">
            <a class="font-normal no-underline ml-2 text-main-purple-light dark:text-main-purple cursor-pointer">
              <router-link to="/Registration">Create today!</router-link>
            </a>
          </div>
        </div>

        <form @submit.prevent="submitForm" class="mt-2">
          <BaseInput id="username" v-model="formData.username" required inputName="Username" placeholder="Username"
            class="mb-2" autocomplete="Username" />
          <BaseInput id="password" type="password" v-model="formData.password" required inputName="Password"
            placeholder="Password" autocomplete="current-password" class="mb-2" />
          <div class="flex items-center justify-between mb-4 mt-2">
          </div>
      <div v-if="loginError" class="text-red-500 text-center mt-2">{{ loginErrorMessage }}</div>
          <PrimaryLarge type="submit" class="py-3 uppercase font-sans  ">Войти</PrimaryLarge>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore.js";
import PrimaryLarge from '../components/Kanban/buttons/PrimaryLarge.vue';
import BaseInput from "../components/Kanban/form/BaseInput.vue";
import { useRouter } from "vue-router";

const loginError = ref(false); // флаг наличия ошибки
const loginErrorMessage = ref(""); // текст сообщения об ошибке

const router = useRouter();
const formData = ref({
  username: "",
  password: ""
});
const store = useAuthStore(); // Использование стора
const submitForm = async () => {
  loginError.value = false; // сброс сообщения об ошибке перед попыткой входа
  loginErrorMessage.value = "";
  try {
    const response = await store.login(formData.value.username, formData.value.password);
    await router.push({ name: "Board" });
  } catch (error) {
    loginError.value = true; // показать сообщение об ошибке
    loginErrorMessage.value = error.message;
    console.log(error.message);
  }
  formData.value.username = "";
  formData.value.password = "";
};


</script>
