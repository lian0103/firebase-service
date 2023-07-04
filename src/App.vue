<script setup>
import gsap from "gsap";

onMounted(() => {
  const timeline = gsap.timeline({ defaults: { duration: 0.5 } });
  timeline.fromTo(".wrapper-inner", { opacity: 0 }, { opacity: 1 });
});
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-inner p-4">
      <div class="wrapper-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
