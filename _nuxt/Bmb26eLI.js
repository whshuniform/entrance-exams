import{B as e,L as t,Q as n,U as r,V as i,f as a,h as o,jt as s,k as c,l,u,v as d}from"./B5nbzVpw.js";import{t as f,xt as p}from"./B0gwFOOa.js";import{t as m}from"./B3htCpnR.js";import{n as h}from"./CLv4pO_c.js";import{t as g}from"./TIYBATRn.js";import _ from"./BBfbF55s.js";var v=f.extend({name:`splitbutton`,style:`
    .p-splitbutton {
        display: inline-flex;
        position: relative;
        border-radius: dt('splitbutton.border.radius');
    }

    .p-splitbutton-button.p-button {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        border-inline-end: 0 none;
    }

    .p-splitbutton-button.p-button:focus-visible,
    .p-splitbutton-dropdown.p-button:focus-visible {
        z-index: 1;
    }

    .p-splitbutton-button.p-button:not(:disabled):hover,
    .p-splitbutton-button.p-button:not(:disabled):active {
        border-inline-end: 0 none;
    }

    .p-splitbutton-dropdown.p-button {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    .p-splitbutton .p-menu {
        min-width: 100%;
    }

    .p-splitbutton-fluid {
        display: flex;
    }

    .p-splitbutton-rounded .p-splitbutton-dropdown.p-button {
        border-start-end-radius: dt('splitbutton.rounded.border.radius');
        border-end-end-radius: dt('splitbutton.rounded.border.radius');
    }

    .p-splitbutton-rounded .p-splitbutton-button.p-button {
        border-start-start-radius: dt('splitbutton.rounded.border.radius');
        border-end-start-radius: dt('splitbutton.rounded.border.radius');
    }

    .p-splitbutton-raised {
        box-shadow: dt('splitbutton.raised.shadow');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-splitbutton p-component`,{"p-splitbutton-raised":n.raised,"p-splitbutton-rounded":n.rounded,"p-splitbutton-fluid":t.hasFluid}]},pcButton:`p-splitbutton-button`,pcDropdown:`p-splitbutton-dropdown`}}),y={name:`SplitButton`,extends:{name:`BaseSplitButton`,extends:m,props:{label:{type:String,default:null},icon:{type:String,default:null},model:{type:Array,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:`body`},disabled:{type:Boolean,default:!1},fluid:{type:Boolean,default:null},class:{type:null,default:null},style:{type:null,default:null},buttonProps:{type:null,default:null},menuButtonProps:{type:null,default:null},menuButtonIcon:{type:String,default:void 0},dropdownIcon:{type:String,default:void 0},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},plain:{type:Boolean,default:!1}},style:v,provide:function(){return{$pcSplitButton:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`click`],inject:{$pcFluid:{default:null}},data:function(){return{isExpanded:!1}},mounted:function(){var e=this;this.$watch(`$refs.menu.visible`,function(t){e.isExpanded=t})},methods:{onDropdownButtonClick:function(e){e&&e.preventDefault(),this.$refs.menu.toggle({currentTarget:this.$el,relatedTarget:this.$refs.button.$el}),this.isExpanded=this.$refs.menu.visible},onDropdownKeydown:function(e){(e.code===`ArrowDown`||e.code===`ArrowUp`)&&(this.onDropdownButtonClick(),e.preventDefault())},onDefaultButtonClick:function(e){this.isExpanded&&this.$refs.menu.hide(e),this.$emit(`click`,e)}},computed:{containerClass:function(){return[this.cx(`root`),this.class]},hasFluid:function(){return p(this.fluid)?!!this.$pcFluid:this.fluid}},components:{PVSButton:h,PVSMenu:_,ChevronDownIcon:g}},b=[`data-p-severity`];function x(f,p,m,h,g,_){var v=i(`PVSButton`),y=i(`PVSMenu`);return t(),a(`div`,c({class:_.containerClass,style:f.style},f.ptmi(`root`),{"data-p-severity":f.severity}),[d(v,c({type:`button`,class:f.cx(`pcButton`),label:f.label,disabled:f.disabled,severity:f.severity,text:f.text,icon:f.icon,outlined:f.outlined,size:f.size,fluid:f.fluid,"aria-label":f.label,onClick:_.onDefaultButtonClick},f.buttonProps,{pt:f.ptm(`pcButton`),unstyled:f.unstyled}),o({default:n(function(){return[e(f.$slots,`default`)]}),_:2},[f.$slots.icon?{name:`icon`,fn:n(function(t){return[e(f.$slots,`icon`,{class:s(t.class)},function(){return[l(`span`,c({class:[f.icon,t.class]},f.ptm(`pcButton`).icon,{"data-pc-section":`buttonicon`}),null,16)]})]}),key:`0`}:void 0]),1040,[`class`,`label`,`disabled`,`severity`,`text`,`icon`,`outlined`,`size`,`fluid`,`aria-label`,`onClick`,`pt`,`unstyled`]),d(v,c({ref:`button`,type:`button`,class:f.cx(`pcDropdown`),disabled:f.disabled,"aria-haspopup":`true`,"aria-expanded":g.isExpanded,"aria-controls":g.isExpanded?f.$id+`_overlay`:void 0,onClick:_.onDropdownButtonClick,onKeydown:_.onDropdownKeydown,severity:f.severity,text:f.text,outlined:f.outlined,size:f.size,unstyled:f.unstyled},f.menuButtonProps,{pt:f.ptm(`pcDropdown`)}),{icon:n(function(n){return[e(f.$slots,f.$slots.dropdownicon?`dropdownicon`:`menubuttonicon`,{class:s(n.class)},function(){return[(t(),u(r(f.menuButtonIcon||f.dropdownIcon?`span`:`ChevronDownIcon`),c({class:[f.dropdownIcon||f.menuButtonIcon,n.class]},f.ptm(`pcDropdown`).icon,{"data-pc-section":`menubuttonicon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`disabled`,`aria-expanded`,`aria-controls`,`onClick`,`onKeydown`,`severity`,`text`,`outlined`,`size`,`unstyled`,`pt`]),d(y,{ref:`menu`,id:f.$id+`_overlay`,model:f.model,popup:!0,autoZIndex:f.autoZIndex,baseZIndex:f.baseZIndex,appendTo:f.appendTo,unstyled:f.unstyled,pt:f.ptm(`pcMenu`)},o({_:2},[f.$slots.menuitemicon?{name:`itemicon`,fn:n(function(t){return[e(f.$slots,`menuitemicon`,{item:t.item,class:s(t.class)})]}),key:`0`}:void 0,f.$slots.item?{name:`item`,fn:n(function(t){return[e(f.$slots,`item`,{item:t.item,hasSubmenu:t.hasSubmenu,label:t.label,props:t.props})]}),key:`1`}:void 0]),1032,[`id`,`model`,`autoZIndex`,`baseZIndex`,`appendTo`,`unstyled`,`pt`])],16,b)}y.render=x;export{y as default};