<template>
  <div id="app">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ routeMeta.title }}</h1>
        </div>
      </div>
    </section>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    routeMeta() {
      return this.$route.meta;
    },
  },
}
</script>