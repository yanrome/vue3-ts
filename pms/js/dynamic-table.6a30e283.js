(window.webpackJsonp=window.webpackJsonp||[]).push([["dynamic-table","dynamic-table-hooks","dynamic-table-dynamic-table","dynamic-table-hooks-useDragCol","dynamic-table-hooks-useDragRow","dynamic-table-hooks-useDraggable","dynamic-table-hooks-useExpandLoading"],{1016:function(e,t,n){"use strict";n.r(t);var o=n("6c0e");n.d(t,"DynamicTable",(function(){return o.default}))},"12f3":function(e,t,n){},"26dc":function(e,t,n){"use strict";n("12f3")},"6c0e":function(e,t,n){"use strict";n.r(t);var o=n("5530"),r=(n("4de4"),n("7a23")),c=Object(r.withScopeId)("data-v-a4ccf60e"),a=c((function(e,t,n,a,i,u){var s=Object(r.resolveComponent)("a-button"),l=Object(r.resolveComponent)("a-popconfirm"),d=Object(r.resolveComponent)("a-table"),p=Object(r.resolveDirective)("permission");return e.data.length?(Object(r.openBlock)(),Object(r.createBlock)(d,Object(r.mergeProps)({key:0,columns:e.columns,loading:e.loading,rowSelection:e.rowSelection,rowKey:e.rowKey,size:"middle","data-source":e.data,pagination:e.pageOptions,defaultExpandAllRows:1==e.pageOptions.isAll,bordered:"",customRow:e.customRow},e.$attrs,{onChange:e.paginationChange}),Object(r.createSlots)({_:2},[Object(r.renderList)(e.$slots,(function(t,n){return{name:n,fn:c((function(t){return[Object(r.renderSlot)(e.$slots,n,t)]}))}})),Object(r.renderList)(e.columns.filter((function(e){return e.slots})),(function(t){var n;return{name:null===(n=t.slots)||void 0===n?void 0:n.customRender,fn:c((function(n){var a,i,u,d,f,b,m;return[e.$slots[null===(a=t.slots)||void 0===a?void 0:a.customRender]?Object(r.renderSlot)(e.$slots,null===(i=t.slots)||void 0===i?void 0:i.customRender,Object(r.mergeProps)({key:0},n)):(Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,{key:1},["action"!==(null===(u=t.slots)||void 0===u?void 0:u.customRender)?(Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,{key:0},["component"==t.slotsType?(Object(r.openBlock)(),Object(r.createBlock)(Object(r.resolveDynamicComponent)(null==t||null===(d=t.slotsFunc)||void 0===d?void 0:d.call(t,n.record)),{key:0})):Object(r.createCommentVNode)("",!0),"format"==t.slotsType?(Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,{key:1},[Object(r.createTextVNode)(Object(r.toDisplayString)(null==t||null===(f=t.slotsFunc)||void 0===f?void 0:f.call(t,n.record[t.dataIndex||t.key],n.record)),1)],64)):Object(r.createCommentVNode)("",!0)],64)):Object(r.createCommentVNode)("",!0),"pic"==(null===(b=t.slots)||void 0===b?void 0:b.customRender)?(Object(r.openBlock)(),Object(r.createBlock)("span",{key:t.slots.customRender},[Object(r.createVNode)("img",{src:n.record.domainName+n.record.bgUrl,style:{width:"120px",height:"80px"}},null,8,["src"])])):Object(r.createCommentVNode)("",!0),"action"==(null===(m=t.slots)||void 0===m?void 0:m.customRender)?(Object(r.openBlock)(),Object(r.createBlock)("div",{key:t.slots.customRender,class:"actions"},[(Object(r.openBlock)(!0),Object(r.createBlock)(r.Fragment,null,Object(r.renderList)(e.actions,(function(t,a){return Object(r.openBlock)(),Object(r.createBlock)(r.Fragment,null,["button"==t.type?Object(r.withDirectives)((Object(r.openBlock)(),Object(r.createBlock)(s,Object(r.mergeProps)({key:0},Object(o.a)(Object(o.a)({},e.buttonProps),t.props),{key:a,onClick:function(o){return e.actionEvent(n.record,t.func)}}),{default:c((function(){return[Object(r.createTextVNode)(Object(r.toDisplayString)(t.text),1)]})),_:2},1040,["onClick"])),[[p,t.permission]]):Object(r.createCommentVNode)("",!0),"popconfirm"==t.type?(Object(r.openBlock)(),Object(r.createBlock)(l,{key:a,placement:"leftTop",onConfirm:function(o){return e.actionEvent(n.record,t.func,"del")}},{title:c((function(){var e,n;return[Object(r.createTextVNode)(Object(r.toDisplayString)(null!=t&&null!==(e=t.props)&&void 0!==e&&e.title?null==t||null===(n=t.props)||void 0===n?void 0:n.title:"您确定要删除吗？"),1)]})),default:c((function(){return[Object(r.withDirectives)(Object(r.createVNode)(s,Object(o.a)(Object(o.a)({},e.buttonProps),t.props),{default:c((function(){return[Object(r.createTextVNode)(Object(r.toDisplayString)(t.text),1)]})),_:2},1040),[[p,t.permission]])]})),_:2},1032,["onConfirm"])):Object(r.createCommentVNode)("",!0)],64)})),256))])):Object(r.createCommentVNode)("",!0)],64))]}))}}))]),1040,["columns","loading","rowSelection","rowKey","data-source","pagination","defaultExpandAllRows","customRow","onChange"])):Object(r.createCommentVNode)("",!0)})),i=n("1da1"),u=n("ade3"),s=(n("2a26"),n("768f")),l=(n("2ef0"),n("9839")),d=(n("288f"),n("cdeb")),p=(n("c68a"),n("0020"));n("96cf"),n("b0c0"),n("7db0"),n("d3b7"),n("159b"),n("b64b"),n("d81d");var f,b=n("9720"),m=Object(r.defineComponent)({name:"DynamicTable",components:(f={},Object(u.a)(f,p.a.name,p.a),Object(u.a)(f,d.a.name,d.a),Object(u.a)(f,l.b.name,l.b),Object(u.a)(f,s.a.name,s.a),Object(u.a)(f,"Option",l.b.Option),f),inheritAttrs:!1,props:{columns:{type:Object,required:!0},getListFunc:{type:Function,required:!0},rowSelection:{type:Object},rowKey:{type:[String,Function]},pageOption:{type:Object,default:function(){return{}}},dragColEnable:{type:Boolean,default:!0},dragRowEnable:Boolean},emits:["change"],setup:function(e,t){var n,c=t.emit,a=function(e){var t=Object(r.ref)(Object(o.a)({current:1,pageSize:10,total:0,pageSizeOptions:["10","20","30","40","50"],showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e){return"共 ".concat(e," 条")},onChange:function(e,t){},onShowSizeChange:function(e,t){}},e));return{pageOptions:t,updatePageOption:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object.assign(t.value,e)}}}().pageOptions;Object.assign(a.value,e.pageOption),e.dragColEnable&&Object(b.useDragCol)(e.columns);var u=Object(r.reactive)({expandItemRefs:{},customRow:function(){return{}},data:[],actions:(null===(n=e.columns.find((function(e){return"action"==(e.dataIndex||e.key)})))||void 0===n?void 0:n.actions)||[],loading:!1}),s=function(){var t=Object(i.a)(regeneratorRuntime.mark((function t(){var n,r,c,i,s=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.length>0&&void 0!==s[0]?s[0]:{},n=Object(o.a)(Object(o.a)({pageNum:a.value.current,pageSize:a.value.pageSize},e.pageOption),n),u.loading=!0,t.next=5,e.getListFunc(n).finally((function(){return u.loading=!1}));case 5:r=t.sent,c=r.data,i=r.total,Object.assign(a.value,{total:~~i||10}),u.data=c.length&&c[0].hasOwnProperty("parentId")?l(c):c,e.dragRowEnable&&(u.customRow=Object(b.useDragRow)(u.data));case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();s();var l=function(e){var t={},n={};return e.forEach((function(e){e.key=e.id,t[e.id]=e})),Object.keys(t).forEach((function(e){var o=t[e],r=o.parentId,c=t[r];c?(c.children||(c.children=[]),c.children.push(o)):n[o.id]=o})),Object.keys(n).map((function(e){return n[e]}))},d=function(){var t=Object(i.a)(regeneratorRuntime.mark((function t(n,o){var r,c=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=c.length>2&&void 0!==c[2]?c[2]:"",t.next=3,o({record:n,props:e},(function(){return setTimeout((function(){return s()}))}));case 3:"del"==r&&u.data.length<2&&(a.value.current=Math.max(1,a.value.current-1));case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();return Object(r.watch)(e.pageOption,(function(e){s()}),{deep:!0}),Object(o.a)(Object(o.a)({},Object(r.toRefs)(u)),{},{pageOptions:a,buttonProps:{size:"small"},actionEvent:d,refreshTableData:s,paginationChange:function(t,n,r,i){var u=i.currentDataSource,l=r.field,d=r.order;a.value=Object(o.a)(Object(o.a)({},a.value),t),s(Object(o.a)(Object(o.a)(Object(o.a)({pageSize:t.pageSize,pageNumber:t.current},e.pageOption),n),{},{field:l,order:d})),c("change",t,n,r,{currentDataSource:u})}})}});n("26dc"),m.render=a,m.__scopeId="data-v-a4ccf60e",t.default=m},"780e":function(e,t,n){"use strict";n.r(t),n.d(t,"useExpandLoading",(function(){return a}));var o=n("1da1"),r=(n("96cf"),n("d3b7"),n("7a23")),c=n("8fe6"),a=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(t){var n,a,i,u,s,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.expanded,a=t.record,i=t.expandItemEl,u=t.asyncFunc,s=t.params,!n||!a.children||Array.isArray(a.children)){e.next=8;break}return l=i.closest("td").querySelector(".ant-table-row-expand-icon"),Object(r.render)(Object(r.createVNode)(c.a),l),e.next=6,Object(r.nextTick)();case 6:return l.classList.add("loading-icon"),e.abrupt("return",u(s).finally(Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object(r.render)(null,l),e.next=3,Object(r.nextTick)();case 3:l.classList.remove("loading-icon");case 4:case"end":return e.stop()}}),e)})))));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},9720:function(e,t,n){"use strict";n.r(t);var o=n("9bfe");n.d(t,"useDragCol",(function(){return o.useDragCol}));var r=n("ea2c");n.d(t,"useDraggable",(function(){return r.useDraggable}));var c=n("780e");n.d(t,"useExpandLoading",(function(){return c.useExpandLoading}));var a=n("da93");n.d(t,"useDragRow",(function(){return a.useDragRow}))},"9bfe":function(e,t,n){"use strict";n.r(t),n.d(t,"useDragCol",(function(){return o})),n("159b");var o=function(e){var t,n,o,r,c=function(){return r.onmouseup=r.onmousedown=r.onmousemove=null};e.forEach((function(e){return e.customHeaderCell=function(e){return{onmouseenter:function(){var a,i;r=e.title[0].el.closest("th"),null!==(a=o)&&void 0!==a||(o=r.closest(".ant-table-wrapper")),null!==(i=n)&&void 0!==i||(n=o.clientWidth),r.onmousemove=function(e){e.offsetX>this.offsetWidth-10?this.style.cursor="col-resize":this.style.cursor="default",null==t&&(t=this),null!=t.mouseDown&&1==t.mouseDown&&(t.style.cursor="default",t.oldWidth+(e.x-t.oldX)>0&&(t.width=t.oldWidth+(e.x-t.oldX)),t.style.width=t.width,o.style.width=n+(e.x-t.oldX)+"px",t.style.cursor="col-resize")},r.onmousedown=function(e){t=this,e.offsetX>t.offsetWidth-10&&(t.mouseDown=!0,t.oldX=e.x,t.oldWidth=t.offsetWidth)},r.onmouseup=c,o.onmouseup=function(){c(),null==t&&(t=this),t.mouseDown=!1,t.style.cursor="default",n=o.clientWidth}},onmouseup:function(){return c}}}}))}},da93:function(e,t,n){"use strict";function o(e){var t,n;return function(o){return{draggable:!0,ondrag:function(e){t=o},ondrop:function(e){n=o},ondragend:function(o){if(t!==n){var r=e.indexOf(t),c=e.indexOf(n),a=[e[c],e[r]];e[r]=a[0],e[c]=a[1]}},ondragover:function(e){return!1}}}}n.r(t),n.d(t,"useDragRow",(function(){return o}))},ea2c:function(e,t,n){"use strict";function o(e){var t,n;return function(o){return{draggable:!0,ondrag:function(e){t=o},ondrop:function(e){n=o},ondragend:function(o){if(t!==n){var r=e.indexOf(t),c=e.indexOf(n),a=[e[c],e[r]];e[r]=a[0],e[c]=a[1]}},ondragover:function(e){return!1}}}}n.r(t),n.d(t,"useDraggable",(function(){return o}))}}]);