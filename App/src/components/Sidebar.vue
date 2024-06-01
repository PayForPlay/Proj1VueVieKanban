<template>
  <div id="SideBar" data-dragscroll class="z-10 transition-all fixed" :class="managerStore.sidebar ? ['translate-x-[0]'] : ['translate-x-[-100%]']
    ">
    <div
      class="bg-white dark:bg-dark-grey min-h-[calc(100vh-80px)] w-64 lg:w-[300px] pb-10 hidden sm:flex sm:flex-col border-r border-r-lines-light dark:border-r-lines-dark">
      <template v-if="isAdmin" class="">
        <ul class="text-medium-grey text-xs font-bold py-4 px-6">
          <li>
            <p class="text-medium-grey text-xs font-bold py-4 px-6">
              Панель администратора
            </p>
          </li>
          <li @click="navigate(menu.link)" :class="menu?.link === router.currentRoute.value.path
            ? [
              'bg-main-purple',
              'text-white',
              'fill-white',
              'hover:bg-main-purple-light',
            ]
            : [
              'fill-medium-grey',
              'hover:text-main-purple',
              'hover:fill-main-purple',
              'hover:bg-main-purple/10',
            ]
            "
            class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold"
            v-for="(menu, index) in adminMenus" :key="menu.label">
            <div class="mr-2" v-html="menu.icon"></div>

            <p class="hidden sm:block">
              {{ menu.label }}
            </p>
          </li>
        </ul>
      </template>

      <template v-if="isLoggedIn">
        <ul class="text-medium-grey text-xs font-bold py-4 px-6">
          <li @click="navigate(menu.link)" :class="menu?.link === router.currentRoute.value.path
            ? [
              'bg-main-purple',
              'text-white',
              'fill-white',
              'hover:bg-main-purple-light',
            ]
            : [
              'fill-medium-grey',
              'hover:text-main-purple',
              'hover:fill-main-purple',
              'hover:bg-main-purple/10',
            ]
            "
            class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold"
            v-for="(menu, index) in menus" :key="menu.label">
            <div class="mr-2" v-html="menu.icon"></div>

            <p class="hidden sm:block">
              {{ menu.label }}
            </p>

            <div v-if="menu.label === 'Почта'"
              class="w-7 h-7 flex flex-col items-center justify-center bg-light-grey dark:bg-very-dark-grey text-black dark:text-white rounded-md shadow-inner absolute right-2 sm:right-2">
              {{ unread }}
            </div>
          </li>
        </ul>
      </template>

      <div v-if="router.currentRoute.value.path === '/Board'">
        <p class="text-medium-grey text-xs font-bold py-4 px-6">
          Все доски ({{ boardsStore.boards.length }})
        </p>
        <div class="max-h-60 overflow-y-scroll shadow-inner mr-1">
          <div @click="onClickBoard(index)" v-for="(board, index) in boardsStore.boards" :key="index"
            class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold"
            :class="board?._id === boardsStore?.getCurrentBoard?._id
              ? [
                'bg-main-purple',
                'text-white',
                'fill-white',
                'hover:bg-main-purple-light',
              ]
              : [
                'fill-medium-grey',
                'hover:text-main-purple',
                'hover:fill-main-purple',
                'hover:bg-main-purple/10',
              ]
              ">
            <IconBoard />
            <span>{{ board.name }}</span>
          </div>
        </div>
        <div @click="createNewBoard()"
          class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-green hover:bg-medium-grey/10">
          <IconAdd />
          <span>+ Создать новую доску</span>
        </div>
      </div>

      <div v-if="router.currentRoute.value.path === '/Mail'">
        <p class="text-medium-grey text-xs font-bold py-4 px-6">
          Письмо
        </p>
        <div @click="show('relevant')"
          class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10"
          :class="mailsStore.mailFilter === 'relevant'
            ? [
              'bg-main-purple',
              'text-white',
              'fill-white',
              'hover:bg-main-purple-light',
            ]
            : [
              'fill-medium-grey',
              'hover:text-main-purple',
              'hover:fill-main-purple',
              'hover:bg-main-purple/10',
            ]
            ">
          <IconIncomeMail />
          <span>Входящие</span>
        </div>
        <div @click="show('sent')"
          class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10"
          :class="mailsStore.mailFilter === 'sent'
            ? [
              'bg-main-purple',
              'text-white',
              'fill-white',
              'hover:bg-main-purple-light',
            ]
            : [
              'fill-medium-grey',
              'hover:text-main-purple',
              'hover:fill-main-purple',
              'hover:bg-main-purple/10',
            ]
            ">
          <IconSent />
          <span>Отправленные</span>
        </div>
        <div @click="show('deleted')"
          class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10"
          :class="mailsStore.mailFilter === 'deleted'
            ? [
              'bg-main-purple',
              'text-white',
              'fill-white',
              'hover:bg-main-purple-light',
            ]
            : [
              'fill-medium-grey',
              'hover:text-main-purple',
              'hover:fill-main-purple',
              'hover:bg-main-purple/10',
            ]
            ">
          <IconTrash />
          <span>Удаленные</span>
        </div>
        <div @click="createNewMail()"
          class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-green hover:bg-medium-grey/10">
          <IconAdd />
          <span>+ Создать новое сообщение</span>
        </div>
      </div>

      <div class="flex flex-col gap-2 mt-auto">
        <DarkModeSwitch class="w-10/12 mx-auto" />
        <HideSidebar class="w-11/12" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed, ref, watch, reactive } from "vue";
import IconBoard from "./Kanban/icons/IconBoard.vue";
import DarkModeSwitch from "./Kanban/manager/sidebar/DarkModeSwitch.vue";
import HideSidebar from "./Kanban/manager/sidebar/HideSidebar.vue";
import IconTrash from "./Kanban/icons/iconTrash.vue"
import IconIncomeMail from "./Kanban/icons/IconIncomeMail.vue"
import IconAdd from "./Kanban/icons/iconAdd.vue"
import IconSent from "./Kanban/icons/iconSent.vue"

import { useRouter } from "vue-router";
const router = useRouter();
import { useManagerStore } from "../stores/manager";
const managerStore = useManagerStore();
import { useBoardsStore } from "../stores/boards";
const boardsStore = useBoardsStore();
import { useAuthStore } from "../stores/AuthStore";
const store = useAuthStore();
import { useMailsStore } from '../stores/mails'
const mailsStore = useMailsStore()
const menus = ref([])
onMounted(store.checkLoginState);
const isLoggedIn = computed(() => store.isLoggedIn);
const isAdmin = computed(() => store.isAdmin);
const unread = ref(0)

watch(() => mailsStore.unread, () => {
  if(mailsStore.unread !== null){
    unread.value = mailsStore.unread
  }
});


const onClickBoard = (index) => {
  boardsStore.selectedBoard = index;
};
const createNewBoard = () => {
  managerStore.overlay = true;
  managerStore.boardForm = { visible: true, edit: false };
};

const createNewMail = () => {
  managerStore.hideOverlay()
  managerStore.overlay = true;
  managerStore.mailView = false;
  managerStore.mailForm = true;
};
const show = (filter) => {
  mailsStore.mailFilter = filter;
};

const navigate = (route) => {
  router.push(route);
};
const adminMenus = ref([
  {
    label: "Регистрация",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>`,
    link: "/Registration",
  },
]);
menus.value = [
  {
    label: "Почта",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>`,
    link: "/Mail"
  },
  {
    label: "Задачи",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                        </svg>`,
    link: "/Board",
  },
  {
    label: "Календарь",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>`,
    link: "/Calendar",
  },
  {
    label: "Выйти",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>`,
    link: "/Logout",
  },
];
</script>
