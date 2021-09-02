<template>
    <a-cascader style="width: 300px" v-model:value="pcaList"
                :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
                placeholder="请选择省市区"
                @change="change"
                :options="options"></a-cascader>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {Cascader} from "ant-design-vue";
    import options from 'china-division/dist/pc-code.json';
    export default defineComponent({
        name: "cascader",
        components:{
            [Cascader.name]:Cascader
        },
        props:{
            value: {
                type: Array,
                default: () => []
            }
        },
        emits: ['update:value'],
        setup(props,{emit}){
            const change = (e)=>{
                emit('update:value',e)
            }
            return {
                change,
                pcaList:props.value,
                options:options
            }
        },
    })
</script>

<style scoped>

</style>
