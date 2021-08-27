<template>
    <a-tag :color="color"> {{text}}</a-tag>
</template>

<script lang="ts">
    import {defineComponent, reactive} from 'vue'
    import {Tag} from "ant-design-vue";
    import {toRefs} from "@vueuse/core";
    import {isFunction} from "@/utils/is";

    export default defineComponent({
        name: "ant-tag",
        components:{
            [Tag.name]:Tag
        },
        props:{
            txt:{
                type:String,
                default:''
            },
            color:{
                type:String,
                default:'#389e0d'
            },
            getTypeFun:{
                type:Function,
                default: () => ({})
            }
        },
        setup(props){
            const state = reactive({
                text:props.txt
            })
            if(props.getTypeFun && isFunction(props.getTypeFun)){
                const getFun = async ()=>{
                    const data = await props?.getTypeFun()
                    data && (  state.text = data?.[props?.txt])
                }
                getFun()
            }

            return {
                ...toRefs(state)
            }
        }
    })
</script>

<style scoped>

</style>
