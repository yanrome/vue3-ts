<template>
    <dynamic-table ref="tableRef"
                   :columns="columns"
                   :pageOption="pageOption"
                   :get-list-func="adminMenus" rowKey="id" >
        <template v-slot:title>
            <a-button v-permission="{ action: undefined, effect: 'disabled' }" @click="addItem" type="primary">
                添加
            </a-button>
        </template>
    </dynamic-table>
</template>

<script>
    import {adminMenus} from '@/api/system/menu'
    import {DynamicTable} from '@/components/dynamic-table'
    import {columns} from './columns'
    import {reactive, toRefs} from "vue";
    import AddModal from './add-modal.vue'
    import { useCreateModal } from '@/hooks'
    export default {
        name: "system-menu",
        components: {
            DynamicTable
        },
        setup() {
            let state = reactive({
                pageOption: {
                    pageSize:10
                },
            })

            //添加
            const addItem = ()=>{
                useCreateModal(AddModal,{})
            }

            return {
                ...toRefs(state),
                adminMenus,
                addItem,
                columns
            }
        },
    }
</script>

<style scoped>

</style>
