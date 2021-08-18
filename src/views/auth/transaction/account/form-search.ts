import {FormSchema} from "@/types/schema";
export const formSearch = (): FormSchema => ({
    style: {
        width: "auto"
    },
    formItemLayout: {
        layout:'inline'
    },
    formItem: [
        {
            type: "input",
            label: "菜单名称",
            field: "userName",
            value: '',
            props: {
                placeholder: "请输入菜单名称",
                style:"margin-left: 20px"
            }
        },
        {
            type: "select",
            label: "菜单状态",
            field: "userName",
            value: 0,
            props: {
                placeholder: "请输入菜单名称",
                style:"margin:0 20px"
            }
        },
        ]
})
