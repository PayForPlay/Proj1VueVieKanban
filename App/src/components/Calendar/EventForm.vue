<template>
    <form
    @submit.prevent="onSubmit"
    class="bg-white dark:bg-dark-grey rounded-lg p-1"
  >
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh]">
      <div class="flex items-center justify-center">
        <h2 class="text-black dark:text-white flex font-bold text-md">
          Создать новое событие
        </h2>
      </div>
      <BaseTextarea
        v-model="event.title"
        inputName="Событие"
        placeholder="Событие"
      />
      <div>
        <label class="text-medium-grey dark:text-white text-xs font-bold mt-1">Дата события</label>
        <Calendar v-model="event.date" showTime hourFormat="24" required placeholder="Дата события" hideOnDateTimeSelect />
      </div>
       <ButtonPrimaryLarge type="submit">
        Отправить
      </ButtonPrimaryLarge>
    </div>
  </form>
</template>
<script setup>
import BaseTextarea from '../Kanban/form/BaseTextarea.vue';
import BaseInput from '../Kanban/form/BaseInput.vue';
import ButtonPrimaryLarge from '../Kanban/buttons/PrimaryLarge.vue';
import { reactive } from 'vue';
import { useEventsStore} from '../../stores/events'
const eventStore = useEventsStore();
import { useManagerStore } from '../../stores/manager';
const managerStore = useManagerStore();

const event = reactive({
    title: "",
    date: eventStore.activeDate
})
const onSubmit = async () => {
    const response = await eventStore.addEvent(event)
  managerStore.hideOverlay();
};

</script>