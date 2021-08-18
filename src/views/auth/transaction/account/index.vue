<template>
    <a-card>
        <schema-form ref="dynamicForm"
                     :formSchema="formSchema" >
            <template #operate-button>
                <a-button @click="confirm" type="primary">
                    确定
                </a-button>
            </template>
        </schema-form>
    </a-card>
    <a-card>
        <dynamic-table  :pageOption="pageOption"  :columns="columns" :get-list-func="postAccountFlowList"></dynamic-table>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref} from 'vue'
    import {Card} from "ant-design-vue";
    import {AButton} from '@/components/button/'
    import { SchemaForm } from '@/components/JSON-schema-form'
    import {formSearch} from './form-search'
    import {DynamicTable} from '@/components/dynamic-table'
    import {toRefs} from "@vueuse/core";
    import {postAccountFlowList} from "@/api/system/transition/account";
    import {columns} from  "./columns"
    export default defineComponent({
        name: "账户流水",
        components: {
            [Card.name]: Card,
            SchemaForm,AButton,DynamicTable
        },
        setup(){
            const dynamicForm = ref<any>(null)
            let state = reactive({
                pageOption: {

                },
            })
            const confirm = ()=>{
                console.log(dynamicForm.value.modelRef)
                state.pageOption = Object.assign(state.pageOption,dynamicForm.value.modelRef)
            }
            return {
                ...toRefs(state),
                confirm,
                dynamicForm,
                formSchema: formSearch(),
                postAccountFlowList,columns
            }
        },
    })
</script>

<style scoped>

</style>
