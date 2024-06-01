<template class="">
  <article  class="group flex relative flex-col bg-white dark:bg-dark-grey p-4 rounded-lg cursor-pointer shadow-task max-w-[280px]">
    <div class="">
      <h3 class="text-black dark:text-white font-bold group-hover:text-main-purple py-1 px-3  select-none flex ">{{ task.title }}</h3>
      
      <div 
        class="absolute top-2 right-2 text-medium-grey  text-xs flex items-center"
        :class="[
          task.priority === 'Средний' ? ['text-black dark:text-white'] : [''],
          task.priority === 'Высокий' || task.priority === 'Критический' ? ['text-red dark:text-red'] : ['']
        ]">
        {{ task.priority }}<iconDanger /></div> 

    <div class=" absolute bottom-2 right-2 text-medium-grey  text-xs">{{ formatDate }}</div>
    <p class="text-xs absolute bottom-2 left-2 text-medium-grey font-bold select-none">{{ subtasksCompleted }} заданий</p>
    <div class="mt-2 my-3 pl-3 py-1  text-xs bg-light-grey dark:bg-very-dark-grey text-medium-grey dark:text-white rounded-md shadow-inner ">
      <p>Задача:</p>
      <div class="ml-2 my-2 ">{{ getFirstUncompletedSubtask }}</div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import iconDanger from '../icons/iconDanger.vue'


const props = defineProps({
  task: {
    type: Object,
    required: true,
  }
})
const formatDate = computed(() => {
  const taskDueAt = new Date(props.task.dueAt);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(taskDueAt);
});

const getFirstUncompletedSubtask = computed(() => {
      const uncompletedSubtask = props.task.subtasks.find(subtask => subtask.isCompleted !== true);
      return uncompletedSubtask ? uncompletedSubtask.title : 'Нет невыполненных задач';
    });
  

const subtasksCompleted = computed(() => {
    const completed = props.task.subtasks.filter((sub) => sub.isCompleted).length;
  const total = props.task.subtasks.length;
  return `${completed} из ${total}`
})
</script>