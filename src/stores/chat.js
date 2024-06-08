import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
    state: () => ({
        chatMessages: [],
    }),
    actions: {
        addMessage(message) {
            this.chatMessages.push(message);
        },
        getMessages() {
            return this.chatMessages;
        },
    },
    persist: true, // Add this line to enable persistence
});
