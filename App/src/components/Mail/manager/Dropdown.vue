<template>
    <div tabindex="1" class="group p-4 relative cursor-pointer ">
      <IconVerticalEllipsis />
      <div class="absolute right-28 top-8 hidden group-focus:block ">
        <div class="bg-white dark:bg-very-dark-grey rounded-lg  text-sm w-36 flex flex-col fixed z-10">
          <p v-if="mailStore.mailFilter !== 'deleted'" @click="emit('onClickDelete')" class="text-red text-xs font-bold shadow-lg w-full p-4 ">Удалить</p>
          <p v-if="mailStore.mailFilter === 'deleted'" @click="emit('onClickRestore')" class="text-red text-xs font-bold shadow-lg w-full p-4 ">Восстановить</p>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import IconVerticalEllipsis from '../../Kanban/icons/IconVerticalEllipsis.vue';
  import { useMailsStore } from '../../../stores/mails';
  const mailStore = useMailsStore()
  const emit = defineEmits(['onClickDelete', 'onClickRestore'])
  </script>