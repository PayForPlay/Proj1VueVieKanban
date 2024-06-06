<!-- Calendar -->
<template>
    <div class="m-0 p-0 flex">
        <div class="min-h-[50vh] flex items-center">
            <div class=" bg-white dark:bg-dark-grey text-medium-grey dark:text-white flex rounded-[10px] ">
                <div class="left h-full w-[60rem] p-5">
                    <div
                        class=" p-10 shadow-inner rounded-xl bg-light-grey dark:bg-lines-dark text-medium-grey dark:text-white">
                        <div class="">
                            <CalendarHeader :month="month" :year="year" @update:month="updateMonth"
                                @update:year="updateYear" />
                            <WeekDaysHeader />
                            <div class="min-h-[40rem] ">
                                <div class=" grid grid-cols-7">
                                    <DayCell v-for="day in days" :key="day.date" :day="day" :activeDay="activeDay"
                                        :month="month" @selectDay="selectDay" />
                                </div>
                            </div>
                        </div>
                        <div
                            class="relative flex outline outline-1 dark:outline-gray-600 outline-gray-200 overflow-hidden justify-between">
                            <form @submit.prevent="onSubmitDate" class="flex">
                                <BaseInput v-model="inputDate.date" placeholder="mm.yyyy" />
                                <PrimarySmall type="submit" class="z-10"> Перейти </PrimarySmall>
                            </form>
                            <div class="absolute right-0">
                                <PrimarySmall @click="GoToToday"> Сегодня </PrimarySmall>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=" w-[25rem] p-5 shadow-inner">
                    <div
                        class="relative min-h-full p-5 rounded-xl text-medium-grey dark:text-white bg-light-grey dark:bg-lines-dark">

                        <div class="p-5 capitalize mb-5">
                            <div class=" text-[2rem]">{{ formatDate(activeDay.date, { weekday: 'long' }) }}</div>
                            <div class=" text-[1rem] text-gray-400">{{ formatDate(activeDay.date, {
                                year: 'numeric',
                                month: 'long', day: 'numeric'
                            }) }}</div>
                        </div>

                        <div class=" overflow-y-scroll h-[42rem] shadow-inner">
                            <EventCard v-for="event in activeDay.events" :key="event._id" :event="event"
                                :activeDay="activeDay" />
                        </div>
                        <div class="flex absolute w-[5rem] bottom-0 justify-between my-4">
                            <PrimarySmall @click="showAllEvents"> Все события </PrimarySmall>
                            <PrimarySmall @click="showOverdueEvents"> Просроченные события </PrimarySmall>
                            <PrimarySmall @click="showCompletedEvents"> Выполненные события </PrimarySmall>
                        </div>
                        <div class=" cursor-pointer absolute right-8 top-12 hover:text-green-500">
                            <iconAdd @click="showForm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import CalendarHeader from "./CalendarHeader.vue";
import WeekDaysHeader from "./WeekDaysHeader.vue";
import DayCell from "./DayCell.vue";
import PrimarySmall from "../Kanban/buttons/PrimarySmall.vue";
import BaseInput from "../Kanban/form/BaseInput.vue";
import { useBoardsStore } from "../../stores/boards";
import EventCard from "./EventCard.vue";
import iconAdd from "./icons/iconAdd.vue";
import { useManagerStore } from "../../stores/manager";
import { useEventsStore } from "../../stores/events";

const eventStore = useEventsStore()
const managerStore = useManagerStore()
const boardStore = useBoardsStore()
const today = new Date();
const month = ref(today.getMonth());
const year = ref(today.getFullYear());
let activeDay = reactive({
    date: new Date(),
    events: []
});
const tasks = ref([])
const inputDate = reactive({
    date: ""
})
const days = ref([])
const currentDate = ref(new Date());

const showForm = () => {
    managerStore.overlay = true
    managerStore.eventForm = true
}
const showAllEvents = () => {
    // Сбрасываем фильтр, показываем все события с event.from === "events"
    activeDay.events = tasks.value.filter(event =>
        event.from === "events"
    );
};

const showOverdueEvents = () => {
    // Показываем только просроченные события с event.from === "events"
    activeDay.events = tasks.value.filter(event =>
        event.from === "events" &&
        new Date(event.date) < new Date() && !event.completed
    );
};
const showCompletedEvents = () => {
    // Показываем только просроченные события с event.from === "events"
    activeDay.events = tasks.value.filter(event =>
        event.from === "events" && event.completed
    );
};


watch(() => eventStore.needToUpdateCalendar, async (newVal) => {
    if (newVal) {
        await eventStore.getData().then(() => {
            tasks.value = eventStore.getEvents

            days.value = getDaysInMonth();
            activeDay.events = getEventsForDay(activeDay.date)
        });
        days.value = getDaysInMonth();
        eventStore.resetCalendarUpdate();
    }
});


const getDaysInMonth = () => {
    let array = []
    const firstDayOfMonth = new Date(year.value, month.value, 1).getDay();
    const daysInMonth = new Date(year.value, month.value + 1, 0).getDate();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < offset; i++) {
        const date = new Date(year.value, month.value, -offset + i + 1);
        array.push({
            date,
            events: getEventsForDay(date),
        });
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year.value, month.value, i);
        array.push({
            date,
            events: getEventsForDay(date),
        });
    }
    const lastDayOfMonth = new Date(
        year.value,
        month.value,
        daysInMonth
    ).getDay();
    const remaining = lastDayOfMonth === 0 ? 0 : 7 - lastDayOfMonth;
    for (let i = 1; i <= remaining; i++) {
        const date = new Date(year.value, month.value + 1, i);
        array.push({
            date,
            events: getEventsForDay(date),
        });
    }
    return array
}

function getEventsForDay(date) {
    let events = []
    for (const task of tasks.value) {
        // Переводим date и даты начала/окончания задач в начало дня для их корректного сравнения
        if (task.from === "events") {

            const currentDay = date.setHours(0, 0, 0, 0);
            const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
            const taskDueAt = new Date(task.date).setHours(23, 59, 59, 999);
            if (currentDay >= taskDate && currentDay <= taskDueAt) {
                events.push(task);
            }
        } else {
            const taskCreatedAt = new Date(task.createdAt).setHours(0, 0, 0, 0);
            const taskDueAt = new Date(task.dueAt).setHours(23, 59, 59, 999);
            const currentDay = date.setHours(0, 0, 0, 0);
            if (currentDay >= taskCreatedAt && currentDay <= taskDueAt) {
                events.push(task);
            }
        }
    }
    return events;
}

const GoToToday = () => {
    month.value = today.getMonth();
    year.value = today.getFullYear();
    days.value = getDaysInMonth();
    const todayIndex = days.value.findIndex(day => isSameDay(day.date, today));
    if (todayIndex !== -1) {
        Object.assign(activeDay, days.value[todayIndex]);
    } else {
        activeDay.date = today;
        activeDay.events = getEventsForDay(today);
    }
};

const onSubmitDate = () => {
    const [inputMonth, inputYear] = inputDate.date.split(/[.,\/]/);
    const newMonth = parseInt(inputMonth) - 1;
    const newYear = parseInt(inputYear);
    if (!isNaN(newMonth) && !isNaN(newYear)) {
        month.value = newMonth;
        year.value = newYear;
        days.value = getDaysInMonth();
    }
}

onMounted(async () => {
    await eventStore.getData().then(() => {
        Object.assign(tasks.value, eventStore.getEvents);
        Object.assign(days.value, getDaysInMonth());
        Object.assign(activeDay.events, getEventsForDay(activeDay.date));

    });

    const todayIndex = days.value.findIndex(day => isSameDay(day.date, today));
    if (todayIndex !== -1) {
        Object.assign(activeDay, days.value[todayIndex]);
    } else {
        activeDay.date = today;
        activeDay.events = getEventsForDay(today);
    }
});

const updateMonth = (newMonth) => {
    month.value = newMonth;
    days.value = getDaysInMonth();
};

const updateYear = (newYear) => {
    year.value = newYear;
    days.value = getDaysInMonth();
};

const selectDay = (day) => {
    Object.assign(activeDay, day);
    Object.assign(eventStore.activeDate, activeDay);
};

const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
};

const formatDate = (date, options, locale = 'ru-RU') => {
    if (!date) return '';
    return date.toLocaleDateString(locale, options);
};

</script>
