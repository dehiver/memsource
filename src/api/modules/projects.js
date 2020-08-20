import api_factory from "@/api/api.js";

const api = api_factory.create();

export default {
    getProjects() {
        return api.get('projects');
    },
}