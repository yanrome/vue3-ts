(window.webpackJsonp=window.webpackJsonp||[]).push([["JSON-schema-form-schema-form-copy"],{"366a":function(e,t,r){"use strict";r("5452")},5452:function(e,t,r){},a3a7:function(e,t,r){"use strict";r.r(t);var n,a=r("5530"),c=(r("4de4"),r("7a23")),o=Object(c.withScopeId)("data-v-fbc99ee0"),i=o((function(e,t,r,n,i,l){var f=Object(c.resolveComponent)("a-form-item"),u=Object(c.resolveComponent)("a-spin"),s=Object(c.resolveComponent)("a-form");return Object(c.openBlock)(),Object(c.createBlock)(s,Object(c.mergeProps)({ref:"schemaFormRef"},e.formItemLayout),{default:o((function(){return[(Object(c.openBlock)(!0),Object(c.createBlock)(c.Fragment,null,Object(c.renderList)(e.formSchema.formItem.filter((function(e){return!e.hidden})),(function(t,r){return Object(c.openBlock)(),Object(c.createBlock)(u,{key:t.field,spinning:t.loading||!1},{default:o((function(){return[Object(c.createVNode)(f,Object(c.mergeProps)({help:t.help,extra:t.extra,label:t.label,name:t.field},Object(a.a)(Object(a.a)({},t.props),e.validateInfos[t.field]),{type:void 0}),{default:o((function(){return[(Object(c.openBlock)(),Object(c.createBlock)(Object(c.resolveDynamicComponent)(e.getComponent(t.type)),Object(c.mergeProps)({value:e.modelRef[t.field],"onUpdate:value":function(r){return e.modelRef[t.field]=r},"form-item":t},Object(c.toHandlers)(Object(a.a)({},e.getTriggerEvent(t)))),null,16,["value","onUpdate:value","form-item"]))]})),_:2},1040,["help","extra","label","name"])]})),_:2},1032,["spinning"])})),128)),e.$slots["operate-button"]?(Object(c.openBlock)(),Object(c.createBlock)(f,{key:0,"wrapper-col":{span:e.formItemLayout.wrapperCol.span,offset:e.formItemLayout.labelCol.span}},{default:o((function(){return[Object(c.renderSlot)(e.$slots,"operate-button")]})),_:3},8,["wrapper-col"])):Object(c.createCommentVNode)("",!0)]})),_:1},16)})),l=r("1da1"),f=r("ade3"),u=(r("7f6b"),r("8592")),s=(r("f2ef"),r("3af3")),d=(r("96cf"),r("b0c0"),r("13d5"),r("159b"),r("d3b7"),r("caad"),r("55ac")),m=r("b35d"),b=s.a.useForm,p=Object(c.defineComponent)({name:"DynamicForm",components:Object(a.a)(Object(a.a)({},m.default),{},(n={},Object(f.a)(n,u.a.name,u.a),Object(f.a)(n,s.a.name,s.a),Object(f.a)(n,s.a.Item.name,s.a.Item),n)),props:{formSchema:{required:!0,type:Object},fields:{type:Object,default:function(){return{}}}},setup:function(e){var t=Object(c.ref)(),r=Object(c.getCurrentInstance)(),n=Object(a.a)({labelCol:{span:4},wrapperCol:{span:20}},e.formSchema.formItemLayout),o=Object(c.reactive)(e.formSchema.formItem.reduce((function(e,t){var r;return null!==(r=t.eventObject)&&void 0!==r||(t.eventObject={}),e[t.field]=t.value,e}),{}));e.fields&&Object.assign(o,e.fields),e.formSchema.formItem.forEach(function(){var e=Object(l.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object.prototype.hasOwnProperty.call(t,"loading")&&(t.loading=!0),!Object(d.b)(t.asyncOptions)&&!Object(d.a)(t.asyncOptions)){e.next=7;break}return e.next=4,t.asyncOptions(t,r).finally((function(){return t.loading=!1}));case 4:t.options=e.sent,e.next=11;break;case 7:if(!Object(d.b)(t.asyncValue)&&!Object(d.a)(t.asyncValue)){e.next=11;break}return e.next=10,t.asyncValue(t,r).finally((function(){return t.loading=!1}));case 10:o[t.field]=e.sent;case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var i=Object(c.reactive)(e.formSchema.formItem.filter((function(e){return!e.hidden})).reduce((function(e,t){return t.rules&&(e[t.field]=t.rules),e}),{})),f=b(o,i),u=f.resetFields,s=f.validate,m=f.validateInfos,p=f.validateField,O=["input","textarea","select","radio","checkbox","input-number","input-range","switch"],j=function(e){var t=e.field,r=e.trigger;return function(){return s(t,{trigger:r}).catch((function(){return{}}))}};return{formItemLayout:n,validate:s,resetFields:u,validateField:p,validateInfos:m,modelRef:o,schemaFormRef:t,getTriggerEvent:function(e){var t,r={},n=e.field;if(Array.isArray(e.rules))e.rules.forEach((function(e){Array.isArray(e.trigger)?e.trigger.forEach((function(e){return r[e]=j({field:n,trigger:e})})):Object(d.c)(e.trigger)&&(r[e.trigger]=j({field:n,trigger:e.trigger}))}));else if(null!==(t=e.rules)&&void 0!==t&&t.trigger){var a,c=null===(a=e.rules)||void 0===a?void 0:a.trigger;r[c]=j({field:n,trigger:c}),Array.isArray(c)?c.forEach((function(e){return r[e]=j({field:n,trigger:e})})):Object(d.c)(c)&&(r[c]=j({field:n,trigger:c}))}return r},getComponent:function(e){return O.includes(e)?"schema-form-"+e:Object(c.isReactive)(e)||Object(c.isRef)(e)?Object(c.createVNode)(e):e}}}});r("366a"),p.render=i,p.__scopeId="data-v-fbc99ee0",t.default=p}}]);