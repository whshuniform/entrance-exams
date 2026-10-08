import{$ as e,B as t,H as n,L as r,Pt as i,Q as a,U as o,V as s,_ as c,d as l,f as u,jt as d,k as f,l as p,r as ee,u as m,v as h,z as te}from"./B5nbzVpw.js";import{t as g}from"./BVdjFhz-.js";import{B as _,D as v,Et as y,F as b,Q as x,bt as S,ct as C,et as ne,l as w,m as T,mt as E,st as D,t as O,wt as k,xt as A}from"./B0gwFOOa.js";import{t as j}from"./cO8iUN-n.js";import{t as re}from"./B3htCpnR.js";import{t as ie}from"./DpUg2VCR.js";import{t as M}from"./my3qd5SA.js";import{t as N}from"./mVSrxWMo.js";import{t as P}from"./Ba-1D0TF.js";import{t as F}from"./TIYBATRn.js";import{t as I}from"./F7EYAUwf.js";import{t as L}from"./D7RhKSRs.js";import{t as R}from"./DLLG_Ueq.js";import{t as z}from"./Iw-qHQyv.js";var B=O.extend({name:`cascadeselect`,style:`
    .p-cascadeselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('cascadeselect.background');
        border: 1px solid dt('cascadeselect.border.color');
        transition:
            background dt('cascadeselect.transition.duration'),
            color dt('cascadeselect.transition.duration'),
            border-color dt('cascadeselect.transition.duration'),
            outline-color dt('cascadeselect.transition.duration'),
            box-shadow dt('cascadeselect.transition.duration');
        border-radius: dt('cascadeselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('cascadeselect.shadow');
    }

    .p-cascadeselect:not(.p-disabled):hover {
        border-color: dt('cascadeselect.hover.border.color');
    }

    .p-cascadeselect:not(.p-disabled).p-focus {
        border-color: dt('cascadeselect.focus.border.color');
        box-shadow: dt('cascadeselect.focus.ring.shadow');
        outline: dt('cascadeselect.focus.ring.width') dt('cascadeselect.focus.ring.style') dt('cascadeselect.focus.ring.color');
        outline-offset: dt('cascadeselect.focus.ring.offset');
    }

    .p-cascadeselect.p-variant-filled {
        background: dt('cascadeselect.filled.background');
    }

    .p-cascadeselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('cascadeselect.filled.hover.background');
    }

    .p-cascadeselect.p-variant-filled.p-focus {
        background: dt('cascadeselect.filled.focus.background');
    }

    .p-cascadeselect.p-invalid {
        border-color: dt('cascadeselect.invalid.border.color');
    }

    .p-cascadeselect.p-disabled {
        opacity: 1;
        background: dt('cascadeselect.disabled.background');
    }

    .p-cascadeselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('cascadeselect.dropdown.color');
        width: dt('cascadeselect.dropdown.width');
        border-start-end-radius: dt('border.radius.md');
        border-end-end-radius: dt('border.radius.md');
    }

    .p-cascadeselect-clear-icon {
        align-self: center;
        color: dt('cascadeselect.clear.icon.color');
        inset-inline-end: dt('cascadeselect.dropdown.width');
    }

    .p-cascadeselect-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        text-overflow: ellipsis;
        cursor: pointer;
        padding: dt('cascadeselect.padding.y') dt('cascadeselect.padding.x');
        background: transparent;
        border: 0 none;
        outline: 0 none;
    }

    .p-cascadeselect-label.p-placeholder {
        color: dt('cascadeselect.placeholder.color');
    }

    .p-cascadeselect.p-invalid .p-cascadeselect-label.p-placeholder {
        color: dt('cascadeselect.invalid.placeholder.color');
    }

    .p-cascadeselect.p-disabled .p-cascadeselect-label {
        color: dt('cascadeselect.disabled.color');
    }

    .p-cascadeselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-cascadeselect-overlay {
        background: dt('cascadeselect.overlay.background');
        color: dt('cascadeselect.overlay.color');
        border: 1px solid dt('cascadeselect.overlay.border.color');
        border-radius: dt('cascadeselect.overlay.border.radius');
        box-shadow: dt('cascadeselect.overlay.shadow');
    }

    .p-cascadeselect .p-cascadeselect-overlay {
        min-width: 100%;
    }

    .p-cascadeselect-option-list {
        display: none;
        min-width: 100%;
        position: absolute;
        z-index: 1;
    }

    .p-cascadeselect-list {
        min-width: 100%;
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('cascadeselect.list.padding');
        display: flex;
        flex-direction: column;
        gap: dt('cascadeselect.list.gap');
    }

    .p-cascadeselect-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        border: 0 none;
        color: dt('cascadeselect.option.color');
        background: transparent;
        border-radius: dt('cascadeselect.option.border.radius');
    }

    .p-cascadeselect-option-active {
        overflow: visible;
    }

    .p-cascadeselect-option-active > .p-cascadeselect-option-content {
        background: dt('cascadeselect.option.focus.background');
        color: dt('cascadeselect.option.focus.color');
    }

    .p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus > .p-cascadeselect-option-content {
        background: dt('cascadeselect.option.focus.background');
        color: dt('cascadeselect.option.focus.color');
    }

    .p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled):hover > .p-cascadeselect-option-content {
        background: dt('cascadeselect.option.focus.background');
        color: dt('cascadeselect.option.focus.color');
    }

    .p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled).p-focus > .p-cascadeselect-option-content > .p-cascadeselect-group-icon-container > .p-cascadeselect-group-icon {
        color: dt('cascadeselect.option.icon.focus.color');
    }

    .p-cascadeselect-option:not(.p-cascadeselect-option-selected):not(.p-disabled):hover > .p-cascadeselect-option-content > .p-cascadeselect-group-icon-container > .p-cascadeselect-group-icon {
        color: dt('cascadeselect.option.icon.focus.color');
    }

    .p-cascadeselect-option-selected > .p-cascadeselect-option-content {
        background: dt('cascadeselect.option.selected.background');
        color: dt('cascadeselect.option.selected.color');
    }

    .p-cascadeselect-option-selected.p-focus > .p-cascadeselect-option-content {
        background: dt('cascadeselect.option.selected.focus.background');
        color: dt('cascadeselect.option.selected.focus.color');
    }

    .p-cascadeselect-option-active > .p-cascadeselect-option-list {
        inset-inline-start: 100%;
        inset-block-start: 0;
    }

    .p-cascadeselect-option-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        padding: dt('cascadeselect.option.padding');
        border-radius: dt('cascadeselect.option.border.radius');
        transition:
            background dt('cascadeselect.transition.duration'),
            color dt('cascadeselect.transition.duration'),
            border-color dt('cascadeselect.transition.duration'),
            box-shadow dt('cascadeselect.transition.duration'),
            outline-color dt('cascadeselect.transition.duration');
    }

    .p-cascadeselect-group-icon {
        font-size: dt('cascadeselect.option.icon.size');
        width: dt('cascadeselect.option.icon.size');
        height: dt('cascadeselect.option.icon.size');
        color: dt('cascadeselect.option.icon.color');
    }

    .p-cascadeselect-group-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-cascadeselect-mobile-active .p-cascadeselect-option-list {
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('tieredmenu.submenu.mobile.indent');
        padding-inline-end: 0;
    }

    .p-cascadeselect-mobile-active .p-cascadeselect-group-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-cascadeselect-mobile-active .p-cascadeselect-option-active > .p-cascadeselect-option-content .p-cascadeselect-group-icon {
        transform: rotate(-90deg);
    }

    .p-cascadeselect-sm .p-cascadeselect-label {
        font-size: dt('cascadeselect.sm.font.size');
        padding-block: dt('cascadeselect.sm.padding.y');
        padding-inline: dt('cascadeselect.sm.padding.x');
    }

    .p-cascadeselect-sm .p-cascadeselect-dropdown .p-icon {
        font-size: dt('cascadeselect.sm.font.size');
        width: dt('cascadeselect.sm.font.size');
        height: dt('cascadeselect.sm.font.size');
    }

    .p-cascadeselect-lg .p-cascadeselect-label {
        font-size: dt('cascadeselect.lg.font.size');
        padding-block: dt('cascadeselect.lg.padding.y');
        padding-inline: dt('cascadeselect.lg.padding.x');
    }

    .p-cascadeselect-lg .p-cascadeselect-dropdown .p-icon {
        font-size: dt('cascadeselect.lg.font.size');
        width: dt('cascadeselect.lg.font.size');
        height: dt('cascadeselect.lg.font.size');
    }

    .p-cascadeselect-fluid {
        display: flex;
    }

    .p-cascadeselect-fluid .p-cascadeselect-label {
        width: 1%;
    }

    .p-cascadeselect-fluid .p-cascadeselect-overlay .p-cascadeselect-overlay {
         min-width: 12.5rem;
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-cascadeselect p-component p-inputwrapper`,{"p-cascadeselect-mobile":t.queryMatches,"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-focus":t.focused,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":t.focused||t.overlayVisible,"p-cascadeselect-open":t.overlayVisible,"p-cascadeselect-fluid":t.$fluid,"p-cascadeselect-sm p-inputfield-sm":n.size===`small`,"p-cascadeselect-lg p-inputfield-lg":n.size===`large`}]},label:function(e){var t=e.instance,n=e.props;return[`p-cascadeselect-label`,{"p-placeholder":t.label===n.placeholder,"p-cascadeselect-label-empty":!t.$slots.value&&(t.label===`p-emptylabel`||t.label?.length===0)}]},clearIcon:`p-cascadeselect-clear-icon`,dropdown:`p-cascadeselect-dropdown`,loadingIcon:`p-cascadeselect-loading-icon`,dropdownIcon:`p-cascadeselect-dropdown-icon`,overlay:function(e){return[`p-cascadeselect-overlay p-component`,{"p-cascadeselect-mobile-active":e.instance.queryMatches}]},listContainer:`p-cascadeselect-list-container`,list:`p-cascadeselect-list`,option:function(e){var t=e.instance,n=e.processedOption;return[`p-cascadeselect-option`,{"p-cascadeselect-option-active":t.isOptionActive(n),"p-cascadeselect-option-selected":t.isOptionSelected(n),"p-focus":t.isOptionFocused(n),"p-disabled":t.isOptionDisabled(n)}]},optionContent:`p-cascadeselect-option-content`,optionText:`p-cascadeselect-option-text`,groupIconContainer:`p-cascadeselect-group-icon-container`,groupIcon:`p-cascadeselect-group-icon`,optionList:`p-cascadeselect-overlay p-cascadeselect-option-list`},inlineStyles:{root:function(e){return{position:e.props.appendTo===`self`?`relative`:void 0}}}}),V={name:`BaseCascadeSelect`,extends:P,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,placeholder:String,breakpoint:{type:String,default:`960px`},dataKey:null,showClear:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},panelClass:{type:[String,Object],default:null},panelStyle:{type:Object,default:null},panelProps:{type:null,default:null},overlayClass:{type:[String,Object],default:null},overlayStyle:{type:Object,default:null},overlayProps:{type:null,default:null},appendTo:{type:[String,Object],default:`body`},loading:{type:Boolean,default:!1},dropdownIcon:{type:String,default:void 0},loadingIcon:{type:String,default:void 0},optionGroupIcon:{type:String,default:void 0},autoOptionFocus:{type:Boolean,default:!1},selectOnFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},searchLocale:{type:String,default:void 0},searchMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptySearchMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:B,provide:function(){return{$pcCascadeSelect:this,$parentInstance:this}}},H={name:`CascadeSelectSub`,hostName:`CascadeSelect`,extends:re,emits:[`option-change`,`option-focus-change`,`option-focus-enter-change`],container:null,props:{selectId:String,focusedOptionId:String,options:Array,optionLabel:String|Function,optionValue:String,optionDisabled:null,optionGroupIcon:String,optionGroupLabel:String,optionGroupChildren:{type:[String,Array],default:null},activeOptionPath:Array,level:Number,templates:null,value:null},methods:{getOptionId:function(e){return`${this.selectId}_${e.key}`},getOptionLabel:function(e){return this.optionLabel?k(e.option,this.optionLabel):e.option},getOptionValue:function(e){return this.optionValue?k(e.option,this.optionValue):e.option},getPTOptions:function(e,t,n){return this.ptm(n,{context:{option:e,index:t,level:this.level,optionGroup:this.isOptionGroup(e),active:this.isOptionActive(e),focused:this.isOptionFocused(e),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.optionDisabled?k(e.option,this.optionDisabled):!1},getOptionGroupLabel:function(e){return this.optionGroupLabel?k(e.option,this.optionGroupLabel):null},getOptionGroupChildren:function(e){return e.children},isOptionGroup:function(e){return y(e.children)},isOptionSelected:function(e){return S(this.value,e?.option)},isOptionActive:function(e){return this.activeOptionPath&&this.activeOptionPath.some(function(t){return t.key===e.key})},isOptionFocused:function(e){return this.focusedOptionId===this.getOptionId(e)},getOptionLabelToRender:function(e){return this.isOptionGroup(e)?this.getOptionGroupLabel(e):this.getOptionLabel(e)},onOptionClick:function(e,t){this.$emit(`option-change`,{originalEvent:e,processedOption:t,isFocus:!0})},onOptionMouseEnter:function(e,t){this.$emit(`option-focus-enter-change`,{originalEvent:e,processedOption:t})},onOptionMouseMove:function(e,t){this.$emit(`option-focus-change`,{originalEvent:e,processedOption:t})},containerRef:function(e){this.container=e},listAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.listLabel:void 0}},directives:{ripple:M},components:{AngleRightIcon:z}},U=[`id`,`aria-label`,`aria-selected`,`aria-expanded`,`aria-level`,`aria-setsize`,`aria-posinset`,`data-p-option-group`,`data-p-active`,`data-p-focus`,`data-p-disabled`],W=[`onClick`,`onMouseenter`,`onMousemove`];function G(t,a,c,p,h,g){var _=s(`AngleRightIcon`),v=s(`CascadeSelectSub`,!0),y=n(`ripple`);return r(),u(`ul`,f({ref:g.containerRef,class:t.cx(`list`)},c.level===0?t.ptm(`list`):t.ptm(`optionList`)),[(r(!0),u(ee,null,te(c.options,function(n,s){return r(),u(`li`,f({key:g.getOptionLabelToRender(n),id:g.getOptionId(n),class:t.cx(`option`,{processedOption:n}),role:`treeitem`,"aria-label":g.getOptionLabelToRender(n),"aria-selected":g.isOptionGroup(n)?void 0:g.isOptionSelected(n),"aria-expanded":g.isOptionGroup(n)?g.isOptionActive(n):void 0,"aria-level":c.level+1,"aria-setsize":c.options.length,"aria-posinset":s+1},{ref_for:!0},g.getPTOptions(n,s,`option`),{"data-p-option-group":g.isOptionGroup(n),"data-p-active":g.isOptionActive(n),"data-p-focus":g.isOptionFocused(n),"data-p-disabled":g.isOptionDisabled(n)}),[e((r(),u(`div`,f({class:t.cx(`optionContent`),onClick:function(e){return g.onOptionClick(e,n)},onMouseenter:function(e){return g.onOptionMouseEnter(e,n)},onMousemove:function(e){return g.onOptionMouseMove(e,n)}},{ref_for:!0},g.getPTOptions(n,s,`optionContent`)),[c.templates.option?(r(),m(o(c.templates.option),{key:0,option:n.option,selected:!g.isOptionGroup(n)&&g.isOptionSelected(n)},null,8,[`option`,`selected`])):(r(),u(`span`,f({key:1,class:t.cx(`optionText`)},{ref_for:!0},g.getPTOptions(n,s,`optionText`)),i(g.getOptionLabelToRender(n)),17)),g.isOptionGroup(n)?(r(),u(`span`,{key:2,class:d(t.cx(`groupIconContainer`))},[c.templates.optiongroupicon?(r(),m(o(c.templates.optiongroupicon),{key:0,class:d(t.cx(`groupIcon`))},null,8,[`class`])):c.optionGroupIcon?(r(),u(`span`,f({key:1,class:[t.cx(`groupIcon`),c.optionGroupIcon],"aria-hidden":`true`},{ref_for:!0},g.getPTOptions(n,s,`groupIcon`)),null,16)):(r(),m(_,f({key:2,class:t.cx(`groupIcon`),"aria-hidden":`true`},{ref_for:!0},g.getPTOptions(n,s,`groupIcon`)),null,16,[`class`]))],2)):l(``,!0)],16,W)),[[y]]),g.isOptionGroup(n)&&g.isOptionActive(n)?(r(),m(v,{key:0,role:`group`,class:d(t.cx(`optionList`)),selectId:c.selectId,focusedOptionId:c.focusedOptionId,options:g.getOptionGroupChildren(n),activeOptionPath:c.activeOptionPath,level:c.level+1,templates:c.templates,optionLabel:c.optionLabel,optionValue:c.optionValue,optionDisabled:c.optionDisabled,optionGroupIcon:c.optionGroupIcon,optionGroupLabel:c.optionGroupLabel,optionGroupChildren:c.optionGroupChildren,value:c.value,onOptionChange:a[0]||=function(e){return t.$emit(`option-change`,e)},onOptionFocusChange:a[1]||=function(e){return t.$emit(`option-focus-change`,e)},onOptionFocusEnterChange:a[2]||=function(e){return t.$emit(`option-focus-enter-change`,e)},pt:t.pt,unstyled:t.unstyled},null,8,[`class`,`selectId`,`focusedOptionId`,`options`,`activeOptionPath`,`level`,`templates`,`optionLabel`,`optionValue`,`optionDisabled`,`optionGroupIcon`,`optionGroupLabel`,`optionGroupChildren`,`value`,`pt`,`unstyled`])):l(``,!0)],16,U)}),128))],16)}H.render=G;function K(e){"@babel/helpers - typeof";return K=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},K(e)}function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?q(Object(n),!0).forEach(function(t){ae(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ae(e,t,n){return(t=oe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oe(e){var t=se(e,`string`);return K(t)==`symbol`?t:t+``}function se(e,t){if(K(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(K(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Y={name:`CascadeSelect`,extends:V,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`click`,`group-change`,`before-show`,`before-hide`,`hide`,`show`],outsideClickListener:null,matchMediaListener:null,scrollHandler:null,resizeListener:null,overlay:null,searchTimeout:null,searchValue:null,data:function(){return{clicked:!1,focused:!1,focusedOptionInfo:{index:-1,level:0,parentKey:``},activeOptionPath:[],overlayVisible:!1,dirty:!1,mobileActive:!1,query:null,queryMatches:!1}},watch:{options:function(){this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel(),this.bindMatchMediaListener()},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(j.clear(this.overlay),null),this.mobileActive&&=!1},methods:{getOptionLabel:function(e){return this.optionLabel?k(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?k(e,this.optionValue):e},isOptionDisabled:function(e){return this.optionDisabled?k(e,this.optionDisabled):!1},getOptionGroupLabel:function(e){return this.optionGroupLabel?k(e,this.optionGroupLabel):null},getOptionGroupChildren:function(e,t){return E(this.optionGroupChildren)?k(e,this.optionGroupChildren):k(e,this.optionGroupChildren[t])},isOptionGroup:function(e,t){return Object.prototype.hasOwnProperty.call(e,this.optionGroupChildren[t])},getProccessedOptionLabel:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return this.isProccessedOptionGroup(e)?this.getOptionGroupLabel(e.option,e.level):this.getOptionLabel(e.option)},isProccessedOptionGroup:function(e){return y(e?.children)},show:function(e){if(this.$emit(`before-show`),this.overlayVisible=!0,this.activeOptionPath=this.$filled?this.findOptionPathByValue(this.d_value):this.activeOptionPath,this.$filled&&y(this.activeOptionPath)){var t=this.activeOptionPath[this.activeOptionPath.length-1];this.focusedOptionInfo={index:t.index,level:t.level,parentKey:t.parentKey}}else this.focusedOptionInfo={index:this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.findSelectedOptionIndex(),level:0,parentKey:``};e&&_(this.$refs.focusInput)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.overlayVisible=!1,t.clicked=!1,t.activeOptionPath=[],t.focusedOptionInfo={index:-1,level:0,parentKey:``},e&&_(t.$refs.focusInput)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(this.focused=!0,this.$emit(`focus`,e))},onBlur:function(e){var t,n;this.focused=!1,this.focusedOptionInfo={index:-1,level:0,parentKey:``},this.searchValue=``,this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n)},onKeyDown:function(e){if(this.disabled||this.loading){e.preventDefault();return}var t=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`ArrowRight`:this.onArrowRightKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`PageDown`:case`PageUp`:case`Backspace`:case`ShiftLeft`:case`ShiftRight`:break;default:!t&&D(e.key)&&(!this.overlayVisible&&this.show(),this.searchOptions(e,e.key))}this.clicked=!1},onOptionChange:function(e){var t=e.processedOption,n=e.type;if(!A(t)){var r=t.index,i=t.key,a=t.level,o=t.parentKey,s=t.children,c=y(s),l=this.activeOptionPath?this.activeOptionPath.filter(function(e){return e.parentKey!==o&&e.parentKey!==i}):[];this.focusedOptionInfo={index:r,level:a,parentKey:o},!(n==`hover`&&this.queryMatches)&&(c&&l.push(t),this.activeOptionPath=l)}},onOptionClick:function(e){var t=e.originalEvent,n=e.processedOption,r=e.isFocus,i=e.isHide,a=e.preventSelection,o=n.index,s=n.key,c=n.level,l=n.parentKey,u=this.isProccessedOptionGroup(n);if(this.isSelected(n))this.activeOptionPath=this.activeOptionPath.filter(function(e){return s!==e.key&&s.startsWith(e.key)}),this.focusedOptionInfo={index:o,level:c,parentKey:l};else if(u)this.onOptionChange(e),this.onOptionGroupSelect(t,n);else{var d=this.activeOptionPath.filter(function(e){return e.parentKey!==l});d.push(n),this.focusedOptionInfo={index:o,level:c,parentKey:l},(!a||n?.children.length!==0)&&(this.activeOptionPath=d,this.onOptionSelect(t,n,i))}r&&_(this.$refs.focusInput)},onOptionMouseEnter:function(e){this.focusOnHover&&(e.processedOption.level===0&&(this.dirty=!0),this.dirty||!this.dirty&&y(this.d_value)?this.onOptionChange(J(J({},e),{},{type:`hover`})):!this.dirty&&e.processedOption.level===0&&this.onOptionClick(J(J({},e),{},{type:`hover`})))},onOptionMouseMove:function(e){this.focused&&this.focusOnHover&&this.changeFocusedOptionIndex(e,e.processedOption.index)},onOptionSelect:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,r=this.getOptionValue(t?.option);this.activeOptionPath.forEach(function(e){return e.selected=!0}),this.updateModel(e,r),n&&this.hide(!0)},onOptionGroupSelect:function(e,t){this.dirty=!0,this.$emit(`group-change`,{originalEvent:e,value:t.option})},onContainerClick:function(e){this.disabled||this.loading||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||((!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide():this.show(),_(this.$refs.focusInput)),this.clicked=!0,this.$emit(`click`,e))},onClearClick:function(e){this.updateModel(e,null)},onOverlayClick:function(e){L.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){e.code===`Escape`&&this.onEscapeKey(e)},onArrowDownKey:function(e){if(!this.overlayVisible)this.show();else{var t=this.focusedOptionInfo.index===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionInfo.index);this.changeFocusedOptionIndex(e,t,!0)}e.preventDefault()},onArrowUpKey:function(e){if(e.altKey){if(this.focusedOptionInfo.index!==-1){var t=this.visibleOptions[this.focusedOptionInfo.index];!this.isProccessedOptionGroup(t)&&this.onOptionChange({originalEvent:e,processedOption:t})}this.overlayVisible&&this.hide(),e.preventDefault()}else{var n=this.focusedOptionInfo.index===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionInfo.index);this.changeFocusedOptionIndex(e,n,!0),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey:function(e){var t=this;if(this.overlayVisible){var n=this.visibleOptions[this.focusedOptionInfo.index],r=this.activeOptionPath.find(function(e){return e.key===n?.parentKey}),i=this.focusedOptionInfo.parentKey===``||r&&r.key===this.focusedOptionInfo.parentKey,a=A(n?.parent);i&&(this.activeOptionPath=this.activeOptionPath.filter(function(e){return e.parentKey!==t.focusedOptionInfo.parentKey})),a||(this.focusedOptionInfo={index:-1,parentKey:r?r.parentKey:``},this.searchValue=``,this.onArrowDownKey(e)),e.preventDefault()}},onArrowRightKey:function(e){if(this.overlayVisible){var t=this.visibleOptions[this.focusedOptionInfo.index];this.isProccessedOptionGroup(t)&&(this.activeOptionPath.some(function(e){return t?.key===e.key})?(this.focusedOptionInfo={index:-1,parentKey:t?.key},this.searchValue=``,this.onArrowDownKey(e)):this.onOptionChange({originalEvent:e,processedOption:t})),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show(),e.preventDefault()},onEndKey:function(e){this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show(),e.preventDefault()},onEnterKey:function(e){if(!this.overlayVisible)this.focusedOptionInfo.index,this.onArrowDownKey(e);else if(this.focusedOptionInfo.index!==-1){var t=this.visibleOptions[this.focusedOptionInfo.index],n=this.isProccessedOptionGroup(t);this.onOptionClick({originalEvent:e,processedOption:t,preventSelection:!1}),!n&&this.hide()}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){this.overlayVisible&&this.hide(!0),e.preventDefault()},onTabKey:function(e){if(this.focusedOptionInfo.index!==-1){var t=this.visibleOptions[this.focusedOptionInfo.index];!this.isProccessedOptionGroup(t)&&this.onOptionChange({originalEvent:e,processedOption:t})}this.overlayVisible&&this.hide()},onOverlayEnter:function(e){j.set(`overlay`,e,this.$primevue.config.zIndex.overlay),v(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.scrollInView(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(e){e.style.pointerEvents=`none`,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit(`hide`),this.overlay=null,this.dirty=!1},onOverlayAfterLeave:function(e){j.clear(e)},alignOverlay:function(){this.appendTo===`self`?T(this.overlay,this.$el):(this.overlay.style.minWidth=x(this.$el)+`px`,w(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&e.overlay&&!e.$el.contains(t.target)&&!e.overlay.contains(t.target)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new I(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!b()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia(`(max-width: ${this.breakpoint})`);this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener(`change`,this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&=(this.query.removeEventListener(`change`,this.matchMediaListener),null)},isOptionMatched:function(e){return this.isValidOption(e)&&this.getProccessedOptionLabel(e)?.toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale))},isValidOption:function(e){return y(e)&&!this.isOptionDisabled(e.option)},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isSelected:function(e){return this.activeOptionPath&&this.activeOptionPath.some(function(t){return t.key===e.key})},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return C(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?C(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)})},findFirstFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},findOptionPathByValue:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0;if(t||=n===0&&this.processedOptions,!t)return null;if(A(e))return[];for(var r=0;r<t.length;r++){var i=t[r];if(S(e,this.getOptionValue(i.option),this.equalityKey))return[i];var a=this.findOptionPathByValue(e,i.children,n+1);if(a)return a.unshift(i),a}},searchOptions:function(e,t){var n=this;this.searchValue=(this.searchValue||``)+t;var r=-1,i=!1;return y(this.searchValue)&&(this.focusedOptionInfo.index===-1?r=this.visibleOptions.findIndex(function(e){return n.isOptionMatched(e)}):(r=this.visibleOptions.slice(this.focusedOptionInfo.index).findIndex(function(e){return n.isOptionMatched(e)}),r=r===-1?this.visibleOptions.slice(0,this.focusedOptionInfo.index).findIndex(function(e){return n.isOptionMatched(e)}):r+this.focusedOptionInfo.index),r!==-1&&(i=!0),r===-1&&this.focusedOptionInfo.index===-1&&(r=this.findFirstFocusedOptionIndex()),r!==-1&&this.changeFocusedOptionIndex(e,r)),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){n.searchValue=``,n.searchTimeout=null},500),i},changeFocusedOptionIndex:function(e,t,n){this.focusedOptionInfo.index!==t&&(this.focusedOptionInfo.index=t,this.scrollInView(),this.focusOnHover&&this.onOptionClick({originalEvent:e,processedOption:this.visibleOptions[t],isHide:!1,preventSelection:n}),this.selectOnFocus&&this.onOptionChange({originalEvent:e,processedOption:this.visibleOptions[t],isHide:!1}))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=ne(e.list,`li[id="${n}"]`);r&&r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`start`})})},autoUpdateModel:function(){this.selectOnFocus&&this.autoOptionFocus&&!this.$filled&&(this.focusedOptionInfo.index=this.findFirstFocusedOptionIndex(),this.onOptionChange({processedOption:this.visibleOptions[this.focusedOptionInfo.index],isHide:!1}),!this.overlayVisible&&(this.focusedOptionInfo={index:-1,level:0,parentKey:``}))},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},createProcessedOptions:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:``,a=[];return e&&e.forEach(function(e,o){var s=(i===``?``:i+`_`)+o,c={option:e,index:o,level:n,key:s,parent:r,parentKey:i};c.children=t.createProcessedOptions(t.getOptionGroupChildren(e,n),n+1,c,s),a.push(c)}),a},overlayRef:function(e){this.overlay=e}},computed:{hasSelectedOption:function(){return this.$filled},label:function(){var e=this.placeholder||`p-emptylabel`;if(this.$filled){var t=this.findOptionPathByValue(this.d_value),n=y(t)?t[t.length-1]:null;return n?this.getOptionLabel(n.option):e}return e},processedOptions:function(){return this.createProcessedOptions(this.options||[])},visibleOptions:function(){var e=this,t=this.activeOptionPath&&this.activeOptionPath.find(function(t){return t.key===e.focusedOptionInfo.parentKey});return t?t.children:this.processedOptions},equalityKey:function(){return this.optionValue?null:this.dataKey},searchResultMessageText:function(){return y(this.visibleOptions)?this.searchMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptySearchMessageText},searchMessageText:function(){return this.searchMessage||this.$primevue.config.locale.searchMessage||``},emptySearchMessageText:function(){return this.emptySearchMessage||this.$primevue.config.locale.emptySearchMessage||``},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,`1`):this.emptySelectionMessageText},focusedOptionId:function(){return this.focusedOptionInfo.index===-1?null:`${this.$id}${y(this.focusedOptionInfo.parentKey)?`_`+this.focusedOptionInfo.parentKey:``}_${this.focusedOptionInfo.index}`},isClearIconVisible:function(){return this.showClear&&this.d_value!=null&&y(this.options)&&!this.disabled&&!this.loading}},components:{CascadeSelectSub:H,Portal:R,ChevronDownIcon:F,SpinnerIcon:ie,AngleRightIcon:z,TimesIcon:N}};function X(e){"@babel/helpers - typeof";return X=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},X(e)}function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Z(Object(n),!0).forEach(function(t){ce(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ce(e,t,n){return(t=le(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function le(e){var t=$(e,`string`);return X(t)==`symbol`?t:t+``}function $(e,t){if(X(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(X(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var ue=[`id`,`disabled`,`placeholder`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`];function de(e,n,ee,te,_,v){var y=s(`SpinnerIcon`),b=s(`CascadeSelectSub`),x=s(`Portal`);return r(),u(`div`,f({ref:`container`,class:e.cx(`root`),style:e.sx(`root`),onClick:n[5]||=function(e){return v.onContainerClick(e)}},e.ptmi(`root`)),[p(`div`,f({class:`p-hidden-accessible`},e.ptm(`hiddenInputContainer`),{"data-p-hidden-accessible":!0}),[p(`input`,f({ref:`focusInput`,id:e.inputId,type:`text`,class:e.inputClass,style:e.inputStyle,readonly:``,disabled:e.disabled,placeholder:e.placeholder,tabindex:e.disabled?-1:e.tabindex,role:`combobox`,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"aria-haspopup":`tree`,"aria-expanded":_.overlayVisible,"aria-controls":_.overlayVisible?e.$id+`_tree`:void 0,"aria-activedescendant":_.focused?v.focusedOptionId:void 0,"aria-invalid":e.invalid||void 0,onFocus:n[0]||=function(){return v.onFocus&&v.onFocus.apply(v,arguments)},onBlur:n[1]||=function(){return v.onBlur&&v.onBlur.apply(v,arguments)},onKeydown:n[2]||=function(){return v.onKeyDown&&v.onKeyDown.apply(v,arguments)}},Q(Q({},e.inputProps),e.ptm(`hiddenInput`))),null,16,ue)],16),p(`span`,f({class:e.cx(`label`)},e.ptm(`label`)),[t(e.$slots,`value`,{value:e.d_value,placeholder:e.placeholder},function(){return[c(i(v.label),1)]})],16),v.isClearIconVisible?t(e.$slots,`clearicon`,{key:0,class:d(e.cx(`clearIcon`)),clearCallback:v.onClearClick},function(){return[(r(),m(o(e.clearIcon?`i`:`TimesIcon`),f({ref:`clearIcon`,class:[e.cx(`clearIcon`),e.clearIcon],onClick:v.onClearClick},e.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):l(``,!0),p(`div`,f({class:e.cx(`dropdown`),role:`button`,tabindex:`-1`},e.ptm(`dropdown`)),[e.loading?t(e.$slots,`loadingicon`,{key:0,class:d(e.cx(`loadingIcon`))},function(){return[e.loadingIcon?(r(),u(`span`,f({key:0,class:[e.cx(`loadingIcon`),`pi-spin`,e.loadingIcon],"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16)):(r(),m(y,f({key:1,class:e.cx(`loadingIcon`),spin:``,"aria-hidden":`true`},e.ptm(`loadingIcon`)),null,16,[`class`]))]}):t(e.$slots,`dropdownicon`,{key:1,class:d(e.cx(`dropdownIcon`))},function(){return[(r(),m(o(e.dropdownIcon?`span`:`ChevronDownIcon`),f({class:[e.cx(`dropdownIcon`),e.dropdownIcon],"aria-hidden":`true`},e.ptm(`dropdownIcon`)),null,16,[`class`]))]})],16),p(`span`,f({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenSearchResult`),{"data-p-hidden-accessible":!0}),i(v.searchResultMessageText),17),h(x,{appendTo:e.appendTo},{default:a(function(){return[h(g,f({name:`p-anchored-overlay`,onEnter:v.onOverlayEnter,onAfterEnter:v.onOverlayAfterEnter,onLeave:v.onOverlayLeave,onAfterLeave:v.onOverlayAfterLeave},e.ptm(`transition`)),{default:a(function(){return[_.overlayVisible?(r(),u(`div`,f({key:0,ref:v.overlayRef,class:[e.cx(`overlay`),e.panelClass,e.overlayClass],style:[e.panelStyle,e.overlayStyle],onClick:n[3]||=function(){return v.onOverlayClick&&v.onOverlayClick.apply(v,arguments)},onKeydown:n[4]||=function(){return v.onOverlayKeyDown&&v.onOverlayKeyDown.apply(v,arguments)}},Q(Q(Q({},e.panelProps),e.overlayProps),e.ptm(`overlay`))),[t(e.$slots,`header`,{value:e.d_value,options:e.options}),p(`div`,f({class:e.cx(`listContainer`)},e.ptm(`listContainer`)),[h(b,{id:e.$id+`_tree`,role:`tree`,"aria-orientation":`horizontal`,selectId:e.$id,focusedOptionId:_.focused?v.focusedOptionId:void 0,options:v.processedOptions,activeOptionPath:_.activeOptionPath,level:0,templates:e.$slots,optionLabel:e.optionLabel,optionValue:e.optionValue,optionDisabled:e.optionDisabled,optionGroupIcon:e.optionGroupIcon,optionGroupLabel:e.optionGroupLabel,optionGroupChildren:e.optionGroupChildren,value:e.d_value,onOptionChange:v.onOptionClick,onOptionFocusChange:v.onOptionMouseMove,onOptionFocusEnterChange:v.onOptionMouseEnter,pt:e.pt,unstyled:e.unstyled},null,8,[`id`,`selectId`,`focusedOptionId`,`options`,`activeOptionPath`,`templates`,`optionLabel`,`optionValue`,`optionDisabled`,`optionGroupIcon`,`optionGroupLabel`,`optionGroupChildren`,`value`,`onOptionChange`,`onOptionFocusChange`,`onOptionFocusEnterChange`,`pt`,`unstyled`])],16),p(`span`,f({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},e.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),i(v.selectedMessageText),17),t(e.$slots,`footer`,{value:e.d_value,options:e.options})],16)):l(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16)}Y.render=de;export{Y as default};