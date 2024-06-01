<!-- App.vue -->
<template >
  <div>
    <HeaderVue />
  <main>
    <Toast />
    <div class="flex w-full">
      <SideBar v-if="AuthStore.isLoggedIn" />
      <div v-dragscroll:nochilddrag
        class="relative h-full w-screen min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto bg-light-grey dark:bg-very-dark-grey transition-all "
        :class="managerStore.sidebar ? ['sm:translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw+256px'] : ['translate-x-[0]']">
        <div data-dragscroll class="mx-auto w-11/12 pt-6 pb-24 ">
          <RouterView />
        </div>
      </div>
    </div>
    <ShowSidebar v-if="!managerStore.SideBar && AuthStore.isLoggedIn" />
  </main>
  <bgOverlay data-no-dragscroll />
  <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 max-w-xs w-11/12 sm:max-w-md">
    <SidebarMobile v-if="managerStore.sidebarMobile" />
  </div>
  </div>
</template >
  
<script setup>
import HeaderVue from './components/Header.vue';
import bgOverlay from './components/Kanban/bgOverlay.vue';
import SideBar from './components/Sidebar.vue';
import SidebarMobile from './components/Kanban/manager/SidebarMobile.vue';
import ShowSidebar from './components/Kanban/manager/sidebar/ShowSidebar.vue';
import { useToast } from "primevue/usetoast";
import { onMounted, watch } from 'vue';
import { useManagerStore } from './stores/manager';
import { useAuthStore } from './stores/AuthStore'
import { Init } from './utils/init';
import { handleKeyDown } from './utils/handleKeydown'

const toast = useToast();
const managerStore = useManagerStore();
const AuthStore = useAuthStore();
// Отслеживание появления ошибок в сторе
watch(() => managerStore.error.status, () => {
  show(managerStore.error)
});
//показать ошибку
const show = (error) => {
  if (error.message !== '') {
    if (error.message.status === 401) {
      toast.add({ severity: 'error', summary: "Ошибка авторизации", life: 3000 });
      
    } else {

      toast.add({ severity: 'error', summary: error.message, life: 3000 });
    }
    console.log(error.from)
  }
    managerStore.clearError()
    
};
//проверка токена
onMounted(async () => {
  await AuthStore.checkLoginState()
  if (AuthStore.isLoggedIn) {
    window.addEventListener("keydown", handleKeyDown)
   await Init()
  }
  
     //Темный режим
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      managerStore.darkmode = true;
    } else {
      localStorage.setItem('theme', 'light')
      managerStore.darkmode = false;
    }
    managerStore.$subscribe((mutations, state) => {
      localStorage.setItem('theme', (state.darkmode ? 'dark' : 'light'))
      if (state.darkmode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
})
</script>