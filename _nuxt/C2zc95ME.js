import{$ as e,B as t,H as n,L as r,Mt as i,Pt as a,Q as o,U as s,V as c,_ as l,d as u,f as d,h as f,jt as p,k as m,l as h,r as g,u as _,v,z as y}from"./B5nbzVpw.js";import{t as b}from"./CRHlWn3X.js";import{t as x}from"./cO8iUN-n.js";import{D as S,Dt as C,F as w,Ht as ee,J as T,Nt as E,Ot as D,S as O,U as k,_ as A,ct as j,gt as M,ht as N,jt as P,l as F,o as te,ot as ne,q as re,st as ie}from"#entry";import{t as ae}from"./5IcALbMc.js";import{t as oe}from"./CwpFL8Rb.js";import{t as se}from"./EzWEZ3N1.js";import{t as ce}from"./OE-u_iNP.js";import{n as le}from"./DFSLYGz1.js";import{t as ue}from"./Ue-aNOob.js";import{n as I}from"./BDtLy-rM.js";import{t as L}from"./Cdf8drnE.js";import{t as R}from"./CujpVRyB.js";import{t as z}from"./BvgpkLwO.js";import{t as B}from"./nFz5vn1U.js";import{n as V}from"./BLq2bW6t.js";import{t as H}from"./D-AhmneF.js";import{t as U}from"./BO1PX0sA.js";import{n as de}from"./BirmG6mR.js";import{n as fe}from"./DyCyKV5k.js";var pe=te.extend({name:`multiselect`,style:`
    .p-multiselect {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('multiselect.background');
        border: 1px solid dt('multiselect.border.color');
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration');
        border-radius: dt('multiselect.border.radius');
        outline-color: transparent;
        box-shadow: dt('multiselect.shadow');
    }

    .p-multiselect:not(.p-disabled):hover {
        border-color: dt('multiselect.hover.border.color');
    }

    .p-multiselect:not(.p-disabled).p-focus {
        border-color: dt('multiselect.focus.border.color');
        box-shadow: dt('multiselect.focus.ring.shadow');
        outline: dt('multiselect.focus.ring.width') dt('multiselect.focus.ring.style') dt('multiselect.focus.ring.color');
        outline-offset: dt('multiselect.focus.ring.offset');
    }

    .p-multiselect.p-variant-filled {
        background: dt('multiselect.filled.background');
    }

    .p-multiselect.p-variant-filled:not(.p-disabled):hover {
        background: dt('multiselect.filled.hover.background');
    }

    .p-multiselect.p-variant-filled.p-focus {
        background: dt('multiselect.filled.focus.background');
    }

    .p-multiselect.p-invalid {
        border-color: dt('multiselect.invalid.border.color');
    }

    .p-multiselect.p-disabled {
        opacity: 1;
        background: dt('multiselect.disabled.background');
    }

    .p-multiselect-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('multiselect.dropdown.color');
        width: dt('multiselect.dropdown.width');
        border-start-end-radius: dt('multiselect.border.radius');
        border-end-end-radius: dt('multiselect.border.radius');
    }

    .p-multiselect-clear-icon {
        align-self: center;
        color: dt('multiselect.clear.icon.color');
        inset-inline-end: dt('multiselect.dropdown.width');
    }

    .p-multiselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-multiselect-label {
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: dt('multiselect.padding.y') dt('multiselect.padding.x');
        color: dt('multiselect.color');
    }

    .p-multiselect-display-chip .p-multiselect-label {
        display: flex;
        align-items: center;
        gap: calc(dt('multiselect.padding.y') / 2);
    }

    .p-multiselect-label.p-placeholder {
        color: dt('multiselect.placeholder.color');
    }

    .p-multiselect.p-invalid .p-multiselect-label.p-placeholder {
        color: dt('multiselect.invalid.placeholder.color');
    }

    .p-multiselect.p-disabled .p-multiselect-label {
        color: dt('multiselect.disabled.color');
    }

    .p-multiselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-multiselect-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('multiselect.overlay.background');
        color: dt('multiselect.overlay.color');
        border: 1px solid dt('multiselect.overlay.border.color');
        border-radius: dt('multiselect.overlay.border.radius');
        box-shadow: dt('multiselect.overlay.shadow');
        min-width: 100%;
    }

    .p-multiselect-header {
        display: flex;
        align-items: center;
        padding: dt('multiselect.list.header.padding');
    }

    .p-multiselect-header .p-checkbox {
        margin-inline-end: dt('multiselect.option.gap');
    }

    .p-multiselect-filter-container {
        flex: 1 1 auto;
    }

    .p-multiselect-filter {
        width: 100%;
    }

    .p-multiselect-list-container {
        overflow: auto;
    }

    .p-multiselect-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('multiselect.list.padding');
        display: flex;
        flex-direction: column;
        gap: dt('multiselect.list.gap');
    }

    .p-multiselect-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: dt('multiselect.option.gap');
        padding: dt('multiselect.option.padding');
        border: 0 none;
        color: dt('multiselect.option.color');
        background: transparent;
        transition:
            background dt('multiselect.transition.duration'),
            color dt('multiselect.transition.duration'),
            border-color dt('multiselect.transition.duration'),
            box-shadow dt('multiselect.transition.duration'),
            outline-color dt('multiselect.transition.duration');
        border-radius: dt('multiselect.option.border.radius');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled):hover {
        background: dt('multiselect.option.focus.background');
        color: dt('multiselect.option.focus.color');
    }

    .p-multiselect-option.p-multiselect-option-selected {
        background: dt('multiselect.option.selected.background');
        color: dt('multiselect.option.selected.color');
    }

    .p-multiselect-option.p-multiselect-option-selected.p-focus {
        background: dt('multiselect.option.selected.focus.background');
        color: dt('multiselect.option.selected.focus.color');
    }

    .p-multiselect-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('multiselect.option.group.padding');
        background: dt('multiselect.option.group.background');
        color: dt('multiselect.option.group.color');
        font-weight: dt('multiselect.option.group.font.weight');
    }

    .p-multiselect-empty-message {
        padding: dt('multiselect.empty.message.padding');
    }

    .p-multiselect-label .p-chip {
        padding-block-start: calc(dt('multiselect.padding.y') / 2);
        padding-block-end: calc(dt('multiselect.padding.y') / 2);
        border-radius: dt('multiselect.chip.border.radius');
    }

    .p-multiselect-label:has(.p-chip) {
        padding: calc(dt('multiselect.padding.y') / 2) calc(dt('multiselect.padding.x') / 2);
    }

    .p-multiselect-fluid {
        display: flex;
        width: 100%;
    }

    .p-multiselect-sm .p-multiselect-label {
        font-size: dt('multiselect.sm.font.size');
        padding-block: dt('multiselect.sm.padding.y');
        padding-inline: dt('multiselect.sm.padding.x');
    }

    .p-multiselect-sm .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.sm.font.size');
        width: dt('multiselect.sm.font.size');
        height: dt('multiselect.sm.font.size');
    }

    .p-multiselect-lg .p-multiselect-label {
        font-size: dt('multiselect.lg.font.size');
        padding-block: dt('multiselect.lg.padding.y');
        padding-inline: dt('multiselect.lg.padding.x');
    }

    .p-multiselect-lg .p-multiselect-dropdown .p-icon {
        font-size: dt('multiselect.lg.font.size');
        width: dt('multiselect.lg.font.size');
        height: dt('multiselect.lg.font.size');
    }

    .p-floatlabel-in .p-multiselect-filter {
        padding-block-start: dt('multiselect.padding.y');
        padding-block-end: dt('multiselect.padding.y');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-multiselect p-component p-inputwrapper`,{"p-multiselect-display-chip":n.display===`chip`,"p-disabled":n.disabled,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-focus":t.focused,"p-inputwrapper-filled":t.$filled,"p-inputwrapper-focus":t.focused||t.overlayVisible,"p-multiselect-open":t.overlayVisible,"p-multiselect-fluid":t.$fluid,"p-multiselect-sm p-inputfield-sm":n.size===`small`,"p-multiselect-lg p-inputfield-lg":n.size===`large`}]},labelContainer:`p-multiselect-label-container`,label:function(e){var t=e.instance,n=e.props;return[`p-multiselect-label`,{"p-placeholder":t.label===n.placeholder,"p-multiselect-label-empty":!n.placeholder&&!t.$filled}]},clearIcon:`p-multiselect-clear-icon`,chipItem:`p-multiselect-chip-item`,pcChip:`p-multiselect-chip`,chipIcon:`p-multiselect-chip-icon`,dropdown:`p-multiselect-dropdown`,loadingIcon:`p-multiselect-loading-icon`,dropdownIcon:`p-multiselect-dropdown-icon`,overlay:`p-multiselect-overlay p-component`,header:`p-multiselect-header`,pcFilterContainer:`p-multiselect-filter-container`,pcFilter:`p-multiselect-filter`,listContainer:`p-multiselect-list-container`,list:`p-multiselect-list`,optionGroup:`p-multiselect-option-group`,option:function(e){var t=e.instance,n=e.option,r=e.index,i=e.getItemOptions,a=e.props;return[`p-multiselect-option`,{"p-multiselect-option-selected":t.isSelected(n)&&a.highlightOnSelect,"p-focus":t.focusedOptionIndex===t.getOptionIndex(r,i),"p-disabled":t.isOptionDisabled(n)}]},emptyMessage:`p-multiselect-empty-message`},inlineStyles:{root:function(e){return{position:e.props.appendTo===`self`?`relative`:void 0}}}}),me={name:`BaseMultiSelect`,extends:ce,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,optionGroupLabel:null,optionGroupChildren:null,scrollHeight:{type:String,default:`14rem`},placeholder:String,inputId:{type:String,default:null},panelClass:{type:String,default:null},panelStyle:{type:null,default:null},overlayClass:{type:String,default:null},overlayStyle:{type:null,default:null},dataKey:null,showClear:{type:Boolean,default:!1},clearIcon:{type:String,default:void 0},resetFilterOnClear:{type:Boolean,default:!1},filter:Boolean,filterPlaceholder:String,filterLocale:String,filterMatchMode:{type:String,default:`contains`},filterFields:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},display:{type:String,default:`comma`},selectedItemsLabel:{type:String,default:null},maxSelectedLabels:{type:Number,default:null},selectionLimit:{type:Number,default:null},showToggleAll:{type:Boolean,default:!0},loading:{type:Boolean,default:!1},checkboxIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},filterIcon:{type:String,default:void 0},loadingIcon:{type:String,default:void 0},removeTokenIcon:{type:String,default:void 0},chipIcon:{type:String,default:void 0},selectAll:{type:Boolean,default:null},resetFilterOnHide:{type:Boolean,default:!1},virtualScrollerOptions:{type:Object,default:null},autoOptionFocus:{type:Boolean,default:!1},autoFilterFocus:{type:Boolean,default:!1},focusOnHover:{type:Boolean,default:!0},highlightOnSelect:{type:Boolean,default:!1},filterMessage:{type:String,default:null},selectionMessage:{type:String,default:null},emptySelectionMessage:{type:String,default:null},emptyFilterMessage:{type:String,default:null},emptyMessage:{type:String,default:null},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:pe,provide:function(){return{$pcMultiSelect:this,$parentInstance:this}}};function W(e){"@babel/helpers - typeof";return W=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},W(e)}function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?G(Object(n),!0).forEach(function(t){q(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function q(e,t,n){return(t=he(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function he(e){var t=ge(e,`string`);return W(t)==`symbol`?t:t+``}function ge(e,t){if(W(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(W(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function J(e){return be(e)||ye(e)||ve(e)||_e()}function _e(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ve(e,t){if(e){if(typeof e==`string`)return Y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}function ye(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function be(e){if(Array.isArray(e))return Y(e)}function Y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var X={name:`MultiSelect`,extends:me,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`before-show`,`before-hide`,`show`,`hide`,`filter`,`selectall-change`],inject:{$pcFluid:{default:null}},outsideClickListener:null,scrollHandler:null,resizeListener:null,overlay:null,list:null,virtualScroller:null,startRangeIndex:-1,searchTimeout:null,searchValue:``,selectOnFocus:!1,data:function(){return{clicked:!1,focused:!1,focusedOptionIndex:-1,filterValue:null,overlayVisible:!1}},watch:{options:function(){this.autoUpdateModel()}},mounted:function(){this.autoUpdateModel()},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.overlay&&=(x.clear(this.overlay),null)},methods:{getOptionIndex:function(e,t){return this.virtualScrollerDisabled?e:t&&t(e).index},getOptionLabel:function(e){return this.optionLabel?P(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?P(e,this.optionValue):e},getOptionRenderKey:function(e,t){return this.dataKey?P(e,this.dataKey):this.getOptionLabel(e)+`_${t}`},getHeaderCheckboxPTOptions:function(e){return this.ptm(e,{context:{selected:this.allSelected}})},getCheckboxPTOptions:function(e,t,n,r){return this.ptm(r,{context:{selected:this.isSelected(e),focused:this.focusedOptionIndex===this.getOptionIndex(n,t),disabled:this.isOptionDisabled(e)}})},isOptionDisabled:function(e){return this.maxSelectionLimitReached&&!this.isSelected(e)?!0:this.optionDisabled?P(e,this.optionDisabled):!1},isOptionGroup:function(e){return!!(this.optionGroupLabel&&e.optionGroup&&e.group)},getOptionGroupLabel:function(e){return P(e,this.optionGroupLabel)},getOptionGroupChildren:function(e){return P(e,this.optionGroupChildren)},getAriaPosInset:function(e){var t=this;return(this.optionGroupLabel?e-this.visibleOptions.slice(0,e).filter(function(e){return t.isOptionGroup(e)}).length:e)+1},show:function(e){this.$emit(`before-show`),this.overlayVisible=!0,this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.findSelectedOptionIndex():this.focusedOptionIndex,e&&T(this.$refs.focusInput)},hide:function(e){var t=this,n=function(){t.$emit(`before-hide`),t.overlayVisible=!1,t.clicked=!1,t.focusedOptionIndex=-1,t.searchValue=``,t.resetFilterOnHide&&(t.filterValue=null),e&&T(t.$refs.focusInput)};setTimeout(function(){n()},0)},onFocus:function(e){this.disabled||(this.focused=!0,this.overlayVisible&&(this.focusedOptionIndex=this.focusedOptionIndex===-1?this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.findSelectedOptionIndex():this.focusedOptionIndex,!this.autoFilterFocus&&this.scrollInView(this.focusedOptionIndex)),this.$emit(`focus`,e))},onBlur:function(e){var t,n;this.clicked=!1,this.focused=!1,this.focusedOptionIndex=-1,this.searchValue=``,this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n)},onKeyDown:function(e){var t=this;if(this.disabled){e.preventDefault();return}var n=e.metaKey||e.ctrlKey;switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e);break;case`ShiftLeft`:case`ShiftRight`:this.onShiftKey(e);break;default:if(e.code===`KeyA`&&n){var r=this.visibleOptions.filter(function(e){return t.isValidOption(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,r),e.preventDefault();break}!n&&N(e.key)&&(!this.overlayVisible&&this.show(),this.searchOptions(e),e.preventDefault())}this.clicked=!1},onContainerClick:function(e){this.disabled||this.loading||e.target.tagName===`INPUT`||e.target.getAttribute(`data-pc-section`)===`clearicon`||e.target.closest(`[data-pc-section="clearicon"]`)||((!this.overlay||!this.overlay.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.clicked=!0)},onClearClick:function(e){this.updateModel(e,[]),this.resetFilterOnClear&&(this.filterValue=null)},onFirstHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?ie(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;T(t)},onLastHiddenFocus:function(e){var t=e.relatedTarget===this.$refs.focusInput?S(this.overlay,`:not([data-p-hidden-focusable="true"])`):this.$refs.focusInput;T(t)},onOptionSelect:function(e,t){var n=this,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:-1,i=arguments.length>3&&arguments[3]!==void 0&&arguments[3];if(!(this.disabled||this.isOptionDisabled(t))){var a=this.isSelected(t),o=null;o=a?this.d_value.filter(function(e){return!C(e,n.getOptionValue(t),n.equalityKey)}):[].concat(J(this.d_value||[]),[this.getOptionValue(t)]),this.updateModel(e,o),r!==-1&&(this.focusedOptionIndex=r),i&&T(this.$refs.focusInput)}},onOptionMouseMove:function(e,t){this.focusOnHover&&this.changeFocusedOptionIndex(e,t)},onOptionSelectRange:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:-1,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:-1;if(n===-1&&(n=this.findNearestSelectedOptionIndex(r,!0)),r===-1&&(r=this.findNearestSelectedOptionIndex(n)),n!==-1&&r!==-1){var i=Math.min(n,r),a=Math.max(n,r),o=this.visibleOptions.slice(i,a+1).filter(function(e){return t.isValidOption(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,o)}},onFilterChange:function(e){var t=e.target.value;this.filterValue=t,this.focusedOptionIndex=-1,this.$emit(`filter`,{originalEvent:e,value:t}),!this.virtualScrollerDisabled&&this.virtualScroller.scrollToIndex(0)},onFilterKeyDown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e,!0);break;case`ArrowLeft`:case`ArrowRight`:this.onArrowLeftKey(e,!0);break;case`Home`:this.onHomeKey(e,!0);break;case`End`:this.onEndKey(e,!0);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Escape`:this.onEscapeKey(e);break;case`Tab`:this.onTabKey(e,!0)}},onFilterBlur:function(){this.focusedOptionIndex=-1},onFilterUpdated:function(){this.overlayVisible&&this.alignOverlay()},onOverlayClick:function(e){B.emit(`overlay-click`,{originalEvent:e,target:this.$el})},onOverlayKeyDown:function(e){e.code===`Escape`&&this.onEscapeKey(e)},onArrowDownKey:function(e){if(!this.overlayVisible)this.show();else{var t=this.focusedOptionIndex===-1?this.clicked?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex():this.findNextOptionIndex(this.focusedOptionIndex);e.shiftKey&&this.onOptionSelectRange(e,this.startRangeIndex,t),this.changeFocusedOptionIndex(e,t)}e.preventDefault()},onArrowUpKey:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(e.altKey&&!t)this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(),e.preventDefault();else{var n=this.focusedOptionIndex===-1?this.clicked?this.findLastOptionIndex():this.findLastFocusedOptionIndex():this.findPrevOptionIndex(this.focusedOptionIndex);e.shiftKey&&this.onOptionSelectRange(e,n,this.startRangeIndex),this.changeFocusedOptionIndex(e,n),!this.overlayVisible&&this.show(),e.preventDefault()}},onArrowLeftKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]&&(this.focusedOptionIndex=-1)},onHomeKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;e.shiftKey?t.setSelectionRange(0,e.target.selectionStart):(t.setSelectionRange(0,0),this.focusedOptionIndex=-1)}else{var n=e.metaKey||e.ctrlKey,r=this.findFirstOptionIndex();e.shiftKey&&n&&this.onOptionSelectRange(e,r,this.startRangeIndex),this.changeFocusedOptionIndex(e,r),!this.overlayVisible&&this.show()}e.preventDefault()},onEndKey:function(e){if(arguments.length>1&&arguments[1]!==void 0&&arguments[1]){var t=e.currentTarget;if(e.shiftKey)t.setSelectionRange(e.target.selectionStart,t.value.length);else{var n=t.value.length;t.setSelectionRange(n,n),this.focusedOptionIndex=-1}}else{var r=e.metaKey||e.ctrlKey,i=this.findLastOptionIndex();e.shiftKey&&r&&this.onOptionSelectRange(e,this.startRangeIndex,i),this.changeFocusedOptionIndex(e,i),!this.overlayVisible&&this.show()}e.preventDefault()},onPageUpKey:function(e){this.scrollInView(0),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.visibleOptions.length-1),e.preventDefault()},onEnterKey:function(e){this.overlayVisible?this.focusedOptionIndex!==-1&&(e.shiftKey?this.onOptionSelectRange(e,this.focusedOptionIndex):this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex])):(this.focusedOptionIndex=-1,this.onArrowDownKey(e)),e.preventDefault()},onEscapeKey:function(e){this.overlayVisible&&(this.hide(!0),e.stopPropagation()),e.preventDefault()},onTabKey:function(e){arguments.length>1&&arguments[1]!==void 0&&arguments[1]||(this.overlayVisible&&this.hasFocusableElements()?(T(e.shiftKey?this.$refs.lastHiddenFocusableElementOnOverlay:this.$refs.firstHiddenFocusableElementOnOverlay),e.preventDefault()):(this.focusedOptionIndex!==-1&&this.onOptionSelect(e,this.visibleOptions[this.focusedOptionIndex]),this.overlayVisible&&this.hide(this.filter)))},onShiftKey:function(){this.startRangeIndex=this.focusedOptionIndex},onOverlayEnter:function(e){x.set(`overlay`,e,this.$primevue.config.zIndex.overlay),w(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.scrollInView(),this.autoFilterFocus&&T(this.$refs.filterInput.$el),this.autoUpdateModel(),this.$attrSelector&&e.setAttribute(this.$attrSelector,``)},onOverlayAfterEnter:function(){this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.$emit(`show`)},onOverlayLeave:function(e){e.style.pointerEvents=`none`,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit(`hide`),this.overlay=null},onOverlayAfterLeave:function(e){x.clear(e)},alignOverlay:function(){this.appendTo===`self`?O(this.overlay,this.$el):(this.overlay.style.minWidth=ne(this.$el)+`px`,A(this.overlay,this.$el))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&e.isOutsideClicked(t)&&e.hide()},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new R(this.$refs.container,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!k()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},isOutsideClicked:function(e){return!(this.$el.isSameNode(e.target)||this.$el.contains(e.target)||this.overlay&&this.overlay.contains(e.target))},getLabelByValue:function(e){var t=this,n=(this.optionGroupLabel?this.flatOptions(this.options):this.options||[]).find(function(n){return!t.isOptionGroup(n)&&C(t.getOptionValue(n),e,t.equalityKey)});return this.getOptionLabel(n)},getSelectedItemsLabel:function(){var e=/{(.*?)}/,t=this.selectedItemsLabel||this.$primevue.config.locale.selectionMessage;return e.test(t)?t.replace(t.match(e)[0],this.d_value.length+``):t},onToggleAll:function(e){var t=this;if(this.selectAll!==null)this.$emit(`selectall-change`,{originalEvent:e,checked:!this.allSelected});else{var n=this.allSelected?[]:this.visibleOptions.filter(function(e){return t.isValidOption(e)}).map(function(e){return t.getOptionValue(e)});this.updateModel(e,n)}},removeOption:function(e,t){var n=this;e.stopPropagation();var r=this.d_value.filter(function(e){return!C(e,t,n.equalityKey)});this.updateModel(e,r)},clearFilter:function(){this.filterValue=null},hasFocusableElements:function(){return re(this.overlay,`:not([data-p-hidden-focusable="true"])`).length>0},isOptionMatched:function(e){return this.isValidOption(e)&&typeof this.getOptionLabel(e)==`string`&&this.getOptionLabel(e)?.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale))},isValidOption:function(e){return E(e)&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))},isValidSelectedOption:function(e){return this.isValidOption(e)&&this.isSelected(e)},isEquals:function(e,t){return C(e,t,this.equalityKey)},isSelected:function(e){var t=this,n=this.getOptionValue(e);return(this.d_value||[]).some(function(e){return t.isEquals(e,n)})},findFirstOptionIndex:function(){var e=this;return this.visibleOptions.findIndex(function(t){return e.isValidOption(t)})},findLastOptionIndex:function(){var e=this;return M(this.visibleOptions,function(t){return e.isValidOption(t)})},findNextOptionIndex:function(e){var t=this,n=e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidOption(e)}):-1;return n>-1?n+e+1:e},findPrevOptionIndex:function(e){var t=this,n=e>0?M(this.visibleOptions.slice(0,e),function(e){return t.isValidOption(e)}):-1;return n>-1?n:e},findSelectedOptionIndex:function(){var e=this;if(this.$filled){for(var t=function(){var t=e.d_value[r],n=e.visibleOptions.findIndex(function(n){return e.isValidSelectedOption(n)&&e.isEquals(t,e.getOptionValue(n))});if(n>-1)return{v:n}},n,r=this.d_value.length-1;r>=0;r--)if(n=t(),n)return n.v}return-1},findFirstSelectedOptionIndex:function(){var e=this;return this.$filled?this.visibleOptions.findIndex(function(t){return e.isValidSelectedOption(t)}):-1},findLastSelectedOptionIndex:function(){var e=this;return this.$filled?M(this.visibleOptions,function(t){return e.isValidSelectedOption(t)}):-1},findNextSelectedOptionIndex:function(e){var t=this,n=this.$filled&&e<this.visibleOptions.length-1?this.visibleOptions.slice(e+1).findIndex(function(e){return t.isValidSelectedOption(e)}):-1;return n>-1?n+e+1:-1},findPrevSelectedOptionIndex:function(e){var t=this,n=this.$filled&&e>0?M(this.visibleOptions.slice(0,e),function(e){return t.isValidSelectedOption(e)}):-1;return n>-1?n:-1},findNearestSelectedOptionIndex:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=-1;return this.$filled&&(t?(n=this.findPrevSelectedOptionIndex(e),n=n===-1?this.findNextSelectedOptionIndex(e):n):(n=this.findNextSelectedOptionIndex(e),n=n===-1?this.findPrevSelectedOptionIndex(e):n)),n>-1?n:e},findFirstFocusedOptionIndex:function(){var e=this.findFirstSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e},findLastFocusedOptionIndex:function(){var e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e},searchOptions:function(e){var t=this;this.searchValue=(this.searchValue||``)+e.key;var n=-1;E(this.searchValue)&&(this.focusedOptionIndex===-1?n=this.visibleOptions.findIndex(function(e){return t.isOptionMatched(e)}):(n=this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function(e){return t.isOptionMatched(e)}),n=n===-1?this.visibleOptions.slice(0,this.focusedOptionIndex).findIndex(function(e){return t.isOptionMatched(e)}):n+this.focusedOptionIndex),n===-1&&this.focusedOptionIndex===-1&&(n=this.findFirstFocusedOptionIndex()),n!==-1&&this.changeFocusedOptionIndex(e,n)),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){t.searchValue=``,t.searchTimeout=null},500)},changeFocusedOptionIndex:function(e,t){this.focusedOptionIndex!==t&&(this.focusedOptionIndex=t,this.scrollInView(),this.selectOnFocus&&this.onOptionSelect(e,this.visibleOptions[t]))},scrollInView:function(){var e=this,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1;this.$nextTick(function(){var n=t===-1?e.focusedOptionId:`${e.$id}_${t}`,r=j(e.list,`li[id="${n}"]`);r?r.scrollIntoView&&r.scrollIntoView({block:`nearest`,inline:`nearest`}):e.virtualScrollerDisabled||e.virtualScroller&&e.virtualScroller.scrollToIndex(t===-1?e.focusedOptionIndex:t)})},autoUpdateModel:function(){if(this.autoOptionFocus&&(this.focusedOptionIndex=this.findFirstFocusedOptionIndex()),this.selectOnFocus&&this.autoOptionFocus&&!this.$filled){var e=this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);this.updateModel(null,[e])}},updateModel:function(e,t){this.writeValue(t,e),this.$emit(`change`,{originalEvent:e,value:t})},flatOptions:function(e){var t=this;return(e||[]).reduce(function(e,n,r){var i=t.getOptionGroupChildren(n);return i&&Array.isArray(i)?(e.push({optionGroup:n,group:!0,index:r}),i.forEach(function(t){return e.push(t)})):e.push(n),e},[])},overlayRef:function(e){this.overlay=e},listRef:function(e,t){this.list=e,t&&t(e)},virtualScrollerRef:function(e){this.virtualScroller=e}},computed:{visibleOptions:function(){var e=this,t=this.optionGroupLabel?this.flatOptions(this.options):this.options||[];if(this.filterValue){var n=F.filter(t,this.searchFields,this.filterValue,this.filterMatchMode,this.filterLocale);if(this.optionGroupLabel){var r=this.options||[],i=[];return r.forEach(function(t){var r=e.getOptionGroupChildren(t).filter(function(e){return n.includes(e)});r.length>0&&i.push(K(K({},t),{},q({},typeof e.optionGroupChildren==`string`?e.optionGroupChildren:`items`,J(r))))}),this.flatOptions(i)}return n}return t},label:function(){var e;if(this.d_value&&this.d_value.length){if(this.loading&&(!this.options||this.options.length===0))e=this.placeholder;else if(E(this.maxSelectedLabels)&&this.d_value.length>this.maxSelectedLabels)return this.getSelectedItemsLabel();else{e=``;for(var t=0;t<this.d_value.length;t++)t!==0&&(e+=`, `),e+=this.getLabelByValue(this.d_value[t])}}else e=this.placeholder;return e},chipSelectedItems:function(){return E(this.maxSelectedLabels)&&this.d_value&&this.d_value.length>this.maxSelectedLabels},allSelected:function(){var e=this;return this.selectAll===null?E(this.visibleOptions)&&this.visibleOptions.every(function(t){return e.isOptionGroup(t)||e.isOptionDisabled(t)||e.isSelected(t)}):this.selectAll},hasSelectedOption:function(){return this.$filled},equalityKey:function(){return this.optionValue?null:this.dataKey},searchFields:function(){return this.filterFields||[this.optionLabel]},maxSelectionLimitReached:function(){return this.selectionLimit&&this.d_value&&this.d_value.length===this.selectionLimit},filterResultMessageText:function(){return E(this.visibleOptions)?this.filterMessageText.replaceAll(`{0}`,this.visibleOptions.length):this.emptyFilterMessageText},filterMessageText:function(){return this.filterMessage||this.$primevue.config.locale.searchMessage||``},emptyFilterMessageText:function(){return this.emptyFilterMessage||this.$primevue.config.locale.emptySearchMessage||this.$primevue.config.locale.emptyFilterMessage||``},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage||``},selectionMessageText:function(){return this.selectionMessage||this.$primevue.config.locale.selectionMessage||``},emptySelectionMessageText:function(){return this.emptySelectionMessage||this.$primevue.config.locale.emptySelectionMessage||``},selectedMessageText:function(){return this.$filled?this.selectionMessageText.replaceAll(`{0}`,this.d_value.length):this.emptySelectionMessageText},focusedOptionId:function(){return this.focusedOptionIndex===-1?null:`${this.$id}_${this.focusedOptionIndex}`},ariaSetSize:function(){var e=this;return this.visibleOptions.filter(function(t){return!e.isOptionGroup(t)}).length},toggleAllAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria[this.allSelected?`selectAll`:`unselectAll`]:void 0},listAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.listLabel:void 0},virtualScrollerDisabled:function(){return!this.virtualScrollerOptions},hasFluid:function(){return D(this.fluid)?!!this.$pcFluid:this.fluid},isClearIconVisible:function(){return this.showClear&&this.d_value&&this.d_value.length&&this.d_value!=null&&E(this.options)&&!this.disabled&&!this.loading},containerDataP:function(){return b(q({invalid:this.$invalid,disabled:this.disabled,focus:this.focused,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))},labelDataP:function(){return b(q(q(q({placeholder:this.label===this.placeholder,clearable:this.showClear,disabled:this.disabled},this.size,this.size),`has-chip`,this.display===`chip`&&this.d_value&&this.d_value.length&&(!this.maxSelectedLabels||this.d_value.length<=this.maxSelectedLabels)),`empty`,!this.placeholder&&!this.$filled))},dropdownIconDataP:function(){return b(q({},this.size,this.size))},overlayDataP:function(){return b(q({},`portal-`+this.appendTo,`portal-`+this.appendTo))}},directives:{ripple:oe},components:{InputText:le,Checkbox:I,VirtualScroller:H,Portal:L,Chip:V,IconField:de,InputIcon:fe,TimesIcon:se,SearchIcon:U,ChevronDownIcon:z,SpinnerIcon:ae,CheckIcon:ue}};function Z(e){"@babel/helpers - typeof";return Z=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Z(e)}function Q(e,t,n){return(t=xe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xe(e){var t=Se(e,`string`);return Z(t)==`symbol`?t:t+``}function Se(e,t){if(Z(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Z(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Ce=[`data-p`],$=[`id`,`disabled`,`placeholder`,`tabindex`,`aria-label`,`aria-labelledby`,`aria-expanded`,`aria-controls`,`aria-activedescendant`,`aria-invalid`],we=[`data-p`],Te={key:1},Ee=[`data-p`],De=[`id`,`aria-label`],Oe=[`id`],ke=[`id`,`aria-label`,`aria-selected`,`aria-disabled`,`aria-setsize`,`aria-posinset`,`onClick`,`onMousemove`,`data-p-selected`,`data-p-focused`,`data-p-disabled`];function Ae(b,x,S,C,w,T){var E=c(`Chip`),D=c(`SpinnerIcon`),O=c(`Checkbox`),k=c(`InputText`),A=c(`SearchIcon`),j=c(`InputIcon`),M=c(`IconField`),N=c(`VirtualScroller`),P=c(`Portal`),F=n(`ripple`);return r(),d(`div`,m({ref:`container`,class:b.cx(`root`),style:b.sx(`root`),onClick:x[7]||=function(){return T.onContainerClick&&T.onContainerClick.apply(T,arguments)},"data-p":T.containerDataP},b.ptmi(`root`)),[h(`div`,m({class:`p-hidden-accessible`},b.ptm(`hiddenInputContainer`),{"data-p-hidden-accessible":!0}),[h(`input`,m({ref:`focusInput`,id:b.inputId,type:`text`,readonly:``,disabled:b.disabled,placeholder:b.placeholder,tabindex:b.disabled?-1:b.tabindex,role:`combobox`,"aria-label":b.ariaLabel,"aria-labelledby":b.ariaLabelledby,"aria-haspopup":`listbox`,"aria-expanded":w.overlayVisible,"aria-controls":w.overlayVisible?b.$id+`_list`:void 0,"aria-activedescendant":w.focused?T.focusedOptionId:void 0,"aria-invalid":b.invalid||void 0,onFocus:x[0]||=function(){return T.onFocus&&T.onFocus.apply(T,arguments)},onBlur:x[1]||=function(){return T.onBlur&&T.onBlur.apply(T,arguments)},onKeydown:x[2]||=function(){return T.onKeyDown&&T.onKeyDown.apply(T,arguments)}},b.ptm(`hiddenInput`)),null,16,$)],16),h(`div`,m({class:b.cx(`labelContainer`)},b.ptm(`labelContainer`)),[h(`div`,m({class:b.cx(`label`),"data-p":T.labelDataP},b.ptm(`label`)),[t(b.$slots,`value`,{value:b.d_value,placeholder:b.placeholder},function(){return[b.display===`comma`?(r(),d(g,{key:0},[l(a(T.label||`empty`),1)],64)):b.display===`chip`?(r(),d(g,{key:1},[b.loading&&(!b.options||b.options.length===0)?(r(),d(g,{key:0},[l(a(b.placeholder||`empty`),1)],64)):T.chipSelectedItems?(r(),d(`span`,Te,a(T.label),1)):(r(!0),d(g,{key:2},y(b.d_value,function(e,n){return r(),d(`span`,m({key:`chip-${T.getLabelByValue(e)}_${n}`,class:b.cx(`chipItem`)},{ref_for:!0},b.ptm(`chipItem`)),[t(b.$slots,`chip`,{value:e,removeCallback:function(t){return T.removeOption(t,e)}},function(){return[v(E,{class:p(b.cx(`pcChip`)),label:T.getLabelByValue(e),removeIcon:b.chipIcon||b.removeTokenIcon,removable:``,unstyled:b.unstyled,onRemove:function(t){return T.removeOption(t,e)},pt:b.ptm(`pcChip`)},{removeicon:o(function(){return[t(b.$slots,b.$slots.chipicon?`chipicon`:`removetokenicon`,{class:p(b.cx(`chipIcon`)),item:e,removeCallback:function(t){return T.removeOption(t,e)}})]}),_:2},1032,[`class`,`label`,`removeIcon`,`unstyled`,`onRemove`,`pt`])]})],16)}),128)),!b.d_value||b.d_value.length===0?(r(),d(g,{key:3},[l(a(b.placeholder||`empty`),1)],64)):u(``,!0)],64)):u(``,!0)]})],16,we)],16),T.isClearIconVisible?t(b.$slots,`clearicon`,{key:0,class:p(b.cx(`clearIcon`)),clearCallback:T.onClearClick},function(){return[(r(),_(s(b.clearIcon?`i`:`TimesIcon`),m({ref:`clearIcon`,class:[b.cx(`clearIcon`),b.clearIcon],onClick:T.onClearClick},b.ptm(`clearIcon`),{"data-pc-section":`clearicon`}),null,16,[`class`,`onClick`]))]}):u(``,!0),h(`div`,m({class:b.cx(`dropdown`)},b.ptm(`dropdown`)),[b.loading?t(b.$slots,`loadingicon`,{key:0,class:p(b.cx(`loadingIcon`))},function(){return[b.loadingIcon?(r(),d(`span`,m({key:0,class:[b.cx(`loadingIcon`),`pi-spin`,b.loadingIcon],"aria-hidden":`true`},b.ptm(`loadingIcon`)),null,16)):(r(),_(D,m({key:1,class:b.cx(`loadingIcon`),spin:``,"aria-hidden":`true`},b.ptm(`loadingIcon`)),null,16,[`class`]))]}):t(b.$slots,`dropdownicon`,{key:1,class:p(b.cx(`dropdownIcon`))},function(){return[(r(),_(s(b.dropdownIcon?`span`:`ChevronDownIcon`),m({class:[b.cx(`dropdownIcon`),b.dropdownIcon],"aria-hidden":`true`,"data-p":T.dropdownIconDataP},b.ptm(`dropdownIcon`)),null,16,[`class`,`data-p`]))]})],16),v(P,{appendTo:b.appendTo},{default:o(function(){return[v(ee,m({name:`p-anchored-overlay`,onEnter:T.onOverlayEnter,onAfterEnter:T.onOverlayAfterEnter,onLeave:T.onOverlayLeave,onAfterLeave:T.onOverlayAfterLeave},b.ptm(`transition`)),{default:o(function(){return[w.overlayVisible?(r(),d(`div`,m({key:0,ref:T.overlayRef,style:[b.panelStyle,b.overlayStyle],class:[b.cx(`overlay`),b.panelClass,b.overlayClass],onClick:x[5]||=function(){return T.onOverlayClick&&T.onOverlayClick.apply(T,arguments)},onKeydown:x[6]||=function(){return T.onOverlayKeyDown&&T.onOverlayKeyDown.apply(T,arguments)},"data-p":T.overlayDataP},b.ptm(`overlay`)),[h(`span`,m({ref:`firstHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:x[3]||=function(){return T.onFirstHiddenFocus&&T.onFirstHiddenFocus.apply(T,arguments)}},b.ptm(`hiddenFirstFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16),t(b.$slots,`header`,{value:b.d_value,options:T.visibleOptions}),b.showToggleAll&&b.selectionLimit==null||b.filter?(r(),d(`div`,m({key:0,class:b.cx(`header`)},b.ptm(`header`)),[b.showToggleAll&&b.selectionLimit==null?(r(),_(O,{key:0,modelValue:T.allSelected,binary:!0,disabled:b.disabled,variant:b.variant,"aria-label":T.toggleAllAriaLabel,onChange:T.onToggleAll,unstyled:b.unstyled,pt:T.getHeaderCheckboxPTOptions(`pcHeaderCheckbox`),formControl:{novalidate:!0}},{icon:o(function(e){return[b.$slots.headercheckboxicon?(r(),_(s(b.$slots.headercheckboxicon),{key:0,checked:e.checked,class:p(e.class)},null,8,[`checked`,`class`])):e.checked?(r(),_(s(b.checkboxIcon?`span`:`CheckIcon`),m({key:1,class:[e.class,Q({},b.checkboxIcon,e.checked)]},T.getHeaderCheckboxPTOptions(`pcHeaderCheckbox.icon`)),null,16,[`class`])):u(``,!0)]}),_:1},8,[`modelValue`,`disabled`,`variant`,`aria-label`,`onChange`,`unstyled`,`pt`])):u(``,!0),b.filter?(r(),_(M,{key:1,class:p(b.cx(`pcFilterContainer`)),unstyled:b.unstyled,pt:b.ptm(`pcFilterContainer`)},{default:o(function(){return[v(k,{ref:`filterInput`,value:w.filterValue,onVnodeMounted:T.onFilterUpdated,onVnodeUpdated:T.onFilterUpdated,class:p(b.cx(`pcFilter`)),placeholder:b.filterPlaceholder,disabled:b.disabled,variant:b.variant,unstyled:b.unstyled,role:`searchbox`,autocomplete:`off`,"aria-owns":b.$id+`_list`,"aria-activedescendant":T.focusedOptionId,onKeydown:T.onFilterKeyDown,onBlur:T.onFilterBlur,onInput:T.onFilterChange,pt:b.ptm(`pcFilter`),formControl:{novalidate:!0}},null,8,[`value`,`onVnodeMounted`,`onVnodeUpdated`,`class`,`placeholder`,`disabled`,`variant`,`unstyled`,`aria-owns`,`aria-activedescendant`,`onKeydown`,`onBlur`,`onInput`,`pt`]),v(j,{unstyled:b.unstyled,pt:b.ptm(`pcFilterIconContainer`)},{default:o(function(){return[t(b.$slots,`filtericon`,{},function(){return[b.filterIcon?(r(),d(`span`,m({key:0,class:b.filterIcon},b.ptm(`filterIcon`)),null,16)):(r(),_(A,i(m({key:1},b.ptm(`filterIcon`))),null,16))]})]}),_:3},8,[`unstyled`,`pt`])]}),_:3},8,[`class`,`unstyled`,`pt`])):u(``,!0),b.filter?(r(),d(`span`,m({key:2,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},b.ptm(`hiddenFilterResult`),{"data-p-hidden-accessible":!0}),a(T.filterResultMessageText),17)):u(``,!0)],16)):u(``,!0),h(`div`,m({class:b.cx(`listContainer`),style:{"max-height":T.virtualScrollerDisabled?b.scrollHeight:``}},b.ptm(`listContainer`)),[v(N,m({ref:T.virtualScrollerRef},b.virtualScrollerOptions,{items:T.visibleOptions,style:{height:b.scrollHeight},tabindex:-1,disabled:T.virtualScrollerDisabled,pt:b.ptm(`virtualScroller`)}),f({content:o(function(n){var i=n.styleClass,c=n.contentRef,f=n.items,x=n.getItemOptions,S=n.contentStyle,C=n.itemSize;return[h(`ul`,m({ref:function(e){return T.listRef(e,c)},id:b.$id+`_list`,class:[b.cx(`list`),i],style:S,role:`listbox`,"aria-multiselectable":`true`,"aria-label":T.listAriaLabel},b.ptm(`list`)),[(r(!0),d(g,null,y(f,function(n,i){return r(),d(g,{key:T.getOptionRenderKey(n,T.getOptionIndex(i,x))},[T.isOptionGroup(n)?(r(),d(`li`,m({key:0,id:b.$id+`_`+T.getOptionIndex(i,x),style:{height:C?C+`px`:void 0},class:b.cx(`optionGroup`),role:`option`},{ref_for:!0},b.ptm(`optionGroup`)),[t(b.$slots,`optiongroup`,{option:n.optionGroup,index:T.getOptionIndex(i,x)},function(){return[l(a(T.getOptionGroupLabel(n.optionGroup)),1)]})],16,Oe)):e((r(),d(`li`,m({key:1,id:b.$id+`_`+T.getOptionIndex(i,x),style:{height:C?C+`px`:void 0},class:b.cx(`option`,{option:n,index:i,getItemOptions:x}),role:`option`,"aria-label":T.getOptionLabel(n),"aria-selected":T.isSelected(n),"aria-disabled":T.isOptionDisabled(n),"aria-setsize":T.ariaSetSize,"aria-posinset":T.getAriaPosInset(T.getOptionIndex(i,x)),onClick:function(e){return T.onOptionSelect(e,n,T.getOptionIndex(i,x),!0)},onMousemove:function(e){return T.onOptionMouseMove(e,T.getOptionIndex(i,x))}},{ref_for:!0},T.getCheckboxPTOptions(n,x,i,`option`),{"data-p-selected":T.isSelected(n),"data-p-focused":w.focusedOptionIndex===T.getOptionIndex(i,x),"data-p-disabled":T.isOptionDisabled(n)}),[v(O,{defaultValue:T.isSelected(n),binary:!0,tabindex:-1,variant:b.variant,unstyled:b.unstyled,pt:T.getCheckboxPTOptions(n,x,i,`pcOptionCheckbox`),formControl:{novalidate:!0}},{icon:o(function(e){return[b.$slots.optioncheckboxicon||b.$slots.itemcheckboxicon?(r(),_(s(b.$slots.optioncheckboxicon||b.$slots.itemcheckboxicon),{key:0,checked:e.checked,class:p(e.class)},null,8,[`checked`,`class`])):e.checked?(r(),_(s(b.checkboxIcon?`span`:`CheckIcon`),m({key:1,class:[e.class,Q({},b.checkboxIcon,e.checked)]},{ref_for:!0},T.getCheckboxPTOptions(n,x,i,`pcOptionCheckbox.icon`)),null,16,[`class`])):u(``,!0)]}),_:2},1032,[`defaultValue`,`variant`,`unstyled`,`pt`]),t(b.$slots,`option`,{option:n,selected:T.isSelected(n),index:T.getOptionIndex(i,x)},function(){return[h(`span`,m({ref_for:!0},b.ptm(`optionLabel`)),a(T.getOptionLabel(n)),17)]})],16,ke)),[[F]])],64)}),128)),w.filterValue&&(!f||f&&f.length===0)?(r(),d(`li`,m({key:0,class:b.cx(`emptyMessage`),role:`option`},b.ptm(`emptyMessage`)),[t(b.$slots,`emptyfilter`,{},function(){return[l(a(T.emptyFilterMessageText),1)]})],16)):!b.options||b.options&&b.options.length===0?(r(),d(`li`,m({key:1,class:b.cx(`emptyMessage`),role:`option`},b.ptm(`emptyMessage`)),[t(b.$slots,`empty`,{},function(){return[l(a(T.emptyMessageText),1)]})],16)):u(``,!0)],16,De)]}),_:2},[b.$slots.loader?{name:`loader`,fn:o(function(e){var n=e.options;return[t(b.$slots,`loader`,{options:n})]}),key:`0`}:void 0]),1040,[`items`,`style`,`disabled`,`pt`])],16),t(b.$slots,`footer`,{value:b.d_value,options:T.visibleOptions}),!b.options||b.options&&b.options.length===0?(r(),d(`span`,m({key:1,role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},b.ptm(`hiddenEmptyMessage`),{"data-p-hidden-accessible":!0}),a(T.emptyMessageText),17)):u(``,!0),h(`span`,m({role:`status`,"aria-live":`polite`,class:`p-hidden-accessible`},b.ptm(`hiddenSelectedMessage`),{"data-p-hidden-accessible":!0}),a(T.selectedMessageText),17),h(`span`,m({ref:`lastHiddenFocusableElementOnOverlay`,role:`presentation`,"aria-hidden":`true`,class:`p-hidden-accessible p-hidden-focusable`,tabindex:0,onFocus:x[4]||=function(){return T.onLastHiddenFocus&&T.onLastHiddenFocus.apply(T,arguments)}},b.ptm(`hiddenLastFocusableEl`),{"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0}),null,16)],16,Ee)):u(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`])],16,Ce)}X.render=Ae;export{X as default};