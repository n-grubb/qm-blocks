parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"W9ez":[function(require,module,exports) {
var e=wp.editor,t=e.RichText,a=e.MediaUpload,n=e.PlainText,l=wp.blocks.registerBlockType,r=wp.components.Button;l("qm-blocks/content-area",{title:"Content Area",icon:"layout",category:"common",attributes:{title:{source:"text",selector:".content-area-title"},body:{type:"array",source:"children",selector:".content-area-body"},buttonText:{source:"text",selector:".content-area-button-text"},imageAlt:{attribute:"alt",selector:".content-area-image"},imageUrl:{attribute:"src",selector:".content-area-image"}},edit:function(e){var l=e.attributes,c=(e.className,e.setAttributes);return wp.element.createElement("div",{className:"content-area-block container"},wp.element.createElement(a,{onSelect:function(e){c({imageAlt:e.alt,imageUrl:e.url})},type:"image",value:l.imageID,render:function(e){var t,a=e.open;return t=a,l.imageUrl?wp.element.createElement("img",{src:l.imageUrl,onClick:t,className:"image"}):wp.element.createElement("div",{className:"button-container"},wp.element.createElement(r,{onClick:t,className:"button button-large"},"Select an image"))}}),wp.element.createElement(n,{onChange:function(e){return c({title:e})},value:l.title,placeholder:"Content Header",className:"heading"}),wp.element.createElement(t,{onChange:function(e){return c({body:e})},value:l.body,multiline:"p",placeholder:"content body here."}))},save:function(e){var t,a,n=e.attributes;return wp.element.createElement("div",{className:"content-area-block"},(t=n.imageUrl,a=n.imageAlt,t?a?wp.element.createElement("img",{className:"content-area-image",src:t,alt:a}):wp.element.createElement("img",{className:"content-area-image",src:t,alt:"","aria-hidden":"true"}):null),wp.element.createElement("div",{className:"content-area-content"},wp.element.createElement("h3",{className:"content-area-title"},n.title),wp.element.createElement("div",{className:"content-area-body"},n.body)))}});
},{}]},{},["W9ez"], null)