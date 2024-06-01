<template>
    <div tabindex="1" class="group relative cursor-pointer z-10 ">
      <IconVerticalEllipsis />
      <div class="absolute right-28 top-8 hidden group-focus:block ">
        <div class="bg-white dark:bg-very-dark-grey rounded-lg  text-sm w-36 flex flex-col fixed z-10">
          <p @click="emit('onClickDelete')" class="text-red text-xs font-bold shadow-lg w-full p-4 ">Удалить</p>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import IconVerticalEllipsis from '../Kanban/icons/IconVerticalEllipsis.vue';
  import { useEventsStore } from '../../stores/events';
  const eventStore = useEventsStore()
  const emit = defineEmits(['onClickDelete'])
  </script>