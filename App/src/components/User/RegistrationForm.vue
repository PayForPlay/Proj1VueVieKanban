<template>
  <form @submit.prevent="onSubmit" class="flex flex-col rounded-lg p-1" data-dragscroll>
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
      <div
        class="px-6 py-10 bg-white dark:bg-dark-grey rounded-lg shadow-mg static top-1/2 left-1/2 z-10 max-w-xs w-11/12 sm:max-w-md">
        <div v-if="editUserForm">
          <PrimaryLarge class="mt-1" type="submit" @click="ChangeForm">
            <p>Создать нового</p>
          </PrimaryLarge>
        </div>
        <div>
          <BaseInput v-model="formData.username" inputName="Имя пользователя" placeholder="Имя пользователя" />
        </div>
        <div>
          <BaseInput v-model="formData.password" class="mt-1" inputName="Пароль" placeholder="Пароль" />
        </div>
        <div>
          <BaseInput v-model="formData.name" class="mt-1" inputName="Имя" placeholder="Имя" />
        </div>
        <div>
          <BaseInput v-model="formData.secondName" class="mt-1" inputName="Отчество" placeholder="Отчество" />
        </div>
        <div>
          <BaseInput v-model="formData.lastName" class="mt-1" inputName="Фамилия" placeholder="Фамилия" />
        </div>
        <div>
          <label class="text-medium-grey dark:text-white text-xs font-bold mt-1">Подразделение</label>
          <div class="card flex justify-content-center mt-1">
            <Dropdown v-model="formData.department" :options="departmentOptions" optionLabel="label"
              class="w-full md:w-14rem" />
          </div>
        </div>
        <div>
          <label class="text-medium-grey dark:text-white text-xs font-bold mt-1">Должность</label>
          <div class="card flex justify-content-center mt-1">
            <Dropdown v-model="formData.post" :options="postOptions" optionLabel="label" class="w-full md:w-14rem" />
          </div>
        </div>
        <div>
          <BaseInput v-model="formData.phone" class="mt-1" inputName="Телефон" placeholder="Телефон" />
        </div>


        <div>
          <label class="text-medium-grey dark:text-white text-xs font-bold mt-1">Привелегии</label>
          <div class="card flex justify-content-center mt-1">
            <Dropdown v-model="formData.privilege" :options="privilegeOptions" optionLabel="label"
              class="w-full md:w-14rem" />
          </div>
        </div>




        <div>
          <PrimaryLarge class="mt-1" type="submit" @click="submitForm">
            <p v-if="editUserForm">Изменить</p>
            <p v-else>Регистрация</p>
          </PrimaryLarge>
        </div>
        <ul>
          <li class="text-white" v-for="data in formData">{{ data }}</li>
        </ul>
      </div>
    </div>
  </form>

  <div class="flex flex-col rounded-lg p-1 max-h-100 overflow-y-scroll shadow-inner" data-dragscroll>
    <div class="p-5 pr-3 flex flex-col gap-6 overflow-y-auto">
      <div
        class="px-6 py-10 bg-white dark:bg-dark-grey dark:text-white text-black rounded-lg shadow-mg static top-1/2 left-1/2 z-10 w-11/12 sm:max-w-md">


        <table class="outline outline-1">
          <tr>
            <th colspan="4">Users</th>
          </tr>
          <tr>
            <!-- <th>_id:</th> -->
            <th>Username</th>
            <th>Department</th>
            <th>Post</th>
            <th>Privilege</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tr v-for="user in users" class="outline outline-1">
            <!-- <th>{{ user._id }}</th> -->
            <th>{{ user.username }}</th>
            <th>{{ user.department.name }}</th>
            <th>{{ user.post.name }}</th>
            <th>{{ user.privilege.name }}</th>
            <th @click="editUser(user)">
              <iconCloud />
            </th>
            <th @click="deleteUser(user)">
              <iconTrash />
            </th>
          </tr>

        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PrimaryLarge from "../Kanban/buttons/PrimaryLarge.vue";
import BaseInput from "../Kanban/form/BaseInput.vue";
import Structure from "../../../api/structure";
import Privilege from "../../../api/privilege";
import Auth from "../../../api/auth";
import User from "../../../api/user";
import iconTrash from "../Kanban/icons/iconTrash.vue";
import { useManagerStore } from "../../stores/manager";
import iconCloud from "../Calendar/icons/iconCloud.vue";

const managerStore = useManagerStore()
const departmentOptions = ref([]);
const postOptions = ref([]);
const privilegeOptions = ref([]);
const users = ref()
let response = ""
const editUserForm = ref(false)
const formData = ref({
  _id: null,
  username: "",
  password: "",
  name: "",
  lastName: "",
  secondName: "",
  department: "",
  post: "",
  email: "",
  phone: "",
  Image: null,
  privilege: "",
  selectedCity: "",
});

// const postOptions = []; // Fetch post options from the database
const deleteUser = async (user) => {
  try {
    await User.removeUser(user)
  } catch (error) {
    managerStore.showError(error.response, 'registration delete user')
  }
}
const ChangeForm = () => {
  editUserForm.value = false
  ClearForm()
}

const ClearForm = () => {
  formData.value = {
    _id: null,
    username: "",
    password: "",
    name: "",
    lastName: "",
    secondName: "",
    department: "",
    post: "",
    email: "",
    phone: "",
    Image: null,
    privilege: "",
    selectedCity: "",
  }
}
const editUser = (user) => {
  editUserForm.value = true
  formData.value = user
}
onMounted(async () => {
  ClearForm()
  try {
    users.value = await User.fetchUsers()
  } catch (error) {
    managerStore.showError(error.response, 'registration fetchUsers onMounted')
  }
  try {
    response = await Structure.fetchDepartments();

    departmentOptions.value = response.data.map((option) => ({
      value: option._id,
      label: option.name,
    }));

    response = await Structure.fetchPosts();

    postOptions.value = response.data.map((option) => ({
      value: option._id,
      label: option.name,
    }));


    response = await Privilege.fetchPrivilege();

    privilegeOptions.value = response.data.map((option) => ({
      value: option._id,
      label: option.name,
    }));

  } catch (error) {
    throw error
  }
});
const submitForm = () => {
  if (editUserForm) {
    try {
      User.updateUser(formData.value)
    } catch (error) {
      managerStore.showError(error.message, "submitform registr put")
    }
  } else {
    try {
      Auth.register(formData.value);
    } catch (error) {
      managerStore.showError(error.message, "submitform registr post")
    }
  }
}
</script>

