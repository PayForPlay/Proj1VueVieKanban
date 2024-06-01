<template>
  <form @submit.prevent="onSubmit" class="bg-white dark:bg-dark-grey rounded-lg p-1 w-full h-full relative">
    <div v-if="eventStore.getEvent.from === 'events'" class="absolute top-3 right-3 cursor-pointer">
      <Dropdown @onClickDelete="deleteEvent()" />
    </div>

    <div class="p-6 pr-3 flex flex-col gap-6 h-full w-full  relative">
      <div class="flex flex-wrap text-black dark:text-white w-full">
        <p>Событие</p>
        <h2 class="text-black dark:text-white flex font-bold text-lg w-full pt-10 break-normal overflow-hidden">
          {{ eventStore.getEvent.title }}
        </h2>
      </div>
      <div v-if="eventStore.getEvent.from !== 'events'" class=" absolute   top-5 right-5 text-gray-500">
          <div>Задание из модуля Kanban</div>
          <div>Доска: {{ eventStore.getEvent.board }}</div>
          <div>Этап: {{ eventStore.getEvent.column }}</div>
          <div>Приоритет: {{ eventStore.getEvent.priority }}</div>
        </div>

      <div v-if="eventStore.getEvent.from === 'events'" class="flex flex-col w-full">
        <p class="w-full text-black dark:text-white" v-if="eventStore.getEvent.from === 'events'">
          Время события: {{ formatDate(eventStore.getEvent.date) }}
        </p>
        <div class="w-full mt-4">
          <ButtonPrimaryLarge :completed="eventStore.getEvent.completed" type="submit"
            v-model="eventStore.getEvent.completed">{{ eventStore.getEvent.completed ? 'Закрыть' : 'Выполнить' }}
          </ButtonPrimaryLarge>
        </div>
      </div>

      <div v-else class="flex flex-col w-full h-full text-black dark:text-white">
        
        <div class="w-full">
          <p class="w-full">
            Выданно: {{ formatDate(eventStore.getEvent.createdAt) }}
          </p>
          <p class="w-full">
            Конечный срок: {{ formatDate(eventStore.getEvent.dueAt) }}
          </p>
        </div>

        <div class="w-full mt-4">
          <ButtonPrimaryLarge type="submit">Закрыть
          </ButtonPrimaryLarge>
        </div>
      </div>

    </div>

  </form>
</template>
<script setup>
import ButtonPrimaryLarge from '../Kanban/buttons/PrimaryLarge.vue';
import { reactive } from 'vue';
import { useEventsStore } from '../../stores/events'
import { useManagerStore } from '../../stores/manager';
import Dropdown from './Dropdown.vue';
const eventStore = useEventsStore();
const managerStore = useManagerStore();

const event = reactive({
  completed: '',
})
const deleteEvent = async () => {
  await eventStore.deleteEvent()
  managerStore.hideOverlay();
};

const onSubmit = () => {
  if (eventStore.getEvent.from === 'events') {
    if (!eventStore.getEvent.completed) {
      eventStore.changeCompleted()
    }
  }
  managerStore.hideOverlay();
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
</script>