// events.js
import { defineStore } from "pinia";
import Event from "../../api/eventApi";
import { useBoardsStore } from "./boards";
import { useAuthStore } from "./AuthStore";

export const useEventsStore = defineStore({
  id: "events",
  state: () => ({
    events: [],
    activeDate: "",
    selectedEvent: 0,
    needToUpdateCalendar: false,
  }),
  getters: {
    getEvents: (state) => state.events,
    getEvent: (state) => state.events[state.selectedEvent],
  },
  actions: {
    async addEvent(event) {
      const response = await Event.addEvent(event);
      if (response.status) {
        this.events.push(response.data);
        this.needToUpdateCalendar = true;
      }
    },

    resetCalendarUpdate() {
      this.needToUpdateCalendar = false;
    },

    async updateEvent(event) {
      const response = await Event.updateEvent(event);
      if (response.status) {
        this.events[this.selectedEvent] = response.data;
        this.needToUpdateCalendar = true;
      }
    },

    async changeCompleted() {
      console.log("changeCompleted");
      const event = this.getEvent;
      const updatedEvent = { ...event, completed: !event.completed };
      const response = await Event.updateEvent(updatedEvent);
      if (response.status) {
        this.events[this.selectedEvent] = response.data;
        this.needToUpdateCalendar = true;
      }
    },

    async deleteEvent() {
      const response = await Event.deleteEvent(this.getEvent);
      if (response.status) {
        this.events.splice(this.selectedEvent, 1);
        this.needToUpdateCalendar = true;
      }
    },

    UpdateSelectedEvent(data) {
      if (data._id) {
        this.selectedEvent = this.events.findIndex(
          (event) => event._id === data._id
        );
      } else {
        this.events[this.selectedEvent] = data;
      }
    },

    async getData() {
      try {
        const jsonData = await Event.fetchEvents();
        this.events = jsonData.events;

        const boardStore = useBoardsStore();
        const authStore = useAuthStore();
        boardStore.boards.forEach((board) => {
          board.columns.forEach((column) => {
            column.tasks.forEach((task) => {
              if (task.responsibleAt._id === authStore.userId) {
                let taskObject = {
                  _id: task._id,
                  title: task.title,
                  createdAt: task.createdAt,
                  dueAt: task.dueAt,
                  from: "tasks",
                  board: board.name,
                  column: column.name,
                  priority: task.priority
                };
                this.events.push(taskObject);
              }
            });
          });
        });

      } catch (error) {
        console.log(error)
      }
    },
  },
});
