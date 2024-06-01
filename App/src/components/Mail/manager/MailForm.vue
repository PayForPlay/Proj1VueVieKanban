<template>
  <form
    @submit.prevent="onSubmit" autocomplete='off'
    class="bg-white dark:bg-dark-grey rounded-lg p-1"
  >
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh]">
      <div class="flex items-center justify-center">
        <h2 class="text-black dark:text-white flex font-bold text-md">
          Создать новое письмо
        </h2>
      </div>
      <div class="card p-fluid">
        <label class="text-black dark:text-white text-xs font-bold pb-32"
          >Получатели</label
        >
        <AutoComplete
          v-model="mail.recipients"
          multiple
          :suggestions="filteredUsers"
          @complete="search"
          required
          placeholder="Иван Иванов"
          class="w-full"
        />
      </div>
      <BaseInput
        ref="inputSubject"
        v-model="mail.title"
        inputName="Заголовок"
        placeholder="Заголовок"
        required
      />
      <BaseTextarea
        ref="inputBody"
        v-model="mail.body"
        inputName="Описание"
        placeholder="Описание"
        required
      />
      <ButtonPrimaryLarge type="submit">
        Отправить
      </ButtonPrimaryLarge>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive, onBeforeUpdate, onMounted } from "vue";
import { useMailsStore } from "../../../stores/mails.js";
import { useManagerStore } from "../../../stores/manager.js";
import { useAuthStore } from "../../../stores/AuthStore"
import BaseInput from "../../Kanban/form/BaseInput.vue";
import BaseTextarea from "../../Kanban/form/BaseTextarea.vue";
import ButtonPrimaryLarge from "../../Kanban/buttons/PrimaryLarge.vue";
import User from "../../../../api/user";
import Mail from "../../../../api/mail";

const mailsStore = useMailsStore();
const managerStore = useManagerStore();
const authStore = useAuthStore();
const inputs = ref([]);

let usersMap = new Map();
const filteredUsers = ref([]);
const mail = reactive({
  recipients: [],
  title: "",
  body: "",
});
onMounted(async () => {
  const response = await User.fetchUsers();
  response.forEach((user) => {
    if (user._id !== authStore.userId) {
      usersMap.set(user.fullName, user._id);
    }
  });
});
const search = (event) => {
  filteredUsers.value = Array.from(usersMap.keys()).filter(
    (fullName) =>
    fullName.includes(event.query) && !mail.recipients.includes(fullName)
  );
};
const onSubmit = async () => {
  if (mail.recipients.length !== 0) {
    let sendData = {
    recipients: mail.recipients.map((recipient) => ({ user: { _id: usersMap.get(recipient) } })),
    title: mail.title,
    body: mail.body,
  };
  const response = await Mail.sentMail(sendData);
  mailsStore.addMail(response.data)

  managerStore.hideOverlay();
  }
};
//Редактирование

onBeforeUpdate(() => {
  inputs.value = [];
});
</script>
