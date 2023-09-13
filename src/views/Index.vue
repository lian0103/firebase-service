<script setup>
import { reactive } from "vue";
import { loginWithGoogle } from "../firebase/authService.js";
import { appInfo } from "../stores";

const info = ref({});

const inputRef = ref("");

const handleLogin = () => {
  loginWithGoogle().then((res) => {
    // console.log(res);
    const { email, photoURL, displayName } = res;
    info.value = {
      displayName,
      email,
      photoURL,
    };
  });
};

const handleTest = () => {
  let str = "in handleTest " + inputRef.value;
  window.alert(str);
};
</script>

<template>
  <h1>範例</h1>
  <div class="py-6 flex flex-col gap-4">
    <h2>使用 Firebase Login</h2>
    <button
      @click="handleLogin"
      class="w-1/3 px-2 py-3 bg-gray-600 text-white rounded-4"
    >
      Login
    </button>
    <div class="flex mb-4">
      <div class="flex justify-between w-1/3">
        <div>
          <p>displayName:{{ info.displayName }}</p>
          <p>email:{{ info.email }}</p>
        </div>
        <img
          class="rounded-full"
          v-if="info.photoURL"
          :src="info.photoURL"
          alt="avatar"
        />
      </div>
    </div>
  </div>
  <div class="py-6 flex flex-col gap-4">
    <h2>POSTMAN 配置</h2>
    <p>
      POST https://fcm.googleapis.com/fcm/send Content-Type: application/json
    </p>
    <p>Authorization: Bearer {Cloud Messaging API (舊版) 伺服器金鑰}</p>
    <p>{</p>
    <p>
      "notification":{"title": "Your Notification Title", "body":
      "YourNotification Body" },
    </p>
    <p>"to": {FirebaseCloudMessageToken}</p>
    <p>}</p>
    <p>
      from firebase console : 舊版 HTTP 或 XMPP API (已於 2023 年 6 月 20
      日淘汰)，請務必在 2024 年 6 月 20 日以前，改用最新的 Firebase Cloud
      Messaging API (HTTP v1)。
    </p>
  </div>

  <div class="py-6 flex flex-col gap-4">
    <h2>appInfo.FirebaseCloudMessageToken</h2>
    <p>{{ appInfo.FirebaseCloudMessageToken }}</p>
  </div>

  <div class="py-6 flex flex-col gap-4">
    <h2>appInfo.onMessage</h2>
    <p>{{ appInfo.onMessage }}</p>
  </div>
</template>

<style lang="scss">
h1 {
  @apply p-4 font-bold text-3xl tracking-wide shadow-md;
}

h2 {
  @apply p-4 font-bold text-2xl tracking-wide shadow-sm;
}
</style>
