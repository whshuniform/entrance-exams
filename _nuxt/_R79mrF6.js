import{$ as e,B as t,H as n,L as r,Pt as i,Q as a,U as o,V as s,d as c,f as l,h as u,jt as d,k as f,l as p,r as m,u as h,v as g}from"./B5nbzVpw.js";import{t as _}from"./BVdjFhz-.js";import{B as v,F as y,M as b,_ as x,i as S,l as C,t as w}from"./B0gwFOOa.js";import{t as T}from"./cO8iUN-n.js";import{r as E}from"#entry";import{t as D}from"./B3htCpnR.js";import{n as O}from"./CLv4pO_c.js";import{t as k}from"./F7EYAUwf.js";import{t as A}from"./D7RhKSRs.js";import{t as j}from"./DLLG_Ueq.js";import{t as M}from"./DSkZE018.js";var N=w.extend({name:`confirmpopup`,style:`
    .p-confirmpopup {
        position: absolute;
        margin-top: dt('confirmpopup.gutter');
        top: 0;
        left: 0;
        background: dt('confirmpopup.background');
        color: dt('confirmpopup.color');
        border: 1px solid dt('confirmpopup.border.color');
        border-radius: dt('confirmpopup.border.radius');
        box-shadow: dt('confirmpopup.shadow');
        will-change: transform;
    }

    .p-confirmpopup-content {
        display: flex;
        align-items: center;
        padding: dt('confirmpopup.content.padding');
        gap: dt('confirmpopup.content.gap');
    }

    .p-confirmpopup-icon {
        font-size: dt('confirmpopup.icon.size');
        width: dt('confirmpopup.icon.size');
        height: dt('confirmpopup.icon.size');
        color: dt('confirmpopup.icon.color');
    }

    .p-confirmpopup-footer {
        display: flex;
        justify-content: flex-end;
        gap: dt('confirmpopup.footer.gap');
        padding: dt('confirmpopup.footer.padding');
    }

    .p-confirmpopup-footer button {
        width: auto;
    }

    .p-confirmpopup-footer button:last-child {
        margin: 0;
    }

    .p-confirmpopup-flipped {
        margin-block-start: calc(dt('confirmpopup.gutter') * -1);
        margin-block-end: dt('confirmpopup.gutter');
    }

    .p-confirmpopup:after,
    .p-confirmpopup:before {
        bottom: 100%;
        left: calc(dt('confirmpopup.arrow.offset') + dt('confirmpopup.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-confirmpopup:after {
        border-width: calc(dt('confirmpopup.gutter') - 2px);
        margin-left: calc(-1 * (dt('confirmpopup.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('confirmpopup.background');
    }

    .p-confirmpopup:before {
        border-width: dt('confirmpopup.gutter');
        margin-left: calc(-1 * dt('confirmpopup.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('confirmpopup.border.color');
    }

    .p-confirmpopup-flipped:after,
    .p-confirmpopup-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-confirmpopup-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('confirmpopup.background');
    }

    .p-confirmpopup-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('confirmpopup.border.color');
    }
`,classes:{root:`p-confirmpopup p-component`,content:`p-confirmpopup-content`,icon:`p-confirmpopup-icon`,message:`p-confirmpopup-message`,footer:`p-confirmpopup-footer`,pcRejectButton:`p-confirmpopup-reject-button`,pcAcceptButton:`p-confirmpopup-accept-button`}}),P={name:`ConfirmPopup`,extends:{name:`BaseConfirmPopup`,extends:D,props:{group:String},style:N,provide:function(){return{$pcConfirmPopup:this,$parentInstance:this}}},inheritAttrs:!1,data:function(){return{visible:!1,confirmation:null,autoFocusAccept:null,autoFocusReject:null,target:null}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted:function(){var e=this;this.confirmListener=function(t){t&&t.group===e.group&&(e.confirmation=t,e.target=t.target,e.confirmation.onShow&&e.confirmation.onShow(),e.visible=!0)},this.closeListener=function(){e.visible=!1,e.confirmation=null},E.on(`confirm`,this.confirmListener),E.on(`close`,this.closeListener)},beforeUnmount:function(){E.off(`confirm`,this.confirmListener),E.off(`close`,this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.unbindResizeListener(),this.container&&=(T.clear(this.container),null),this.target=null,this.confirmation=null},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown:function(e){(e.code===`Space`||e.code===`Enter`||e.code===`NumpadEnter`)&&(this.accept(),v(this.target),e.preventDefault())},onRejectKeydown:function(e){(e.code===`Space`||e.code===`Enter`||e.code===`NumpadEnter`)&&(this.reject(),v(this.target),e.preventDefault())},onEnter:function(e){this.autoFocusAccept=this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus===`accept`,this.autoFocusReject=this.confirmation.defaultFocus===`reject`,this.target=this.target||document.activeElement,this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),T.set(`overlay`,e,this.$primevue.config.zIndex.overlay)},onAfterEnter:function(){this.focus()},onLeave:function(){this.autoFocusAccept=null,this.autoFocusReject=null,v(this.target),this.target=null,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave:function(e){T.clear(e)},alignOverlay:function(){C(this.container,this.target,!1);var e=x(this.container),t=x(this.target),n=0;e.left<t.left&&(n=t.left-e.left),this.container.style.setProperty(S(`confirmpopup.arrow.left`).name,`${n}px`),e.top<t.top&&(this.container.setAttribute(`data-p-confirmpopup-flipped`,`true`),!this.isUnstyled&&b(this.container,`p-confirmpopup-flipped`))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.visible&&e.container&&!e.container.contains(t.target)&&!e.isTargetClicked(t)?(e.confirmation.onHide&&e.confirmation.onHide(),e.visible=!1):e.alignOverlay()},document.addEventListener(`click`,this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new k(this.target,function(){e.visible&&=!1}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!y()&&(e.visible=!1)},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},focus:function(){var e=this.container.querySelector(`[autofocus]`);e&&e.focus({preventScroll:!0})},isTargetClicked:function(e){return this.target&&(this.target===e.target||this.target.contains(e.target))},containerRef:function(e){this.container=e},onOverlayClick:function(e){A.emit(`overlay-click`,{originalEvent:e,target:this.target})},onOverlayKeydown:function(e){e.code===`Escape`&&(E.emit(`close`,this.closeListener),v(this.target))}},computed:{message:function(){return this.confirmation?this.confirmation.message:null},acceptLabel:function(){if(this.confirmation){var e=this.confirmation;return e.acceptLabel||e.acceptProps?.label||this.$primevue.config.locale.accept}return this.$primevue.config.locale.accept},rejectLabel:function(){if(this.confirmation){var e=this.confirmation;return e.rejectLabel||e.rejectProps?.label||this.$primevue.config.locale.reject}return this.$primevue.config.locale.reject},acceptIcon:function(){var e;return this.confirmation?this.confirmation.acceptIcon:(e=this.confirmation)!=null&&e.acceptProps?this.confirmation.acceptProps.icon:null},rejectIcon:function(){var e;return this.confirmation?this.confirmation.rejectIcon:(e=this.confirmation)!=null&&e.rejectProps?this.confirmation.rejectProps.icon:null}},components:{Button:O,Portal:j},directives:{focustrap:M}},F=[`aria-modal`];function I(v,y,b,x,S,C){var w=s(`Button`),T=s(`Portal`),E=n(`focustrap`);return r(),h(T,null,{default:a(function(){return[g(_,f({name:`p-anchored-overlay`,onEnter:C.onEnter,onAfterEnter:C.onAfterEnter,onLeave:C.onLeave,onAfterLeave:C.onAfterLeave},v.ptm(`transition`)),{default:a(function(){return[S.visible?e((r(),l(`div`,f({key:0,ref:C.containerRef,role:`alertdialog`,class:v.cx(`root`),"aria-modal":S.visible,onClick:y[2]||=function(){return C.onOverlayClick&&C.onOverlayClick.apply(C,arguments)},onKeydown:y[3]||=function(){return C.onOverlayKeydown&&C.onOverlayKeydown.apply(C,arguments)}},v.ptmi(`root`)),[v.$slots.container?t(v.$slots,`container`,{key:0,message:S.confirmation,acceptCallback:C.accept,rejectCallback:C.reject}):(r(),l(m,{key:1},[v.$slots.message?(r(),h(o(v.$slots.message),{key:1,message:S.confirmation},null,8,[`message`])):(r(),l(`div`,f({key:0,class:v.cx(`content`)},v.ptm(`content`)),[t(v.$slots,`icon`,{},function(){return[v.$slots.icon?(r(),h(o(v.$slots.icon),{key:0,class:d(v.cx(`icon`))},null,8,[`class`])):S.confirmation.icon?(r(),l(`span`,f({key:1,class:[S.confirmation.icon,v.cx(`icon`)]},v.ptm(`icon`)),null,16)):c(``,!0)]}),p(`span`,f({class:v.cx(`message`)},v.ptm(`message`)),i(S.confirmation.message),17)],16)),p(`div`,f({class:v.cx(`footer`)},v.ptm(`footer`)),[g(w,f({class:[v.cx(`pcRejectButton`),S.confirmation.rejectClass],autofocus:S.autoFocusReject,unstyled:v.unstyled,size:S.confirmation.rejectProps?.size||`small`,text:S.confirmation.rejectProps?.text||!1,onClick:y[0]||=function(e){return C.reject()},onKeydown:C.onRejectKeydown},S.confirmation.rejectProps,{label:C.rejectLabel,pt:v.ptm(`pcRejectButton`)}),u({_:2},[C.rejectIcon||v.$slots.rejecticon?{name:`icon`,fn:a(function(e){return[t(v.$slots,`rejecticon`,{},function(){return[p(`span`,f({class:[C.rejectIcon,e.class]},v.ptm(`pcRejectButton`).icon,{"data-pc-section":`rejectbuttonicon`}),null,16)]})]}),key:`0`}:void 0]),1040,[`class`,`autofocus`,`unstyled`,`size`,`text`,`onKeydown`,`label`,`pt`]),g(w,f({class:[v.cx(`pcAcceptButton`),S.confirmation.acceptClass],autofocus:S.autoFocusAccept,unstyled:v.unstyled,size:S.confirmation.acceptProps?.size||`small`,onClick:y[1]||=function(e){return C.accept()},onKeydown:C.onAcceptKeydown},S.confirmation.acceptProps,{label:C.acceptLabel,pt:v.ptm(`pcAcceptButton`)}),u({_:2},[C.acceptIcon||v.$slots.accepticon?{name:`icon`,fn:a(function(e){return[t(v.$slots,`accepticon`,{},function(){return[p(`span`,f({class:[C.acceptIcon,e.class]},v.ptm(`pcAcceptButton`).icon,{"data-pc-section":`acceptbuttonicon`}),null,16)]})]}),key:`0`}:void 0]),1040,[`class`,`autofocus`,`unstyled`,`size`,`onKeydown`,`label`,`pt`])],16)],64))],16,F)),[[E]]):c(``,!0)]}),_:3},16,[`onEnter`,`onAfterEnter`,`onLeave`,`onAfterLeave`])]}),_:3})}P.render=I;export{P as default};