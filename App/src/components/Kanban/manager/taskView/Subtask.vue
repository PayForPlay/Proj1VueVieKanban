<!-- Subtask.vue -->
<template>
  <label class="cursor-pointer bg-light-grey dark:bg-very-dark-grey dark:hover:bg-main-purple/25 p-4 flex items-center gap-4 rounded
  hover:bg-main-purple hover:bg-opacity-25" :for="subtask?._id">
    <div class="relative">
      <input class="cursor-pointer " v-model="subtask.isCompleted" type="checkbox" :id="subtask?._id" @change="handleCheckboxChange(subtask)">
      <div class="h-4 w-4 rounded-sm flex items-center justify-center absolute 
      top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]"
        :class="subtask.isCompleted ? checkbox.checked : checkbox.unchecked">
        <img v-if="subtask.isCompleted" src="../../../../assets/icons/icon-check.svg" alt="">
      </div>
    </div>
    <span class="text-black dark:text-white text-xs font-bold"
      :class="subtask.isCompleted ? 'line-through text-opacity-50 dark:text-opacity-50' : ''">
      {{ subtask?.title }}
    </span>
  </label>
</template>
<script setup>
import { useBoardsStore } from "../../../../stores/boards.js";
import KanbanData from "../../../../../api/kanbanData"
const boardsStore = useBoardsStore();
const props = defineProps({
  _id: '',
  subtask: null,
})

const checkbox = {
  checked: ['bg-main-purple'],
  unchecked: ['bg-white', 'border', 'border-medium-grey', 'border-opacity-25, dark:bg-dark-grey dark:border-opacity-25']
}
const handleCheckboxChange = async (subtask) => {
      let sendData = {
        boardId: boardsStore.getCurrentBoard._id,
        columnId: boardsStore.getCurrentColumn._id,
        taskId: boardsStore.getTask._id,
        subtask: subtask
      };
      const response = await KanbanData.subTask(sendData);
      // console.log(boardsStore.boards[boardsStore.selectedBoard])
      console.log()
     boardsStore.boards[boardsStore.selectedBoard].columns[boardsStore.selectedColumn].tasks[boardsStore.selectedTask] = response.changedTask;
  ;
}
</script>



