<!-- TaskForm.vue -->
<template>
  <form
    @submit.prevent="onSubmit"
    class="bg-white dark:bg-dark-grey rounded-lg p-1"
  >
    <div class="p-5 pr-3 flex flex-col gap-2 min-h-fit max-h-[90vh] overflow-y-scroll">
      <div class="flex justify-between items-center">
        <h4 class="text-black dark:text-white font-bold text-lg">
          {{ managerStore.taskForm.edit ? "Редактировать задание" : "Добавить новое задание" }}
        </h4>
      </div>
      <BaseInput
        ref="inputTitle"
        v-model="form.task.title"
        inputName="Название"
        placeholder="Отдохнуть"
      />
      <BaseTextarea
        v-model="form.task.description"
        inputName="Описание"
        placeholder="Всегда хорошо отдохнуть. Эти 15 минут помогут зарядить батарею"
      />


      <div>
        <label class="text-medium-grey dark:text-white text-xs font-bold mt-1">Крайний срок</label>
        <Calendar v-model="form.task.dueAt" showTime hourFormat="24" hideOnDateTimeSelect required/>
      </div>
        <div class="card p-fluid">
        <label class="text-black dark:text-white text-xs font-bold pb-32"
          >Ответственный</label
        >
        <AutoComplete
          v-model="form.task.responsibleAt"
          :suggestions="filteredUsers"
          @complete="search"
          required
          placeholder="Введите и выберите ответственного"
          class="w-full"
        />
      </div>

      <div>
          <label class="text-medium-grey dark:text-white text-xs font-bold mt-1">Приоритет</label>
          <div class="card flex justify-content-center mt-1">
            <Dropdown v-model="form.task.priority" required :options="PriorityOptions" class="w-full md:w-14rem" />
          </div>
        </div>


      <div class="flex flex-col gap-3">
        <p class="text-medium-grey text-xs font-bold">Задачи</p>
        <div
          ref="errorSubtasks"
          class="flex items-center justify-between gap-4"
          v-for="(subtask, index) in form.task.subtasks"
          :key="index"
        >
          <BaseInput
            :ref="
              (el) => {
                inputs[index] = el;
              }
            "
            v-model="subtask.title"
            :placeholder="
              subtaskPlaceholders[index]
                ? subtaskPlaceholders[index]
                : 'Наименование задачи...'
            "
          />
          <IconCross @click="deleteSubtask(index)" class="cursor-pointer" />
        </div>
        <ButtonSecondaryLarge type="button" @click.stop="addSubtask"
          >+ Добавить новую задачу</ButtonSecondaryLarge
        >
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-medium-grey text-xs font-bold">Текущий Этап</p>
        <BaseSelect @onClickOption="changeColumn" :value="columnName" />
      </div>
      <ButtonPrimaryLarge type="submit">
        {{ managerStore.taskForm.edit ? "Сохранить изменения" : "Создать задание" }}
      </ButtonPrimaryLarge>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useBoardsStore } from "../../../stores/boards.js";
import { useManagerStore } from "../../../stores/manager.js";
import { useAuthStore } from "../../../stores/AuthStore"
import BaseSelect from "../form/BaseSelect.vue";
import BaseInput from "../form/BaseInput.vue";
import BaseTextarea from "../form/BaseTextarea.vue";
import IconCross from "../icons/IconCross.vue";
import ButtonPrimaryLarge from "../buttons/PrimaryLarge.vue";
import ButtonSecondaryLarge from "../buttons/SecondaryLarge.vue";
import KanbanData from "../../../../api/kanbanData";
import User from "../../../../api/user";

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
const authStore = useAuthStore();
const columnName = ref("");
let usersMap = new Map();
const filteredUsers = ref([]);
const inputTitle = ref(null);
const inputCalendar = ref(null);
const inputs = ref([]);
const PriorityOptions = ['Низкий', 'Средний', 'Высокий', 'Критический']
// const users = ref()
onMounted(async () => {
  try {
  const response = await User.fetchUsers();
  response.forEach((user) => {
      usersMap.set(user.fullName, user._id);
  });
  } catch (error) {
    managerStore.showError(error.message, "fetch task form")
  }
});
const form = reactive({
  task: {
    _id: "",
    title: "",
    description: "",
    responsibleAt: "",
    priority: "",
    dueAt: "",
    subtasks: [
      { title: "", isCompleted: false },
      { title: "", isCompleted: false }
    ],
  },
  column: 0,
});
const subtaskPlaceholders = {
  0: "Заварить кофе",
  1: "Выпить его",
};

const search = (event) => {
  if (!managerStore.taskForm.edit) {
  filteredUsers.value = Array.from(usersMap.keys()).filter(
    (fullName) =>
    fullName.includes(event.query)
  )} else {
  filteredUsers.value = Array.from(usersMap.keys()).filter(
    (fullName) =>
    fullName.includes(event.query) && !getByValue(usersMap, boardsStore.getTask.responsibleAt._id).includes(fullName)
  )}
};
function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}

const deleteSubtask = (index) => {
  if (form.task.subtasks.length === 1) {
    form.task.subtasks[index].title = "";
    form.task.subtasks[index].isCompleted = false;
  } else {
    form.task.subtasks.splice(index, 1);
  }
};
const addSubtask = () => {
  form.task.subtasks.push({ title: "", isCompleted: false });
};
const onSubmit = async () => {
  
  form.task.responsibleAt = {_id: usersMap.get(form.task.responsibleAt)}
  if (validate()) {
    if (managerStore.taskForm.edit) {
      let sendData = {
        boardId: boardsStore.getCurrentBoard._id,
        columnId: boardsStore.getColumns[boardsStore.selectedColumn]._id,
        taskId: boardsStore.getTask._id,
        task: form.task,
      };
      const response =  await KanbanData.updateTask(sendData);
        boardsStore.getColumns[boardsStore.selectedColumn].tasks[boardsStore.selectedTask] = response.data.task;
      
    } else {
      let sendData = {
        boardId: boardsStore.getCurrentBoard._id,
        columnId: boardsStore.getColumns[form.column]._id,
        task: form.task,
      };
      const response = await KanbanData.addTask(sendData);
      boardsStore.getColumns[form.column].tasks.push(response.task);
    }
    managerStore.hideOverlay();
  }
};
const validate = () => {
  let valid = true;
  if (form.task.title.trim().length === 0) {
    valid = false;
    inputTitle.value.error = true;
  }

  inputs.value.forEach((e, index) => {
    if (form.task.subtasks[index]?.title.trim().length === 0) {
      valid = false;
      e.error = true;
    }
  });
  if (!valid) {
    form.task.responsibleAt = ''
  }
  return valid;
};

const changeColumn = ({ index, name }) => {
  if (form.task._id !== "") {
    boardsStore.changeTaskColumn(index)
  }else{
    form.column = index;
  columnName.value = name;

  }
}

//Редактирование
if (managerStore.taskForm.edit) {
  form.task = { ...boardsStore.getTask };
  form.task.responsibleAt = form.task.responsibleAt.name + " " + form.task.responsibleAt.secondName + " " + form.task.responsibleAt.lastName
  form.column = boardsStore.selectedColumn;
  columnName.value = boardsStore.getColumnsNames[boardsStore.selectedColumn];
} else {
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[0]));
}
computed(() => {
  inputs.value = [];
});
</script>