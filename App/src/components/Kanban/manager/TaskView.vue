<template>
  <div class="bg-white dark:bg-dark-grey rounded-lg p-1">
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-auto ">
      <div class="flex justify-between items-center gap-4">
        <h4 class="text-black dark:text-white font-bold text-lg">{{ boardsStore.getTask?.title }}</h4>
        <Dropdown @onClickEdit="editTask" @onClickDelete="deleteTask" target="Задание" />
        <div 
        class="absolute top-6 right-10 text-medium-grey  text-xs flex items-center"
        :class="[
          boardsStore.getTask.priority === 'Средний' ? ['text-black dark:text-white'] : [''],
          boardsStore.getTask.priority === 'Высокий' || boardsStore.getTask.priority === 'Критический' ? ['text-red dark:text-red'] : ['']
        ]">
        {{ boardsStore.getTask.priority }}<iconDanger /></div> 
      </div>
      <div class="text-medium-grey text-xs">
        <p v-if="boardsStore.getTask.createdBy.name">Выдал задание: {{ boardsStore.getTask.createdBy.name + " " + boardsStore.getTask.createdBy.secondName }}</p>
        <p v-if="boardsStore.getTask.responsibleAt.name" >Ответственный: {{ boardsStore.getTask.responsibleAt.name + " " + boardsStore.getTask.responsibleAt.secondName }}</p>
        <p v-if="formatDate">Конечный срок: {{ formatDate }}</p>
      </div>
      <p v-if="boardsStore.getTask?.description" class="text-medium-grey text-sm">{{ boardsStore.getTask.description }}</p>
      <div>
        <p class="text-medium-grey dark:text-white text-xs font-bold pb-4">Задачи ({{ subtasksCompleted }})</p>
        <div class="flex flex-col gap-2 shadow-inner">
          <Subtask v-for="(subtask, index) in boardsStore?.getTask?.subtasks" :key="index" :subtask="subtask" />
        </div>
      </div>
      <div>
        <p class="text-medium-grey dark:text-white text-xs font-bold pb-4">Текущий этап</p>
        <BaseSelect @onClickOption="changeColumn" :value="boardsStore.getCurrentColumn.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBoardsStore } from '../../../stores/boards.js';
import { useManagerStore } from '../../../stores/manager.js';
import Subtask from '../manager/taskView/Subtask.vue';
import BaseSelect from '../form/BaseSelect.vue';
import Dropdown from '../manager/Dropdown.vue';
import iconDanger from '../icons/iconDanger.vue'

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
const subtasksCompleted = computed(() => {
  const completed = boardsStore.getTask?.subtasks.filter((sub) => sub.isCompleted).length;
  const total = boardsStore.getTask?.subtasks.length;
  return `${completed} из ${total}`
})
const changeColumn = ({ index }) => {
  boardsStore.changeTaskColumn(index)
}
const editTask = () => {
  managerStore.taskForm = { edit: true, visible: true }
  managerStore.taskView = false;
}
const deleteTask = () => {
  managerStore.delete = { board: false, visible: true }
  managerStore.taskView = false;
}
const formatDate = computed(() => {
  const taskDueAt = new Date(boardsStore.getTask.dueAt);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(taskDueAt);
});

</script>