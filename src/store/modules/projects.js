import projects_api from "@/api/modules/projects.js";

export default {
    namespaced: true,
    
    state: {
        projects: [],

        project_statuses: [ 'NEW, COMPLETED, DELIVERED', ],
        project_languages: [ "cs", "en", "de", "fi", "zh", "ru", "hu", "ja", "ko", "la", ],
    },

    actions: {
        loadProjects({ commit, }) {
            return new Promise((resolve, reject) => {
                projects_api.getProjects()
                    .then(api_response => {
                        commit('addProjects', api_response);
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
    },

    getters: {
        getProjects: (state) => {
            return state.projects;
        },

        getProjectById: (state) => (projectId) => {
            return state.projects.find(project => { return project.id === projectId });
        },
    },

    mutations: {
        addProjects(state, api_response) {
            if(Array.isArray(api_response)) {
                state.projects = [ ...state.projects, ...api_response ];
            }
            else {

            }
        },
    },

    modules: {

    }
}