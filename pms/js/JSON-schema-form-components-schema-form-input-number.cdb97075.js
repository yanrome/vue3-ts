(window.webpackJsonp=window.webpackJsonp||[]).push([["JSON-schema-form-components-schema-form-input-number"],{"1fcc":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),u=n("ade3"),r=(n("922d"),n("09d9")),a=(n("b0c0"),Object(o.defineComponent)({name:"schema-form-input-number",emits:["update:value"],components:Object(u.a)({},r.a.name,r.a),props:{formItem:{type:Object,default:function(){return{}}},value:void 0},setup:function(e,t){t.attrs;var n=t.emit;return{modelValue:Object(o.computed)({get:function(){return e.value},set:function(e){return n("update:value",e)}})}}}));a.render=function(e,t,n,u,r,a){var c=Object(o.resolveComponent)("a-input-number");return Object(o.openBlock)(),Object(o.createBlock)(c,Object(o.mergeProps)({value:e.modelValue,"onUpdate:value":t[1]||(t[1]=function(t){return e.modelValue=t})},e.formItem.props,Object(o.toHandlers)(e.formItem.eventObject)),null,16,["value"])},t.default=a}}]);