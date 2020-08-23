<template>
    <form @submit="handleFormSubmit">
        <b-field label="Name">
            <b-input v-model="name"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
        }
    },

    computed: {
        formEmitData() {
            return {};
        },
    },

    methods: {
        setFormData() {

        },

        handleFormSubmit() {

        },
    },
}
</script>