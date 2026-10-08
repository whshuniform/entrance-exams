import{$ as e,B as t,L as n,Pt as r,Q as i,U as a,V as o,d as s,f as c,jt as l,k as u,l as d,u as f,v as p}from"./B5nbzVpw.js";import{s as m,t as h}from"./BVdjFhz-.js";import{t as g}from"./B0gwFOOa.js";import{t as _}from"./CRHlWn3X.js";import{t as v}from"./B3htCpnR.js";import{t as y}from"./my3qd5SA.js";import{n as b}from"./CLv4pO_c.js";import{t as x}from"./HIb35cBF.js";import{t as S}from"./BJz_L_5W.js";var C=g.extend({name:`panel`,style:`
    .p-panel {
        display: block;
        border: 1px solid dt('panel.border.color');
        border-radius: dt('panel.border.radius');
        background: dt('panel.background');
        color: dt('panel.color');
    }

    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('panel.header.padding');
        background: dt('panel.header.background');
        color: dt('panel.header.color');
        border-style: solid;
        border-width: dt('panel.header.border.width');
        border-color: dt('panel.header.border.color');
        border-radius: dt('panel.header.border.radius');
    }

    .p-panel-toggleable .p-panel-header {
        padding: dt('panel.toggleable.header.padding');
    }

    .p-panel-title {
        line-height: 1;
        font-weight: dt('panel.title.font.weight');
    }

    .p-panel-content-container {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-panel-content-wrapper {
        min-height: 0;
    }

    .p-panel-content {
        padding: dt('panel.content.padding');
    }

    .p-panel-footer {
        padding: dt('panel.footer.padding');
    }
`,classes:{root:function(e){return[`p-panel p-component`,{"p-panel-toggleable":e.props.toggleable}]},header:`p-panel-header`,title:`p-panel-title`,headerActions:`p-panel-header-actions`,pcToggleButton:`p-panel-toggle-button`,contentContainer:`p-panel-content-container`,contentWrapper:`p-panel-content-wrapper`,content:`p-panel-content`,footer:`p-panel-footer`}}),w={name:`Panel`,extends:{name:`BasePanel`,extends:v,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:`secondary`,text:!0,rounded:!0}}}},style:C,provide:function(){return{$pcPanel:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:collapsed`,`toggle`],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(e){this.d_collapsed=e}},methods:{toggle:function(e){this.d_collapsed=!this.d_collapsed,this.$emit(`update:collapsed`,this.d_collapsed),this.$emit(`toggle`,{originalEvent:e,value:this.d_collapsed})},onKeyDown:function(e){(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&(this.toggle(e),e.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return _({toggleable:this.toggleable})}},components:{PlusIcon:S,MinusIcon:x,Button:b},directives:{ripple:y}},T=[`data-p`],E=[`data-p`],D=[`id`],O=[`id`,`aria-labelledby`];function k(g,_,v,y,b,x){var S=o(`Button`);return n(),c(`div`,u({class:g.cx(`root`),"data-p":x.dataP},g.ptmi(`root`)),[d(`div`,u({class:g.cx(`header`),"data-p":x.dataP},g.ptm(`header`)),[t(g.$slots,`header`,{id:g.$id+`_header`,class:l(g.cx(`title`)),collapsed:b.d_collapsed},function(){return[g.header?(n(),c(`span`,u({key:0,id:g.$id+`_header`,class:g.cx(`title`)},g.ptm(`title`)),r(g.header),17,D)):s(``,!0)]}),d(`div`,u({class:g.cx(`headerActions`)},g.ptm(`headerActions`)),[t(g.$slots,`icons`),g.toggleable?t(g.$slots,`togglebutton`,{key:0,collapsed:b.d_collapsed,toggleCallback:function(e){return x.toggle(e)},keydownCallback:function(e){return x.onKeyDown(e)}},function(){return[p(S,u({id:g.$id+`_header`,class:g.cx(`pcToggleButton`),"aria-label":x.buttonAriaLabel,"aria-controls":g.$id+`_content`,"aria-expanded":!b.d_collapsed,unstyled:g.unstyled,onClick:_[0]||=function(e){return x.toggle(e)},onKeydown:_[1]||=function(e){return x.onKeyDown(e)}},g.toggleButtonProps,{pt:g.ptm(`pcToggleButton`)}),{icon:i(function(e){return[t(g.$slots,g.$slots.toggleicon?`toggleicon`:`togglericon`,{collapsed:b.d_collapsed},function(){return[(n(),f(a(b.d_collapsed?`PlusIcon`:`MinusIcon`),u({class:e.class},g.ptm(`pcToggleButton`).icon),null,16,[`class`]))]})]}),_:3},16,[`id`,`class`,`aria-label`,`aria-controls`,`aria-expanded`,`unstyled`,`pt`])]}):s(``,!0)],16)],16,E),p(h,u({name:`p-collapsible`},g.ptm(`transition`)),{default:i(function(){return[e(d(`div`,u({id:g.$id+`_content`,class:g.cx(`contentContainer`),role:`region`,"aria-labelledby":g.$id+`_header`},g.ptm(`contentContainer`)),[d(`div`,u({class:g.cx(`contentWrapper`)},g.ptm(`contentWrapper`)),[d(`div`,u({class:g.cx(`content`)},g.ptm(`content`)),[t(g.$slots,`default`)],16),g.$slots.footer?(n(),c(`div`,u({key:0,class:g.cx(`footer`)},g.ptm(`footer`)),[t(g.$slots,`footer`)],16)):s(``,!0)],16)],16,O),[[m,!b.d_collapsed]])]}),_:3},16)],16,T)}w.render=k;export{w as default};