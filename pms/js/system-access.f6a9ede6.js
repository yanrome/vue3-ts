(window.webpackJsonp=window.webpackJsonp||[]).push([["system-access"],{"072c":function(e,t,n){"use strict";n("7dbf")},"2b29":function(e,t,n){},3585:function(e,t,n){"use strict";var r=n("7a23"),o={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"}}]},name:"caret-down",theme:"outlined"},a=n("b3f0");function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(e,t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){c(e,t,n[t])}))}return e}({},e,t.attrs);return r.createVNode(a.a,r.mergeProps(n,{icon:o}),null)};u.displayName="CaretDownOutlined",u.inheritAttrs=!1,t.a=u},7606:function(e,t,n){"use strict";n("2b29")},7996:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return c.a})),n.d(t,"a",(function(){return u})),n("1da1"),n("96cf"),n("d3b7");var r=n("7a23"),o=n("5530");function a(e){var t=Object(r.ref)(Object(o.a)({current:1,pageSize:10,total:0,pageSizeOptions:["10","20","30","40","50"],showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e){return"共 ".concat(e," 条")},onChange:function(t,n){var r;null==e||null===(r=e.pageChange)||void 0===r||r.call(e,t,n),null==e||e.pageChangeFn({pageNum:t,pageSize:n,current:t})},onShowSizeChange:function(t,n){var r;null==e||null===(r=e.pageChange)||void 0===r||r.call(e,t,n),null==e||e.pageChangeFn({pageNum:t,pageSize:n,current:t})}},e));return{pageOption:t,updatePageOption:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object.assign(t.value,e)}}}var c=n("76b3"),u=(n("159b"),n("b64b"),n("b0c0"),function(e,t,n){var a,c=document.createElement("div"),u=function(){a=null,Object(r.render)(null,c),c.remove()};return(a=Object(r.createVNode)(e)).props=Object(r.mergeProps)(a.props,Object(o.a)({remove:u},t)),Object(r.render)(a,c),a.component.ctx.remove=u,a.component.ctx.$updateProps=function(e){e&&Object.keys(e).forEach((function(t){a.component.props[t]=e[t]}))},a.component.ctx})},"7dbf":function(e,t,n){},"8abb":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=Object(r.withScopeId)("data-v-7367c0e4");Object(r.pushScopeId)("data-v-7367c0e4");var a={class:"flex"},c=Object(r.createTextVNode)("Zone one"),u=Object(r.createTextVNode)("Zone two"),l=Object(r.createTextVNode)(" 搜索 "),i=Object(r.createTextVNode)(" 重置 "),d=Object(r.createTextVNode)(" 添加 "),f=Object(r.createTextVNode)(" 展开/折叠 ");Object(r.popScopeId)();var s,p=o((function(e,t,n,s,p,b){var m=Object(r.resolveComponent)("a-input"),v=Object(r.resolveComponent)("a-form-item"),O=Object(r.resolveComponent)("a-select-option"),j=Object(r.resolveComponent)("a-select"),h=Object(r.resolveComponent)("SearchOutlined"),y=Object(r.resolveComponent)("a-button"),g=Object(r.resolveComponent)("RetweetOutlined"),w=Object(r.resolveComponent)("a-form"),N=Object(r.resolveComponent)("a-card"),V=Object(r.resolveComponent)("dynamic-table"),S=Object(r.resolveDirective)("permission");return Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,null,[Object(r.createVNode)(N,{class:"g-search-card mb20"},{default:o((function(){return[Object(r.createVNode)(w,{model:e.formState,"label-col":e.labelCol,"wrapper-col":e.wrapperCol},{default:o((function(){return[Object(r.createVNode)("div",a,[Object(r.createVNode)(v,{label:"菜单名称",class:"w50"},{default:o((function(){return[Object(r.createVNode)(m,{value:e.formState.menuName,"onUpdate:value":t[1]||(t[1]=function(t){return e.formState.menuName=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(v,{label:"菜单状态",class:"w50 mr20"},{default:o((function(){return[Object(r.createVNode)(j,{value:e.formState.visible,"onUpdate:value":t[2]||(t[2]=function(t){return e.formState.visible=t}),placeholder:"please select your zone"},{default:o((function(){return[Object(r.createVNode)(O,{value:"shanghai"},{default:o((function(){return[c]})),_:1}),Object(r.createVNode)(O,{value:"beijing"},{default:o((function(){return[u]})),_:1})]})),_:1},8,["value"])]})),_:1}),Object(r.createVNode)(v,null,{default:o((function(){return[Object(r.createVNode)(y,{type:"primary"},{title:o((function(){return[Object(r.createVNode)(h)]})),default:o((function(){return[l]})),_:1})]})),_:1}),Object(r.createVNode)(v,null,{default:o((function(){return[Object(r.createVNode)(y,{type:"primary"},{title:o((function(){return[Object(r.createVNode)(g)]})),default:o((function(){return[i]})),_:1})]})),_:1})])]})),_:1},8,["model","label-col","wrapper-col"])]})),_:1}),Object(r.createVNode)(V,{ref:"tableRef",columns:e.columns,pageOption:e.pageOption,"get-list-func":e.adminMenu,rowKey:e.rowKey},{title:o((function(){return[Object(r.withDirectives)(Object(r.createVNode)(y,{onClick:e.addItem,type:"primary"},{default:o((function(){return[d]})),_:1},8,["onClick"]),[[S,{action:void 0,effect:"disabled"}]]),Object(r.createVNode)(y,{onClick:e.isOpen,type:"primary"},{default:o((function(){return[f]})),_:1},8,["onClick"])]})),_:1},8,["columns","pageOption","get-list-func","rowKey"])],64)})),b=n("5530"),m=n("1da1"),v=(n("96cf"),n("a15b"),n("a526")),O=n("3bb8");function j(e){return v.a.request({url:s.adminMenu,method:O.b.GET,params:e})}function h(e){return v.a.request({url:s.adminMenuEdit,method:O.b.POST,params:e},{isShowErrorMessage:!0,successMessageText:"修改成功"})}function y(e){return v.a.request({url:s.adminMenuRemove,method:O.b.POST,params:e},{isShowErrorMessage:!0,successMessageText:"修改成功"})}!function(e){e.adminMenu="/system/menu/list",e.adminMenuAdd="/system/menu/add",e.adminMenuEdit="/system/menu/edit",e.adminMenuRemove="/system/menu/remove",e.adminMenuAccess="/admin/menu_access"}(s||(s={}));var g=n("1016"),w=(n("3b18"),n("f64c")),N=n("7996"),V=(n("b0c0"),Object(r.withScopeId)("data-v-ee7d7ea4"));Object(r.pushScopeId)("data-v-ee7d7ea4");var S={class:"add_title"},T=Object(r.createTextVNode)("目录"),R=Object(r.createTextVNode)("菜单"),x=Object(r.createTextVNode)("按钮"),C=Object(r.createTextVNode)("PC"),k=Object(r.createTextVNode)("MOBILE"),_=Object(r.createTextVNode)("显示"),P=Object(r.createTextVNode)("隐藏");Object(r.popScopeId)();var L,I=V((function(e,t,n,o,a,c){var u=Object(r.resolveComponent)("a-input"),l=Object(r.resolveComponent)("a-form-item"),i=Object(r.resolveComponent)("a-radio"),d=Object(r.resolveComponent)("a-radio-group"),f=Object(r.resolveComponent)("a-form"),s=Object(r.resolveComponent)("a-modal");return Object(r.openBlock)(),Object(r.createBlock)(s,{visible:e.visible,"onUpdate:visible":t[10]||(t[10]=function(t){return e.visible=t})},{default:V((function(){return[Object(r.createVNode)("div",S,Object(r.toDisplayString)(e.modalRef.id?"修改菜单":"添加菜单"),1),Object(r.createVNode)(f,null,{default:V((function(){return[Object(r.createVNode)(l,{label:"上级菜单"},{default:V((function(){return[Object(r.createVNode)(u,{placeholder:"请选择上级菜单",value:e.modalRef.name,"onUpdate:value":t[1]||(t[1]=function(t){return e.modalRef.name=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"菜单类型"},{default:V((function(){return[Object(r.createVNode)(d,{value:e.modalRef.menuType,"onUpdate:value":t[2]||(t[2]=function(t){return e.modalRef.menuType=t})},{default:V((function(){return[Object(r.createVNode)(i,{value:0},{default:V((function(){return[T]})),_:1}),Object(r.createVNode)(i,{value:1},{default:V((function(){return[R]})),_:1}),Object(r.createVNode)(i,{value:2},{default:V((function(){return[x]})),_:1})]})),_:1},8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"菜单场景"},{default:V((function(){return[Object(r.createVNode)(d,{value:e.modalRef.menuScene,"onUpdate:value":t[3]||(t[3]=function(t){return e.modalRef.menuScene=t})},{default:V((function(){return[Object(r.createVNode)(i,{value:1},{default:V((function(){return[C]})),_:1}),Object(r.createVNode)(i,{value:2},{default:V((function(){return[k]})),_:1})]})),_:1},8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"菜单名称"},{default:V((function(){return[Object(r.createVNode)(u,{placeholder:"请输入菜单名称",value:e.modalRef.menuName,"onUpdate:value":t[4]||(t[4]=function(t){return e.modalRef.menuName=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"请求地址"},{default:V((function(){return[Object(r.createVNode)(u,{placeholder:"请输入请求地址",value:e.modalRef.url,"onUpdate:value":t[5]||(t[5]=function(t){return e.modalRef.url=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"权限标识"},{default:V((function(){return[Object(r.createVNode)(u,{placeholder:"请输入权限标识",value:e.modalRef.perms,"onUpdate:value":t[6]||(t[6]=function(t){return e.modalRef.perms=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"显示排序"},{default:V((function(){return[Object(r.createVNode)(u,{placeholder:"请输入显示排序",value:e.modalRef.orderNum,"onUpdate:value":t[7]||(t[7]=function(t){return e.modalRef.orderNum=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"图标"},{default:V((function(){return[Object(r.createVNode)(u,{placeholder:"请选择图标",value:e.modalRef.icon,"onUpdate:value":t[8]||(t[8]=function(t){return e.modalRef.icon=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(l,{label:"菜单状态"},{default:V((function(){return[Object(r.createVNode)(d,{value:e.modalRef.visible,"onUpdate:value":t[9]||(t[9]=function(t){return e.modalRef.visible=t})},{default:V((function(){return[Object(r.createVNode)(i,{value:1},{default:V((function(){return[_]})),_:1}),Object(r.createVNode)(i,{value:2},{default:V((function(){return[P]})),_:1})]})),_:1},8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["visible"])})),M=n("ade3"),W=(n("5704"),n("b558")),D=(n("5783"),n("59a5")),E=(n("f2ef"),n("3af3")),K=(n("cd17"),n("ed3b")),U=Object(r.defineComponent)({name:"add-model",components:(L={},Object(M.a)(L,K.a.name,K.a),Object(M.a)(L,E.a.name,E.a),Object(M.a)(L,D.a.name,D.a),Object(M.a)(L,W.a.name,W.a),Object(M.a)(L,"aRadioGroup",D.a.Group),Object(M.a)(L,"aFormItem",E.a.Item),L),props:{},setup:function(){var e=Object(r.reactive)({visible:!0,confirmLoading:!1,moduleList:[]}),t=Object(r.reactive)({menuType:0,menuScene:1,menuName:"",url:"",perms:"",orderNum:0,icon:"",visible:1});return Object(b.a)(Object(b.a)({},Object(r.toRefs)(e)),{},{modalRef:t})}});n("7606"),U.render=I,U.__scopeId="data-v-ee7d7ea4";var B=U,F=n("76b3");n("d81d");var z,q=n("2909"),A=(n("7f6b"),n("8592")),H=(n("98a7"),n("7bec")),G=(n("c119a"),n("d865")),J=(n("4de4"),n("d3b7"),n("13d5"),n("99af"),n("6062"),n("3ca3"),n("ddb0"),n("caad"),n("2532"),Object(r.defineComponent)({name:"AccessTree",components:(z={},Object(M.a)(z,G.a.name,G.a),Object(M.a)(z,H.a.name,H.a),Object(M.a)(z,A.a.name,A.a),z),props:{value:{type:Array,default:function(){return[]}}},emits:["update:value"],setup:function(e,t){var n=t.emit,o=Object(r.reactive)({treeData:[],spinning:!1,replaceFields:{key:"id"}}),a=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.filter((function(e){return e.parentId==n})).map((function(n){return Object(b.a)(Object(b.a)({},n),{},{title:n.menuName,children:e(t,n.id)})}))},c=Object(r.computed)({get:function(){return e.value},set:function(e){return n("update:value",Array.isArray(e)?e:e.checked)}});Object(r.onMounted)(Object(m.a)(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o.spinning=!0,e.next=3,j({}).finally((function(){return o.spinning=!1}));case 3:t=e.sent,n=t.data,o.treeData=a(n);case 6:case"end":return e.stop()}}),e)}))));var u=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return(null==t?void 0:t.children.length)>0?t.children.reduce((function(t,n){return n.children.length>0&&t.push.apply(t,Object(q.a)(e(n,t)).concat([[]])),t.concat([n.id])}),n):n};return Object(b.a)(Object(b.a)({},Object(r.toRefs)(o)),{},{checkedKeys:c,onCheck:function(e,t){var n=t.node,r=t.checked,o=c.value;if(r)o=Object(q.a)(new Set([].concat(Object(q.a)(c.value),Object(q.a)(e.checked),Object(q.a)(function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.eventKey?(n.push(t.eventKey),e(t.vcTreeNode,n)):n}(n.vcTreeNode)),Object(q.a)(u(n.dataRef)))));else{var a,l,i,d=u(n.dataRef);o=d.length>0?e.checked.filter((function(e){return!d.includes(e)})):e.checked,((null===(a=n.vcTreeNode)||void 0===a||null===(l=a.dataRef)||void 0===l||null===(i=l.children)||void 0===i?void 0:i.map((function(e){return e.id})))||[]).some((function(e){return o.includes(e)}))||(o=o.filter((function(e){var t;return e!=(null===(t=n.vcTreeNode)||void 0===t?void 0:t.eventKey)})))}c.value=o}})}}));J.render=function(e,t,n,o,a,c){var u=Object(r.resolveComponent)("a-tree-select"),l=Object(r.resolveComponent)("a-spin");return Object(r.openBlock)(),Object(r.createBlock)(l,{spinning:e.spinning},{default:Object(r.withCtx)((function(){return[Object(r.createVNode)(u,{checkedKeys:e.checkedKeys,"onUpdate:checkedKeys":t[1]||(t[1]=function(t){return e.checkedKeys=t}),style:{"min-height":"40px"},checkable:"",checkStrictly:"",selectable:!1,"tree-data":e.treeData,"replace-fields":e.replaceFields,onCheck:e.onCheck},null,8,["checkedKeys","tree-data","replace-fields","onCheck"])]})),_:1},8,["spinning"])};var $,Z=J,Q=n("c099"),X=function(){return{style:{width:"auto"},formItemLayout:{labelCol:{span:4},wrapperCol:{span:20}},formItem:[{type:Object(r.createVNode)(Z),label:"上级菜单",field:"accessIdsList",value:[],asyncValue:(o=Object(m.a)(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),function(e,t){return o.apply(this,arguments)})},{type:"radio",label:"菜单类型",field:"menuType",value:"0",asyncOptions:(n=Object(m.a)(regeneratorRuntime.mark((function e(t,n){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={dictType:"sys_menu_type"},e.next=3,Object(Q.d)(r);case 3:return o=e.sent,e.abrupt("return",o.data.map((function(e){return e})));case 5:case"end":return e.stop()}}),e)}))),function(e,t){return n.apply(this,arguments)})},{type:"radio",label:"菜单场景",field:"menuScene",value:"1",asyncOptions:(t=Object(m.a)(regeneratorRuntime.mark((function e(t,n){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={dictType:"sys_menu_scene"},e.next=3,Object(Q.d)(r);case 3:return o=e.sent,e.abrupt("return",o.data.map((function(e){return e})));case 5:case"end":return e.stop()}}),e)}))),function(e,n){return t.apply(this,arguments)})},{type:"input",label:"菜单名称",field:"menuName",value:"",props:{placeholder:"请输入菜单名称"},rules:[{required:!0,message:"菜单名称不能为空"}]},{type:"input",label:"请求地址",field:"url",value:"",props:{placeholder:"请输入请求地址"},rules:[{required:!0,message:"请求地址不能为空"}]},{type:"input",label:"权限标识",field:"perms",value:"",props:{placeholder:"请输入权限标识"},rules:[{required:!0,message:"权限标识不能为空"}]},{type:"input",label:"显示排序",field:"orderNum",value:"",props:{placeholder:""},rules:[{required:!0,message:""}]},{type:"input",label:"图标",field:"icon",value:"",props:{placeholder:""},rules:[{required:!0,message:""}]},{type:"radio",label:"菜单状态",field:"visible",value:"0",asyncOptions:(e=Object(m.a)(regeneratorRuntime.mark((function e(t,n){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={dictType:"sys_show_hide"},e.next=3,Object(Q.d)(r);case 3:return o=e.sent,e.abrupt("return",o.data.map((function(e){return e})));case 5:case"end":return e.stop()}}),e)}))),function(t,n){return e.apply(this,arguments)})}]};var e,t,n,o},Y=[{title:"",dataIndex:"menuName",slots:{customRender:"moduleName"}},{title:"菜单名称",dataIndex:"menuName"},{title:"场景",dataIndex:"menuScene"},{title:"请求地址",dataIndex:"url"},{title:"类型",dataIndex:"menuType"},{title:"可见",dataIndex:"visible"},{title:"权限标识",dataIndex:"perms"},{title:"操作",dataIndex:"action",width:200,slots:{customRender:"action"},actions:[{type:"button",text:"编辑",props:{type:"warning"},func:function(e,t){var n,r=e.record;return Object(F.a)({title:"编辑菜单",fields:{menuScene:r.menuScene,menuType:r.menuType,menuName:r.menuName},formSchema:X(),handleOk:(n=Object(m.a)(regeneratorRuntime.mark((function e(n,r){var o,a,c,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n.menuScene,a=n.menuType,c=n.menuName,u={menuScene:o,menuType:a,menuName:c},e.next=5,h(u).then((function(){return t()}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)}))),function(e,t){return n.apply(this,arguments)})})}},{type:"button",text:"新增",props:{type:"warning",background:"red"},func:function(e,t){var n=e.record;return Object(N.a)(B,{fields:n,callback:t})}},{type:"popconfirm",text:"删除",permission:{action:"delete",effect:"disabled"},props:{type:"danger"},func:($=Object(m.a)(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((r=t.record).id<6)){e.next=3;break}return e.abrupt("return",w.a.warn("系统预置菜单，不能删除！"));case 3:return e.next=5,y(r.id).then((function(){return n()}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)}))),function(e,t){return $.apply(this,arguments)})}]}],ee=Object(r.defineComponent)({name:"system-menu",components:{DynamicTable:g.DynamicTable},created:function(){},setup:function(){var e=Object(r.reactive)({name:"",region:void 0,delivery:!1,type:[],resource:"",desc:""}),t=Object(r.ref)(null),n=Object(r.reactive)({tableLoading:!1,rowSelection:{onChange:function(e,t){n.rowSelection.selectedRowKeys=e},selectedRowKeys:[]}}),o=Object(r.computed)((function(){return 0==n.rowSelection.selectedRowKeys.length}));return Object(b.a)(Object(b.a)({},Object(r.toRefs)(n)),{},{columns:Y,tableRef:t,adminMenu:j,isDisabled:o,addItem:function(){var e;Object(F.a)({title:"添加菜单",formSchema:X(),handleOk:(e=Object(m.a)(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r=n,v.a.request({url:s.adminMenuAdd,method:O.b.POST,params:r},{isShowErrorMessage:!0,successMessageText:"创建成功"});case 2:t.value.refreshTableData();case 3:case"end":return e.stop()}var r}),e)}))),function(t,n){return e.apply(this,arguments)})})},formState:e,adminMenuRemove:y})}});n("072c"),ee.render=p,ee.__scopeId="data-v-7367c0e4",t.default=ee},ec44:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e,t){var n=e["page".concat(t?"Y":"X","Offset")],r="scroll".concat(t?"Top":"Left");if("number"!=typeof n){var o=e.document;"number"!=typeof(n=o.documentElement[r])&&(n=o.body[r])}return n}function u(e){return c(e)}function l(e){return c(e,!0)}function i(e){var t=function(e){var t,n,r,o=e.ownerDocument,a=o.body,c=o&&o.documentElement;return n=(t=e.getBoundingClientRect()).left,r=t.top,{left:n-=c.clientLeft||a.clientLeft||0,top:r-=c.clientTop||a.clientTop||0}}(e),n=e.ownerDocument,r=n.defaultView||n.parentWindow;return t.left+=u(r),t.top+=l(r),t}var d,f=new RegExp("^(".concat(/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,")(?!px)[a-z%]+$"),"i"),s=/^(top|right|bottom|left)$/,p="left";function b(e,t){for(var n=0;n<e.length;n++)t(e[n])}function m(e){return"border-box"===d(e,"boxSizing")}"undefined"!=typeof window&&(d=window.getComputedStyle?function(e,t,n){var r="",o=e.ownerDocument,a=n||o.defaultView.getComputedStyle(e,null);return a&&(r=a.getPropertyValue(t)||a[t]),r}:function(e,t){var n=e.currentStyle&&e.currentStyle[t];if(f.test(n)&&!s.test(t)){var r=e.style,o=r[p],a=e.runtimeStyle[p];e.runtimeStyle[p]=e.currentStyle[p],r[p]="fontSize"===t?"1em":n||0,n=r.pixelLeft+"px",r[p]=o,e.runtimeStyle[p]=a}return""===n?"auto":n});var v=["margin","border","padding"];function O(e,t,n){var r,o={},a=e.style;for(r in t)t.hasOwnProperty(r)&&(o[r]=a[r],a[r]=t[r]);for(r in n.call(e),t)t.hasOwnProperty(r)&&(a[r]=o[r])}function j(e,t,n){var r,o,a,c=0;for(o=0;o<t.length;o++)if(r=t[o])for(a=0;a<n.length;a++){var u;u="border"===r?"".concat(r+n[a],"Width"):r+n[a],c+=parseFloat(d(e,u))||0}return c}function h(e){return null!=e&&e==e.window}var y={};function g(e,t,n){if(h(e))return"width"===t?y.viewportWidth(e):y.viewportHeight(e);if(9===e.nodeType)return"width"===t?y.docWidth(e):y.docHeight(e);var r="width"===t?["Left","Right"]:["Top","Bottom"],o="width"===t?e.offsetWidth:e.offsetHeight,a=(d(e),m(e)),c=0;(null==o||o<=0)&&(o=void 0,(null==(c=d(e,t))||Number(c)<0)&&(c=e.style[t]||0),c=parseFloat(c)||0),void 0===n&&(n=a?1:-1);var u=void 0!==o||a,l=o||c;if(-1===n)return u?l-j(e,["border","padding"],r):c;if(u){var i=2===n?-j(e,["border"],r):j(e,["margin"],r);return l+(1===n?0:i)}return c+j(e,v.slice(n),r)}b(["Width","Height"],(function(e){y["doc".concat(e)]=function(t){var n=t.document;return Math.max(n.documentElement["scroll".concat(e)],n.body["scroll".concat(e)],y["viewport".concat(e)](n))},y["viewport".concat(e)]=function(t){var n="client".concat(e),r=t.document,o=r.body,a=r.documentElement[n];return"CSS1Compat"===r.compatMode&&a||o&&o[n]||a}}));var w={position:"absolute",visibility:"hidden",display:"block"};function N(e){var t,n=arguments;return 0!==e.offsetWidth?t=g.apply(void 0,n):O(e,w,(function(){t=g.apply(void 0,n)})),t}function V(e,t,n){var o=n;if("object"!==r(t))return void 0!==o?("number"==typeof o&&(o+="px"),void(e.style[t]=o)):d(e,t);for(var a in t)t.hasOwnProperty(a)&&V(e,a,t[a])}b(["width","height"],(function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);y["outer".concat(t)]=function(t,n){return t&&N(t,e,n?0:1)};var n="width"===e?["Left","Right"]:["Top","Bottom"];y[e]=function(t,r){return void 0===r?t&&N(t,e,-1):t?(d(t),m(t)&&(r+=j(t,["padding","border"],n)),V(t,e,r)):void 0}}));var S=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(n,!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({getWindow:function(e){var t=e.ownerDocument||e;return t.defaultView||t.parentWindow},offset:function(e,t){if(void 0===t)return i(e);!function(e,t){"static"===V(e,"position")&&(e.style.position="relative");var n,r,o=i(e),a={};for(r in t)t.hasOwnProperty(r)&&(n=parseFloat(V(e,r))||0,a[r]=n+t[r]-o[r]);V(e,a)}(e,t)},isWindow:h,each:b,css:V,clone:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);if(e.overflow)for(var r in e)e.hasOwnProperty(r)&&(t.overflow[r]=e.overflow[r]);return t},scrollLeft:function(e,t){if(h(e)){if(void 0===t)return u(e);window.scrollTo(t,l(e))}else{if(void 0===t)return e.scrollLeft;e.scrollLeft=t}},scrollTop:function(e,t){if(h(e)){if(void 0===t)return l(e);window.scrollTo(u(e),t)}else{if(void 0===t)return e.scrollTop;e.scrollTop=t}},viewportWidth:0,viewportHeight:0},y);t.a=function(e,t,n){n=n||{},9===t.nodeType&&(t=S.getWindow(t));var r=n.allowHorizontalScroll,o=n.onlyScrollIfNeeded,a=n.alignWithTop,c=n.alignWithLeft,u=n.offsetTop||0,l=n.offsetLeft||0,i=n.offsetBottom||0,d=n.offsetRight||0;r=void 0===r||r;var f,s,p,b,m,v,O,j,h,y,g=S.isWindow(t),w=S.offset(e),N=S.outerHeight(e),V=S.outerWidth(e);g?(O=t,y=S.height(O),h=S.width(O),j={left:S.scrollLeft(O),top:S.scrollTop(O)},m={left:w.left-j.left-l,top:w.top-j.top-u},v={left:w.left+V-(j.left+h)+d,top:w.top+N-(j.top+y)+i},b=j):(f=S.offset(t),s=t.clientHeight,p=t.clientWidth,b={left:t.scrollLeft,top:t.scrollTop},m={left:w.left-(f.left+(parseFloat(S.css(t,"borderLeftWidth"))||0))-l,top:w.top-(f.top+(parseFloat(S.css(t,"borderTopWidth"))||0))-u},v={left:w.left+V-(f.left+p+(parseFloat(S.css(t,"borderRightWidth"))||0))+d,top:w.top+N-(f.top+s+(parseFloat(S.css(t,"borderBottomWidth"))||0))+i}),m.top<0||v.top>0?!0===a?S.scrollTop(t,b.top+m.top):!1===a?S.scrollTop(t,b.top+v.top):m.top<0?S.scrollTop(t,b.top+m.top):S.scrollTop(t,b.top+v.top):o||((a=void 0===a||!!a)?S.scrollTop(t,b.top+m.top):S.scrollTop(t,b.top+v.top)),r&&(m.left<0||v.left>0?!0===c?S.scrollLeft(t,b.left+m.left):!1===c?S.scrollLeft(t,b.left+v.left):m.left<0?S.scrollLeft(t,b.left+m.left):S.scrollLeft(t,b.left+v.left):o||((c=void 0===c||!!c)?S.scrollLeft(t,b.left+m.left):S.scrollLeft(t,b.left+v.left)))}}}]);