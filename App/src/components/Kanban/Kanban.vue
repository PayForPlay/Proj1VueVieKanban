<template>
    <div data-dragscroll v-if="boardsStore.getColumns" class="flex min-h-full">
                <Board data-dragscroll />
                <AddNewColumn class="hidden md:flex"/>
            </div>
            <NoBoards v-else-if="boardsStore.boards.length === 0" />
            <EmptyBoard v-else />
</template>
<script setup>
import NoBoards from './board/NoBoards.vue';
import AddNewColumn from './board/AddNewColumn.vue';
import EmptyBoard from './board/Empty.vue';
import Board from './board/Board.vue'
import { useBoardsStore } from '../../stores/boards.js';

const boardsStore = useBoardsStore();
</script>