<template>
  <div id="app">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <router-link :to="{ name: 'home' }">Home</router-link>
            <span class="mr-5 ml-5" v-if="route.name !== 'home'"><i class="mdi mdi-arrow-right is-size-4"></i></span>
            <router-link :to="{ name: route.name }" v-if="route.name !== 'home'">{{ route.meta.title }}</router-link>
          </h1>
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
    route() {
      return this.$route;
    },
  },
}
</script>