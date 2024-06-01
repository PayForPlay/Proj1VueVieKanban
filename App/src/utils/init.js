// src/utils/init.js
import { useMailsStore } from '../stores/mails';
import { useBoardsStore } from '../stores/boards';
import { useManagerStore } from '../stores/manager';
import { useEventsStore } from '../stores/events';

export const Init = async () => {
  const mailsStore = useMailsStore();
  const boardsStore = useBoardsStore();
  const managerStore = useManagerStore();
  const eventsStore = useEventsStore();

  

  
  boardsStore.$subscribe((mutations, state) => {
    localStorage.setItem('data', JSON.stringify(state))
  })
  await boardsStore.getData()
  
  eventsStore.$subscribe((mutations, state) => {
    localStorage.setItem('events', JSON.stringify(state))
  })
  await eventsStore.getData()

  mailsStore.$subscribe((mutations, state) => {
    localStorage.setItem('mails', JSON.stringify(state))
  })
  await mailsStore.getData()
  mailsStore.filterMails()
  
};
