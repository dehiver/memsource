<template>
    <router-link :to="{ name: 'project', params: { id: project.id } }">

    </router-link>
</template>

<script>
export default {
    name: 'project-list-item',

    props: {
        project: {
            id: Number,
            name: String,
            sourceLanguage: String,
            status: String,
            targetLanguages: Array,
            dateCreated: String,
            dateUpdated: String,
            dateDue: String,
            _links: {
                self: {
                    href: String,
                },
                project: {
                    href: String,
                },
            },
        },
    },
}
</script>