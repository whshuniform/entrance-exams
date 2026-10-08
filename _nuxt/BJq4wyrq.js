import{$ as e,B as t,H as n,L as r,Mt as i,Pt as a,Q as o,U as s,V as c,_ as l,d as u,f as d,h as f,jt as p,k as m,l as ee,r as h,u as g,z as _}from"./B5nbzVpw.js";import{L as v,t as y}from"./B0gwFOOa.js";import{t as b}from"./B3htCpnR.js";import{t as x}from"./my3qd5SA.js";import{n as S}from"./CGdU3V0x.js";import{t as C}from"./Iw-qHQyv.js";import{n as w,r as T,t as te}from"./ClE6Ghfs.js";import{t as E}from"./ByY6Po3j.js";var ne=`
    .p-paginator {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background: dt('paginator.background');
        color: dt('paginator.color');
        padding: dt('paginator.padding');
        border-radius: dt('paginator.border.radius');
        gap: dt('paginator.gap');
    }

    .p-paginator-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: dt('paginator.gap');
    }

    .p-paginator-content-start {
        margin-inline-end: auto;
    }

    .p-paginator-content-end {
        margin-inline-start: auto;
    }

    .p-paginator-page,
    .p-paginator-next,
    .p-paginator-last,
    .p-paginator-first,
    .p-paginator-prev {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        user-select: none;
        overflow: hidden;
        position: relative;
        background: dt('paginator.nav.button.background');
        border: 0 none;
        color: dt('paginator.nav.button.color');
        min-width: dt('paginator.nav.button.width');
        height: dt('paginator.nav.button.height');
        transition:
            background dt('paginator.transition.duration'),
            color dt('paginator.transition.duration'),
            outline-color dt('paginator.transition.duration'),
            box-shadow dt('paginator.transition.duration');
        border-radius: dt('paginator.nav.button.border.radius');
        padding: 0;
        margin: 0;
    }

    .p-paginator-page:focus-visible,
    .p-paginator-next:focus-visible,
    .p-paginator-last:focus-visible,
    .p-paginator-first:focus-visible,
    .p-paginator-prev:focus-visible {
        box-shadow: dt('paginator.nav.button.focus.ring.shadow');
        outline: dt('paginator.nav.button.focus.ring.width') dt('paginator.nav.button.focus.ring.style') dt('paginator.nav.button.focus.ring.color');
        outline-offset: dt('paginator.nav.button.focus.ring.offset');
    }

    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,
    .p-paginator-first:not(.p-disabled):hover,
    .p-paginator-prev:not(.p-disabled):hover,
    .p-paginator-next:not(.p-disabled):hover,
    .p-paginator-last:not(.p-disabled):hover {
        background: dt('paginator.nav.button.hover.background');
        color: dt('paginator.nav.button.hover.color');
    }

    .p-paginator-page.p-paginator-page-selected {
        background: dt('paginator.nav.button.selected.background');
        color: dt('paginator.nav.button.selected.color');
    }

    .p-paginator-current {
        color: dt('paginator.current.page.report.color');
    }

    .p-paginator-pages {
        display: flex;
        align-items: center;
        gap: dt('paginator.gap');
    }

    .p-paginator-jtp-input .p-inputtext {
        max-width: dt('paginator.jump.to.page.input.max.width');
    }

    .p-paginator-first:dir(rtl),
    .p-paginator-prev:dir(rtl),
    .p-paginator-next:dir(rtl),
    .p-paginator-last:dir(rtl) {
        transform: rotate(180deg);
    }
`;function D(e){"@babel/helpers - typeof";return D=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},D(e)}function O(e,t,n){return(t=k(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e){var t=A(e,`string`);return D(t)==`symbol`?t:t+``}function A(e,t){if(D(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(D(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var j=y.extend({name:`paginator`,style:ne,classes:{paginator:function(e){var t=e.instance,n=e.key;return[`p-paginator p-component`,O({"p-paginator-default":!t.hasBreakpoints()},`p-paginator-${n}`,t.hasBreakpoints())]},content:`p-paginator-content`,contentStart:`p-paginator-content-start`,contentEnd:`p-paginator-content-end`,first:function(e){return[`p-paginator-first`,{"p-disabled":e.instance.$attrs.disabled}]},firstIcon:`p-paginator-first-icon`,prev:function(e){return[`p-paginator-prev`,{"p-disabled":e.instance.$attrs.disabled}]},prevIcon:`p-paginator-prev-icon`,next:function(e){return[`p-paginator-next`,{"p-disabled":e.instance.$attrs.disabled}]},nextIcon:`p-paginator-next-icon`,last:function(e){return[`p-paginator-last`,{"p-disabled":e.instance.$attrs.disabled}]},lastIcon:`p-paginator-last-icon`,pages:`p-paginator-pages`,page:function(e){var t=e.props;return[`p-paginator-page`,{"p-paginator-page-selected":e.pageLink-1===t.page}]},current:`p-paginator-current`,pcRowPerPageDropdown:`p-paginator-rpp-dropdown`,pcJumpToPageDropdown:`p-paginator-jtp-dropdown`,pcJumpToPageInputText:`p-paginator-jtp-input`}}),M={name:`BasePaginator`,extends:b,props:{totalRecords:{type:Number,default:0},rows:{type:Number,default:0},first:{type:Number,default:0},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},template:{type:[Object,String],default:`FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`},currentPageReportTemplate:{type:null,default:`({currentPage} of {totalPages})`},alwaysShow:{type:Boolean,default:!0}},style:j,provide:function(){return{$pcPaginator:this,$parentInstance:this}}},N={name:`CurrentPageReport`,hostName:`Paginator`,extends:b,props:{pageCount:{type:Number,default:0},currentPage:{type:Number,default:0},page:{type:Number,default:0},first:{type:Number,default:0},rows:{type:Number,default:0},totalRecords:{type:Number,default:0},template:{type:String,default:`({currentPage} of {totalPages})`}},computed:{text:function(){return this.template.replace(`{currentPage}`,this.currentPage).replace(`{totalPages}`,this.pageCount).replace(`{first}`,this.pageCount>0?this.first+1:0).replace(`{last}`,Math.min(this.first+this.rows,this.totalRecords)).replace(`{rows}`,this.rows).replace(`{totalRecords}`,this.totalRecords)}}};function re(e,t,n,i,o,s){return r(),d(`span`,m({class:e.cx(`current`)},e.ptm(`current`)),a(s.text),17)}N.render=re;var P={name:`FirstPageLink`,hostName:`Paginator`,extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(e){return this.ptm(e,{context:{disabled:this.$attrs.disabled}})}},components:{AngleDoubleLeftIcon:T},directives:{ripple:x}};function ie(t,i,a,o,c,l){var u=n(`ripple`);return e((r(),d(`button`,m({class:t.cx(`first`),type:`button`},l.getPTOptions(`first`),{"data-pc-group-section":`pagebutton`}),[(r(),g(s(a.template||`AngleDoubleLeftIcon`),m({class:t.cx(`firstIcon`)},l.getPTOptions(`firstIcon`)),null,16,[`class`]))],16)),[[u]])}P.render=ie;var F={name:`JumpToPageDropdown`,hostName:`Paginator`,extends:b,emits:[`page-change`],props:{page:Number,pageCount:Number,disabled:Boolean,templates:null},methods:{onChange:function(e){this.$emit(`page-change`,e)}},computed:{pageOptions:function(){for(var e=[],t=0;t<this.pageCount;t++)e.push({label:String(t+1),value:t});return e}},components:{JTPSelect:E}};function I(e,t,n,i,a,l){var u=c(`JTPSelect`);return r(),g(u,{modelValue:n.page,options:l.pageOptions,optionLabel:`label`,optionValue:`value`,"onUpdate:modelValue":t[0]||=function(e){return l.onChange(e)},class:p(e.cx(`pcJumpToPageDropdown`)),disabled:n.disabled,unstyled:e.unstyled,pt:e.ptm(`pcJumpToPageDropdown`),"data-pc-group-section":`pagedropdown`},f({_:2},[n.templates.jumptopagedropdownicon?{name:`dropdownicon`,fn:o(function(e){return[(r(),g(s(n.templates.jumptopagedropdownicon),{class:p(e.class)},null,8,[`class`]))]}),key:`0`}:void 0]),1032,[`modelValue`,`options`,`class`,`disabled`,`unstyled`,`pt`])}F.render=I;var L={name:`JumpToPageInput`,hostName:`Paginator`,extends:b,inheritAttrs:!1,emits:[`page-change`],props:{page:Number,pageCount:Number,disabled:Boolean},data:function(){return{d_page:this.page}},watch:{page:function(e){this.d_page=e}},methods:{onChange:function(e){e!==this.page&&(this.d_page=e,this.$emit(`page-change`,e-1))}},computed:{inputArialabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.jumpToPageInputLabel:void 0}},components:{JTPInput:S}};function R(e,t,n,i,a,o){var s=c(`JTPInput`);return r(),g(s,{ref:`jtpInput`,modelValue:a.d_page,class:p(e.cx(`pcJumpToPageInputText`)),"aria-label":o.inputArialabel,disabled:n.disabled,"onUpdate:modelValue":o.onChange,unstyled:e.unstyled,pt:e.ptm(`pcJumpToPageInputText`)},null,8,[`modelValue`,`class`,`aria-label`,`disabled`,`onUpdate:modelValue`,`unstyled`,`pt`])}L.render=R;var z={name:`LastPageLink`,hostName:`Paginator`,extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(e){return this.ptm(e,{context:{disabled:this.$attrs.disabled}})}},components:{AngleDoubleRightIcon:w},directives:{ripple:x}};function B(t,i,a,o,c,l){var u=n(`ripple`);return e((r(),d(`button`,m({class:t.cx(`last`),type:`button`},l.getPTOptions(`last`),{"data-pc-group-section":`pagebutton`}),[(r(),g(s(a.template||`AngleDoubleRightIcon`),m({class:t.cx(`lastIcon`)},l.getPTOptions(`lastIcon`)),null,16,[`class`]))],16)),[[u]])}z.render=B;var V={name:`NextPageLink`,hostName:`Paginator`,extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(e){return this.ptm(e,{context:{disabled:this.$attrs.disabled}})}},components:{AngleRightIcon:C},directives:{ripple:x}};function H(t,i,a,o,c,l){var u=n(`ripple`);return e((r(),d(`button`,m({class:t.cx(`next`),type:`button`},l.getPTOptions(`next`),{"data-pc-group-section":`pagebutton`}),[(r(),g(s(a.template||`AngleRightIcon`),m({class:t.cx(`nextIcon`)},l.getPTOptions(`nextIcon`)),null,16,[`class`]))],16)),[[u]])}V.render=H;var U={name:`PageLinks`,hostName:`Paginator`,extends:b,inheritAttrs:!1,emits:[`click`],props:{value:Array,page:Number},methods:{getPTOptions:function(e,t){return this.ptm(t,{context:{active:e===this.page}})},onPageLinkClick:function(e,t){this.$emit(`click`,{originalEvent:e,value:t})},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},directives:{ripple:x}},W=[`aria-label`,`aria-current`,`onClick`,`data-p-active`];function G(t,i,o,s,c,u){var f=n(`ripple`);return r(),d(`span`,m({class:t.cx(`pages`)},t.ptm(`pages`)),[(r(!0),d(h,null,_(o.value,function(n){return e((r(),d(`button`,m({key:n,class:t.cx(`page`,{pageLink:n}),type:`button`,"aria-label":u.ariaPageLabel(n),"aria-current":n-1===o.page?`page`:void 0,onClick:function(e){return u.onPageLinkClick(e,n)}},{ref_for:!0},u.getPTOptions(n-1,`page`),{"data-p-active":n-1===o.page}),[l(a(n),1)],16,W)),[[f]])}),128))],16)}U.render=G;var K={name:`PrevPageLink`,hostName:`Paginator`,extends:b,props:{template:{type:Function,default:null}},methods:{getPTOptions:function(e){return this.ptm(e,{context:{disabled:this.$attrs.disabled}})}},components:{AngleLeftIcon:te},directives:{ripple:x}};function q(t,i,a,o,c,l){var u=n(`ripple`);return e((r(),d(`button`,m({class:t.cx(`prev`),type:`button`},l.getPTOptions(`prev`),{"data-pc-group-section":`pagebutton`}),[(r(),g(s(a.template||`AngleLeftIcon`),m({class:t.cx(`prevIcon`)},l.getPTOptions(`prevIcon`)),null,16,[`class`]))],16)),[[u]])}K.render=q;var J={name:`RowsPerPageDropdown`,hostName:`Paginator`,extends:b,emits:[`rows-change`],props:{options:Array,rows:Number,disabled:Boolean,templates:null},methods:{onChange:function(e){this.$emit(`rows-change`,e)}},computed:{rowsOptions:function(){var e=[];if(this.options)for(var t=0;t<this.options.length;t++)e.push({label:String(this.options[t]),value:this.options[t]});return e}},components:{RPPSelect:E}};function ae(e,t,n,i,a,l){var u=c(`RPPSelect`);return r(),g(u,{modelValue:n.rows,options:l.rowsOptions,optionLabel:`label`,optionValue:`value`,"onUpdate:modelValue":t[0]||=function(e){return l.onChange(e)},class:p(e.cx(`pcRowPerPageDropdown`)),disabled:n.disabled,unstyled:e.unstyled,pt:e.ptm(`pcRowPerPageDropdown`),"data-pc-group-section":`pagedropdown`},f({_:2},[n.templates.rowsperpagedropdownicon?{name:`dropdownicon`,fn:o(function(e){return[(r(),g(s(n.templates.rowsperpagedropdownicon),{class:p(e.class)},null,8,[`class`]))]}),key:`0`}:void 0]),1032,[`modelValue`,`options`,`class`,`disabled`,`unstyled`,`pt`])}J.render=ae;function Y(e){"@babel/helpers - typeof";return Y=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Y(e)}function X(e,t){return le(e)||ce(e,t)||se(e,t)||oe()}function oe(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function se(e,t){if(e){if(typeof e==`string`)return Z(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}function Z(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function ce(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function le(e){if(Array.isArray(e))return e}var Q={name:`Paginator`,extends:M,inheritAttrs:!1,emits:[`update:first`,`update:rows`,`page`],data:function(){return{d_first:this.first,d_rows:this.rows}},watch:{first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},totalRecords:function(e){this.page>0&&e&&this.d_first>=e&&this.changePage(this.pageCount-1)}},mounted:function(){this.createStyle()},methods:{changePage:function(e){var t=this.pageCount;if(e>=0&&e<t){this.d_first=this.d_rows*e;var n={page:e,first:this.d_first,rows:this.d_rows,pageCount:t};this.$emit(`update:first`,this.d_first),this.$emit(`update:rows`,this.d_rows),this.$emit(`page`,n)}},changePageToFirst:function(e){this.isFirstPage||this.changePage(0),e.preventDefault()},changePageToPrev:function(e){this.changePage(this.page-1),e.preventDefault()},changePageLink:function(e){this.changePage(e.value-1),e.originalEvent.preventDefault()},changePageToNext:function(e){this.changePage(this.page+1),e.preventDefault()},changePageToLast:function(e){this.isLastPage||this.changePage(this.pageCount-1),e.preventDefault()},onRowChange:function(e){this.d_rows=e,this.changePage(this.page)},createStyle:function(){var e=this;if(this.hasBreakpoints()&&!this.isUnstyled){var t;this.styleElement=document.createElement(`style`),this.styleElement.type=`text/css`,v(this.styleElement,`nonce`,(t=this.$primevue)==null||(t=t.config)==null||(t=t.csp)==null?void 0:t.nonce),document.body.appendChild(this.styleElement);var n=``,r=Object.keys(this.template),i={};r.sort(function(e,t){return parseInt(e)-parseInt(t)}).forEach(function(t){i[t]=e.template[t]});for(var a=0,o=Object.entries(Object.entries(i));a<o.length;a++){var s=X(o[a],2),c=s[0],l=X(s[1],1)[0],u=void 0,d=void 0;d=l!=="default"&&typeof Object.keys(i)[c-1]==`string`?Number(Object.keys(i)[c-1].slice(0,-2))+1+`px`:Object.keys(i)[c-1],u=Object.entries(i)[c-1]?`and (min-width:${d})`:``,n+=l==="default"?`
                            @media screen ${u} {
                                .p-paginator[${this.$attrSelector}],
                                    display: flex;
                                }
                            }
                        `:`
.p-paginator-${l} {
    display: none;
}
@media screen ${u} and (max-width: ${l}) {
    .p-paginator-${l} {
        display: flex;
    }

    .p-paginator-default{
        display: none;
    }
}
                    `}this.styleElement.innerHTML=n}},hasBreakpoints:function(){return Y(this.template)===`object`},getAriaLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria[e]:void 0}},computed:{templateItems:function(){var e={};if(this.hasBreakpoints()){for(var t in e=this.template,e.default||(e.default=`FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown`),e)e[t]=this.template[t].split(` `).map(function(e){return e.trim()});return e}return e.default=this.template.split(` `).map(function(e){return e.trim()}),e},page:function(){return Math.floor(this.d_first/this.d_rows)},pageCount:function(){return Math.ceil(this.totalRecords/this.d_rows)},isFirstPage:function(){return this.page===0},isLastPage:function(){return this.page===this.pageCount-1},calculatePageLinkBoundaries:function(){var e=this.pageCount,t=Math.min(this.pageLinkSize,e),n=Math.max(0,Math.ceil(this.page-t/2)),r=Math.min(e-1,n+t-1),i=this.pageLinkSize-(r-n+1);return n=Math.max(0,n-i),[n,r]},pageLinks:function(){for(var e=[],t=this.calculatePageLinkBoundaries,n=t[0],r=t[1],i=n;i<=r;i++)e.push(i+1);return e},currentState:function(){return{page:this.page,first:this.d_first,rows:this.d_rows}},empty:function(){return this.pageCount===0},currentPage:function(){return this.pageCount>0?this.page+1:0},last:function(){return Math.min(this.d_first+this.rows,this.totalRecords)}},components:{CurrentPageReport:N,FirstPageLink:P,LastPageLink:z,NextPageLink:V,PageLinks:U,PrevPageLink:K,RowsPerPageDropdown:J,JumpToPageDropdown:F,JumpToPageInput:L}};function $(e,n,a,o,s,l){var f=c(`FirstPageLink`),p=c(`PrevPageLink`),v=c(`NextPageLink`),y=c(`LastPageLink`),b=c(`PageLinks`),x=c(`CurrentPageReport`),S=c(`RowsPerPageDropdown`),C=c(`JumpToPageDropdown`),w=c(`JumpToPageInput`);return e.alwaysShow||l.pageLinks&&l.pageLinks.length>1?(r(),d(`nav`,i(m({key:0},e.ptmi(`paginatorContainer`))),[(r(!0),d(h,null,_(l.templateItems,function(i,a){return r(),d(`div`,m({key:a,ref_for:!0,ref:`paginator`,class:e.cx(`paginator`,{key:a})},{ref_for:!0},e.ptm(`root`)),[e.$slots.container?t(e.$slots,`container`,{key:0,first:s.d_first+1,last:l.last,rows:s.d_rows,page:l.page,pageCount:l.pageCount,pageLinks:l.pageLinks,totalRecords:e.totalRecords,firstPageCallback:l.changePageToFirst,lastPageCallback:l.changePageToLast,prevPageCallback:l.changePageToPrev,nextPageCallback:l.changePageToNext,rowChangeCallback:l.onRowChange,changePageCallback:l.changePage}):(r(),d(h,{key:1},[e.$slots.start?(r(),d(`div`,m({key:0,class:e.cx(`contentStart`)},{ref_for:!0},e.ptm(`contentStart`)),[t(e.$slots,`start`,{state:l.currentState})],16)):u(``,!0),ee(`div`,m({class:e.cx(`content`)},{ref_for:!0},e.ptm(`content`)),[(r(!0),d(h,null,_(i,function(t){return r(),d(h,{key:t},[t===`FirstPageLink`?(r(),g(f,{key:0,"aria-label":l.getAriaLabel(`firstPageLabel`),template:e.$slots.firsticon||e.$slots.firstpagelinkicon,onClick:n[0]||=function(e){return l.changePageToFirst(e)},disabled:l.isFirstPage||l.empty,unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`template`,`disabled`,`unstyled`,`pt`])):t===`PrevPageLink`?(r(),g(p,{key:1,"aria-label":l.getAriaLabel(`prevPageLabel`),template:e.$slots.previcon||e.$slots.prevpagelinkicon,onClick:n[1]||=function(e){return l.changePageToPrev(e)},disabled:l.isFirstPage||l.empty,unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`template`,`disabled`,`unstyled`,`pt`])):t===`NextPageLink`?(r(),g(v,{key:2,"aria-label":l.getAriaLabel(`nextPageLabel`),template:e.$slots.nexticon||e.$slots.nextpagelinkicon,onClick:n[2]||=function(e){return l.changePageToNext(e)},disabled:l.isLastPage||l.empty,unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`template`,`disabled`,`unstyled`,`pt`])):t===`LastPageLink`?(r(),g(y,{key:3,"aria-label":l.getAriaLabel(`lastPageLabel`),template:e.$slots.lasticon||e.$slots.lastpagelinkicon,onClick:n[3]||=function(e){return l.changePageToLast(e)},disabled:l.isLastPage||l.empty,unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`template`,`disabled`,`unstyled`,`pt`])):t===`PageLinks`?(r(),g(b,{key:4,"aria-label":l.getAriaLabel(`pageLabel`),value:l.pageLinks,page:l.page,onClick:n[4]||=function(e){return l.changePageLink(e)},unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`value`,`page`,`unstyled`,`pt`])):t===`CurrentPageReport`?(r(),g(x,{key:5,"aria-live":`polite`,template:e.currentPageReportTemplate,currentPage:l.currentPage,page:l.page,pageCount:l.pageCount,first:s.d_first,rows:s.d_rows,totalRecords:e.totalRecords,unstyled:e.unstyled,pt:e.pt},null,8,[`template`,`currentPage`,`page`,`pageCount`,`first`,`rows`,`totalRecords`,`unstyled`,`pt`])):t===`RowsPerPageDropdown`&&e.rowsPerPageOptions?(r(),g(S,{key:6,"aria-label":l.getAriaLabel(`rowsPerPageLabel`),rows:s.d_rows,options:e.rowsPerPageOptions,onRowsChange:n[5]||=function(e){return l.onRowChange(e)},disabled:l.empty,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`rows`,`options`,`disabled`,`templates`,`unstyled`,`pt`])):t===`JumpToPageDropdown`?(r(),g(C,{key:7,"aria-label":l.getAriaLabel(`jumpToPageDropdownLabel`),page:l.page,pageCount:l.pageCount,onPageChange:n[6]||=function(e){return l.changePage(e)},disabled:l.empty,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,[`aria-label`,`page`,`pageCount`,`disabled`,`templates`,`unstyled`,`pt`])):t===`JumpToPageInput`?(r(),g(w,{key:8,page:l.currentPage,onPageChange:n[7]||=function(e){return l.changePage(e)},disabled:l.empty,unstyled:e.unstyled,pt:e.pt},null,8,[`page`,`disabled`,`unstyled`,`pt`])):u(``,!0)],64)}),128))],16),e.$slots.end?(r(),d(`div`,m({key:1,class:e.cx(`contentEnd`)},{ref_for:!0},e.ptm(`contentEnd`)),[t(e.$slots,`end`,{state:l.currentState})],16)):u(``,!0)],64))],16)}),128))],16)):u(``,!0)}Q.render=$;export{Q as default};