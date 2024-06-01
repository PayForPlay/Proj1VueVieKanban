<!-- EventCard -->
<template>
    <div class="day w-full h-[4rem] relative flex items-center cursor-pointer px-6
      dark:hover:bg-dark-grey
      hover:bg-white
      active:bg-main-purple active:text-white 
      outline-1 dark:outline-dark-grey outline outline-gray-200
      active:before:shadow-inline" @click="selectEvent(event)">
        <div class="w-11/12 flex font-serif mt-2  overflow-hidden truncate ">{{ event.title }}</div>
        <div v-if="event.from === 'events'" class="absolute flex right-2 top-2 font-serif text-[0.7rem]">
            <div class="mr-2">{{ formatDateEvent }}</div>
            <div>
                <iconEvent :iconClass="event.completed === true ? 'green' : ''" />
            </div>
        </div>
        <div v-if="event.from === 'tasks'">
            <div  class="   absolute right-10 top-1 font-serif text-[0.7rem]">
            <div>Конечный срок: {{ formattedDueAt }}</div>
        </div>
        <div class="absolute right-2 top-2">
            <iconCloud />
        </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, computed } from 'vue';
import { useManagerStore } from '../../stores/manager';
import { useEventsStore } from '../../stores/events';
import iconEvent from './icons/iconEvent.vue';
import iconCloud from './icons/iconCloud.vue'
const managerStore = useManagerStore();
const eventStore = useEventsStore();
const props = defineProps(['event', 'activeDay']);
const selectEvent = (event) => {
    eventStore.UpdateSelectedEvent(event)
    managerStore.eventView = true;
    managerStore.overlay = true;
    managerStore.sidebar = false;
}
const formatDateEvent = computed(() => {
    if (props.event.from === 'events') {
        const fDate = new Date(props.event.date);
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(fDate);
    }
    return ''; // return an empty string if the condition is not met
});

// Computed property to format dates for tasks from "tasks".
const formattedDueAt = computed(() => {
    if (props.event.from === 'tasks') {
        const dueAtDate = new Date(props.event.dueAt);
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
        }).format(dueAtDate);
    }
    return '';
});
</script>