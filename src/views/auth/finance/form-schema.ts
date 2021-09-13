import {createVNode} from 'vue'
import AccessTree from './components/access-tree.vue'
import {FormSchema} from "@/types/schema";
import { adminDictDeptByType } from "@/api/system/dept/index";

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
            label: "上级部门",
            field: "deptName",
            value: '',
            props: {
                placeholder: "请输入上级部门"
            },
            rules: [
                {
                    required: true,
                    message: "上级部门不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "部门名称",
            field: "deptName",
            value: '',
            props: {
                placeholder: ""
            },
            rules: [
                {
                    required: true,
                    message: ""
                }
            ]
        },
        {
            type: "input",
            label: "地址",
            field: "province",
            value: '',
            props: {
                placeholder: "请输入地市"
            },
            rules: [
                {
                    required: true,
                    message: "地市不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "显示排序",
            field: "orderNum",
            value: '',
            props: {
                placeholder: "请输入排序"
            },
            rules: [
                {
                    required: true,
                    message: "排序不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "负责人",
            field: "leader",
            value: '',
            props: {
                placeholder: "请输入负责人"
            },
            rules: [
                {
                    required: true,
                    message: "负责人不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "联系电话",
            field: "phone",
            value: '',
            props: {
                placeholder: ""
            },
            rules: [
                {
                    required: true,
                    message: ""
                }
            ]
        },
        {
            type: "input",
            label: "邮箱",
            field: "email",
            value: '',
            props: {
                placeholder: ""
            },
            rules: [
                {
                    required: true,
                    message: ""
                }
            ]
        },
        {
            type: "radio",
            label: "业务分成性质",
            field: "title",
            value: ''
        },
        {
            type: "input",
            label: "分成比例",
            field: "email",
            value: '',
            props: {
                placeholder: ""
            },
            rules: [
                {
                    required: true,
                    message: ""
                }
            ]
        }
    ]
})

