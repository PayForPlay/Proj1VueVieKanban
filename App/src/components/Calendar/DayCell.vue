<!-- daycell -->
<template>
  <div class="h-[6rem] relative flex items-center justify-center cursor-pointer 
      text-[1.2rem] outline outline-1 dark:outline-gray-600 outline-gray-200
      hover:bg-white dark:hover:bg-dark-grey dark:hover:text-white hover:text-black hover:text-[1.4rem] hover:shadow-inner
      active:text-black dark:active:text-white active:text-[2rem]" :class="{
        'bg-white dark:bg-dark-grey text-[1.5rem] shadow-inner text-black dark:text-white': isSameDay(day.date, today) || isSameDay(activeDay.date, day.date),
        'bg-white dark:bg-very-dark-grey shadow-inner': !isCurrentMonth(day.date)
      }" @click="selectDay(day)">
    <div class="font-serif">{{ day.date.getDate() }}</div>
    <div v-if="isEventCompleted(day)" class="absolute bottom-2 left-2 p-1 ">
      <iconEvent iconClass="green" />
    </div>
    <div v-else-if="hasEventsFrom('events') && !isEventCompleted(day)" class="absolute bottom-2 left-2 p-1 ">
      <iconEvent />
    </div>
    <div v-if="hasEventsFrom('tasks')" class="absolute bottom-2 right-2 p-1 ">
      <iconCloud class="text-other-event-icon-color" />
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
import iconCloud from './icons/iconCloud.vue';
import iconEvent from './icons/iconEvent.vue';
import { useEventsStore } from '../../stores/events';
const eventStore = useEventsStore()

const props = defineProps(['day', 'activeDay', 'month']);
const emit = defineEmits(['selectDay'])
const today = new Date();

const selectDay = (day) => {
  eventStore.activeDate = day.date
  emit('selectDay', day);
}

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
const isCurrentMonth = (date) => {
  return date.getMonth() === props.month;

};
const hasEventsFrom = (source) => {
  return props.day.events.some(event => event.from === source);
};
const isEventCompleted = (day) => {
  return day.events.length > 0 && day.events.every(event => event.from === 'events' && event.completed);
};
</script>