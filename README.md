# chatroom_

## 爬坑记录，供下一届参考

### 开发环境和生产环境是不一样的，部署之前一定要在本机测试好，以免出现问题。
下面列出几个发现的问题:  
1. [vite.config.ts](vite.config.ts)在生产环境需要配置 `base` 路径字段
```ts
export default defineConfig({
  base: './',
  //...
})
```

2. 前后端路径一定要做区分，比如后端路径加上 `/api/` 前缀
本项目大部分都做了区分，但是，经调试，ws 链接路径没加 `/api/` 前缀，导致连接出错

3. ip 硬编码问题，经排查，ws url 使用硬编码 ip 和协议名，导致连接出错
```ts
const socketURL = `ws://10.34.38.118/chat/${username}/${touxiang}`; 
```
应该改为
```ts
var socketURL = new URL(`/api/chat/${username}/${touxiang}`, window.location.href);
socketURL.protocol = socketURL.protocol.replace(location.protocol, location.protocol === 'https:' ? 'wss' : 'ws');
const socket = new WebSocket(socketURL); 
```

### 建议
部署之前先使用 caddy 来测试
```shell
npm run build-only # 编译
```
以下是 Caddyfile , `BACKEND_URL` 和 `BACKEND_HOST` 可自行修改，前者为后端 url, 如 http://127.0.0.1:8080 , 后者为要传递给后端的 host , 如 `xxx.kexie.space`  
```Caddyfile
:80 {
        root * ./dist
        file_server
        handle_path /api/* {
              reverse_proxy "{$BACKEND_URL}" {
                 header_up host "{$BACKEND_HOST}"
              }
        }
}
```



This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

