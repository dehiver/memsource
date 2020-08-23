<template>
    <div>
        <div class="columns">
            <div class="column" align="right">
                <router-link :to="{ name: 'project', }" class="button is-primary">Create New Project</router-link>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <b-table
                    :data="projects"
                    hoverable
                    :loading="loading"
                    default-sort="dateDue"
                    sort-icon="arrow-up"
                    :toggleDetails="true"
                >
                    <b-table-column field="id" label="Id" width="40" sortable numeric v-slot="props">
                        {{ props.row.id }}
                    </b-table-column>

                    <b-table-column field="name" label="Name" sortable searchable v-slot="props">
                        <router-link :to="{ name: 'project', params: { id: props.row.id } }">{{ props.row.name }}</router-link>
                    </b-table-column>

                    <b-table-column field="status" label="Status" width="120" centered sortable searchable v-slot="props">
                        <b-field :type="{ 'is-success': props.row.status === 'DELIVERED', 'is-info': props.row.status === 'COMPLETED' }">
                            <b-select 
                                size="is-small"
                                placeholder="Select project status" 
                                v-model="props.row.status" 
                                @input="handleProjectStatusChanged(props.row.id, $event)" 
                                :loading="isProjectLoading(props.row.id)"
                                :disabled="isProjectLoading(props.row.id)"
                            >
                                <option
                                    v-for="status in availableStatuses"
                                    :value="status"
                                    :key="status">
                                    {{ status }}
                                </option>
                            </b-select>
                        </b-field>
                    </b-table-column>

                    <b-table-column field="sourceLanguage" label="Source Language" width="200" v-slot="props">
                        <span class="tag">
                            <span class="flag-icon mr-1" :class="[`flag-icon-${getLanguageFlag(props.row.sourceLanguage)}`]" ></span>
                            <span class="is-uppercase">{{ props.row.sourceLanguage }}</span>
                        </span>
                    </b-table-column>

                    <b-table-column field="targetLanguages" label="Target Languages" v-slot="props">
                        <span class="tag mr-2" v-for="language in props.row.targetLanguages" :key="language">
                            <span class="flag-icon mr-1" :class="[`flag-icon-${getLanguageFlag(language)}`]" ></span>
                            <span class="is-uppercase">{{ language }}</span>
                        </span>
                    </b-table-column>

                    <b-table-column field="dateDue" label="Due Date" width="120" sortable default-sort centered v-slot="props">
                        <span 
                            class="is-size-7"
                            :class="{
                                'tag is-danger': !['DELIVERED', 'COMPLETED'].includes(props.row.status) && $moment().isAfter($moment(props.row.dateDue)),
                            }"
                        >{{ $moment(props.row.dateDue).fromNow() }}</span>
                    </b-table-column>

                    <template slot="footer">
                            <div class="has-text-right">
                                {{ projects.length }} / {{ projects.length }}
                            </div>
                        </template>
                </b-table>
            </div>  
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters({
            projects: 'projects/getProjects',
            availableStatuses: 'projects/getAvailableStatuses',
            availableLanguages: 'projects/getAvailableLanguages',
            isProjectLoading: 'projects/isProjectLoading',
        }),
    },

    methods: {
        ...mapActions({
            loadProjects: 'projects/loadProjects',
            patchProject: 'projects/patchProject',
        }),

        handleProjectStatusChanged(projectId, projectNewStatus) {
            this.patchProject({ projectId: projectId, patchParams: { 'status': projectNewStatus }, });
        },

        getLanguageFlag(languageKey) {
            return this.availableLanguages.find(language => { return language.key === languageKey }).flag;
        },
    },

    created() {
        this.loading = true;
        this.loadProjects()
            .then(() => {
                this.loading = false;
            });
    },
}
</script>