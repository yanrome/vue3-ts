(window.webpackJsonp=window.webpackJsonp||[]).push([["JSON-schema-form-components-schema-form-input"],{5306:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),a=n("ade3"),u=(n("5704"),n("b558")),r=(n("b0c0"),Object(o.defineComponent)({name:"schema-form-input",emits:["update:value"],components:Object(a.a)({},u.a.name,u.a),props:{formItem:{type:Object,default:function(){return{}}},value:void 0},setup:function(e,t){t.attrs;var n=t.emit;return{modelValue:Object(o.computed)({get:function(){return e.value},set:function(e){return n("update:value",e)}})}}}));r.render=function(e,t,n,a,u,r){var c=Object(o.resolveComponent)("a-input");return Object(o.openBlock)(),Object(o.createBlock)(c,Object(o.mergeProps)({value:e.modelValue,"onUpdate:value":t[1]||(t[1]=function(t){return e.modelValue=t})},e.formItem.props,Object(o.toHandlers)(e.formItem.eventObject),{autocomplete:"new-password"}),null,16,["value"])},t.default=r}}]);