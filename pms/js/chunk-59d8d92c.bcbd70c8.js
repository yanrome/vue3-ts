(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-59d8d92c"],{1212:function(e,t,r){"use strict";var n=r("7a23"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-9.3 9.3-19.1 18-29.3 26L668.2 724a8 8 0 00-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 .8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z"}}]},name:"redo",theme:"outlined"},o=r("b3f0");function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u=function(e,t){var r=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?Object(arguments[t]):{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){c(e,t,r[t])}))}return e}({},e,t.attrs);return n.createVNode(o.a,n.mergeProps(r,{icon:a}),null)};u.displayName="RedoOutlined",u.inheritAttrs=!1,t.a=u},"2eb5":function(e,t,r){"use strict";t.a=function(e){return null==e}},6010:function(e,t,r){"use strict";r.r(t);var n=r("7a23"),a=Object(n.withScopeId)("data-v-ac26a0ba");Object(n.pushScopeId)("data-v-ac26a0ba");var o=Object(n.createTextVNode)(" 不延迟 "),c=Object(n.createTextVNode)(" 延迟 "),u=Object(n.createTextVNode)(" 不免押入住 "),l=Object(n.createTextVNode)(" 免押入住 "),i=Object(n.createTextVNode)("提交");Object(n.popScopeId)();var d,f=a((function(e,t,r,d,f,s){var b=Object(n.resolveComponent)("a-range-picker"),p=Object(n.resolveComponent)("a-form-item"),m=Object(n.resolveComponent)("a-cascader"),O=Object(n.resolveComponent)("Option"),v=Object(n.resolveComponent)("a-select"),j=Object(n.resolveComponent)("a-input"),y=Object(n.resolveComponent)("a-radio"),h=Object(n.resolveComponent)("a-radio-group"),g=Object(n.resolveComponent)("a-input-number"),N=Object(n.resolveComponent)("a-button"),V=Object(n.resolveComponent)("a-form"),T=Object(n.resolveComponent)("a-card");return Object(n.openBlock)(),Object(n.createBlock)(T,null,{default:a((function(){return[Object(n.createVNode)(V,{ref:"formRef","label-col":{span:5},colon:!1,labelAlign:"center",model:e.orderEntry},{default:a((function(){return[Object(n.createVNode)(p,{label:"入住离店时间"},{default:a((function(){return[Object(n.createVNode)(b,{value:e.rangeTime,"onUpdate:value":t[1]||(t[1]=function(t){return e.rangeTime=t}),style:{width:"550px"},onChange:e.ChooseTime,"disabled-date":e.disabledDate,valueFormat:"YYYY-MM-DD"},null,8,["value","onChange","disabled-date"])]})),_:1}),Object(n.createVNode)(p,{label:"选择房型"},{default:a((function(){return[Object(n.createVNode)(m,{class:"s-cascader",style:{width:"550px"},value:e.roomValue,"onUpdate:value":t[2]||(t[2]=function(t){return e.roomValue=t}),options:e.roomOptions,"load-data":e.loadData,onChange:e.roomChange,placeholder:"基础房型/产品房型"},null,8,["value","options","load-data","onChange"])]})),_:1}),Object(n.createVNode)(p,{label:"订单来源"},{default:a((function(){return[Object(n.createVNode)(v,{style:{width:"300px"},value:e.orderEntry.orderSource,"onUpdate:value":t[3]||(t[3]=function(t){return e.orderEntry.orderSource=t})},{default:a((function(){return[(Object(n.openBlock)(!0),Object(n.createBlock)(n.Fragment,null,Object(n.renderList)(e.getFn,(function(e){return Object(n.openBlock)(),Object(n.createBlock)(O,{key:e.dictValue,value:e.dictValue},{default:a((function(){return[Object(n.createTextVNode)(Object(n.toDisplayString)(e.dictLabel),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"外部平台订单号"},{default:a((function(){return[Object(n.createVNode)(j,{style:{width:"300px"},placeholder:"请输入入住人(哎哟有房订单不输入)",value:e.orderEntry.externalOrderSn,"onUpdate:value":t[4]||(t[4]=function(t){return e.orderEntry.externalOrderSn=t})},null,8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"入住人"},{default:a((function(){return[Object(n.createVNode)(j,{style:{width:"300px"},placeholder:"请输入入住人",value:e.orderEntry.roomUser,"onUpdate:value":t[5]||(t[5]=function(t){return e.orderEntry.roomUser=t})},null,8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"联系电话"},{default:a((function(){return[Object(n.createVNode)(j,{style:{width:"300px"},placeholder:"请输入联系电话",value:e.orderEntry.phone,"onUpdate:value":t[6]||(t[6]=function(t){return e.orderEntry.phone=t})},null,8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"房费总价"},{default:a((function(){return[Object(n.createVNode)(j,{style:{width:"300px"},placeholder:"请输入房费总价",value:e.orderEntry.realAmount,"onUpdate:value":t[7]||(t[7]=function(t){return e.orderEntry.realAmount=t})},null,8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"支付方式"},{default:a((function(){return[Object(n.createVNode)(v,{style:{width:"300px"},value:e.orderEntry.payment,"onUpdate:value":t[8]||(t[8]=function(t){return e.orderEntry.payment=t})},{default:a((function(){return[(Object(n.openBlock)(!0),Object(n.createBlock)(n.Fragment,null,Object(n.renderList)(e.businessPayment,(function(e){return Object(n.openBlock)(),Object(n.createBlock)(O,{key:e.dictValue,value:e.dictValue},{default:a((function(){return[Object(n.createTextVNode)(Object(n.toDisplayString)(e.dictLabel),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"延迟退房"},{default:a((function(){return[Object(n.createVNode)(h,{value:e.orderEntry.delayTime,"onUpdate:value":t[9]||(t[9]=function(t){return e.orderEntry.delayTime=t})},{default:a((function(){return[Object(n.createVNode)(y,{value:0},{default:a((function(){return[o]})),_:1}),Object(n.createVNode)(y,{value:1},{default:a((function(){return[c]})),_:1})]})),_:1},8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"是否免押"},{default:a((function(){return[Object(n.createVNode)(h,{value:e.noDeposit,"onUpdate:value":t[10]||(t[10]=function(t){return e.noDeposit=t})},{default:a((function(){return[Object(n.createVNode)(y,{value:0},{default:a((function(){return[u]})),_:1}),Object(n.createVNode)(y,{value:1},{default:a((function(){return[l]})),_:1})]})),_:1},8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:"房间数量"},{default:a((function(){return[Object(n.createVNode)(g,{value:e.orderEntry.roomNum,"onUpdate:value":t[11]||(t[11]=function(t){return e.orderEntry.roomNum=t}),min:"1"},null,8,["value"])]})),_:1}),Object(n.createVNode)(p,{label:" "},{default:a((function(){return[Object(n.createVNode)(N,{onClick:e.submit,type:"primary"},{default:a((function(){return[i]})),_:1},8,["onClick"])]})),_:1})]})),_:1},8,["model"])]})),_:1})})),s=r("5530"),b=(r("3b18"),r("f64c")),p=r("1da1"),m=r("ade3"),O=(r("9980"),r("0bb7")),v=(r("5783"),r("59a5")),j=(r("3c1f"),r("2f50")),y=(r("922d"),r("09d9")),h=(r("6ba6"),r("5efb")),g=(r("2ef0"),r("9839")),N=(r("f2ef"),r("3af3")),V=(r("288f"),r("cdeb")),T=(r("96cf"),r("b0c0"),r("d81d"),r("99af"),r("4de4"),r("5550")),w=r("0613"),x=r("8366"),C=r("cebc"),k=r("c1df"),_=r.n(k),E=r("a009"),S=Object(n.defineComponent)({name:"index",components:(d={},Object(m.a)(d,V.a.name,V.a),Object(m.a)(d,N.a.name,N.a),Object(m.a)(d,g.b.name,g.b),Object(m.a)(d,h.a.name,h.a),Object(m.a)(d,y.a.name,y.a),Object(m.a)(d,g.b.Option.name,g.b.Option),Object(m.a)(d,j.a.name,j.a),Object(m.a)(d,v.a.name,v.a),Object(m.a)(d,v.a.Group.name,v.a.Group),Object(m.a)(d,"aRangePicker",O.a.RangePicker),d),setup:function(){var e=Object(w.c)(),t=Object(n.reactive)({rangeTime:Object(n.ref)([]),roomValue:Object(n.ref)([]),roomScale:Object(n.ref)([]),getFn:Object(n.ref)(),businessPayment:Object(n.ref)(),selectedOptions:Object(n.ref)(),noDeposit:0,orderEntry:{hotelId:e.getters.hotelId,roomScaleId:"",virtualRoomScaleId:"",orderType:"1",orderSource:"",delayTime:0,deposit:0,externalOrderSn:"",roomUser:"",roomNum:1,phone:"",realAmount:"",payTimeType:1,payment:"10"},roomOptions:Object(n.ref)([])});!function(){var r=Object(p.a)(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.dispatch(E.a.getDict,{dictType:"business_order_source"});case 2:return n=r.sent,r.next=5,e.dispatch(E.a.getDict,{dictType:"business_payment"});case 5:a=r.sent,t.getFn=n,t.businessPayment=a;case 8:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}()();var r=function(){var r=Object(p.a)(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(x.b)({hotelId:e.getters.hotelId,startTime:t.rangeTime[0],endTime:t.rangeTime[1]});case 2:n=r.sent,a=n.data,t.roomOptions=a.map((function(e){return{value:e.id,freeNum:e.freeNum,label:" ".concat(e.scaleName," (").concat(e.freeNum,")"),isLeaf:!1}}));case 5:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),a=function(){var r=Object(p.a)(regeneratorRuntime.mark((function r(n){var a,o,c,u;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if((a=n[n.length-1]).loading=!0,o={hotelId:e.getters.hotelId,roomScaleId:a.value,startTime:t.rangeTime[0],endTime:t.rangeTime[1]},!(n.freeNum<1)){r.next=6;break}return b.a.error("房间数量不足"),r.abrupt("return");case 6:return r.next=8,Object(x.d)(o);case 8:c=r.sent,u=c.data,a.loading=!1,a.children=u.filter((function(e){return e.freeNum})).map((function(e){return Object(s.a)({value:e.id,label:e.scaleName+"(".concat(e.freeNum,")")},e)}));case 12:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return Object(n.watch)((function(){return e.getters.hotelId}),(function(e){t.orderEntry.roomScaleId="",t.orderEntry.hotelId=e,r()})),Object(s.a)(Object(s.a)({},Object(T.a)(t)),{},{disabledDate:function(e){var t=_()().hour()<9?2:1;return e&&e<_()().subtract(t,"days").endOf("day")},ChooseTime:function(e){t.rangeTime=e,r()},loadData:a,roomChange:function(e,r){t.selectedOptions=r[1],t.orderEntry.roomScaleId=e[0],t.orderEntry.virtualRoomScaleId=e[1]},roomScaleChange:function(e){},submit:function(){if(t.selectedOptions)if(t.orderEntry.orderSource){var r=_()(t.rangeTime[1]).diff(_()(t.rangeTime[0]),"days"),n={deposit:0===t.noDeposit?t.selectedOptions.deposit:0,startTime:t.rangeTime[0],endTime:t.rangeTime[1],diffDay:r},a=Object.assign(Object(s.a)({},t.orderEntry),n);Object(C.c)(a).then((function(r){1===r.ret&&(b.a.info("操作成功"),setTimeout((function(){t.orderEntry=Object.assign(t.orderEntry,{hotelId:e.getters.hotelId,orderSource:"",delayTime:0,deposit:0,externalOrderSn:"",roomUser:"",roomNum:1,phone:"",realAmount:"",payTimeType:1,payment:"10"})}),2e3))}))}else b.a.error("请选择订单来源");else b.a.error("请选择房型")}})}});S.render=f,S.__scopeId="data-v-ac26a0ba",t.default=S},"94d2":function(e,t,r){"use strict";var n=r("7a23"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"}}]},name:"clock-circle",theme:"outlined"},o=r("b3f0");function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u=function(e,t){var r=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?Object(arguments[t]):{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){c(e,t,r[t])}))}return e}({},e,t.attrs);return n.createVNode(o.a,n.mergeProps(r,{icon:a}),null)};u.displayName="ClockCircleOutlined",u.inheritAttrs=!1,t.a=u},b8ad:function(e,t,r){e.exports=function(){"use strict";return function(e,t,r){(r=r||{}).childrenKeyName=r.childrenKeyName||"children";var n=e||[],a=[],o=0;do{var c=n.filter((function(e){return t(e,o)}))[0];if(!c)break;a.push(c),n=c[r.childrenKeyName]||[],o+=1}while(n.length>0);return a}}()},c2b3:function(e,t,r){"use strict";e.exports=function(e,t){if(e===t)return!0;if(!e||!t)return!1;var r=e.length;if(t.length!==r)return!1;for(var n=0;n<r;n++)if(e[n]!==t[n])return!1;return!0}},f007:function(e,t,r){"use strict";var n=r("7a23"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"}}]},name:"calendar",theme:"outlined"},o=r("b3f0");function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var u=function(e,t){var r=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?Object(arguments[t]):{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){c(e,t,r[t])}))}return e}({},e,t.attrs);return n.createVNode(o.a,n.mergeProps(r,{icon:a}),null)};u.displayName="CalendarOutlined",u.inheritAttrs=!1,t.a=u}}]);