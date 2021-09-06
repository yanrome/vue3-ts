import {createVNode} from 'vue'
import AccessTreeSelect from './components/access-tree-select.vue'
import Cascader from './components/cascader.vue'
import {FormSchema} from "@/types/schema";
import { getSystemDictDataByType } from "@/api/system/user/index";
import { Tree } from 'ant-design-vue';

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
            type: createVNode(AccessTreeSelect),
            label: "上级部门",
            field: "id",
            value: '',
            // rules: [
            //     {
            //         required: 'parentId',
            //         message: "用户名不能为空",
            //     }
            // ]
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
            type: createVNode(Cascader),
            label: "地址",
            field: 'province',
            value: '',
        },
        {
            type: "input",
            label: "显示排序",
            field: "orderNum",
            value: '',
            props: {
                placeholder: "请输入排序"
            },
            //  '/^(?:[a-z/d]+[_/-/+/.]?)*[a-z/d]+@(?:([a-z/d]+/-?)*[a-z/d]+/.)+([a-z]{2,})+$/i',
            // rules: [
            //     {
            //         required: true,
            //         message: "密码不能为空",
            //         validator: async (rule, value) => {
            //             // 获取二次确认密码
            //             const {confirmPassword, password} = dynamicForm.value.modelRef
            //             if (password === '') {
            //                 return Promise.reject('请输入密码');
            //             } else {
            //                 // if (confirmPassword !== '') {
            //                 //     dynamicForm.value.validateField('confirmPassword');
            //                 // }
            //                 return Promise.resolve();
            //             }
            //         }
            //     }
            // ]
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
            field: "shareScale",
            value: 0,
            asyncOptions: async () => {
                const params = { dictType:'business_share_scale' }
                const res = await getSystemDictDataByType (params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
                
            }
        },
        {
            type: "input",
            label: "分成比例",
            field: "shareRatio",
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

