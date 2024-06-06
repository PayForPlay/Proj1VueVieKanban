
<template>
  <NoMails v-if="mailsStore.filteredMails.length === 0" />
  <div data-dragscroll v-else-if="mailsStore.filteredMails" class="flex">
              <MailList data-dragscroll :mails="filteredMails"/>
          </div>
</template>

<script setup>
import MailList from './MailList.vue';
import { useMailsStore } from '../../stores/mails';
import { ref, watch } from 'vue';
import NoMails from './NoMails.vue';
const filteredMails = ref([]);
const mailsStore = useMailsStore()

watch(() => mailsStore.mailFilter, () => {
  mailsStore.filterMails();
  filteredMails.value = mailsStore.filteredMails;
});
</script>

