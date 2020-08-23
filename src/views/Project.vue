<template>
  <section class="container">
    <b-loading v-model="loading" />
    <ProjectForm :project="project" v-if="projectId === null || (project instanceof Object)" />
  </section>
</template>

<script>
import ProjectForm from "@/components/projects/ProjectForm.vue";

import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    ProjectForm,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      getProjectById: 'projects/getProjectById',
    }),

    projectId() {
      if(!isNaN(parseInt(this.$route.params.id))) {
        return parseInt(this.$route.params.id);
      }

      return null;
    },

    project() {
      if(this.projectId) {
        return this.getProjectById(this.projectId);
      }

      return null;
    },
  },

  created() {
    if(this.projectId && !(this.project instanceof Object)) {
      this.loading = true;
      this.loadProjectById(this.projectId)
        .then(() => {
          this.loading = false;
        });
    }
  },

  methods: {
    ...mapActions({
      loadProjectById: 'projects/loadProjectById',
    }),
  },  
}
</script>