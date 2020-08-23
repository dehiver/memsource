<template>
    <b-table
        :data="projects"
        :striped="true"
        :checkable="true"
        :loading="isLoading"
        :mobile-cards="true"
    >
        <b-table-column field="id" label="Id" width="40" sortable numeric v-slot="props">
            {{ props.row.id }}
        </b-table-column>

        <b-table-column field="first_name" label="Name" sortable searchable v-slot="props">
            {{ props.row.first_name }}
        </b-table-column>

        <b-table-column field="last_name" label="Status" sortable searchable v-slot="props">
            {{ props.row.last_name }}
        </b-table-column>

        <b-table-column field="date" label="Due Date" sortable centered v-slot="props">
            <span class="tag is-success">
                {{ new Date(props.row.date).toLocaleDateString() }}
            </span>
        </b-table-column>

        <b-table-column label="Gender" v-slot="props">
            <span>
                <b-icon pack="fas"
                    :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                </b-icon>
                {{ props.row.gender }}
            </span>
        </b-table-column>
    </b-table>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            projects: 'projects/getProjects',
        }),

        isLoading() {
            return false;
        },
    },

    methods: {
        ...mapActions({
            loadProjects: 'projects/loadProjects',
        }),
    },

    created() {
        this.loadProjects();
    },
}
</script>