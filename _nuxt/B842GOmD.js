import{B as e,L as t,Pt as n,Q as r,U as i,V as a,_ as o,d as s,f as c,h as ee,jt as l,k as u,l as d,r as f,u as p,v as m,z as h}from"./B5nbzVpw.js";import{l as g,t as te}from"./BVdjFhz-.js";import{$ as _,B as v,D as y,Et as b,F as x,P as S,Q as C,et as w,l as T,m as E,t as D,xt as ne,y as re,z as O}from"./B0gwFOOa.js";import{t as k}from"./cO8iUN-n.js";import{t as ie}from"./my3qd5SA.js";import{t as ae}from"./mVSrxWMo.js";import{t as A}from"./Ba-1D0TF.js";import{t as j}from"./TIYBATRn.js";import{t as M}from"./F7EYAUwf.js";import{n as N}from"./gFu29UVV.js";import{t as P}from"./D7RhKSRs.js";import{t as F}from"./DLLG_Ueq.js";import I from"./DqaQKUf-.js";var L=D.extend({name:`treeselect`,style:`
    .p-treeselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('treeselect.background');
        border: 1px solid dt('treeselect.border.color');
        transition:
            background dt('treeselect.transition.duration'),
            color dt('treeselect.transition.duration'),
            border-color dt('treeselect.transition.duration'),
            outline-color dt('treeselect.transition.duration'),
            box-shadow dt('treeselect.transition.duration');
        border-radius: dt('treeselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('treeselect.shadow');
    }

    .p-treeselect:not(.p-disabled):hover {
        border-color: dt('treeselect.hover.border.color');
    }

    .p-treeselect:not(.p-disabled).p-focus {
        border-color: dt('treeselect.focus.border.color');
        box-shadow: dt('treeselect.focus.ring.shadow');
        outline: dt('treeselect.focus.ring.width') dt('treeselect.focus.ring.style') dt('treeselect.focus.ring.color');
        outline-offset: dt('treeselect.focus.ring.offset');
    }

    .p-treeselect.p-variant-filled {
        background: dt('treeselect.filled.background');
    }

    .p-treeselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('treeselect.filled.hover.background');
    }

    .p-treeselect.p-variant-filled.p-focus {
        background: dt('treeselect.filled.focus.background');
    }

    .p-treeselect.p-invalid {
        border-color: dt('treeselect.invalid.border.color');
    }

    .p-treeselect.p-disabled {
        opacity: 1;
        background: dt('treeselect.disabled.background');
    }

    .p-treeselect-clear-icon {
        align-self: center;
        color: dt('treeselect.clear.icon.color');
        inset-inline-end: dt('treeselect.dropdown.width');
    }

    .p-treeselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('treeselect.dropdown.color');
        width: dt('treeselect.dropdown.width');
        border-start-end-radius: dt('border.radius.md');
        border-end-end-radius: dt('border.radius.md');
    }

    .p-treeselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-treeselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('treeselect.padding.y') / 2);
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('treeselect.padding.y') dt('treeselect.padding.x');
        color: dt('treeselect.color');
    }

    .p-treeselect-label.p-placeholder {
        color: dt('treeselect.placeholder.color');
    }

    .p-treeselect.p-invalid .p-treeselect-label.p-placeholder {
        color: dt('treeselect.invalid.placeholder.color');
    }

    .p-treeselect:has(.p-select-clear-icon) .p-treeselect-label {
        padding-inline-end: dt('treeselect.padding.x');
    }

    .p-treeselect.p-disabled .p-treeselect-label {
        color: dt('treeselect.disabled.color');
    }

    .p-treeselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-treeselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('treeselect.overlay.background');
        color: dt('treeselect.overlay.color');
        border: 1px solid dt('treeselect.overlay.border.color');
        border-radius: dt('treeselect.overlay.border.radius');
        box-shadow: dt('treeselect.overlay.shadow');
        overflow: hidden;
        min-width: 100%;
        will-change: transform;
    }

    .p-treeselect-tree-container {
        overflow: auto;
    }

    .p-treeselect-empty-message {
        padding: dt('treeselect.empty.message.padding');
        background: transparent;
    }

    .p-treeselect-fluid {
        display: flex;
    }

    .p-treeselect-overlay .p-tree {
        padding: dt('treeselect.tree.padding');
    }

    .p-treeselect-overlay .p-tree-loading {
        min-height: 3rem;
    }

    .p-treeselect-label .p-chip {
        padding-block-start: calc(dt('treeselect.padding.y') / 2);
        padding-block-end: calc(dt('treeselect.padding.y') / 2);
        border-radius: dt('treeselect.chip.border.radius');
    }

    .p-treeselect-label:has(.p-chip) {
        padding: calc(dt('treeselect.padding.y') / 2) calc(dt('treeselect.padding.x') / 2);
    }

    .p-treeselect-sm .p-treeselect-label {
        font-size: dt('treeselect.sm.font.size');
        padding-block: dt('treeselect.sm.padding.y');
        padding-inline: dt('treeselect.sm.padding.x');
    }

    .p-treeselect-sm .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.sm.font.size');
        width: dt('treeselect.sm.font.size');
        height: dt('treeselect.sm.font.size');
    }

    .p-treeselect-lg .p-treeselect-label {
        font-size: dt('treeselect.lg.font.size');
        padding-block: dt('treeselect.lg.padding.y');
        padding-inline: dt('treeselect.lg.padding.x');
    }

    .p-treeselect-lg .p-treeselect-dropdown .p-icon {
        font-size: dt('treeselect.lg.font.size');
        width: dt('treeselect.lg.font.size');
        height: dt('treeselect.lg.font.size');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-treeselect p-component p-inputwrapper`,{"p-treeselect-display-chip":n.display===`chip`,"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-focus":t.focused,"p-variant-filled":t.$variant===`filled`,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":t.focused||t.overlayVisible,"p-treeselect-open":t.overlayVisible,"p-treeselect-fluid":t.$fluid,"p-treeselect-sm p-inputfield-sm":n.size===`small`,"p-treeselect-lg p-inputfield-lg":n.size===`large`}]},labelContainer:`p-treeselect-label-container`,label:function(e){var t=e.instance,n=e.props;return[`p-treeselect-label`,{"p-placeholder":t.label===n.placeholder,"p-treeselect-label-empty":!n.placeholder&&t.emptyValue}]},clearIcon:`p-treeselect-clear-icon`,chip:`p-treeselect-chip-item`,pcChip:`p-treeselect-chip`,dropdown:`p-treeselect-dropdown`,dropdownIcon:`p-treeselect-dropdown-icon`,panel:`p-treeselect-overlay p-component`,treeContainer:`p-treeselect-tree-container`,emptyMessage:`p-treeselect-empty-message`},inlineStyles:{root:function(e){return{position:e.props.appendTo===`self`?`relative`:void 0}}}}),R={name:`BaseTreeSelect`,extends:A,props:{options:Array,scrollHeight:{type:String,default:`20rem`},placeholder:{type:String,default:null},tabindex:{type:Number,default:null},selectionMode:{type:String,default:`single`},selectedItemsLabel:{type:String,default:null},maxSelectedLabels:{type:Number,default:null},appendTo:{type:[String,Object],default:`body`},emptyMessage:{type:String,default:null},display:{type:String,default:`comma`},metaKeySelection:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},loadingMode:{type:String,default:`mask`},showClear:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},filter:{type:Boolean,default:!1},filterBy:{type:[String,Function],default:`label`},filterMode:{type:String,default:`lenient`},filterPlaceholder:{type:String,default:null},filterLocale:{type:String,default:void 0},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},panelClass:{type:[String,Object],default:null},panelProps:{type:null,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},expandedKeys:{type:null,default:null}},style:L,provide:function(){return{$pcTreeSelect:this,$parentInstance:this}}};function z(e){"@babel/helpers - typeof";return z=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},z(e)}function B(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=q(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?V(Object(n),!0).forEach(function(t){U(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function U(e,t,n){return(t=W(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function W(e){var t=G(e,`string`);return z(t)==`symbol`?t:t+``}function G(e,t){if(z(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(z(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function oe(e){return ce(e)||se(e)||q(e)||K()}function K(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function q(e,t){if(e){if(typeof e==`string`)return J(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}function se(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function ce(e){if(Array.isArray(e))return J(e)}function J(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var Y={name:`TreeSelect`,extends:R,inheritAttrs:!1,emits:[`before-show`,`before-hide`,`change`,`show`,`hide`,`node-select`,`node-unselect`,`node-expand`,`node-collapse`,`filter`,`focus`,`blur`,`update:expandedKeys`],inject:{$pcFluid:{default:null}},data:function(){return{focused:!1,overlayVisible:!1,d_expandedKeys:this.expandedKeys||{}}},watch:{modelValue:{handler:function(){this.selfChange||this.updateTreeState(),this.selfChange=!1},immediate:!0},options:function(){this.updateTreeState()},expandedKeys:function(e){this.d_expandedKeys=e}},outsideClickListener:null,resizeListener:null,scrollHandler:null,overlay:null,selfChange:!1,selfClick:!1,beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(k.clear(this.overlay),null)},mounted:function(){this.updateTreeState()},methods:{show:function(){this.$emit(`before-show`),this.overlayVisible=!0},hide:function(){this.$emit(`before-hide`),this.overlayVisible=!1,this.$refs.focusInput.focus()},onFocus:function(e){this.focused=!0,this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.focused=!1,this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n)},onClick:function(e){this.disabled||e.target.tagName===`INPUT`||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||(!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide():this.show(),v(this.$refs.focusInput))},onClearClick:function(){this.onSelectionChange(null)},onSelectionChange:function(e){this.selfChange=!0,this.writeValue(e),this.$emit(`change`,e)},onNodeSelect:function(e){this.$emit(`node-select`,e),this.selectionMode===`single`&&this.hide()},onNodeUnselect:function(e){this.$emit(`node-unselect`,e)},onNodeToggle:function(e){this.d_expandedKeys=e,this.$emit(`update:expandedKeys`,this.d_expandedKeys)},getSelectedItemsLabel:function(){var e=/{(.*?)}/,t=this.selectedItemsLabel||this.$primevue.config.locale.selectionMessage;return e.test(t)?t.replace(t.match(e)[0],Object.keys(this.d_value).length+``):t},onFirstHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?_(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;v(t)},onLastHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?re(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;v(t)},onKeyDown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`Space`:case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e)}},onArrowDownKey:function(e){var t=this;this.overlayVisible||(this.show(),this.$nextTick(function(){var e=oe(S(t.$refs.tree.$el,`[data-pc-section="treeitem"]`)).find(function(e){return e.getAttribute(`tabindex`)===`0`});v(e)}),e.preventDefault())},onEnterKey:function(e){this.overlayVisible?this.hide():this.onArrowDownKey(e),e.preventDefault()},onEscapeKey:function(e){this.overlayVisible&&(this.hide(),e.preventDefault())},onTabKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]||this.overlayVisible&&this.hasFocusableElements()&&(v(this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault())},hasFocusableElements:function(){return O(this.overlay,`:not([data-p-hidden-focusable="true"])`).length>0},onOverlayEnter:function(e){k.set(`overlay`,e,this.$primevue.config.zIndex.overlay),y(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.focus(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.scrollValueInView(),this.$emit(`show`)},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){k.clear(e)},focus:function(){var e=O(this.overlay);e&&e.length>0&&e[0].focus()},alignOverlay:function(){this.appendTo===`self`?E(this.overlay,this.$el):(this.overlay.style.minWidth=C(this.$el)+`px`,T(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&!e.selfClick&&e.isOutsideClicked(t)&&e.hide(),e.selfClick=!1},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new M(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!x()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},isOutsideClicked:function(e){return!(this.$el.isSameNode(e.target)||this.$el.contains(e.target)||this.overlay&&this.overlay.contains(e.target))},overlayRef:function(e){this.overlay=e},onOverlayClick:function(e){P.emit(`overlay-click`,{originalEvent:e,target:this.$el}),this.selfClick=!0},onOverlayKeydown:function(e){e.code===`Escape`&&this.hide()},fillNodeMap:function(e,t){var n=this;t[e.key]=e,e.children&&e.children.length>0&&e.children.forEach(function(e){return n.fillNodeMap(e,t)})},isSelected:function(e,t){return this.selectionMode===`checkbox`?t[e?.key]&&t[e?.key].checked:t[e?.key]},updateTreeState:function(){var e=H({},this.d_value);e&&this.options&&this.options.length>0&&this.updateTreeBranchState(null,null,e)},updateTreeBranchState:function(e,t,n){if(e){if(this.isSelected(e,n)&&(this.expandPath(t),delete n[e.key]),Object.keys(n).length&&e.children){var r=B(e.children),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;t.push(e.key),this.updateTreeBranchState(a,t,n)}}catch(e){r.e(e)}finally{r.f()}}}else{var o=B(this.options),s;try{for(o.s();!(s=o.n()).done;){var c=s.value;this.updateTreeBranchState(c,[],n)}}catch(e){o.e(e)}finally{o.f()}}},expandPath:function(e){if(e.length>0){var t=B(e),n;try{for(t.s();!(n=t.n()).done;){var r=n.value;this.d_expandedKeys[r]=!0}}catch(e){t.e(e)}finally{t.f()}this.d_expandedKeys=H({},this.d_expandedKeys),this.$emit(`update:expandedKeys`,this.d_expandedKeys)}},scrollValueInView:function(){if(this.overlay){var e=w(this.overlay,`[data-p-selected="true"]`);e&&e.scrollIntoView({block:`nearest`,inline:`start`})}}},computed:{nodeMap:function(){var e,t=this,n={};return(e=this.options)==null||e.forEach(function(e){return t.fillNodeMap(e,n)}),n},selectedNodes:function(){var e=this,t=[];return this.d_value&&this.options&&this.options.length>0&&Object.keys(this.d_value).forEach(function(n){var r=e.nodeMap[n];e.isSelected(r,e.d_value)&&t.push(r)}),t},label:function(){var e=this.selectedNodes;return e.length?b(this.maxSelectedLabels)&&e.length>this.maxSelectedLabels?this.getSelectedItemsLabel():e.map(function(e){return e.label}).join(`, `):this.placeholder},chipSelectedItems:function(){return b(this.maxSelectedLabels)&&this.d_value&&Object.keys(this.d_value).length>this.maxSelectedLabels},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage},emptyValue:function(){return!this.$filled},emptyOptions:function(){return!this.options||this.options.length===0},listId:function(){return this.$id+`_list`},hasFluid:function(){return ne(this.fluid)?!!this.$pcFluid:this.fluid},isClearIconVisible:function(){return this.showClear&&this.d_value!=null&&b(this.options)&&!this.disabled&&!this.loading}},components:{TSTree:I,Chip:N,Portal:F,ChevronDownIcon:j,TimesIcon:ae},directives:{ripple:ie}};function X(e){"@babel/helpers - typeof";return X=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},X(e)}function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Z(Object(n),!0).forEach(function(t){le(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function le(e,t,n){return(t=$(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $(e){var t=ue(e,`string`);return X(t)==`symbol`?t:t+``}function ue(e,t){if(X(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(X(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var de=[`id`,`disabled`,`tabindex`,`aria-labelledby`,`aria-label`,`aria-expanded`,`aria-controls`],fe={key:0},pe=[`aria-expanded`];function me(_,v,y,b,x,S){var C=a(`Chip`),w=a(`TSTree`),T=a(`Portal`);return t(),c(`div`,u({ref:`container`,class:_.cx(`root`),style:_.sx(`root`),onClick:v[11]||=function(){return S.onClick&&S.onClick.apply(S,arguments)}},_.ptmi(`root`)),[d(`div`,u({class:`p-hidden-accessible`},_.ptm(`hiddenInputContainer`),{"data-p-hidden-accessible":!0}),[d(`input`,u({ref:`focusInput`,id:_.inputId,type:`text`,role:`combobox`,class:_.inputClass,style:_.inputStyle,readonly:``,disabled:_.disabled,tabindex:_.disabled?-1:_.tabindex,"aria-labelledby":_.ariaLabelledby,"aria-label":_.ariaLabel,"aria-haspopup":`tree`,"aria-expanded":x.overlayVisible,"aria-controls":x.overlayVisible?S.listId:void 0,onFocus:v[0]||=function(e){return S.onFocus(e)},onBlur:v[1]||=function(e){return S.onBlur(e)},onKeydown:v[2]||=function(e){return S.onKeyDown(e)}},Q(Q({},_.inputProps),_.ptm(`hiddenInput`))),null,16,de)],16),d(`div`,u({class:_.cx(`labelContainer`)},_.ptm(`labelContainer`)),[d(`div`,u({class:_.cx(`label`)},_.ptm(`label`)),[e(_.$slots,`value`,{value:S.selectedNodes,placeholder:_.placeholder},function(){return[_.display===`comma`?(t(),c(f,{key:0},[o(n(S.label||`empty`),1)],64)):_.display===`chip`?(t(),c(f,{key:1},[S.chipSelectedItems?(t(),c(`span`,fe,n(S.label),1)):(t(),c(f,{key:1},[(t(!0),c(f,null,h(S.selectedNodes,function(e){return t(),c(`div`,u({key:e.key,class:_.cx(`chipItem`)},{ref_for:!0},_.ptm(`chipItem`)),[m(C,{class:l(_.cx(`pcChip`)),label:e.label,unstyled:_.unstyled,pt:_.ptm(`pcChip`)},null,8,[`class`,`label`,`unstyled`,`pt`])],16)}),128)),S.emptyValue?(t(),c(f,{key:0},[o(n(_.placeholder||`empty`),1)],64)):s(``,!0)],64))],64)):s(``,!0)]})],16)],16),S.isClearIconVisible?e(_.$slots,`clearicon`,{key:0,class:l(_.cx(`clearIcon`)),clearCallback:S.onClearClick},function(){return[(t(),p(i(_.clearIcon?`i`:`TimesIcon`),u({ref:`clearIcon`,class:[_.cx(`clearIcon`),_.clearIcon],onClick:S.onClearClick},_.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):s(``,!0),d(`div`,u({class:_.cx(`dropdown`),role:`button`,"aria-haspopup":`tree`,"aria-expanded":x.overlayVisible},_.ptm(`dropdown`)),[e(_.$slots,_.$slots.dropdownicon?`dropdownicon`:`triggericon`,{class:l(_.cx(`dropdownIcon`))},function(){return[(t(),p(i(`ChevronDownIcon`),u({class:_.cx(`dropdownIcon`)},_.ptm(`dropdownIcon`)),null,16,[`class`]))]})],16,pe),m(T,{appendTo:_.appendTo},{default:r(function(){return[m(te,u({name:`p-anchored-overlay`,onEnter:S.onOverlayEnter,onAfterEnter:S.onOverlayAfterEnter,onLeave:S.onOverlayLeave,onAfterLeave:S.onOverlayAfterLeave},_.ptm(`transition`)),{default:r(function(){return[x.overlayVisible?(t(),c(`div`,u({key:0,ref:S.overlayRef,onClick:v[9]||=function(){return S.onOverlayClick&&S.onOverlayClick.apply(S,arguments)},class:[_.cx(`panel`),_.panelClass],onKeydown:v[10]||=function(){return S.onOverlayKeydown&&S.onOverlayKeydown.apply(S,arguments)}},Q(Q({},_.panelProps),_.ptm(`panel`))),[d(`span`,u({ref:`firstHiddenFocusableElementOnOverlay`,role:`presentation`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:v[3]||=function(){return S.onFirstHiddenFocus&&S.onFirstHiddenFocus.apply(S,arguments)}},_.ptm(`hiddenFirstFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),e(_.$slots,`header`,{value:_.d_value,options:_.options}),d(`div`,u({class:_.cx(`treeContainer`),style:{"max-height":_.scrollHeight}},_.ptm(`treeContainer`)),[_.options&&_.options.length>0?(t(),p(w,{key:0,ref:`tree`,id:S.listId,value:_.options,selectionMode:_.selectionMode,loading:_.loading,loadingIcon:_.loadingIcon,loadingMode:_.loadingMode,filter:_.filter,filterBy:_.filterBy,filterMode:_.filterMode,filterPlaceholder:_.filterPlaceholder,filterLocale:_.filterLocale,"onUpdate:selectionKeys":S.onSelectionChange,selectionKeys:_.d_value,expandedKeys:x.d_expandedKeys,"onUpdate:expandedKeys":S.onNodeToggle,metaKeySelection:_.metaKeySelection,onNodeExpand:v[4]||=function(e){return _.$emit(`node-expand`,e)},onNodeCollapse:v[5]||=function(e){return _.$emit(`node-collapse`,e)},onNodeSelect:S.onNodeSelect,onNodeUnselect:S.onNodeUnselect,onFilter:v[6]||=function(e){return _.$emit(`filter`,e)},onClick:v[7]||=g(function(){},[`stop`]),level:0,unstyled:_.unstyled,pt:_.ptm(`pcTree`)},ee({_:2},[_.$slots.option?{name:`default`,fn:r(function(t){return[e(_.$slots,`option`,{node:t.node,expanded:t.expanded,selected:t.selected})]}),key:`0`}:void 0,_.$slots.itemtoggleicon?{name:`toggleicon`,fn:r(function(t){return[e(_.$slots,`itemtoggleicon`,{node:t.node,expanded:t.expanded,class:l(t.class)})]}),key:`1`}:_.$slots.itemtogglericon?{name:`togglericon`,fn:r(function(t){return[e(_.$slots,`itemtogglericon`,{node:t.node,expanded:t.expanded,class:l(t.class)})]}),key:`2`}:void 0,_.$slots.itemcheckboxicon?{name:`checkboxicon`,fn:r(function(t){return[e(_.$slots,`itemcheckboxicon`,{checked:t.checked,partialChecked:t.partialChecked,class:l(t.class)})]}),key:`3`}:void 0]),1032,[`id`,`value`,`selectionMode`,`loading`,`loadingIcon`,`loadingMode`,`filter`,`filterBy`,`filterMode`,`filterPlaceholder`,`filterLocale`,`onUpdate:selectionKeys`,`selectionKeys`,`expandedKeys`,`onUpdate:expandedKeys`,`metaKeySelection`,`onNodeSelect`,`onNodeUnselect`,`unstyled`,`pt`])):s(``,!0),S.emptyOptions&&!_.loading?(t(),c(`div`,u({key:1,class:_.cx(`emptyMessage`)},_.ptm(`emptyMessage`)),[e(_.$slots,`empty`,{},function(){return[o(n(S.emptyMessageText),1)]})],16)):s(``,!0)],16),e(_.$slots,`footer`,{value:_.d_value,options:_.options}),d(`span`,u({ref:`lastHiddenFocusableElementOnOverlay`,role:`presentation`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:v[8]||=function(){return S.onLastHiddenFocus&&S.onLastHiddenFocus.apply(S,arguments)}},_.ptm(`hiddenLastFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16)):s(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16)}Y.render=me;export{Y as default};