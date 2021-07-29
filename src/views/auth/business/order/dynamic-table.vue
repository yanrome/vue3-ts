<template>
    <div>
        <a-list item-layout="vertical" size="small" :data-source="data" :pagination="pageOption" class="w100">
            <template class="dd" #renderItem="{ item }">
                <a-list-item class="u-alist-item">
                    <div class="u-alist-title">
                        <div class="u-alt-start">订单号：{{item.orderId}}</div>
                        <div class="u-alt-from">
                            订单来源:
<!--                            {{orderSource[item.orderType]['icon']}}-->
                            <img v-if="orderSource?.[item.orderType]?.['icon']" :src="orderSource?.[item.orderType]?.['icon']" alt="">
                            <span v-else > {{ orderSource?.[item.orderType]?.['label']}}</span>
                        </div>
                        <div class="u-alt-end">创建时间:{{item.order.orderTime}}</div>
                    </div>
                    <div class="w100 u-a-item-main flex-bet">
                        <div class="u-aim-item">
                            <div>{{item.roomScale.scaleName}}</div>
                            <p>1间</p>
                        </div>
                        <div class="u-aim-item">
                            <div>
                                <span>{{ formatDate(item.order.startTime,'MM-DD') }}</span>
                                <span>至</span>
                                <span>{{ formatDate(item.order.endTime,'MM-DD')}}</span>
                            </div>
                            <p>{{item.order.diffDay}}晚</p>
                        </div>
                        <div class="u-aim-item">
                            <div>{{item.sysUser?.realName }}</div>
                            <p>{{item.sysUser?.phone}}</p>
                        </div>
                        <div class="u-aim-item">
                            <div>{{item.roomSn && '房间号'}}</div>
                            <p>{{item.roomSn}}</p>
                        </div>
                        <div class="u-aim-item">
                            <div>房费：{{item.order.price}}</div>
                        </div>
                        <div class="u-aim-item u-aim-group-item z-text-center">
                            <div class="z-text-center">
<!--                                <a-button type="primary">办理入住</a-button>-->
                                <handle :orderRoomMsg="item" :list = "buttonList.filter(list=>{
                                    return list.table &&  list.table.includes(item.status)
                                })"></handle>
                            </div>
                            <div class="u-aim-more">
                                <a-button class="u-aim-more-btn u-aim-before" @click="navDetails(item.id)" type="link">
                                   查看详情
                                </a-button>
                                <a-dropdown class="u-aim-more-btn">
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item key="1"></a-menu-item>
                                        </a-menu>
                                    </template>
                                    <a-button type="link">
                                        更多
                                        <DownOutlined/>
                                    </a-button>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                </a-list-item>
            </template>

        </a-list>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, PropType, watch, toRefs,onMounted} from 'vue'
    import {Card, Select, Table, Popconfirm, List, Button, Dropdown, Menu,  message} from 'ant-design-vue'
    import {DownOutlined} from '@ant-design/icons-vue';
    import {TableProps} from 'ant-design-vue/lib/table/interface'
    import {usePages} from "@/hooks";
    // import {useDraggable, useDragCol} from './hooks'
    // import {Columns, pageOption, Props} from './types'
    import {formatDate} from '@/utils/common'
    import handle from '@/views/auth/business/order/components/handle'
    import router from "@/router";
    import {buttonList} from './utils/btn-type'

    export default ({
        name: 'dynamic-table',
        props: {
            columns: {
                type: Object
            },
            getListFunc: { // 获取列表数据函数API
                type: Function
            },
            rowSelection: {
                type: Object
            },
            rowKey: { // 表格唯一字段
                type: [String, Function] as PropType<string | ((record: any) => string)>,
            },
            pageOption: { // 分页参数
                type: Object ,
                default: () => ({})
            },
            listType: {
                type: String as PropType<string>,
                default: "table"
            },
            bordered:{
                type:Boolean as PropType<boolean>,
                default:true
            },
            orderSource:{
                type:Object
            }
        },
        components: {
            [Table.name]: Table,
            [Card.name]: Card,
            [List.name]: List,
            [Select.name]: Select,
            [Menu.name]: Menu,
            [Dropdown.name]: Dropdown,
            [Popconfirm.name]: Popconfirm,
            Option: Select.Option,
            aListItem: List.Item,
            aMenuItem: Menu.Item,
            Button,
            handle,
            DownOutlined,
        },
        setup(props, {attrs, emit, slots}) {

            ////
            const {pageOption} = Object.assign(usePages({
                pageChangeFn: (data) => {
                    state.pageOption = {
                        ...state.pageOption,
                        ...data
                    }
                    refreshTableData(data)
                },
            }))

            // 开启表格伸缩列
            // useDragCol(props.columns)

            const state = reactive({
                formatDate: formatDate,
                expandItemRefs: {},
                customRow: () => ({}) as TableProps["customRow"],
                data: [], // 表格数据
                pageOption: Object.assign(pageOption, props.pageOption), // 表格分页
                actions: props.columns.find(item => (item.dataIndex || item.key) == 'action')?.actions || [], // 表格操作（如：编辑、删除的按钮等）
                loading: false, // 表格加载
            })
            // 获取表格数据
            const refreshTableData = async (params = {}) => {
                params = {
                    pageNum: state.pageOption.current,
                    pageSize: state.pageOption.pageSize,
                    ...props.pageOption,
                    ...params
                }
                state.loading = true
                const {data, msg, ret, total} = await props.getListFunc(params).finally(() => state.loading = false)

                Object.assign(state.pageOption, {total: total})
                state.data = data
                // state.customRow = useDraggable<any>(state.data)!;
            }

            refreshTableData()

            //发生改变
            watch(props.pageOption, (newProps, oldProps) => {
                refreshTableData()
            });

            // 操作事件
            const actionEvent = async (record, func, actionType) => {
                // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
                await func({record, props}, () => setTimeout(() => refreshTableData()))
                // 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
                if (actionType == 'del' && state.data.length < 2) {
                    state.pageOption.current = Math.max(1, state.pageOption.current - 1)
                }
            }

            // 分页改变
            const paginationChange = (pagination, filters, sorter) => {
                const {field, order} = sorter
                console.log(pagination)
                state.pageOption = {
                    ...state.pageOption,
                    ...pagination
                }
                refreshTableData({
                    pageSize: pagination.pageSize,
                    pageNumber: pagination.current, ...props.pageOption, ...filters,
                    field,
                    order
                })
            }

            // dataIndex 可以为 a.b.c
            // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

            const buttonProps = {
                size: 'small'
            }

            //查看详情
            const navDetails = (id)=>{
                emit('callbackMore',id)

                // router.push({name:'/business/details',query:{id:id}})
            }

            return {
                ...toRefs(state),
                buttonProps,
                buttonList,
                navDetails,
                actionEvent,
                refreshTableData,
                paginationChange,
            }
        }
    })
</script>

<style lang="scss" scoped>
    ::v-deep(.ant-table .ant-table-title) {
        display: flex;

        .ant-btn {
            margin-right: 10px;
        }
    }

    .actions > * {
        margin-right: 10px;
    }

    .u-alist-item {
        font-weight: 500;
        margin-top: 22px;
        padding: 0;
        border: 1px solid #F1F1F1;

        .u-alist-title {
            background: #F8F8F8;
            height: 38px;
            line-height: 38px;
            font-size: 14px;
            width: 100%;
            padding: 0 26px 0 16px;
            color: rgba(0, 0, 0, 0.65);

            .u-alt-start {
                margin-right: 24px;
            }
            .u-alt-from{
                img{
                    width: 20px;
                    height: 20px;
                }
            }

            .u-alt-end {
                float: right;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
                font-weight: 400;
            }

            div {
                display: inline-block;
            }
        }

        .u-a-item-main {
            padding: 30px 13px;

            .u-aim-item {
                color: rgba(0, 0, 0, 0.65);
                flex: 1;

                p {
                    color: rgba(0, 0, 0, 0.45);
                    font-weight: 400;
                }
            }

            .u-aim-group-item {
                margin: 0 32px;

                .u-aim-more {
                    padding-top: 12px;

                    .u-aim-more-btn {
                        display: inline-block;
                    }

                    .u-aim-before {
                        position: relative;

                        &::after {
                            content: " ";
                            position: absolute;
                            height: 14px;
                            right: -1px;
                            top: 9px;
                            width: 1px;
                            background: #D8D8D8;
                        }
                    }
                }
            }
        }
    }
</style>
