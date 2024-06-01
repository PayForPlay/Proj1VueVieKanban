
<template>
    <NoMails v-if="mailsStore.filteredMails.length === 0" />
  <div data-dragscroll v-else-if="mailsStore.filteredMails" class="flex">
              <MailList data-dragscroll :mails="filteredMails"/>
          </div>
  <MailView v-if="managerStore.mailView" />
  <MailForm v-if="managerStore.mailForm" />
</template>

<script setup>
import MailList from './MailList.vue';
import { useManagerStore } from '../../stores/manager'
import { useMailsStore } from '../../stores/mails';
import { ref, watch } from 'vue';
import NoMails from './NoMails.vue';
import MailView from './manager/MailView.vue';
import MailForm from './manager/MailForm.vue';
const filteredMails = ref([]);
const managerStore = useManagerStore()
const mailsStore = useMailsStore()

watch(() => mailsStore.mailFilter, () => {
  mailsStore.filterMails();
  filteredMails.value = mailsStore.filteredMails;
});
</script>

