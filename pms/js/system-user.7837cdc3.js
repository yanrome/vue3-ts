(window.webpackJsonp=window.webpackJsonp||[]).push([["system-user"],{"36ea":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),a=Object(r.withScopeId)("data-v-6a211f66");Object(r.pushScopeId)("data-v-6a211f66");var c={style:{display:"flex"}},o={class:"flex"},i={key:0},u={class:"flex"},d={class:"flex"},s=Object(r.createTextVNode)("Zone one"),l=Object(r.createTextVNode)("Zone two"),p=Object(r.createTextVNode)(" 搜索 "),f=Object(r.createTextVNode)(" 重置 "),b=Object(r.createTextVNode)(" 添加 "),m=Object(r.createTextVNode)(" 删除 ");Object(r.popScopeId)();var v,O=a((function(e,t,n,v,O,j){var h=Object(r.resolveComponent)("a-input"),y=Object(r.resolveComponent)("a-form-item"),w=Object(r.resolveComponent)("a-select-option"),g=Object(r.resolveComponent)("a-select"),N=Object(r.resolveComponent)("SearchOutlined"),k=Object(r.resolveComponent)("a-button"),x=Object(r.resolveComponent)("RetweetOutlined"),V=Object(r.resolveComponent)("a-form"),T=Object(r.resolveComponent)("a-card"),C=Object(r.resolveComponent)("dynamic-table"),D=Object(r.resolveDirective)("permission");return Object(r.openBlock)(),Object(r.createBlock)("div",c,[Object(r.createVNode)("div",o,[e.show?(Object(r.openBlock)(),Object(r.createBlock)("div",i,"111")):Object(r.createCommentVNode)("",!0),Object(r.createVNode)("div",{class:"right_btn",onClick:t[1]||(t[1]=function(t){return e.show=!e.show})},">")]),Object(r.createVNode)("div",null,[Object(r.createVNode)(T,{class:"g-search-card mb20"},{default:a((function(){return[Object(r.createVNode)(V,{model:e.formState,"label-col":e.labelCol,"wrapper-col":e.wrapperCol},{default:a((function(){return[Object(r.createVNode)("div",u,[Object(r.createVNode)(y,{label:"名称",class:"w50 mr20"},{default:a((function(){return[Object(r.createVNode)(h,{value:e.formState.userName,"onUpdate:value":t[2]||(t[2]=function(t){return e.formState.userName=t})},null,8,["value"])]})),_:1}),Object(r.createVNode)(y,{label:"手机号码",class:"w50"},{default:a((function(){return[Object(r.createVNode)(h,{value:e.formState.phone,"onUpdate:value":t[3]||(t[3]=function(t){return e.formState.phone=t})},null,8,["value"])]})),_:1})]),Object(r.createVNode)("div",d,[Object(r.createVNode)(y,{label:"用户状态",class:"w50 mr20"},{default:a((function(){return[Object(r.createVNode)(g,{value:e.formState.isTest,"onUpdate:value":t[4]||(t[4]=function(t){return e.formState.isTest=t}),placeholder:"please select your zone"},{default:a((function(){return[Object(r.createVNode)(w,{value:"shanghai"},{default:a((function(){return[s]})),_:1}),Object(r.createVNode)(w,{value:"beijing"},{default:a((function(){return[l]})),_:1})]})),_:1},8,["value"])]})),_:1}),Object(r.createVNode)(y,null,{default:a((function(){return[Object(r.createVNode)(k,{type:"primary"},{title:a((function(){return[Object(r.createVNode)(N)]})),default:a((function(){return[p]})),_:1})]})),_:1}),Object(r.createVNode)(y,null,{default:a((function(){return[Object(r.createVNode)(k,{type:"primary"},{title:a((function(){return[Object(r.createVNode)(x)]})),default:a((function(){return[f]})),_:1})]})),_:1})])]})),_:1},8,["model","label-col","wrapper-col"])]})),_:1}),Object(r.createVNode)(C,{ref:"tableRef",columns:e.columns,"get-list-func":e.adminUser,rowKey:"id","row-selection":e.rowSelection},{title:a((function(){return[Object(r.createVNode)(k,{onClick:e.addItem,type:"primary"},{default:a((function(){return[b]})),_:1},8,["onClick"]),Object(r.withDirectives)(Object(r.createVNode)(k,{onClick:e.deleteItems,disabled:e.isDisabled,type:"primary"},{default:a((function(){return[m]})),_:1},8,["onClick","disabled"]),[[D,{action:"delete"}]])]})),_:1},8,["columns","get-list-func","row-selection"])])])})),j=n("5530"),h=n("1da1"),y=(n("96cf"),n("a4d3"),n("e01a"),n("d3b7"),n("25f0"),n("1016")),w=n("c099"),g=Object(r.withScopeId)("data-v-fe8c62b4"),N=g((function(e,t,n,a,c,o){var i=Object(r.resolveComponent)("a-tree"),u=Object(r.resolveComponent)("a-spin");return Object(r.openBlock)(),Object(r.createBlock)(u,{spinning:e.spinning},{default:g((function(){return[Object(r.createVNode)(i,{style:{"min-height":"40px"},checkable:"",checkStrictly:"",selectable:!1,"tree-data":e.treeData,"replace-fields":e.replaceFields,checkedKeys:e.checkedKeys,"onUpdate:checkedKeys":t[1]||(t[1]=function(t){return e.checkedKeys=t}),onCheck:e.onCheck},null,8,["tree-data","replace-fields","checkedKeys","onCheck"])]})),_:1},8,["spinning"])})),k=n("2909"),x=n("ade3"),V=(n("7f6b"),n("8592")),T=(n("c119a"),n("d865")),C=(n("b0c0"),n("d81d"),n("4de4"),n("13d5"),n("99af"),n("6062"),n("3ca3"),n("ddb0"),n("caad"),n("2532"),n("8cba")),D=Object(r.defineComponent)({name:"access-tree",components:(v={},Object(x.a)(v,T.a.name,T.a),Object(x.a)(v,V.a.name,V.a),v),emits:["update:value"],props:{value:{type:Array,default:function(){return[]}}},setup:function(e,t){var n=t.emit,a=Object(r.reactive)({treeData:[],spinning:!1,replaceFields:{key:"id"}}),c=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;return t.filter((function(e){return e.moduleId==n})).map((function(n){return Object(j.a)(Object(j.a)({},n),{},{title:n.moduleName||n.actionName,children:e(t,n.id)})}))},o=Object(r.computed)({get:function(){return e.value},set:function(e){return n("update:value",Array.isArray(e)?e:e.checked)}});Object(r.onMounted)(Object(h.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.spinning=!0,e.next=3,Object(C.e)().finally((function(){return a.spinning=!1}));case 3:t=e.sent,a.treeData=c(t);case 6:case"end":return e.stop()}}),e)}))));var i=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return(null==t?void 0:t.children.length)>0?t.children.reduce((function(t,n){return n.children.length>0&&t.push.apply(t,Object(k.a)(e(n,t)).concat([[]])),t.concat([n.id])}),n):n};return Object(j.a)(Object(j.a)({},Object(r.toRefs)(a)),{},{checkedKeys:o,onCheck:function(e,t){var n=t.node,r=t.checked,a=o.value;if(r)a=Object(k.a)(new Set([].concat(Object(k.a)(o.value),Object(k.a)(e.checked),Object(k.a)(function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return t.eventKey?(n.push(t.eventKey),e(t.vcTreeNode,n)):n}(n.vcTreeNode)),Object(k.a)(i(n.dataRef)))));else{var c,u,d,s=i(n.dataRef);a=s.length>0?e.checked.filter((function(e){return!s.includes(e)})):e.checked,((null===(c=n.vcTreeNode)||void 0===c||null===(u=c.dataRef)||void 0===u||null===(d=u.children)||void 0===d?void 0:d.map((function(e){return e.id})))||[]).some((function(e){return a.includes(e)}))||(a=a.filter((function(e){var t;return e!=(null===(t=n.vcTreeNode)||void 0===t?void 0:t.eventKey)})))}o.value=a}})}});D.render=N,D.__scopeId="data-v-fe8c62b4";var I=D,S=n("76b3"),_=function(){return{style:{width:"auto"},formItemLayout:{labelCol:{span:4},wrapperCol:{span:20}},formItem:[{type:"input",label:"登录名称",field:"userName",value:"",props:{placeholder:"请输入登录名称"},rules:[{required:!0,message:"登录名称不能为空"}]},{type:"input",label:"部门名称",field:"deptName",value:"",props:{placeholder:""},rules:[{required:!0,message:""}]},{type:"input",label:"用户姓名",field:"realName",value:"",props:{placeholder:"请输入用户姓名"},rules:[{required:!0,message:"用户姓名不能为空"}]},{type:"input",label:"邮箱",field:"email",value:"",props:{placeholder:"请输入邮箱"},rules:[{required:!0,message:"邮箱不能为空"}]},{type:"input",label:"手机",field:"phone",value:"",props:{placeholder:"请输入手机"},rules:[{required:!0,message:"手机不能为空"}]},{type:"select",label:"性别",field:"sex",value:"0",asyncOptions:(e=Object(h.a)(regeneratorRuntime.mark((function e(t,n){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={dictType:"sys_user_sex"},e.next=3,Object(w.d)(r);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)}))),function(t,n){return e.apply(this,arguments)})},{type:"switch",label:"状态",field:"status",value:"0"}]};var e},R=[{title:"用户ID",dataIndex:"id"},{title:"登陆名称",dataIndex:"username"},{title:"用户姓名",dataIndex:"realName"},{title:"昵称",dataIndex:"nickName"},{title:"用户来源",dataIndex:"isTest"},{title:"手机",dataIndex:"phone"},{title:"创建时间",dataIndex:"createTime"},{title:"关联公众号",dataIndex:"wxOpenId"},{title:"操作",dataIndex:"action",width:200,slots:{customRender:"action"},actions:[{type:"popconfirm",text:"删除",permission:{action:"delete",effect:"disabled"},props:{type:"danger"}},{type:"button",text:"编辑",props:{type:"warning"},func:function(e,t){var n,r=e.record;return Object(S.a)({title:"编辑角色",fields:r,formSchema:_(),handleOk:(n=Object(h.a)(regeneratorRuntime.mark((function e(n,a){var c,o,i,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.description,o=n.title,i=n.accessIdsList,u={description:c,title:o,accessIdsList:i.toString()},e.next=4,Object(w.c)(r.id,u).then((function(){return t()}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)}))),function(e,t){return n.apply(this,arguments)})})}}]}],K=Object(r.defineComponent)({name:"system-user",components:{DynamicTable:y.DynamicTable,AccessTree:I},setup:function(){var e=Object(r.ref)("false"),t=Object(r.reactive)({name:"",region:void 0,delivery:!1,type:[],resource:"",desc:""}),n=Object(r.ref)(null),a=Object(r.reactive)({tableLoading:!1,rowSelection:{onChange:function(e,t){a.rowSelection.selectedRowKeys=e},selectedRowKeys:[]}});return Object(j.a)(Object(j.a)({},Object(r.toRefs)(a)),{},{columns:R,tableRef:n,adminUser:w.a,formState:t,addItem:function(){var e;Object(S.a)({title:"添加用户",formSchema:_(),handleOk:(e=Object(h.a)(regeneratorRuntime.mark((function e(t,r){var a,c,o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.description,c=t.title,o=t.accessIdsList,i={description:a,title:c,accessIdsList:o.toString()},e.next=5,Object(w.b)(i);case 5:n.value.refreshTableData();case 6:case"end":return e.stop()}}),e)}))),function(t,n){return e.apply(this,arguments)})})},show:e})}});n("aeb5"),K.render=O,K.__scopeId="data-v-6a211f66",t.default=K},"8cba":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"e",(function(){return s})),n("a15b");var r,a=n("a526"),c=n("3bb8");function o(e){return a.a.request({url:r.adminDept,method:c.b.GET,params:e})}function i(e){return a.a.request({url:[r.adminDeptRemove,e].join("/"),method:c.b.DELETE},{isShowErrorMessage:!0,successMessageText:"删除成功"})}function u(e){return a.a.request({url:r.adminDeptEdit,method:c.b.POST,params:e},{isShowErrorMessage:!0,successMessageText:"修改成功"})}function d(e){return a.a.request({url:r.adminDeptAdd,method:c.b.POST,params:e},{isShowErrorMessage:!0,successMessageText:"创建成功"})}function s(){return a.a.request({url:r.adminDeptTreeData,method:c.b.GET})}!function(e){e.adminDept="/system/dept/list",e.adminDeptAdd="/system/dept/add",e.adminDeptEdit="/system/dept/edit",e.adminDeptRemove="/system/dept/remove",e.adminDeptAccess="/admin/dept_access",e.adminDeptTreeData="/system/dept/treeData",e.adminDictDedpByType="/system/dict/dept/byType"}(r||(r={}))},aeb5:function(e,t,n){"use strict";n("b6cb")},b6cb:function(e,t,n){}}]);