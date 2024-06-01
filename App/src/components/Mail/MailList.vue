<template>
    <div
      tag="div"
      name="mails"
      data-dragscroll
      class="flex flex-col w-10/12 mr-10 gap-1 z-0"
    >
    
      <MailCard v-for="mail in mailsStore.filteredMails" :key="mail._id" :mail="mail" />
    </div>
</template>

<script setup>
import { useMailsStore } from "../../stores/mails";
import MailCard from "./MailCard.vue";
const mailsStore = useMailsStore();
</script>