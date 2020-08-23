<template>
  <section class="container">
    <ProjectForm :projectId="projectId" />
  </section>
</template>

<script>
import ProjectForm from "@/components/projects/ProjectForm.vue";

export default {
  components: {
    ProjectForm,
  },

  computed: {
    projectId() {
      return this.$route.params.id;
    },
  },
}
</script>