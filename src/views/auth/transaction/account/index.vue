<template>
    <a-card>
        <schema-form ref="dynamicForm"
                     :formSchema="formSearch()" />
    </a-card>
    <a-card>
        账户流水
    </a-card>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {Card} from "ant-design-vue";
    import { SchemaForm } from '@/components/JSON-schema-form'
    import {formSearch} from './form-search'

    export default defineComponent({
        name: "账户流水",
        components: {
            [Card.name]: Card,
            SchemaForm
        },
        setup(){
            return {
                formSearch
            }
        },
    })
</script>

<style scoped>

</style>
