<template>
    <div class="columns">
        <div class="column is-6">
            <h2 v-if="!(project instanceof Object)">New Project</h2>
            <form @submit.prevent="handleFormSubmit">
                <b-field label="Name">
                    <b-input 
                        v-model="name" 
                        required 
                        placeholder="Name of the project"
                        size="is-small">
                    </b-input>
                </b-field>

                <b-field label="Source language">
                    <b-select 
                        v-model="source_language" 
                        required 
                        expanded 
                        size="is-small"
                        placeholder="Select project source language" 
                        
                    >
                        <option
                            v-for="language in availableLanguages"
                            :value="language.key"
                            :key="language.key">
                            {{ language.name }}
                        </option>
                    </b-select>
                </b-field>

                <b-field label="Target languages">
                    <b-select 
                        v-model="target_languages" 
                        multiple
                        expanded
                        size="is-small"
                        placeholder="Select project target languages" 
                    >
                        <option value="" disabled>- None -</option>
                        <option
                            v-for="language in availableLanguages"
                            :value="language.key"
                            :key="language.key">
                            {{ language.name }}
                        </option>
                    </b-select>
                </b-field>

                <b-field>
                    <button class="button" type="submit">Save</button>
                </b-field>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            name: '',
            source_language: null,
            target_languages: [],
        }
    },

    props: {
        project: {
            type: Object,
            required: false,
        },
    },

    computed: {
        ...mapGetters({
            availableLanguages: 'projects/getAvailableLanguages',
        }),
            
        formData() {
            return {
                name: this.name.trim(),
                sourceLanguage: this.source_language,
                targetLanguages: this.target_languages,
            };
        },
    },

    created() {
        if(this.project instanceof Object) {
            this.name = this.project.name;
            this.source_language = this.project.sourceLanguage;
            this.target_languages = this.project.targetLanguages;
        }
    },

    methods: {
        ...mapActions({
            patchProject: 'projects/patchProject',
            createNewProject: 'projects/createNewProject',
        }),

        handleFormSubmit() {
            if(this.project instanceof Object) {
                this.patchProject({
                    projectId: this.project.id,
                    patchParams: this.formData,
                })
                    .then(() => {
                        this.$router.push({ name: 'home' });
                        this.$buefy.toast.open({
                            message: 'Project saved.',
                            type: 'is-success'
                        })
                    });
            }
            else {
                this.createNewProject({
                    ...this.formData,
                    status: 'NEW',
                    dateDue: this.$moment().add(Math.floor(Math.random() * 30), 'days'),
                })
                    .then(() => {
                        this.$router.push({ name: 'home' });
                        this.$buefy.toast.open({
                            message: 'Project created successfully.',
                            type: 'is-success'
                        })
                    });
            }
            
        },
    },
}
</script>