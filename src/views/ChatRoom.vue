<script setup lang="ts">
import { ref,  onUnmounted, nextTick, computed, inject,onMounted } from 'vue';
import Emoji from '@/components/Emoji.vue';
// import { useChatStore } from '@/stores/chat.js';
import ChatNavigator from '@/components/ChatNavigator.vue';
import { v4 as uuidv4 } from 'uuid';
import tx0 from "@/assets/img/head_portrait1.jpg"
import tx1 from "@/assets/img/head_portrait2.jpg"
import tx2 from "@/assets/img/head_portrait3.jpg"
import tx3 from "@/assets/img/head_portrait4.jpg"
import tx4 from "@/assets/img/head_portrait5.jpg"
import tx5 from "@/assets/img/head_portrait6.jpg"
import tx6 from "@/assets/img/head_portrait7.jpg"
import tx7 from "@/assets/img/head_portrait8.jpg"
import tx8 from "@/assets/img/head_portrait9.jpg"
import tx9 from "@/assets/img/head_portrait10.jpg"
const avatarUrl = computed(() => localStorage.getItem('avatarUrl'));
// const username = computed(() => localStorage.getItem('username'));
// const touxiang = computed(() => localStorage.getItem('tx'));
const username = localStorage.getItem("username"); //获取本地存储的用户名
const touxiang = localStorage.getItem("tx");

var socketURL = new URL(`/api/chat/${username}/${touxiang}`, window.location.href);
socketURL.protocol = socketURL.protocol.replace(location.protocol, location.protocol === 'https:' ? 'wss' : 'ws');
const socket = new WebSocket(socketURL); //创建websocket实例

const fromName = ref('');
// const store = useChatStore();
interface ChatMessage {
    id: string;
    name: string;
    chatType: number;
    content: string;
    sender: 'me' | 'friend';
    timestamp: number;
    isImage: boolean;
    touxiang:number;
    avatarUrl:any;
    emojiId:string;
    emojiUrl: string;
}
let showEmoji = ref(false);
let chatMessages = ref<ChatMessage[]>([]);
let inputMsg = ref('');
let chatWindowRef = ref(null);
const { data: EmitSocket, setEmitSocket } = inject("EmitSocket"); //传递socket对象
setEmitSocket(socket); //将socket对象传递给EmitSocket
socket.onopen = function (evt) {
    console.log("WebSocket连接成功!");
    // socket.send("Hello WebSockets!");
};
socket.onmessage = handleMsgEvent; //监听到消息事件,触发handleMsgEvent函数

function handleMsgEvent(event) {
    const EventData = JSON.parse(event.data);
    fromName.value = EventData.fromName;
    console.log(EventData);
    let newMessage: ChatMessage;
    if (EventData.fromName !== username) {
        if (EventData.message.startsWith('a=')) {
            const emojiId = EventData.message.split('=')[1];
            const emojiUrl = EventData.emojiUrl; // 提取 a=x 中的 x 值
            newMessage = {
                id: uuidv4(),
                name: EventData.fromName,
                chatType: 2, // 表情
                content: getEmojiSrc(emojiId), // 根据 emojiId 获取表情图片地址
                sender: 'friend',
                timestamp: Date.now(),
                touxiang: EventData.touxiang,
                avatarUrl: getAvatarUrl(EventData.touxiang),
                emojiId: emojiId, // 保存 emojiId
                emojiUrl: emojiUrl 
            };
            chatMessages.value.push(newMessage);
        } else {
            newMessage = {
                id: uuidv4(),
                name: EventData.fromName,
                chatType: 1, // 文字
                content: EventData.message,
                sender: 'friend',
                timestamp: Date.now(),
                touxiang: EventData.touxiang,
                avatarUrl: getAvatarUrl(EventData.touxiang),
            };
        }
        // socket.send(EventData.message);
        chatMessages.value.push(newMessage);
        scrollToBottom();
    }
}

function getAvatarUrl(touxiangNumber: number) {
    const data = [
        {
            tx: tx0,
            number: 0
        },
        {
            tx: tx1,
            number: 1
        },
        {
            tx: tx2,
            number: 2
        },
        {
            tx: tx3,
            number: 3
        },
        {
            tx: tx4,
            number: 4
        },
        {
            tx: tx5,
            number: 5
        },
        {
            tx: tx6,
            number: 6
        },
        {
            tx: tx7,
            number: 7
        },
        {
            tx: tx8,
            number: 8
        },
        {
            tx: tx9,
            number: 9
        },

    ];
    const avatarData = data.find((item) => item.number === touxiangNumber);
    return avatarData ? avatarData.tx : ''; 
}
function getEmojiSrc(emojiId: string) {
    const emojiList = [
        { id: 'a=1', src: new URL('@/assets/img/emoji/slightly-smiling-face.png', import.meta.url).href },
        { id: 'a=2', src: new URL('@/assets/img/emoji/smiling-face.png', import.meta.url).href },
        { id: 'a=3', src: new URL('@/assets/img/emoji/smiling-face-with-heart-eyes.png', import.meta.url).href },
        { id: 'a=4', src: new URL('@/assets/img/emoji/smiling-face-with-sunglasses.png', import.meta.url).href },
        { id: 'a=5', src: new URL('@/assets/img/emoji/thinking-face.png', import.meta.url).href },
        { id: 'a=6', src: new URL('@/assets/img/emoji/tired-face.png', import.meta.url).href },
        { id: 'a=7', src: new URL('@/assets/img/emoji/money-mouth-face.png', import.meta.url).href },
        { id: 'a=8', src: new URL('@/assets/img/emoji/loudly-crying-face.png', import.meta.url).href },
        { id: 'a=9', src: new URL('@/assets/img/emoji/pouting-face.png', import.meta.url).href },
        { id: 'a=10', src: new URL('@/assets/img/emoji/face-screaming-in-fear.png', import.meta.url).href },
        { id: 'a=11', src: new URL('@/assets/img/emoji/face-without-mouth.png', import.meta.url).href },
        { id: 'a=12', src: new URL('@/assets/img/emoji/face-with-tongue.png', import.meta.url).href },
        { id: 'a=13', src: new URL('@/assets/img/emoji/thumbs-up-yellow.png', import.meta.url).href },
        { id: 'a=14', src: new URL('@/assets/img/emoji/clown-face.png', import.meta.url).href },
        { id: 'a=15', src: new URL('@/assets/img/emoji/new-moon-face.png', import.meta.url).href },
        { id: 'a=16', src: new URL('@/assets/img/emoji/pile-of-poo.png', import.meta.url).href },
        { id: 'a=17', src: new URL('@/assets/img/emoji/jack-o-lantern.png', import.meta.url).href },
        { id: 'a=18', src: new URL('@/assets/img/emoji/ghost.png', import.meta.url).href },
        { id: 'a=19', src: new URL('@/assets/img/emoji/sparkles.png', import.meta.url).href },
        { id: 'a=20', src: new URL('@/assets/img/emoji/star.png', import.meta.url).href },
        { id: 'a=21', src: new URL('@/assets/img/emoji/two-hearts.png', import.meta.url).href },
        { id: 'a=22', src: new URL('@/assets/img/emoji/rainbow.png', import.meta.url).href },
        { id: 'a=23', src: new URL('@/assets/img/emoji/shamrock.png', import.meta.url).href },
        { id: 'a=24', src: new URL('@/assets/img/emoji/thought-balloon.png', import.meta.url).href },
    ];

    const emoji = emojiList.find((item) => item.id === `a=${emojiId}`);
    return emoji ? emoji.src : ''; // 如果找不到对应的表情,返回空字符串
}
function handleCloseEvent() {
    console.log("监听到关闭事件---WebSocket链接关闭!");
}
socket.onclose = handleCloseEvent;
function clickEmoji() {
    showEmoji.value = !showEmoji.value;
}

function handleSendEmoji(emoji: { id: string, src: string }) {
    const newMessage: ChatMessage = {
        id: uuidv4(),
        name: username,
        chatType: 2, // 表情
        content: emoji.src,
        sender: 'me',
        timestamp: Date.now(),
        touxiang: localStorage.getItem('tx'),
        avatarUrl: localStorage.getItem('avatarUrl'), 
        emojiId:emoji.id
    };
    chatMessages.value.push(newMessage);
    clickEmoji();
    scrollToBottom();
    socket.send(newMessage.emojiId);
    // console.log(newMessage);
}

onMounted(() => {
    // 从本地存储中读取聊天记录
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
        chatMessages.value = JSON.parse(storedMessages);
    }
});
onUnmounted(() => {
    // 在组件卸载时,将聊天记录存储到本地存储
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages.value));
    ElMessage({
        type: "success",
        message: "你已经离开聊天室咯!",
        duration: 1500,
    });
    socket.close(); //在组件卸载的时候关闭socket链接
});
function sendText() {
    if (inputMsg.value.trim()==='') {
        {
            // 输入为空时的处理逻辑
            ElMessage({
                type: 'warning',
                message: '请输入消息内容',
                duration: 1800,
            });
            return;
        }
    }
        const newMessage = {
            id: uuidv4(),
            name: username,
            chatType: 0,
            content: inputMsg.value.trim(),
            sender: 'me',
            timestamp: Date.now(),
            touxiang: localStorage.getItem('tx'), 
            avatarUrl: localStorage.getItem('avatarUrl'), 
        };
        chatMessages.value.push(newMessage);
        inputMsg.value = '';
        scrollToBottom();
        // 发送消息到 WebSocket 服务器
        socket.send(newMessage.content);
        // console.log(newMessage);
        // console.log(username);
    // 将新的聊天记录存储到本地存储
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages.value));
    
}
function scrollToBottom() {
    nextTick(() => {
        const chatWindow = chatWindowRef.value;
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    });
}
</script>
<template>
    <div class="bigbig">
        <div class="home" ref="homeRef">
            <ChatNavigator></ChatNavigator>
            <div class="chat-window">
                <div class="info-detail">
                    <div class="name animate__animated animate__flipInX">Welcome to the chatroom of Kexie!</div>
                </div>
                <div class="bottom">
                    <div class="chat-content" ref="chatWindowRef">
                        <div class="chat-wrapper">
                            <div v-for="message in chatMessages" :key="message.id" :class="['chat-' + message.sender]">
                                <div v-if="message.chatType === 0" class="chat-text">{{ message.content }}</div>
                                <div v-else-if="message.chatType === 1" class="chat-text">{{ message.content }}</div>
                                <div v-else-if="message.chatType === 2" class="chat-img">
                                    <img :src="message.content" alt="表情" style="width: 80px; height: 80px" />
                                </div>
                                <div class="info-time">
                                    <span>{{ new Date(message.timestamp).toLocaleString('zh-CN', {
                                        hour12: false,
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        }) }}</span>&nbsp;&nbsp;
                                    <!-- <span v-if="fromName==username">{{ username }}</span> -->
                                    <span>{{ message.name }}</span>
                                    <span><img :src="message.avatarUrl" alt="头像" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chatInputs">
                        <div class="emoji boxinput" @click="clickEmoji">
                            <img src="@/assets/img/emoji/smiling-face.png" alt="" />
                        </div>
                        <div v-show="showEmoji" class="emoji-content">
                            <Emoji @sendEmoji="handleSendEmoji" @closeEmoji="clickEmoji" />
                        </div>
                        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
                        <div class="send boxinput" @click="sendText">
                            <img src="@/assets/img/emoji/rocket.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bigbig {
    width: 100vw;
    height: 106vh;
    background-color: rgb(255, 244, 222);
}

.home {
    position: absolute;
    width: 91vw;
    height: 96vh;
    background-color: #c7d4ab;
    border-radius: 15px;
    left: 50%;
    top: 51%;
    transform: translate(-50%, -50%);
}

.chat-window {
    width: 100%;
    height: 100%;
    position: relative;
}

.top {
    margin-bottom: 50px;
}

.top::after {
    content: "";
    display: block;
    clear: both;
}

.head-pic {
    float: left;
}

.name {
    margin-top: -35px
}

.bottom {
    width: 100%;
    height: 86vh;
    background-color: #c7d4ab;
    border-radius: 20px;
    padding: 14px;
    box-sizing: border-box;
    position: relative;
}

.chat-content {
    width: 100%;
    height: 88%;
    overflow-y: scroll;
    padding: 20px;
    box-sizing: border-box;
}

.chat-content::-webkit-scrollbar {
    width: 0;
    /* Safari,Chrome 隐藏滚动条 */
    height: 0;
    /* Safari,Chrome 隐藏滚动条 */
    display: none;
    /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
}

.chat-wrapper {
    position: relative;
    word-break: break-all;
}

.chat-me {
    flex-direction: row-reverse;
    justify-content: flex-end;
}

.chat-friend {
    width: 100%;
    float: left;
    /* margin-bottom: 10px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.chat-friend .info-time {
    margin: 5px -20px;
    color: #000000;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.chat-friend .chat-text {
    max-width: 90%;
    padding: 13px;
    font-size: 17px;
    border-radius: 20px 20px 20px 5px;
    background-color: darksalmon;
    color: #fff;
}

.chat-friend .chat-text:hover {
    background-color: rgb(227, 132, 98);
    cursor: pointer;
}

.chat-img img {
    max-width: 300px;
    max-height: 200px;
    border-radius: 10px;
}

.info-time {
    margin: 10px 0;
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
}


.info-time span {
    line-height: 50px;
}


.chat-me {
    width: 100%;
    float: right;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}

.chat-me .chat-text {
    float: right;
    font-size: 17px;
    max-width: 90%;
    padding: 13px;
    border-radius: 20px 20px 5px 20px;
    background-color: rgb(122, 174, 220);
    color: #fff;
}

.chat-me .chat-text:hover {
    background-color: rgb(73, 149, 216);
    cursor: pointer;
}

.chat-me .chat-img img {
    max-width: 300px;
    max-height: 200px;
    border-radius: 10px;
}

.chat-me .info-time {
    margin: 5px -20px;
    color: #000000;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.chat-me .info-time img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    /* vertical-align: bottom; */
    margin-left: 4px;
}

.chat-friend .info-time img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-left: 4px;
}

.chat-me .info-time span {
    line-height: 55px;
}

.chatInputs {
    width: 90%;
    position: absolute;
    /* margin: 2.8%; */
    margin-left: 2%;
    display: flex;
}

.boxinput {
    width: 50px;
    height: 50px;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    border: 1px solid rgb(255, 255, 255);
    position: relative;
    cursor: pointer;
    z-index: 5;
}

.chatInputs img {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.emoji {
    transition: 0.3s;
}

.emoji:hover {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(255, 255, 255);
}

.inputs {
    width: 90%;
    height: 50px;
    background-color: antiquewhite;
    border-radius: 15px;
    border: 2px solid antiquewhite;
    padding: 10px;
    box-sizing: border-box;
    transition: 0.2s;
    font-size: 22px;
    color: #000000;
    margin: 0 20px;
    outline: none;
}


.send {
    background-color: rgb(255, 255, 255);
    border: 0;
    transition: 0.3s;
    /* box-shadow: 1px 1px 6px 1px rgb(223, 114, 114); */
}

.send:hover {
    box-shadow: 0px 0px 10px 0px rgb(255, 157, 0);
}

.info-detail {
    text-align: center;
    letter-spacing: 1px;
    margin: 5px 20px 0;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
}
</style>