<template>
    <ul>
        <li v-for="item in overviewData" :key="item.key"></li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            projects: 'projects/getProjects',
        }),

        overviewData() {
            return [
                { key: 'statuses' },
                // no. of projects by the status
                // no. of projects with due date in the past
                // most prominent source language
            ]
        },
    },
}
</script>