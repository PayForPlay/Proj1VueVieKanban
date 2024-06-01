<template>
  <div
    class="flex flex-col items-center gap-4 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-11/12 max-w-sm transition-all "
    :class="managerStore.sidebar ? 'sm:translate-x-[-85%] sm:w-6/12 md:translate-x-[-80%] lg:translate-x-[-75%]' : ''">
    <p class="text-center text-lg font-bold text-medium-grey">Нет досок, создайте чтобы начать.
    </p>
    <BtnPrimarySmall @click.stop="createNewBoard">+ Добавить новую доску</BtnPrimarySmall>
  </div>
</template>

<script setup>
import { useManagerStore } from '../../../stores/manager';
import BtnPrimarySmall from '../buttons/PrimarySmall.vue'

const managerStore = useManagerStore()
const createNewBoard = () => {
  managerStore.overlay = true
  managerStore.boardForm = { visible: true, edit: false }
}
</script>