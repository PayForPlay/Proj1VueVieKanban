<template>
  <div id="MailView" class="absolute bg-white dark:bg-dark-grey rounded-md p-1 shadow-xl z-20 top-1/3 left-1/3">
    <div class="p-5 pr-3 flex flex-col gap-4 max-h-[90vh] overflow-y-auto ">
      <div class="absolute top-2 right-2">
        <Dropdown @onClickDelete="deleteMail()" @onClickRestore="restoreMail()" />
      </div>
      <div class="flex justify-between items-center gap-4">
        <h4 class="dark:text-light-grey text-dark-grey font-bold text-lg py-2 w-full px-2 rounded-md">{{
          mailsStore.getMail.title }}</h4>
      </div>
      <div class="dark:text-light-grey text-dark-grey text-xs px-2 py-2">
        <p>От: {{ mailsStore.getMail.sender.name + " " + mailsStore.getMail.sender.secondName + " " +
          mailsStore.getMail.sender.lastName + " " + formatDate2 }}</p>

        <p>Кому:

          <template v-for="recipient in mailsStore.getMail.recipients" class="text-black  dark:text-white ">
            {{ " " + recipient.user.name + " " + recipient.user.secondName + ", " }}
          </template>
        </p>

        <template v-if="mailsStore.getMail.Deleted">
          <p class=" text-red-light rounded-sm">Статус: Удаленно {{ formatDate }}</p>
        </template>
      </div>

      <div class="flex justify-between items-center gap-4 rounded-md">
        <h4 class=" dark:text-light-grey text-dark-grey h-[30vh] w-full rounded-md px-2 py-2 overflow-y-scroll">{{
          mailsStore.getMail.body }}</h4>
      </div>
      <form v-if="!mailsStore.getMail.Deleted" @submit.prevent="onSubmit">
        <div class="mb-2">
          <BaseTextarea ref="inputSubject" v-model="mail.body" required inputName="Ответ" placeholder="Ответ" />
        </div>
        <div>
          <ButtonPrimaryLarge type="submit">
            Отправить
          </ButtonPrimaryLarge>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { useMailsStore } from '../../../stores/mails.js';
import { useManagerStore } from '../../../stores/manager.js';
import Dropdown from './Dropdown.vue';
import BaseTextarea from '../../Kanban/form/BaseTextarea.vue';
import { reactive, computed } from 'vue';
import ButtonPrimaryLarge from "../../Kanban/buttons/PrimaryLarge.vue"
import Mail from '../../../../api/mail';

const mailsStore = useMailsStore();
const managerStore = useManagerStore();


const mail = reactive({
  recipients: [],
  title: "",
  body: "",
});

const deleteMail = async () => {
  mailsStore.deleteMail(mailsStore.getMail)
  managerStore.hideOverlay()
};
const restoreMail = async () => {
  mailsStore.restoreMail(mailsStore.getMail)
  managerStore.hideOverlay()
};
const onSubmit = async () => {
  mail.recipients.push({user: mailsStore.getMail.sender})
  let sendData = {
    recipients: mail.recipients,
    title: "re: " + mailsStore.getMail.title,
    body: mail.body,
  };
console.log(sendData);
  const response = await Mail.sentMail(sendData);
  mailsStore.addMail(response.data)

  managerStore.hideOverlay();
};

const formatDate = computed(() => {
  const deletedAt = new Date(mailsStore.getMail.DeletedAt);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(deletedAt);
});
const formatDate2 = computed(() => {
  const deletedAt = new Date(mailsStore.getMail.createdAt);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(deletedAt);
});
</script>