
import { useManagerStore } from '../stores/manager';
export const handleKeyDown = (event) => {
    
  const managerStore = useManagerStore();
    if (event.key === "Escape") {
      managerStore.sidebar = !managerStore.sidebar;
    }
  };