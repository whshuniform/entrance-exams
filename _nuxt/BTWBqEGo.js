import{$ as e,B as t,H as n,L as r,Pt as i,Q as a,U as o,d as s,f as c,jt as l,k as u,l as d,u as f,v as p}from"./B5nbzVpw.js";import{s as m,t as h}from"./BVdjFhz-.js";import{t as g}from"./B0gwFOOa.js";import{t as _}from"./CRHlWn3X.js";import{t as v}from"./B3htCpnR.js";import{t as y}from"./my3qd5SA.js";import{t as b}from"./HIb35cBF.js";import{t as x}from"./BJz_L_5W.js";var S=g.extend({name:`fieldset`,style:`
    .p-fieldset {
        background: dt('fieldset.background');
        border: 1px solid dt('fieldset.border.color');
        border-radius: dt('fieldset.border.radius');
        color: dt('fieldset.color');
        padding: dt('fieldset.padding');
        margin: 0;
    }

    .p-fieldset-legend {
        background: dt('fieldset.legend.background');
        border-radius: dt('fieldset.legend.border.radius');
        border-width: dt('fieldset.legend.border.width');
        border-style: solid;
        border-color: dt('fieldset.legend.border.color');
        color: dt('fieldset.legend.color');
        padding: dt('fieldset.legend.padding');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend {
        padding: 0;
    }

    .p-fieldset-toggle-button {
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        display: flex;
        gap: dt('fieldset.legend.gap');
        align-items: center;
        justify-content: center;
        padding: dt('fieldset.legend.padding');
        background: transparent;
        border: 0 none;
        border-radius: dt('fieldset.legend.border.radius');
        transition:
            background dt('fieldset.transition.duration'),
            color dt('fieldset.transition.duration'),
            outline-color dt('fieldset.transition.duration'),
            box-shadow dt('fieldset.transition.duration');
        outline-color: transparent;
    }

    .p-fieldset-legend-label {
        font-weight: dt('fieldset.legend.font.weight');
    }

    .p-fieldset-toggle-button:focus-visible {
        box-shadow: dt('fieldset.legend.focus.ring.shadow');
        outline: dt('fieldset.legend.focus.ring.width') dt('fieldset.legend.focus.ring.style') dt('fieldset.legend.focus.ring.color');
        outline-offset: dt('fieldset.legend.focus.ring.offset');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover {
        color: dt('fieldset.legend.hover.color');
        background: dt('fieldset.legend.hover.background');
    }

    .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.color');
        transition: color dt('fieldset.transition.duration');
    }

    .p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {
        color: dt('fieldset.toggle.icon.hover.color');
    }

    .p-fieldset-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-fieldset-content-wrapper {
        min-height: 0;
    }

    .p-fieldset-content {
        padding: dt('fieldset.content.padding');
    }
`,classes:{root:function(e){return[`p-fieldset p-component`,{"p-fieldset-toggleable":e.props.toggleable}]},legend:`p-fieldset-legend`,legendLabel:`p-fieldset-legend-label`,toggleButton:`p-fieldset-toggle-button`,toggleIcon:`p-fieldset-toggle-icon`,contentContainer:`p-fieldset-content-container`,contentWrapper:`p-fieldset-content-wrapper`,content:`p-fieldset-content`}}),C={name:`Fieldset`,extends:{name:`BaseFieldset`,extends:v,props:{legend:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:null,default:null}},style:S,provide:function(){return{$pcFieldset:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:collapsed`,`toggle`],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(e){this.d_collapsed=e}},methods:{toggle:function(e){this.d_collapsed=!this.d_collapsed,this.$emit(`update:collapsed`,this.d_collapsed),this.$emit(`toggle`,{originalEvent:e,value:this.d_collapsed})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggle(e),e.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.legend},dataP:function(){return _({toggleable:this.toggleable})}},directives:{ripple:y},components:{PlusIcon:x,MinusIcon:b}};function w(e){"@babel/helpers - typeof";return w=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},w(e)}function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?T(Object(n),!0).forEach(function(t){D(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function D(e,t,n){return(t=O(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e){var t=k(e,`string`);return w(t)==`symbol`?t:t+``}function k(e,t){if(w(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(w(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var A=[`data-p`],j=[`data-p`],M=[`id`],N=[`id`,`aria-controls`,`aria-expanded`,`aria-label`],P=[`id`,`aria-labelledby`];function F(g,_,v,y,b,x){var S=n(`ripple`);return r(),c(`fieldset`,u({class:g.cx(`root`),"data-p":x.dataP},g.ptmi(`root`)),[d(`legend`,u({class:g.cx(`legend`),"data-p":x.dataP},g.ptm(`legend`)),[t(g.$slots,`legend`,{toggleCallback:x.toggle},function(){return[g.toggleable?s(``,!0):(r(),c(`span`,u({key:0,id:g.$id+`_header`,class:g.cx(`legendLabel`)},g.ptm(`legendLabel`)),i(g.legend),17,M)),g.toggleable?e((r(),c(`button`,u({key:1,id:g.$id+`_header`,type:`button`,"aria-controls":g.$id+`_content`,"aria-expanded":!b.d_collapsed,"aria-label":x.buttonAriaLabel,class:g.cx(`toggleButton`),onClick:_[0]||=function(){return x.toggle&&x.toggle.apply(x,arguments)},onKeydown:_[1]||=function(){return x.onKeyDown&&x.onKeyDown.apply(x,arguments)}},E(E({},g.toggleButtonProps),g.ptm(`toggleButton`))),[t(g.$slots,g.$slots.toggleicon?`toggleicon`:`togglericon`,{collapsed:b.d_collapsed,class:l(g.cx(`toggleIcon`))},function(){return[(r(),f(o(b.d_collapsed?`PlusIcon`:`MinusIcon`),u({class:g.cx(`toggleIcon`)},g.ptm(`toggleIcon`)),null,16,[`class`]))]}),d(`span`,u({class:g.cx(`legendLabel`)},g.ptm(`legendLabel`)),i(g.legend),17)],16,N)),[[S]]):s(``,!0)]})],16,j),p(h,u({name:`p-collapsible`},g.ptm(`transition`)),{default:a(function(){return[e(d(`div`,u({id:g.$id+`_content`,class:g.cx(`contentContainer`),role:`region`,"aria-labelledby":g.$id+`_header`},g.ptm(`contentContainer`)),[d(`div`,u({class:g.cx(`contentWrapper`)},g.ptm(`contentWrapper`)),[d(`div`,u({class:g.cx(`content`)},g.ptm(`content`)),[t(g.$slots,`default`)],16)],16)],16,P),[[m,!b.d_collapsed]])]}),_:3},16)],16,A)}C.render=F;export{C as default};