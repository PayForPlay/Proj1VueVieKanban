<template>
  <div>
    <div class="flex h-[4vh] w-full relative bg-white dark:bg-dark-grey rounded-lg cursor-pointer shadow-task group-hover:text-main-purple group-hover:bg-light-grey dark:group-hover:bg-medium-grey">
    
      <div class="absolute top-0 right-[-4px]">
        <Dropdown @onClickDelete="deleteMail(mail)"  @onClickRestore="restoreMail(mail)"/>
      </div>
      <div @click.exact="onClickMail(mail)" class="flex  w-full text-black dark:text-white">
        
        <span v-if="!mail.recipients.find(recipient => recipient?.user?._id === authStore.userId && recipient?.readStatus)" class="rounded-full self-center ml-3 h-2 w-2 bg-main-green" />
        <span v-else class="rounded-full self-center ml-3 h-2 w-2" />
        <span class="basis-2/12 self-center ml-3" style="white-space: nowrap">{{ mail.sender?.name + " " + mail.sender?.secondName + " " + mail.sender?.lastName}}</span>
        <span class="basis-3/12 self-center mx-2" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ truncateText(mail.title, 50) }}</span>
        <span class="basis-6/12 self-center mx-2" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ truncateText(mail.body, 100) }}</span>
        <span class="basis-1/12 self-center mr-8" style="white-space: nowrap">{{ formatDate }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useMailsStore } from "../../stores/mails.js";
import { useManagerStore } from "../../stores/manager.js";
import { useAuthStore } from "../../stores/AuthStore.js";

const mailsStore = useMailsStore();
const managerStore = useManagerStore();
const authStore = useAuthStore();
const props = defineProps({
  mail: {
    type: Object,
    required: true,
  },
});
import Dropdown from "./manager/Dropdown.vue";
import { computed } from "vue";

const deleteMail = async (mail) => {
  mailsStore.UpdateSelectedMail(mail);
  mailsStore.deleteMail(mail)
};
const restoreMail = async (mail) => {
  mailsStore.UpdateSelectedMail(mail);
    mailsStore.restoreMail(mailsStore.getMail)
};
const onClickMail = (mail) => {
  if (!mail.recipients.find(recipient => recipient.user._id === authStore.userId && recipient.readStatus)) {
    mailsStore.changeStatus(mail)
    mailsStore.unread -= 1
  }
  mailsStore.UpdateSelectedMail(mail);
  managerStore.mailView = true;
  managerStore.mailForm = false;
  managerStore.overlay = true;
  managerStore.sidebar = false;
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};

const formatDate = computed(() => {
  const createdAt = new Date(props.mail.createdAt);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(createdAt);
});
</script>
