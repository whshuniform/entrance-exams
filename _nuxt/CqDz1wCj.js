import{$ as e,B as t,H as n,L as r,Pt as i,U as a,d as o,f as s,k as c,l,r as u,u as d,z as f}from"./B5nbzVpw.js";import{s as p}from"./BVdjFhz-.js";import{B as m,E as h,_ as g,et as _,t as v,w as y}from"./B0gwFOOa.js";import{t as b}from"./B3htCpnR.js";import{t as x}from"./my3qd5SA.js";import{t as S}from"./v6OhQyn5.js";import{t as C}from"./uv9PFHrF.js";var w=v.extend({name:`tabview`,style:`
    .p-tabview-tablist-container {
        position: relative;
    }

    .p-tabview-scrollable > .p-tabview-tablist-container {
        overflow: hidden;
    }

    .p-tabview-tablist-scroll-container {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tabview-tablist-scroll-container::-webkit-scrollbar {
        display: none;
    }

    .p-tabview-tablist {
        display: flex;
        margin: 0;
        padding: 0;
        list-style-type: none;
        flex: 1 1 auto;
        background: dt('tabview.tab.list.background');
        border: 1px solid dt('tabview.tab.list.border.color');
        border-width: 0 0 1px 0;
        position: relative;
    }

    .p-tabview-tab-header {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        border-style: solid;
        border-width: 0 0 1px 0;
        border-color: transparent transparent dt('tabview.tab.border.color') transparent;
        color: dt('tabview.tab.color');
        padding: 1rem 1.125rem;
        font-weight: 600;
        border-top-right-radius: dt('border.radius.md');
        border-top-left-radius: dt('border.radius.md');
        transition:
            color dt('tabview.transition.duration'),
            outline-color dt('tabview.transition.duration');
        margin: 0 0 -1px 0;
        outline-color: transparent;
    }

    .p-tabview-tablist-item:not(.p-disabled) .p-tabview-tab-header:focus-visible {
        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');
        outline-offset: -1px;
    }

    .p-tabview-tablist-item:not(.p-highlight):not(.p-disabled):hover > .p-tabview-tab-header {
        color: dt('tabview.tab.hover.color');
    }

    .p-tabview-tablist-item.p-highlight > .p-tabview-tab-header {
        color: dt('tabview.tab.active.color');
    }

    .p-tabview-tab-title {
        line-height: 1;
        white-space: nowrap;
    }

    .p-tabview-next-button,
    .p-tabview-prev-button {
        position: absolute;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabview.nav.button.background');
        color: dt('tabview.nav.button.color');
        width: 2.5rem;
        border-radius: 0;
        outline-color: transparent;
        transition:
            color dt('tabview.transition.duration'),
            outline-color dt('tabview.transition.duration');
        box-shadow: dt('tabview.nav.button.shadow');
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-tabview-next-button:focus-visible,
    .p-tabview-prev-button:focus-visible {
        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');
        outline-offset: dt('focus.ring.offset');
    }

    .p-tabview-next-button:hover,
    .p-tabview-prev-button:hover {
        color: dt('tabview.nav.button.hover.color');
    }

    .p-tabview-prev-button {
        left: 0;
    }

    .p-tabview-next-button {
        right: 0;
    }

    .p-tabview-panels {
        background: dt('tabview.tab.panel.background');
        color: dt('tabview.tab.panel.color');
        padding: 0.875rem 1.125rem 1.125rem 1.125rem;
    }

    .p-tabview-ink-bar {
        z-index: 1;
        display: block;
        position: absolute;
        bottom: -1px;
        height: 1px;
        background: dt('tabview.tab.active.border.color');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,classes:{root:function(e){return[`p-tabview p-component`,{"p-tabview-scrollable":e.props.scrollable}]},navContainer:`p-tabview-tablist-container`,prevButton:`p-tabview-prev-button`,navContent:`p-tabview-tablist-scroll-container`,nav:`p-tabview-tablist`,tab:{header:function(e){var t=e.instance,n=e.tab,r=e.index;return[`p-tabview-tablist-item`,t.getTabProp(n,`headerClass`),{"p-tabview-tablist-item-active":t.d_activeIndex===r,"p-disabled":t.getTabProp(n,`disabled`)}]},headerAction:`p-tabview-tab-header`,headerTitle:`p-tabview-tab-title`,content:function(e){var t=e.instance,n=e.tab;return[`p-tabview-panel`,t.getTabProp(n,`contentClass`)]}},inkbar:`p-tabview-ink-bar`,nextButton:`p-tabview-next-button`,panelContainer:`p-tabview-panels`}}),T={name:`TabView`,extends:{name:`BaseTabView`,extends:b,props:{activeIndex:{type:Number,default:0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},prevIcon:{type:String,default:void 0},nextIcon:{type:String,default:void 0}},style:w,provide:function(){return{$pcTabs:void 0,$pcTabView:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:activeIndex`,`tab-change`,`tab-click`],data:function(){return{d_activeIndex:this.activeIndex,isPrevButtonDisabled:!0,isNextButtonDisabled:!1}},watch:{activeIndex:function(e){this.d_activeIndex=e,this.scrollInView({index:e})}},mounted:function(){console.warn(`Deprecated since v4. Use Tabs component instead.`),this.updateInkBar(),this.scrollable&&this.updateButtonState()},updated:function(){this.updateInkBar(),this.scrollable&&this.updateButtonState()},methods:{isTabPanel:function(e){return e.type.name===`TabPanel`},isTabActive:function(e){return this.d_activeIndex===e},getTabProp:function(e,t){return e.props?e.props[t]:void 0},getKey:function(e,t){return this.getTabProp(e,`header`)||t},getTabHeaderActionId:function(e){return`${this.$id}_${e}_header_action`},getTabContentId:function(e){return`${this.$id}_${e}_content`},getTabPT:function(e,t,n){var r=this.tabs.length,i={props:e.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:n,count:r,first:n===0,last:n===r-1,active:this.isTabActive(n)}};return c(this.ptm(`tabpanel.${t}`,{tabpanel:i}),this.ptm(`tabpanel.${t}`,i),this.ptmo(this.getTabProp(e,`pt`),t,i))},onScroll:function(e){this.scrollable&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,t=h(e),n=e.scrollLeft-t;e.scrollLeft=n<=0?0:n},onNextButtonClick:function(){var e=this.$refs.content,t=h(e)-this.getVisibleButtonWidths(),n=e.scrollLeft+t,r=e.scrollWidth-t;e.scrollLeft=n>=r?r:n},onTabClick:function(e,t,n){this.changeActiveIndex(e,t,n),this.$emit(`tab-click`,{originalEvent:e,index:n})},onTabKeyDown:function(e,t,n){switch(e.code){case`ArrowLeft`:this.onTabArrowLeftKey(e);break;case`ArrowRight`:this.onTabArrowRightKey(e);break;case`Home`:this.onTabHomeKey(e);break;case`End`:this.onTabEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onTabEnterKey(e,t,n)}},onTabArrowRightKey:function(e){var t=this.findNextHeaderAction(e.target.parentElement);t?this.changeFocusedTab(e,t):this.onTabHomeKey(e),e.preventDefault()},onTabArrowLeftKey:function(e){var t=this.findPrevHeaderAction(e.target.parentElement);t?this.changeFocusedTab(e,t):this.onTabEndKey(e),e.preventDefault()},onTabHomeKey:function(e){var t=this.findFirstHeaderAction();this.changeFocusedTab(e,t),e.preventDefault()},onTabEndKey:function(e){var t=this.findLastHeaderAction();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey:function(e){this.scrollInView({index:this.$refs.nav.children.length-2}),e.preventDefault()},onPageUpKey:function(e){this.scrollInView({index:0}),e.preventDefault()},onTabEnterKey:function(e,t,n){this.changeActiveIndex(e,t,n),e.preventDefault()},findNextHeaderAction:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?y(t,`data-p-disabled`)||y(t,`data-pc-section`)===`inkbar`?this.findNextHeaderAction(t):_(t,`[data-pc-section="headeraction"]`):null},findPrevHeaderAction:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?y(t,`data-p-disabled`)||y(t,`data-pc-section`)===`inkbar`?this.findPrevHeaderAction(t):_(t,`[data-pc-section="headeraction"]`):null},findFirstHeaderAction:function(){return this.findNextHeaderAction(this.$refs.nav.firstElementChild,!0)},findLastHeaderAction:function(){return this.findPrevHeaderAction(this.$refs.nav.lastElementChild,!0)},changeActiveIndex:function(e,t,n){!this.getTabProp(t,`disabled`)&&this.d_activeIndex!==n&&(this.d_activeIndex=n,this.$emit(`update:activeIndex`,n),this.$emit(`tab-change`,{originalEvent:e,index:n}),this.scrollInView({index:n}))},changeFocusedTab:function(e,t){if(t&&(m(t),this.scrollInView({element:t}),this.selectOnFocus)){var n=parseInt(t.parentElement.dataset.pcIndex,10),r=this.tabs[n];this.changeActiveIndex(e,r,n)}},scrollInView:function(e){var t=e.element,n=e.index,r=n===void 0?-1:n,i=t||this.$refs.nav.children[r];i&&i.scrollIntoView&&i.scrollIntoView({block:`nearest`})},updateInkBar:function(){var e=this.$refs.nav.children[this.d_activeIndex];this.$refs.inkbar.style.width=h(e)+`px`,this.$refs.inkbar.style.left=g(e).left-g(this.$refs.nav).left+`px`},updateButtonState:function(){var e=this.$refs.content,t=e.scrollLeft,n=e.scrollWidth,r=h(e);this.isPrevButtonDisabled=t===0,this.isNextButtonDisabled=parseInt(t)===n-r},getVisibleButtonWidths:function(){var e=this.$refs;return[e.prevBtn,e.nextBtn].reduce(function(e,t){return t?e+h(t):e},0)}},computed:{tabs:function(){var e=this;return this.$slots.default().reduce(function(t,n){return e.isTabPanel(n)?t.push(n):n.children&&n.children instanceof Array&&n.children.forEach(function(n){e.isTabPanel(n)&&t.push(n)}),t},[])},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},directives:{ripple:x},components:{ChevronLeftIcon:C,ChevronRightIcon:S}};function E(e){"@babel/helpers - typeof";return E=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},E(e)}function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?D(Object(n),!0).forEach(function(t){k(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function k(e,t,n){return(t=A(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e){var t=j(e,`string`);return E(t)==`symbol`?t:t+``}function j(e,t){if(E(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(E(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var M=[`tabindex`,`aria-label`],N=[`data-p-active`,`data-p-disabled`,`data-pc-index`],P=[`id`,`tabindex`,`aria-disabled`,`aria-selected`,`aria-controls`,`onClick`,`onKeydown`],F=[`tabindex`,`aria-label`],I=[`id`,`aria-labelledby`,`data-pc-index`,`data-p-active`];function L(m,h,g,_,v,y){var b=n(`ripple`);return r(),s(`div`,c({class:m.cx(`root`),role:`tablist`},m.ptmi(`root`)),[l(`div`,c({class:m.cx(`navContainer`)},m.ptm(`navContainer`)),[m.scrollable&&!v.isPrevButtonDisabled?e((r(),s(`button`,c({key:0,ref:`prevBtn`,type:`button`,class:m.cx(`prevButton`),tabindex:m.tabindex,"aria-label":y.prevButtonAriaLabel,onClick:h[0]||=function(){return y.onPrevButtonClick&&y.onPrevButtonClick.apply(y,arguments)}},O(O({},m.prevButtonProps),m.ptm(`prevButton`)),{"data-pc-group-section":`navbutton`}),[t(m.$slots,`previcon`,{},function(){return[(r(),d(a(m.prevIcon?`span`:`ChevronLeftIcon`),c({"aria-hidden":`true`,class:m.prevIcon},m.ptm(`prevIcon`)),null,16,[`class`]))]})],16,M)),[[b]]):o(``,!0),l(`div`,c({ref:`content`,class:m.cx(`navContent`),onScroll:h[1]||=function(){return y.onScroll&&y.onScroll.apply(y,arguments)}},m.ptm(`navContent`)),[l(`ul`,c({ref:`nav`,class:m.cx(`nav`)},m.ptm(`nav`)),[(r(!0),s(u,null,f(y.tabs,function(t,n){return r(),s(`li`,c({key:y.getKey(t,n),style:y.getTabProp(t,`headerStyle`),class:m.cx(`tab.header`,{tab:t,index:n}),role:`presentation`},{ref_for:!0},O(O(O({},y.getTabProp(t,`headerProps`)),y.getTabPT(t,`root`,n)),y.getTabPT(t,`header`,n)),{"data-pc-name":`tabpanel`,"data-p-active":v.d_activeIndex===n,"data-p-disabled":y.getTabProp(t,`disabled`),"data-pc-index":n}),[e((r(),s(`a`,c({id:y.getTabHeaderActionId(n),class:m.cx(`tab.headerAction`),tabindex:y.getTabProp(t,`disabled`)||!y.isTabActive(n)?-1:m.tabindex,role:`tab`,"aria-disabled":y.getTabProp(t,`disabled`),"aria-selected":y.isTabActive(n),"aria-controls":y.getTabContentId(n),onClick:function(e){return y.onTabClick(e,t,n)},onKeydown:function(e){return y.onTabKeyDown(e,t,n)}},{ref_for:!0},O(O({},y.getTabProp(t,`headerActionProps`)),y.getTabPT(t,`headerAction`,n))),[t.props&&t.props.header?(r(),s(`span`,c({key:0,class:m.cx(`tab.headerTitle`)},{ref_for:!0},y.getTabPT(t,`headerTitle`,n)),i(t.props.header),17)):o(``,!0),t.children&&t.children.header?(r(),d(a(t.children.header),{key:1})):o(``,!0)],16,P)),[[b]])],16,N)}),128)),l(`li`,c({ref:`inkbar`,class:m.cx(`inkbar`),role:`presentation`,"aria-hidden":`true`},m.ptm(`inkbar`)),null,16)],16)],16),m.scrollable&&!v.isNextButtonDisabled?e((r(),s(`button`,c({key:1,ref:`nextBtn`,type:`button`,class:m.cx(`nextButton`),tabindex:m.tabindex,"aria-label":y.nextButtonAriaLabel,onClick:h[2]||=function(){return y.onNextButtonClick&&y.onNextButtonClick.apply(y,arguments)}},O(O({},m.nextButtonProps),m.ptm(`nextButton`)),{"data-pc-group-section":`navbutton`}),[t(m.$slots,`nexticon`,{},function(){return[(r(),d(a(m.nextIcon?`span`:`ChevronRightIcon`),c({"aria-hidden":`true`,class:m.nextIcon},m.ptm(`nextIcon`)),null,16,[`class`]))]})],16,F)),[[b]]):o(``,!0)],16),l(`div`,c({class:m.cx(`panelContainer`)},m.ptm(`panelContainer`)),[(r(!0),s(u,null,f(y.tabs,function(t,n){return r(),s(u,{key:y.getKey(t,n)},[!m.lazy||y.isTabActive(n)?e((r(),s(`div`,c({key:0,id:y.getTabContentId(n),style:y.getTabProp(t,`contentStyle`),class:m.cx(`tab.content`,{tab:t}),role:`tabpanel`,"aria-labelledby":y.getTabHeaderActionId(n)},{ref_for:!0},O(O(O({},y.getTabProp(t,`contentProps`)),y.getTabPT(t,`root`,n)),y.getTabPT(t,`content`,n)),{"data-pc-name":`tabpanel`,"data-pc-index":n,"data-p-active":v.d_activeIndex===n}),[(r(),d(a(t)))],16,I)),[[p,m.lazy?!0:y.isTabActive(n)]]):o(``,!0)],64)}),128))],16)],16)}T.render=L;export{T as default};