(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"170f6":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{username:"",regpass:""}},methods:{register:function(){uni.request({url:"/auth/register",method:"POST",data:{username:this.username,password:this.regpass},success:function(t){e("log",t.data," at pages/index/index.vue:37"),"注册成功"===t.data.message?(uni.showToast({title:"注册成功"}),setTimeout((function(){uni.redirectTo({url:"../login/login"})}),300)):uni.showToast({title:"用户名已注册",icon:"error"})}})},reset:function(){this.username="",this.regpass=""}}};t.default=i}).call(this,i("0de9")["log"])},"498d":function(e,t,i){var n=i("f808");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("b4abb5aa",n,!0,{sourceMap:!1,shadowMode:!1})},6800:function(e,t,i){var n=i("70b8");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("7c24d83f",n,!0,{sourceMap:!1,shadowMode:!1})},"6bab":function(e,t,i){"use strict";i.r(t);var n=i("fe50"),a=i.n(n);for(var l in n)"default"!==l&&function(e){i.d(t,e,(function(){return n[e]}))}(l);t["default"]=a.a},"70b8":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".page[data-v-6b55d4c4]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.head[data-v-6b55d4c4]{height:40px}.box[data-v-6b55d4c4]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;flex-flow:column nowrap;border:1px solid #000;border-radius:9px 9px;-webkit-box-shadow:2px 3px 5px #606266;box-shadow:2px 3px 5px #606266}.btn[data-v-6b55d4c4]{width:100%;height:45px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.reset[data-v-6b55d4c4]:active{-webkit-transform:translate(%?2?%,%?3?%);transform:translate(%?2?%,%?3?%);opacity:.6}.reg[data-v-6b55d4c4]:active{-webkit-transform:translate(%?2?%,%?3?%);transform:translate(%?2?%,%?3?%);opacity:.6}",""]),e.exports=t},"85e4":function(e,t,i){"use strict";var n=i("498d"),a=i.n(n);a.a},"943a":function(e,t,i){"use strict";i.r(t);var n=i("d0c0"),a=i("6bab");for(var l in a)"default"!==l&&function(e){i.d(t,e,(function(){return a[e]}))}(l);i("85e4");var o,r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"eef6029a",null,!1,n["a"],o);t["default"]=s.exports},"953b":function(e,t,i){"use strict";var n=i("6800"),a=i.n(n);a.a},baf4:function(e,t,i){"use strict";i.r(t);var n=i("ee82"),a=i("c273");for(var l in a)"default"!==l&&function(e){i.d(t,e,(function(){return a[e]}))}(l);i("953b");var o,r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"6b55d4c4",null,!1,n["a"],o);t["default"]=s.exports},c273:function(e,t,i){"use strict";i.r(t);var n=i("170f6"),a=i.n(n);for(var l in n)"default"!==l&&function(e){i.d(t,e,(function(){return n[e]}))}(l);t["default"]=a.a},d0c0:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return l})),i.d(t,"a",(function(){return n}));var n={uIcon:i("08d2").default},a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"u-field",class:{"u-border-top":e.borderTop,"u-border-bottom":e.borderBottom}},[i("v-uni-view",{staticClass:"u-field-inner",class:["textarea"==e.type?"u-textarea-inner":"","u-label-postion-"+e.labelPosition]},[i("v-uni-view",{staticClass:"u-label",class:[e.required?"u-required":""],style:{justifyContent:e.justifyContent,flex:"left"==e.labelPosition?"0 0 "+e.labelWidth+"rpx":"1"}},[e.icon?i("v-uni-view",{staticClass:"u-icon-wrap"},[i("u-icon",{staticClass:"u-icon",attrs:{size:"32","custom-style":e.iconStyle,name:e.icon,color:e.iconColor}})],1):e._e(),e._t("icon"),i("v-uni-text",{staticClass:"u-label-text",class:[this.$slots.icon||e.icon?"u-label-left-gap":""]},[e._v(e._s(e.label))])],2),i("v-uni-view",{staticClass:"fild-body"},[i("v-uni-view",{staticClass:"u-flex-1 u-flex",style:[e.inputWrapStyle]},["textarea"==e.type?i("v-uni-textarea",{staticClass:"u-flex-1 u-textarea-class",style:[e.fieldStyle],attrs:{value:e.value,placeholder:e.placeholder,placeholderStyle:e.placeholderStyle,disabled:e.disabled,maxlength:e.inputMaxlength,focus:e.focus,autoHeight:e.autoHeight,fixed:e.fixed},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.onBlur.apply(void 0,arguments)},focus:function(t){arguments[0]=t=e.$handleEvent(t),e.onFocus.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)},click:function(t){arguments[0]=t=e.$handleEvent(t),e.fieldClick.apply(void 0,arguments)}}}):i("v-uni-input",{staticClass:"u-flex-1 u-field__input-wrap",style:[e.fieldStyle],attrs:{type:e.type,value:e.value,password:e.password||"password"===this.type,placeholder:e.placeholder,placeholderStyle:e.placeholderStyle,disabled:e.disabled,maxlength:e.inputMaxlength,focus:e.focus,confirmType:e.confirmType},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e.onFocus.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.onBlur.apply(void 0,arguments)},input:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)},click:function(t){arguments[0]=t=e.$handleEvent(t),e.fieldClick.apply(void 0,arguments)}}})],1),e.clearable&&""!=e.value&&e.focused?i("u-icon",{staticClass:"u-clear-icon",attrs:{size:e.clearSize,name:"close-circle-fill",color:"#c0c4cc"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClear.apply(void 0,arguments)}}}):e._e(),i("v-uni-view",{staticClass:"u-button-wrap"},[e._t("right")],2),e.rightIcon?i("u-icon",{staticClass:"u-arror-right",style:[e.rightIconStyle],attrs:{name:e.rightIcon,color:"#c0c4cc",size:"26"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.rightIconClick.apply(void 0,arguments)}}}):e._e()],1)],1),!1!==e.errorMessage&&""!=e.errorMessage?i("v-uni-view",{staticClass:"u-error-message",style:{paddingLeft:e.labelWidth+"rpx"}},[e._v(e._s(e.errorMessage))]):e._e()],1)},l=[]},ee82:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return l})),i.d(t,"a",(function(){return n}));var n={uField:i("943a").default},a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page u-flex"},[i("v-uni-view",{staticClass:"head"}),i("v-uni-view",{staticClass:"box u-flex"},[i("u-field",{attrs:{icon:"man",label:"用户名:"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),i("u-field",{attrs:{icon:"woman",label:"密码:",password:!0},model:{value:e.regpass,callback:function(t){e.regpass=t},expression:"regpass"}}),i("v-uni-view",{staticClass:"btn u-flex"},[i("v-uni-view",{staticClass:"reset"},[i("v-uni-button",{attrs:{size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.reset.apply(void 0,arguments)}}},[e._v("重置")])],1),i("v-uni-view",{staticClass:"reg"},[i("v-uni-button",{attrs:{size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.register.apply(void 0,arguments)}}},[e._v("注册")])],1)],1)],1)],1)},l=[]},f808:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'.u-field[data-v-eef6029a]{font-size:%?28?%;padding:%?20?% %?28?%;text-align:left;position:relative;color:#303133}.u-field-inner[data-v-eef6029a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-textarea-inner[data-v-eef6029a]{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.u-textarea-class[data-v-eef6029a]{min-height:%?96?%;width:auto;font-size:%?28?%}.fild-body[data-v-eef6029a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-arror-right[data-v-eef6029a]{margin-left:%?8?%}.u-label-text[data-v-eef6029a]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.u-label-left-gap[data-v-eef6029a]{margin-left:%?6?%}.u-label-postion-top[data-v-eef6029a]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.u-label[data-v-eef6029a]{width:%?130?%;-webkit-box-flex:1;-webkit-flex:1 1 %?130?%;flex:1 1 %?130?%;text-align:left;position:relative;\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-required[data-v-eef6029a]::before{content:"*";position:absolute;left:%?-16?%;font-size:14px;color:#fa3534;height:9px;line-height:1}.u-field__input-wrap[data-v-eef6029a]{position:relative;overflow:hidden;font-size:%?28?%;height:%?48?%;-webkit-box-flex:1;-webkit-flex:1;flex:1;width:auto}.u-clear-icon[data-v-eef6029a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-error-message[data-v-eef6029a]{color:#fa3534;font-size:%?26?%;text-align:left}.placeholder-style[data-v-eef6029a]{color:#969799}.u-input-class[data-v-eef6029a]{font-size:%?28?%}.u-button-wrap[data-v-eef6029a]{margin-left:%?8?%}',""]),e.exports=t},fe50:function(e,t,i){"use strict";i("a9e3"),i("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"u-field",props:{icon:String,rightIcon:String,required:Boolean,label:String,password:Boolean,clearable:{type:Boolean,default:!0},labelWidth:{type:[Number,String],default:130},labelAlign:{type:String,default:"left"},inputAlign:{type:String,default:"left"},iconColor:{type:String,default:"#606266"},autoHeight:{type:Boolean,default:!0},errorMessage:{type:[String,Boolean],default:""},placeholder:String,placeholderStyle:String,focus:Boolean,fixed:Boolean,value:[Number,String],type:{type:String,default:"text"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},labelPosition:{type:String,default:"left"},fieldStyle:{type:Object,default:function(){return{}}},clearSize:{type:[Number,String],default:30},iconStyle:{type:Object,default:function(){return{}}},borderTop:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},trim:{type:Boolean,default:!0}},data:function(){return{focused:!1,itemIndex:0}},computed:{inputWrapStyle:function(){var e={};return e.textAlign=this.inputAlign,"left"==this.labelPosition?e.margin="0 8rpx":e.marginRight="8rpx",e},rightIconStyle:function(){var e={};return"top"==this.arrowDirection&&(e.transform="roate(-90deg)"),"bottom"==this.arrowDirection?e.transform="roate(90deg)":e.transform="roate(0deg)",e},labelStyle:function(){var e={};return"left"==this.labelAlign&&(e.justifyContent="flext-start"),"center"==this.labelAlign&&(e.justifyContent="center"),"right"==this.labelAlign&&(e.justifyContent="flext-end"),e},justifyContent:function(){return"left"==this.labelAlign?"flex-start":"center"==this.labelAlign?"center":"right"==this.labelAlign?"flex-end":void 0},inputMaxlength:function(){return Number(this.maxlength)},fieldInnerStyle:function(){var e={};return"left"==this.labelPosition?e.flexDirection="row":e.flexDirection="column",e}},methods:{onInput:function(e){var t=e.detail.value;this.trim&&(t=this.$u.trim(t)),this.$emit("input",t)},onFocus:function(e){this.focused=!0,this.$emit("focus",e)},onBlur:function(e){var t=this;setTimeout((function(){t.focused=!1}),100),this.$emit("blur",e)},onConfirm:function(e){this.$emit("confirm",e.detail.value)},onClear:function(e){this.$emit("input","")},rightIconClick:function(){this.$emit("right-icon-click"),this.$emit("click")},fieldClick:function(){this.$emit("click")}}};t.default=n}}]);