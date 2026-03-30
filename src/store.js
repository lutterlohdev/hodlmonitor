import { writable } from "svelte/store";
import { safeJsonParse } from "./utils";

export const activePane = writable({});
export const snackbar = createSnackbarSystem();

function createSnackbarSystem() {
  const { subscribe, set, update } = writable([]);
  let nextMessageId = 0;

  return {
    subscribe,
    addMessage: (newMessage, timeout = 5000) => {
      const id = ++nextMessageId;
      update((messages) => [...messages, { id, text: newMessage }]);

      setTimeout(() => {
        update((messages) => messages.filter((message) => message.id !== id));
      }, timeout);

      return id;
    },
    dismiss: (id = null) => {
      if (id == null) {
        set([]);
        return;
      }

      update((messages) => messages.filter((message) => message.id !== id));
    },
  };
}

export const cryptoList = writable(safeJsonParse(localStorage.getItem("list"), []));

cryptoList.subscribe((value) => {
  localStorage.setItem("list", JSON.stringify(value));
});
