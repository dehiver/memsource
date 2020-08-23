<template>
  <section class="container">
    <ProjectOverview />
    <ProjectList />
  </section>
</template>

<script>
import ProjectOverview from '@/components/projects/ProjectOverview.vue'
import ProjectList from '@/components/projects/ProjectList.vue'

export default {
  name: 'Home',

  components: {
    ProjectOverview,
    ProjectList,
  },
}
</script>
