<script setup lang="ts">
// import ChatLogin from '@/views/ChatLogin.vue';
// import ChatRoom from '@/views/ChatRoom.vue';
import { RouterView } from 'vue-router'
import {  provide } from "vue";
let EmitSocket = 0; //socket实例
provide("EmitSocket", {
  data: EmitSocket, //data: socket
  setEmitSocket(value) {
    EmitSocket = value; //EmitSocket =  socket
  },
});
</script>

<template>
    <!-- <ChatLogin /> -->
    <!-- <ChatRoom /> -->
    <RouterView />
</template>

<style scoped>
</style>
