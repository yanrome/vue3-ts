import {createVNode} from 'vue'
import AccessTree from './components/access-tree.vue'
import {FormSchema} from "@/types/schema";
import {getAdminRoleAccess} from "@/api/system/role";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    style: {
        width: "auto"
    },
    formItemLayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    },
    formItem: [
        {
            type: "input",
            label: "用户姓名",
            field: "roomUser",
            value: '',
            props: {
                placeholder: "请输入"
            },
            rules: [
                // { required: true, message: 'Please input Activity name', trigger: 'blur' },
            ]
        },
        {
            type: "input",
            label: "身份证",
            field: "idCard",
            value: "",
            props: {
                placeholder: "请输入"
            },
            rules: [
                // {
                //     required: true,
                //     message: "身份证不能为空"
                // },
            ]
        },

    ]
})

