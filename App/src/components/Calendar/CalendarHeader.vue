<!-- calendarHeader -->
<template>
    <div class="month min-w-full h-4 flex items-center justify-center font-bold text-lg p-7 pb-20">

        <div class="flex justify-between w-full">
            <button class="p-1 cursor-pointer  " @click="navigateMonth(-1)">
          <iconArrowLeft />
        </button>

        <div class="date text-lg text-gray-500 dark:text-white font-bold capitalize">
        {{ currentMonthString }}
        </div>

        <button class="p-1 cursor-pointer  " @click="navigateMonth(1)">
          <iconArrowRight />
        </button>
        </div>

    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import iconArrowLeft from "./icons/iconArrowLeft.vue"
  import iconArrowRight from "./icons/iconArrowRight.vue"
  const props = defineProps(['month', 'year'])
  const emit = defineEmits(['update:month', 'update:year'])
  
  const currentMonthString = computed(() => {
    const monthNames = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
    const monthIndex = props.month % 12;
    const monthName = monthNames[monthIndex];
    const year = props.year
    return `${monthName} ${year}`;
});

const navigateMonth = (direction) => {
  let newMonth = props.month + direction;
  let newYear = props.year;
  
  if (newMonth > 11) {
    newMonth = 0;
    newYear += 1;
  } else if (newMonth < 0) {
    newMonth = 11;
    newYear -= 1;
  }
  emit("update:month", newMonth);
  emit("update:year", newYear);
};
  </script>
  