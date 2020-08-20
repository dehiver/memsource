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

const DATA = [
    { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
    { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
    { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
    { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
    { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
];

import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({

        }),

        isLoading() {
            return false;
        },

        projects() {
            return DATA;
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