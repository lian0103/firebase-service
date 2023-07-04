<script setup>
import { reactive } from "vue";
import { loginWithGoogle } from "../firebase/googleFirebase";

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
  <div class="w-1/3">
    <form action="" class="flex flex-col gap-4">
      <h2>使用Enter</h2>
      <input type="text" v-model="inputRef" />
      <button
        @click.prevent="handleTest"
        class="px-2 py-3 bg-gray-600 text-white rounded-4"
      >
        test Enter
      </button>
    </form>
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
