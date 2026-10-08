import{$ as e,H as t,L as n,Pt as r,U as i,d as a,f as o,jt as s,k as c,l,r as u,u as d,z as f}from"./B5nbzVpw.js";import{E as p,P as m,_ as h,et as g,t as _,w as v}from"./B0gwFOOa.js";import{t as y}from"./B3htCpnR.js";import{t as b}from"./my3qd5SA.js";var x=_.extend({name:`tabmenu`,style:`
    .p-tabmenu {
        overflow-x: auto;
    }

    .p-tabmenu-tablist {
        display: flex;
        margin: 0;
        padding: 0;
        list-style-type: none;
        background: dt('tabmenu.tablist.background');
        border-style: solid;
        border-color: dt('tabmenu.tablist.border.color');
        border-width: dt('tabmenu.tablist.border.width');
        position: relative;
    }

    .p-tabmenu-item-link {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        background: dt('tabmenu.item.background');
        border-style: solid;
        border-width: dt('tabmenu.item.border.width');
        border-color: dt('tabmenu.item.border.color');
        color: dt('tabmenu.item.color');
        padding: dt('tabmenu.item.padding');
        font-weight: dt('tabmenu.item.font.weight');
        transition:
            background dt('tabmenu.transition.duration'),
            border-color dt('tabmenu.transition.duration'),
            color dt('tabmenu.transition.duration'),
            outline-color dt('tabmenu.transition.duration'),
            box-shadow dt('tabmenu.transition.duration');
        margin: dt('tabmenu.item.margin');
        outline-color: transparent;
        gap: dt('tabmenu.item.gap');
    }

    .p-tabmenu-item-link:focus-visible {
        z-index: 1;
        box-shadow: dt('tabmenu.item.focus.ring.shadow');
        outline: dt('tabmenu.item.focus.ring.width') dt('tabmenu.item.focus.ring.style') dt('tabmenu.item.focus.ring.color');
        outline-offset: dt('tabmenu.item.focus.ring.offset');
    }

    .p-tabmenu-item-icon {
        color: dt('tabmenu.item.icon.color');
        transition:
            background dt('tabmenu.transition.duration'),
            border-color dt('tabmenu.transition.duration'),
            color dt('tabmenu.transition.duration'),
            outline-color dt('tabmenu.transition.duration'),
            box-shadow dt('tabmenu.transition.duration');
    }

    .p-tabmenu-item-label {
        line-height: 1;
    }

    .p-tabmenu-item:not(.p-tabmenu-item-active):not(.p-disabled):hover .p-tabmenu-item-link {
        background: dt('tabmenu.item.hover.background');
        border-color: dt('tabmenu.item.hover.border.color');
        color: dt('tabmenu.item.hover.color');
    }

    .p-tabmenu-item:not(.p-tabmenu-item-active):not(.p-disabled):hover .p-tabmenu-item-icon {
        color: dt('tabmenu.item.icon.hover.color');
    }

    .p-tabmenu-item-active .p-tabmenu-item-link {
        background: dt('tabmenu.item.active.background');
        border-color: dt('tabmenu.item.active.border.color');
        color: dt('tabmenu.item.active.color');
    }

    .p-tabmenu-item-active .p-tabmenu-item-icon {
        color: dt('tabmenu.item.icon.active.color');
    }

    .p-tabmenu-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        bottom: dt('tabmenu.active.bar.bottom');
        height: dt('tabmenu.active.bar.height');
        background: dt('tabmenu.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }

    .p-tabmenu::-webkit-scrollbar {
        display: none;
    }
`,classes:{root:`p-tabmenu p-component`,tablist:`p-tabmenu-tablist`,item:function(e){var t=e.instance,n=e.index,r=e.item;return[`p-tabmenu-item`,{"p-tabmenu-item-active":t.d_activeIndex===n,"p-disabled":t.disabled(r)}]},itemLink:`p-tabmenu-item-link`,itemIcon:`p-tabmenu-item-icon`,itemLabel:`p-tabmenu-item-label`,activeBar:`p-tabmenu-active-bar`}}),S={name:`TabMenu`,extends:{name:`BaseTabMenu`,extends:y,props:{model:{type:Array,default:null},activeIndex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:x,provide:function(){return{$pcTabMenu:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:activeIndex`,`tab-change`],data:function(){return{d_activeIndex:this.activeIndex}},watch:{activeIndex:{flush:`post`,handler:function(e){this.d_activeIndex=e,this.updateInkBar()}}},mounted:function(){var e=this;this.$nextTick(function(){e.updateInkBar()});var t=this.findActiveItem();t&&(t.tabIndex=`0`)},updated:function(){this.updateInkBar()},methods:{getPTOptions:function(e,t,n){return this.ptm(e,{context:{item:t,index:n}})},onItemClick:function(e,t,n){if(this.disabled(t)){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),n!==this.d_activeIndex&&(this.d_activeIndex=n,this.$emit(`update:activeIndex`,this.d_activeIndex)),this.$emit(`tab-change`,{originalEvent:e,index:n})},onKeydownItem:function(e,t,n){switch(e.code){case`ArrowRight`:this.navigateToNextItem(e.target),e.preventDefault();break;case`ArrowLeft`:this.navigateToPrevItem(e.target),e.preventDefault();break;case`Home`:this.navigateToFirstItem(e.target),e.preventDefault();break;case`End`:this.navigateToLastItem(e.target),e.preventDefault();break;case`Space`:case`NumpadEnter`:case`Enter`:this.onItemClick(e,t,n),e.preventDefault();break;case`Tab`:this.onTabKey()}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?v(t,`data-p-disabled`)===!0?this.findNextItem(t.children[0]):t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?v(t,`data-p-disabled`)===!0?this.findPrevItem(t.children[0]):t.children[0]:null},findFirstItem:function(){var e=g(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"]`);return e?e.children[0]:null},findLastItem:function(){var e=m(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"]`);return e?e[e.length-1].children[0]:null},findActiveItem:function(){var e=g(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"][data-p-active="true"]`);return e?e.children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex=`-1`,t.tabIndex=`0`,t.focus()},onTabKey:function(){var e=g(this.$refs.nav,`[data-pc-section="item"][data-p-disabled="false"][data-p-active="true"]`),t=g(this.$refs.nav,`[data-pc-section="itemlink"][tabindex="0"]`);t!==e.children[0]&&(e&&(e.children[0].tabIndex=`0`),t.tabIndex=`-1`)},visible:function(e){return typeof e.visible==`function`?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled===!0},label:function(e){return typeof e.label==`function`?e.label():e.label},updateInkBar:function(){for(var e=this.$refs.nav.children,t=!1,n=0;n<e.length;n++){var r=e[n];v(r,`data-p-active`)&&(this.$refs.inkbar.style.width=p(r)+`px`,this.$refs.inkbar.style.left=h(r).left-h(this.$refs.nav).left+`px`,t=!0)}t||(this.$refs.inkbar.style.width=`0px`,this.$refs.inkbar.style.left=`0px`)},getMenuItemProps:function(e,t){var n=this;return{action:c({class:this.cx(`itemLink`),tabindex:-1,onClick:function(r){return n.onItemClick(r,e,t)},onKeyDown:function(r){return n.onKeydownItem(r,e,t)}},this.getPTOptions(`itemLink`,e,t)),icon:c({class:[this.cx(`itemIcon`),e.icon]},this.getPTOptions(`itemIcon`,e,t)),label:c({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`,e,t))}}},directives:{ripple:b}},C=[`aria-labelledby`,`aria-label`],w=[`onClick`,`onKeydown`,`data-p-active`,`data-p-disabled`],T=[`href`,`target`,`aria-label`,`aria-disabled`];function E(p,m,h,g,_,v){var y=t(`ripple`);return n(),o(`div`,c({class:p.cx(`root`)},p.ptmi(`root`)),[l(`ul`,c({ref:`nav`,class:p.cx(`tablist`),role:`menubar`,"aria-labelledby":p.ariaLabelledby,"aria-label":p.ariaLabel},p.ptm(`tablist`)),[(n(!0),o(u,null,f(p.model,function(t,f){return n(),o(u,{key:v.label(t)+`_`+f.toString()},[v.visible(t)?(n(),o(`li`,c({key:0,ref_for:!0,ref:`tab`,class:[p.cx(`item`,{item:t,index:f}),t.class],role:`presentation`,onClick:function(e){return v.onItemClick(e,t,f)},onKeydown:function(e){return v.onKeydownItem(e,t,f)}},{ref_for:!0},v.getPTOptions(`item`,t,f),{"data-p-active":_.d_activeIndex===f,"data-p-disabled":v.disabled(t)}),[p.$slots.item?(n(),d(i(p.$slots.item),{key:1,item:t,index:f,active:f===_.d_activeIndex,label:v.label(t),props:v.getMenuItemProps(t,f)},null,8,[`item`,`index`,`active`,`label`,`props`])):e((n(),o(`a`,c({key:0,ref_for:!0,ref:`tabLink`,role:`menuitem`,href:t.url,class:p.cx(`itemLink`),target:t.target,"aria-label":v.label(t),"aria-disabled":v.disabled(t),tabindex:-1},{ref_for:!0},v.getPTOptions(`itemLink`,t,f)),[p.$slots.itemicon?(n(),d(i(p.$slots.itemicon),{key:0,item:t,class:s(p.cx(`itemIcon`))},null,8,[`item`,`class`])):t.icon?(n(),o(`span`,c({key:1,class:[p.cx(`itemIcon`),t.icon]},{ref_for:!0},v.getPTOptions(`itemIcon`,t,f)),null,16)):a(``,!0),l(`span`,c({class:p.cx(`itemLabel`)},{ref_for:!0},v.getPTOptions(`itemLabel`,t,f)),r(v.label(t)),17)],16,T)),[[y]])],16,w)):a(``,!0)],64)}),128)),l(`li`,c({ref:`inkbar`,role:`none`,class:p.cx(`activeBar`)},p.ptm(`activeBar`)),null,16)],16,C)],16)}S.render=E;export{S as default};