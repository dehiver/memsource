import projects_api from "@/api/modules/projects.js";

export default {
    namespaced: true,
    
    state: {
        projects: [
            { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
            { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
            { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
            { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
            { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
        ],

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