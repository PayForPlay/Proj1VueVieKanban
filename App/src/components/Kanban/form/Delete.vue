<template>
  <div class="bg-white dark:bg-dark-grey rounded-lg">
    <div class="p-6 flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-red font-bold text-lg">Удалить {{ managerStore.delete.board ? 'эту Доску' : managerStore.delete.mail ? 'это Письмо' : 'это Задание' }}</h4>
      </div>
      <p class="text-medium-grey text-sm">{{ warning }}</p>
      <div class="flex flex-col gap-4">
        <ButtonDelete @click.stop="onDelete">Удалить</ButtonDelete>
        <ButtonSecondaryLarge @click.stop="onCancel">Отменить</ButtonSecondaryLarge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBoardsStore } from '../../../stores/boards.js';
import { useMailsStore } from '../../../stores/mails.js';
import { useManagerStore } from '../../../stores/manager.js';
import ButtonDelete from '../buttons/Destructive.vue';
import ButtonSecondaryLarge from '..//buttons/SecondaryLarge.vue';
import KanbanData from '../../../../api/kanbanData';


const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
const mailsStore = useMailsStore();

const warning = computed(() => {
  if (managerStore.delete.board) {
    return `Вы уверены что хотите удалить  ‘${boardsStore.getCurrentBoard.name}’ доску? Это действие удалит все колонны и задания. Это действие не может быть обратимо.`
  } else {
    return `Вы уверены что хотите удалить ‘${boardsStore.getTask.title}’ задания и задачи? Это действие не может быть обратимо.`
  }
})

const onDelete = async () => {
  if (managerStore.delete.board) {
    let sendData = {
      boardId: boardsStore.getCurrentBoard._id,
    }
    const response = await KanbanData.deleteBoard(sendData);
    
    if (response) {
      boardsStore.boards.splice(boardsStore.selectedBoard, 1)    
      if(boardsStore.selectedBoard !== 0){
        boardsStore.selectedBoard = boardsStore.selectedBoard-1
      }
    }
    managerStore.hideOverlay()
  } else {
    let sendData = {
      boardId: boardsStore.getCurrentBoard._id,
      columnId: boardsStore.getCurrentColumn._id,
      taskId: boardsStore.getTask._id
    }
    const response = await KanbanData.deleteTask(sendData);
    if (response) {
      boardsStore.getCurrentColumn.tasks.splice(boardsStore.selectedTask, 1)
    }
    managerStore.hideOverlay()
  }
}
const onCancel = () => {
  managerStore.hideOverlay()
}
</script>