import projects_api from "@/api/modules/projects.js";

export default {
    namespaced: true,
    
    state: {
        projects: [ ],
        available_project_statuses: [ 'NEW', 'COMPLETED', 'DELIVERED', ],
        available_project_languages: [ 
            { key: "cs", flag: 'cz', name: 'Čeština', },
            { key: "en", flag: 'gb', name: 'Angličtina', },
            { key: "de", flag: 'de', name: 'Němčina', },
            { key: "fi", flag: 'fi', name: 'Finština', },
            { key: "zh", flag: 'cn', name: 'Čínština', },
            { key: "ru", flag: 'ru', name: 'Ruština', },
            { key: "hu", flag: 'hu', name: 'Maďarština', },
            { key: "ja", flag: 'jp', name: 'Japonština', },
            { key: "ko", flag: 'kr', name: 'Korejština', },
            { key: "la", flag: 'la', name: 'Laoština', },
        ],
        loading: [ ],
    },

    actions: {
        loadProjects({ commit, }) {
            return new Promise((resolve, reject) => {
                projects_api.getProjects()
                    .then(api_response => {
                        commit('addProjects', api_response.data);
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    });
            });
        },

        loadProjectById({ commit }, projectId) {
            return new Promise((resolve, reject) => {
                projects_api.getProjectById(projectId)
                    .then(api_response => {
                        commit('addProject', api_response.data);
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    });
            });
        },

        createNewProject({ commit }, projectParams) {
            return new Promise((resolve, reject) => {
                projects_api.postProject(projectParams)
                    .then(() => {
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    })
            });
        },

        patchProject({ commit, }, { projectId, patchParams }) {
            return new Promise((resolve, reject) => {
                commit('setLoading', { projectId: projectId, loadingStatus: true, });
                projects_api.patchProject({ projectId: projectId, patchParams: patchParams })
                    .then(api_response => {
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    })
                    .finally(() => {
                        commit('setLoading', { projectId: projectId, loadingStatus: false, });
                    });
            });
        },
    },

    getters: {
        getProjects: (state) => {
            return state.projects;
        },

        getProjectById: (state) => (projectId) => {
            return state.projects.find(project => { return project.id === projectId });
        },

        getAvailableStatuses: (state) => {
            return state.available_project_statuses;
        },

        getAvailableLanguages: (state) => {
            return state.available_project_languages.sort((a, b) => { return a.name > b.name ? 1 : -1 });
        },

        isProjectLoading: (state) => (projectId) => {
            return state.loading.some(loading_project_id => { return loading_project_id === projectId });
        },
    },

    mutations: {
        addProjects(state, api_response) {
            state.projects = [ ...api_response._embedded.projects ];
        },

        addProject(state, api_response) {
            state.projects = [ api_response ];
        },

        setLoading(state, { projectId, loadingStatus, }) {
            if(loadingStatus === true) {
                state.loading.push(projectId);
            }
            else {
                state.loading.splice(state.loading.findIndex(loading_project_id => { return loading_project_id === projectId }), 1);
            }
        },
    },

    modules: {

    }
}