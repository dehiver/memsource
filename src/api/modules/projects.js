import api_factory from "@/api/api.js";

const api = api_factory.create();

export default {
    getProjects() {
        return api.get('projects');
    },

    getProjectById(projectId) {
        return api.get('projects/' + projectId);
    },

    postProject(projectParams) {
        return api.post('projects', projectParams);
    },

    patchProject({ projectId, patchParams }) {
        return api.patch('projects/' + projectId, patchParams );
    },
}