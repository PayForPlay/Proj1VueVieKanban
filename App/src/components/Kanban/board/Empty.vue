<template>
  <div
    class="flex flex-col items-center gap-4 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-11/12 max-w-sm transition-all "
    :class="managerStore.sidebar ? 'sm:translate-x-[-85%] sm:w-6/12 md:translate-x-[-80%] lg:translate-x-[-75%]' : ''">
    <p class="text-center text-lg font-bold text-medium-grey">
       Создайте новую доску чтобы начать.
    </p>
  </div>
</template>

<script setup>
import { useManagerStore } from '../../../stores/manager';
const managerStore = useManagerStore()

</script>