<template>
    <div class="top">
        <button class="button" @click="outt">退出登录</button>
    </div>
</template>

<script setup name="ChatNavigator">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { data: socket } = inject("EmitSocket");
let name = localStorage.getItem('username')
async function logout() {
    const obj = new URLSearchParams();
    obj.append('name', name)
    fetch('/api/logout?' + obj)
        .then(response => {
            if (!response.code===1) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });

}
function outt() {
    logout()
    localStorage.removeItem("username")
    localStorage.removeItem("avatarURL")
    localStorage.removeItem("tx")
    router.push('/login')
    socket.close()
}

</script>

<style scoped>
.top {
    position: relative;
    width: 100%;
}

.button {
    position: absolute;
        right: -19px;
        width: 75px;
        height: 35px;
        border-radius: 15px;
        font-size: 12px;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bolder;
        color: rgb(255, 255, 255);
        border: black;
        background-color: rgba(135, 186, 141, 0.83);
        cursor: pointer;
        top: -15px;
    }

</style>