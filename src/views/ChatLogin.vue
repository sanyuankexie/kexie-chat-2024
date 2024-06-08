<script setup lang="ts" name="ChatLogin">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// import {type UploadProps } from 'element-plus/lib/components/upload'
// import { Plus } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from "axios";
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

]
let selectedAvatar = ref(0);
let index = 0
let txx = ref(data[index].tx)
const change = () => {
    index++;
    if (index == 10) index = 0
    txx.value = data[index].tx;
    selectedAvatar.value = data[index].number;
}
// 是一个渲染路由链接的组件，但它没有方法。该方法实际上是实例的一部分
let router = useRouter();
let username = ref('')
let Err = ref("");
let uPattern: RegExp = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,10}$/;

function matchUpattern(uPattern: RegExp, str: string) {
    return uPattern.test(str);
}

const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!username.value)
    // if (!username.value) 
    {
        Err.value = "请输入用户名和选择头像";
        ElMessage({
            type: "error",
            message: "请输入用户名和选择头像",
            duration: 4000,
        });
        return;
    }

    let _username = username.value.trim();
    if (!matchUpattern(uPattern, _username)) {
        Err.value =
            "请输入3到10位:由汉字、数字、字母、下划线组成";
        ElMessage({
            type: "error",
            message: "请输入3到10位用户名:由汉字、数字、字母、下划线组成",
            duration: 5000,
        });
        return;
    }

    const formData = new FormData()
    formData.append('name', username.value)
    formData.append('touxiang', selectedAvatar.value)

    console.log('发送请求到服务器...')
    console.log(formData);
    
    console.log('username:', username.value)
    console.log('imageUrl:', selectedAvatar.value)
    console.log('avatarUrl:', txx.value);
    axios.get('/api/login', {
        // 传递的参数
        params: {
            // 账号
            name: username.value,
            // 密码
            touxiang: selectedAvatar.value,
        }
        // 回调函数,一定要使用箭头函数,不然this的指向不是vue示例
    }).then(response => {
        if (response.data.code === 1) {
            console.log(response);
            ElMessage.error(response.data.message)
        } else {
            // 登录成功
             localStorage.setItem('tx', selectedAvatar.value)
            localStorage.setItem('username', username.value)
            localStorage.setItem('avatarUrl', txx.value);
            router.push('/chatRoom')
        }
    }).catch(error => {
        console.log(error)
    })
}
</script>

<template>
    <div class="bigbig">
        <div id="page" class="total">
            <div class="container">
                <div class="login">
                    <div class="left"></div>
                    <div class="main">
                        <form action="" class="form" @submit.prevent="handleSubmit">
                            <div class="mf-1">
                               <div class="mf-2">
                               <img :src="txx" @click="change">
                                       </div>
                                <p>点击切换头像</p>
                                <div class="mf-3">
                                    <input type="text" class="form-control username" v-model="username"
                                        placeholder="请输入用户名">
                                </div>
                                <button type="submit" class="btn btn-primary btn-login"
                                    style="color: white;font-family:'Courier New', Courier, monospace; font-size:35px;">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bigbig {
    background-image: url(../assets/img/聊天室背景.jpg);
    background-position: center center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    /* background-color: floralwhite; */
}
p {
    margin-top: 5px;
    color: #34827a;
    font-size: 18px;
    text-align: center;
    display: active;
}

img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 50%;
}
body {
    background-color: floralwhite;
}

* {
    margin: 0;
    padding: 0;
}

*,
::before::after {
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
}

ul {
    list-style: none;
}

.total {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    height: 82vh;
}

.container {
    max-width: 1060px;
    width: 100%;
    padding: 0px 10px;
    margin: 0px auto;
}

.login {
    display: flex;
    flex-wrap: wrap;
}

.left {
    flex: 63.6666%;
    /* flex: 1：这会将属性设置为 1，这意味着元素将增长以填充 flex 容器中的任何可用空间。该值越高，
    元素的增长就越大。flex-grow 0：这会将属性设置为 0，这意味着如果 flex 容器的宽度减小，元素不会收缩。
    flex-shrink 63.6666%：这会将属性设置为父元素宽度的 63.6666%。
    该属性确定在分配可用空间之前元素的初始宽度。flex-basisflex-basis */
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 70px 0;
}

.left::before {
    content: '';
    /* 必须设置 content 属性，否则一切都是无用功， content 属性也只能应用在: before 和:after 伪元素上； */
    position: absolute;
    top: 13%;
    left: 0;
    width: 455px;
    height: 160px;
    z-index: -1;
    filter: blur(70px);
}

.main {
    flex: 1 0 35.3333%;
}

.main form {
    display: flex;
    flex-direction: column;
    /* padding-top: -20px; */
    margin-top: -10px;
    gap: 30px;
}



.btn {
    line-height: 50px !important
}

form input,
.btn {
    font: inherit;
    font-size: 18px;
    width: 100%;
    border: 0;
    outline: 0;
    padding: 0 20px;
    border-radius: 10px;
    box-sizing: border-box;
}

form input {
    font-size: large;
    background-color: #d7e0c3;
  line-height: 80px !important;
}

form .btn a {
    text-decoration: none;
    color: rgb(255, 255, 255);
}

.mf-3 {
    position: relative;
    top: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
}

form .password i {
    position: absolute;
    top: calc(60px / 2);
    /* 自动调整表单域的大小以适应其容器的大小 */
    right: 20px;
    margin-top: -8px;
    line-height: 1;
    cursor: pointer;
}

form .password a {
    font-size: 13px;
    float: right;
    margin: 5px 20px 0 0;
}

.btn {
    position: relative;
    top: 40px;
}

form .btn {
    font-weight: 700;
    font-size: large;
    background-color: #8eba99;
    cursor: pointer;
    color: black;
    transition: box-shadow .3s;
}

form .btn:hover {
    box-shadow: #80a5a1 0 10px 25px -10px;
}

.mf-2 {
    position: relative;
    margin: auto;
    height: 110px;
    width: 110px;
    border-radius: 77px;
    background-image: url(../assets/img/头像.png);
    background-size: contain;
    /* background-color: #dce5c9; */
}
</style>
<!-- <style>
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 20px;
    color:floralwhite;
    width: 75px;
    height: 75px;
    top: -12px;
    text-align: center;
}
</style> -->