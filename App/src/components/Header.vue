<template>
  <header id="Header" class="bg-white dark:bg-dark-grey top-0 left-0 w-full flex items-center sm:pr-4">

    <div class="hidden items-center sm:flex pl-6 h-20 border-r border-r-lines-light dark:border-r-lines-dark md:h-24"
      :class="managerStore.sidebar ? ['min-w-[256px]', 'lg:min-w-[300px]'] : ['min-w-[200px]']">
      <img class="hidden dark:block" src="../assets/icons/logo-light.svg" alt="logo">
      <img class="dark:hidden" src="../assets/icons/logo-dark.svg" alt="logo">
      <p class="dark:text-white text-black font-bold text-lg absolute left-20">Kanban</p>
    </div>

    <div v-if="router.currentRoute.value.path === '/Mail'" class="bg-white dark:bg-dark-grey mx-auto max-w-sm w-11/12 flex items-center h-16 ml-4 gap-4 font-bold text-2xl text-black dark:text-white
    sm:h-20">
      <h1 v-if="mailsStore.mailFilter === 'relevant'">Входящие</h1>
      <h1 v-else-if="mailsStore.mailFilter === 'sent'">Отправленные</h1>
      <h1 v-else-if="mailsStore.mailFilter === 'deleted'">Удаленные</h1>
      <div @click="createNewMail()"
        class="bg-white absolute right-6 h-16 fill-main-purple text-main-purple hover:bg-medium-grey/10 dark:bg-dark-grey gap-4 font-bold text-lg flex items-center rounded-full cursor-pointer">
        <span>+ Создать новое сообщение</span>
      </div>
    </div>

    <div v-if="router.currentRoute.value.path === '/Board'" class=" w-11/12 flex items-center  h-16 gap-4
    sm:h-20">

      <div>
        <img class="sm:hidden" src="../assets/icons/logo-mobile.svg" height="25" width="24" alt="logo">
      </div>
      <div @click="showMobileBar" class="flex items-center gap-2 group cursor-pointer sm:hidden">
        <h1 class="text-black dark:text-white font-bold text-lg cursor-pointer">{{ boardsStore.getCurrentBoard?.name }}
        </h1>
        <IconArrowDown v-if="!managerStore.sidebarMobile" />
        <IconArrowUp v-else />
      </div>

      <h1 class="text-black dark:text-white font-bold hidden text-2xl sm:block">
        {{ boardsStore.getCurrentBoard?.name }}
      </h1>

      <div v-if="boardsStore.boards.length" class="flex items-center gap-4 ml-auto">
        <AddButtonMobile />
        <PrimarySmall @click="addTask" class="hidden sm:block">+ Добавить задание</PrimarySmall>
        <Dropdown target="Доску" @onClickEdit="editTask" @onClickDelete="deleteTask" />
      </div>
    </div>

    <div v-if="router.currentRoute.value.path === '/Calendar'" class=" w-11/12 flex items-center  h-16 gap-4
    sm:h-20">

      <h1 class="text-black dark:text-white font-bold hidden text-2xl sm:block w-full capitalize ml-5">
        <div class="w-1/2  text-gray-400">{{ formatDate(Today, {
          weekday: 'long',
          year: 'numeric',
          month: 'long', day: 'numeric'
        }) }}</div>
      </h1>
    </div>
  </header>
</template>
<script setup>
import AddButtonMobile from '../components/Kanban/buttons/AddTaskMobile.vue'
import { useBoardsStore } from '../stores/boards';
import { useManagerStore } from '../stores/manager';
import Dropdown from '../components/Kanban/manager/Dropdown.vue';
import IconArrowDown from '../components/Kanban/icons/IconArrowDown.vue';
import IconArrowUp from '../components/Kanban/icons/IconArrowUp.vue';
import PrimarySmall from '../components/Kanban/buttons/PrimarySmall.vue';
import { useRouter } from "vue-router";
import { useMailsStore } from '../stores/mails';
const router = useRouter();
const boardsStore = useBoardsStore()
const managerStore = useManagerStore()
const mailsStore = useMailsStore()
const Today = new Date();

const editTask = () => {
  managerStore.overlay = true
  managerStore.boardForm = { edit: true, visible: true }
}
const deleteTask = () => {
  managerStore.overlay = true
  managerStore.delete = { board: true, visible: true }
}
const addTask = () => {
  managerStore.overlay = true
  managerStore.taskForm = { visible: true, edit: false };
}
const showMobileBar = () => {
  managerStore.sidebarMobile = true;
  managerStore.overlay = true
}
const createNewMail = () => {
  managerStore.hideOverlay()
  managerStore.overlay = true;
  managerStore.mailView = false;
  managerStore.mailForm = true;
};
const formatDate = (date, options, locale = 'ru-RU') => {
  if (!date) return '';
  return date.toLocaleDateString(locale, options);
};

</script>