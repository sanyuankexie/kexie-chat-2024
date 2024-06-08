<template>
  <div class="emoji-content">
    <div class="emoji">
      <div class="emoji-wrapper ">
        <ul class="emoji-list">
          <li class="emoji-item" v-for="(item, index) in emojiList" :key="index" @click="emit('sendEmoji', item)">
            <!-- <li class="emoji-item" v-for="(item, index) in emojiList" :key="index"> -->
            <img :src="item.src" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="mask"></div> -->
    <div class="mask" @click="emit('closeEmoji')"></div>
  </div>
</template>
<script setup name="emoji">
import { reactive, ref } from 'vue'
// 这句话是使用 Vue.js 框架中的 new URL 构造函数来创建一个新的 URL 对象。
// 其中，@/assets/img/emoji/slightly - smiling - face.png 是一个相对路径，指向项目中的一个图片资源。
// import.meta.url 是一个特殊的变量，在 ES 模块中，它表示当前模块的 URL。
// new URL 构造函数的第一个参数是要解析的 URL 字符串，第二个参数是基准 URL，用于解析相对路径。
// 在这里，第一个参数是相对路径，第二个参数是当前模块的 URL。
// 因此，这句话的作用是将相对路径 @/assets/img/emoji/slightly - smiling - face.png 解析为一个绝对 URL，
//例如 http://localhost:8080/assets/img/emoji/slightly-smiling-face.png。
// .href 属性是 URL 对象的属性，它返回解析后的 URL 字符串。
// 总的来说，这句话是将一个相对路径解析为一个绝对 URL，以便在项目中正确地加载图片资源。
const emojiList = reactive([
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
])

const emit = defineEmits(['sendEmoji', 'closeEmoji'])
</script>

<style scoped>
.emoji-content {
  position: relative;
}

.emoji {
  width: 390px;
  height: 200px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: -218px;
  left: -47px;
  border-radius: 10px;
  transition: 0.3s;
  z-index: 3;
}


.emoji::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-top: 10px solid rgb(255, 255, 255);
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  position: absolute;
  bottom: -8px;
  left: 13px;
  z-index: 100;
}

.emoji-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 2px;
  box-sizing: border-box;
  position: relative;
}

/* 如果没有设置 overflow:scroll;
 ，元素的滚动条将不会显示。 
 ::-webkit-scrollbar——整个滚动条。
 ::-webkit-scrollbar-thumb——滚动条上的滚动滑块。
 ::-webkit-scrollbar-track——滚动条轨道。*/
.emoji-wrapper::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}

.emoji-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.507);
  background: rgb(251, 192, 120);
}

.emoji-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(187, 140, 87, 0.1);
  border-radius: 10px;
  background: rgb(224, 131, 38);
}

.emoji-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.emoji-item {
  list-style: none;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 5px;
  position: relative;
  cursor: pointer;
}

.emoji-item:hover {
  background-color: rgb(249, 231, 192);
}

.emoji-item img {
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: transparent;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>