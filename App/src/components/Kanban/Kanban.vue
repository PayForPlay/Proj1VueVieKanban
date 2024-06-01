<template>
        <div data-dragscroll v-if="boardsStore.getColumns" class="flex min-h-full">
                <Board data-dragscroll />
                <AddNewColumn class="hidden md:flex"/>
            </div>
            <NoBoards v-else-if="boardsStore.boards.length === 0" />
            <EmptyBoard v-else />
    <TaskView v-if="managerStore.taskView" />
    <TaskForm v-if="managerStore.taskForm.visible" />
    <Delete v-if="managerStore.delete.visible" />
    <BoardForm v-if="managerStore.boardForm.visible" />
</template>
<script setup>
import NoBoards from './board/NoBoards.vue';
import { useManagerStore } from '../../stores/manager';
import AddNewColumn from './board/AddNewColumn.vue';
import EmptyBoard from './board/Empty.vue';
import Board from './board/Board.vue'
import { useBoardsStore } from '../../stores/boards.js';
import TaskView from './manager/TaskView.vue'
import TaskForm from './manager/TaskForm.vue';
import Delete from './form/Delete.vue';
import BoardForm from './manager/BoardForm.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
</script>