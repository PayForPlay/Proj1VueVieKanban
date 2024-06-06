<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white dark:bg-dark-grey rounded-lg p-1"
  >
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
      <div class="flex justify-between items-center">
        <h4 class="text-black dark:text-white font-bold text-lg">
          {{ managerStore.boardForm.edit ? "Редактировать доску" : "Добавить новую доску" }}
        </h4>
      </div>
      <BaseInput
        ref="inputTitle"
        v-model="board.name"
        inputName="Board Name"
        placeholder="e.g. Web Design"
      />
      <div class="flex flex-col gap-3">
        <p class="text-medium-grey dark:text-white text-xs font-bold">
          Этапы доски
        </p>
        <div
          class="flex items-center justify-between gap-4"
          v-for="(column, index) in board.columns"
          :key="index"
        >
          <BaseInput
            :ref="
              (el) => {
                inputs[index] = el;
              }
            "
            v-model="column.name"
            :placeholder="
              columnsPlaceholders[index]
                ? columnsPlaceholders[index]
                : 'Назавание этапа...'
            "
          />
          <IconCross @click="deleteColumn(index)" class="cursor-pointer" />
        </div>
        <ButtonSecondaryLarge @click.stop="addColumn"
          >+ Add New Column</ButtonSecondaryLarge
        >
      </div>
      <ButtonPrimaryLarge type="submit">
        {{ managerStore.boardForm.edit ? "Сохранить изменения" : "Создать новую доску" }}
      </ButtonPrimaryLarge>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive, onBeforeUpdate } from "vue";
import { useBoardsStore } from "../../../stores/boards.js";
import { useManagerStore } from "../../../stores/manager.js";
import BaseInput from "../form/BaseInput.vue";
import IconCross from "../icons/IconCross.vue";
import ButtonPrimaryLarge from "../buttons/PrimaryLarge.vue";
import ButtonSecondaryLarge from "../buttons/SecondaryLarge.vue";
import KanbanData from "../../../../api/kanbanData"

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const inputTitle = ref(null);
const inputs = ref([]);

const board = reactive({
  _id: boardsStore?.getCurrentBoard?._id,
  name: "",
  columns: [],
});
const columnsPlaceholders = {
  0: "e.g. Todo...",
  1: "e.g. Doing...",
  2: "e.g. Done...",
};
const deleteColumn = (index) => {
  if (board.columns.length === 2) {
    board.columns[index].name = "";
    board.columns[index].tasks = [{ name: "", tasks: [] }];
  } else {
    board.columns.splice(index, 1);
  }
};
const addColumn = () => {
  board.columns.push({ name: "", tasks: [] });
};
const onSubmit = async () => {
  if (validate()) {
    if (managerStore.boardForm.edit) {
      let sendData = {
        board: board,
      };
      const response = await KanbanData.updateBoard(sendData)
      if (response.status){
          boardsStore.boards[boardsStore.selectedBoard] = response.data.updatedBoard;
      }
    } else {
      let sendData = {
        board: board
      };
      const response = await KanbanData.addBoard(sendData);
      if (response.status){
      boardsStore.boards.push(response.data.newBoard);
      boardsStore.selectedBoard = boardsStore.boards.length - 1;
      }
    }
    managerStore.hideOverlay();
  }
};
const validate = () => {
  let valid = true;
  if (board.name.trim().length === 0) {
    valid = false;
    inputTitle.value.error = true;
  }
  inputs.value.forEach((e, index) => {
    if (board?.columns[index]?.name.trim().length === 0) {
      valid = false;
      e.error = true;
    }
  });
  return valid;
};
//Редактрование
if (managerStore.boardForm.edit) {
  board.name = JSON.parse(
    JSON.stringify(boardsStore.boards[boardsStore.selectedBoard].name)
  );
  board.columns = JSON.parse(
    JSON.stringify(boardsStore.getCurrentBoard.columns)
  );
} else {
  board.columns = [
    { name: "", tasks: [] },
    { name: "", tasks: [] },
  ];
}
onBeforeUpdate(() => {
  inputs.value = [];
});
</script>
