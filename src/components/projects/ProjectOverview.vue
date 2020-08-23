<template>
    <div class="columns">
        <div class="column is-4">
            <h3 class="subtitle">Overview</h3>
            <p>
                <span 
                    class="tag mr-2" 
                    :class="{ 
                        'is-info': row.status === 'COMPLETED',
                        'is-success': row.status === 'DELIVERED',
                    }" 
                    v-for="row in projectsByStatuses" :key="row.status"
                >
                    {{ row.count }} {{ row.status }}
                </span>
            </p>
        </div>
        <div class="column is-4">
            <h3 class="subtitle">Overdue projects</h3>
            <p v-if="overdueProjects.length">
                <span 
                    class="tag is-danger mr-2" 
                    v-for="project in overdueProjects" :key="project.id"
                >
                    {{ project.name }} ({{ $moment.duration($moment(project.dateDue).diff($moment())).humanize() }})
                </span>
            </p>
            <p v-else>
                <span>All projects are on time</span>
            </p>
        </div>

        <div class="column is-4">
            <h3 class="subtitle">Most prominent source language</h3>
            <p>
                <span class="tag">
                    <span class="flag-icon mr-1" :class="[`flag-icon-${getLanguageFlag(mostProminentSourceLanguage.key)}`]" ></span>
                    <span class="is-uppercase">{{ mostProminentSourceLanguage.key }} ({{ mostProminentSourceLanguage.percentage }} %)</span>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            projects: 'projects/getProjects',
            availableStatuses: 'projects/getAvailableStatuses',
            availableLanguages: 'projects/getAvailableLanguages',
        }),

        projectsByStatuses() {
            return this.availableStatuses.map(status => {
                return {
                    status: status,
                    count: this.projects.filter(project => { return project.status === status }).length,
                };
            });
        },

        overdueProjects() {
            return this.projects.filter(project => { return this.$moment().isAfter(this.$moment(project.dateDue)) && project.status !== 'DELIVERED' });
        },

        mostProminentSourceLanguage() {
            let languages_stats = this.availableLanguages.map(language => {
                return {
                    key: language.key,
                    count: this.projects.filter(project => { return project.sourceLanguage === language.key }).length,
                }
            });

            let languages_sorted_by_occurence = languages_stats.sort((a, b) => {
                return a.count > b.count ? 1 : -1;
            });

            let most_prominent_source_language = languages_sorted_by_occurence.pop();

            return {
                ...most_prominent_source_language,
                percentage: Math.round(most_prominent_source_language.count / this.projects.length * 100),
            };
        },
    },

    methods: {
        getLanguageFlag(languageKey) {
            return this.availableLanguages.find(language => { return language.key === languageKey }).flag;
        },
    },
}
</script>