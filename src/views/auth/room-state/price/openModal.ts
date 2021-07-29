import {useCreateModal} from "@/hooks";
import EditModal from './edit.vue'

const open = (options)=>{
    useCreateModal(EditModal,options)
}

export {open}
