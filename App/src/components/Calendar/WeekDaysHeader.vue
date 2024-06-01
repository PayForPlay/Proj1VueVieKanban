<template>
    <div class="min-w-full h-full grid grid-cols-7 mx-1 mb-1 capitalize text-[1.2rem] ">
        <div class=" w-full h-full flex  justify-center pb-6" v-for="day in weekdays" :key="day">
        <!-- <span >{{ day.fullName }}</span> -->
                {{ day.shortName }}
    </div>
    </div>
</template>
  
<script setup>
const weekdays = [
    { fullName: "Понедельник", shortName: "Пн" },
    { fullName: "Вторник", shortName: "Вт" },
    { fullName: "Среда", shortName: "Ср" },
    { fullName: "Четверг", shortName: "Чт" },
    { fullName: "Пятница", shortName: "Пт" },
    { fullName: "Субота", shortName: "Сб" },
    { fullName: "Воскресенье", shortName: "Вс" }
]
</script>