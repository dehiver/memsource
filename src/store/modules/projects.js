import projects_api from "@/api/modules/projects.js";

export default {
    namespaced: true,
    
    state: {
        projects: [ ],
        available_project_statuses: [ 'NEW', 'COMPLETED', 'DELIVERED', ],
        available_project_languages: [ 
            { key: "cs", flag: 'cz' },
            { key: "en", flag: 'gb' },
            { key: "de", flag: 'de' },
            { key: "fi", flag: 'fi' },
            { key: "zh", flag: 'cn' },
            { key: "ru", flag: 'ru' },
            { key: "hu", flag: 'hu' },
            { key: "ja", flag: 'jp' },
            { key: "ko", flag: 'kr' },
            { key: "la", flag: 'la' },
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
                        commit('addProjects', api_response);
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    });
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
            return state.available_project_languages;
        },

        isProjectLoading: (state) => (projectId) => {
            return state.loading.some(loading_project_id => { return loading_project_id === projectId });
        },
    },

    mutations: {
        addProjects(state, api_response) {
            state.projects = [ ...api_response._embedded.projects ];
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