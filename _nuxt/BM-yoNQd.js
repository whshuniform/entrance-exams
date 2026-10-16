import{t as e}from"./DK3Fl9T5.js";import{B as t,L as n,Pt as r,_ as i,d as a,f as o,k as s}from"./B5nbzVpw.js";import{t as c}from"./CRHlWn3X.js";import{o as l}from"#entry";import{t as u}from"./DfrvTqtW.js";var d=l.extend({name:`progressbar`,style:`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`,classes:{root:function(e){var t=e.instance;return[`p-progressbar p-component`,{"p-progressbar-determinate":t.determinate,"p-progressbar-indeterminate":t.indeterminate}]},value:`p-progressbar-value`,label:`p-progressbar-label`}}),f=e({default:()=>p}),p={name:`ProgressBar`,extends:{name:`BaseProgressBar`,extends:u,props:{value:{type:Number,default:null},mode:{type:String,default:`determinate`},showValue:{type:Boolean,default:!0}},style:d,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+`%`,display:`flex`}},indeterminate:function(){return this.mode===`indeterminate`},determinate:function(){return this.mode===`determinate`},dataP:function(){return c({determinate:this.determinate,indeterminate:this.indeterminate})}}},m=[`aria-valuenow`,`data-p`],h=[`data-p`],g=[`data-p`],_=[`data-p`];function v(e,c,l,u,d,f){return n(),o(`div`,s({role:`progressbar`,class:e.cx(`root`),"aria-valuemin":`0`,"aria-valuenow":e.value,"aria-valuemax":`100`,"data-p":f.dataP},e.ptmi(`root`)),[f.determinate?(n(),o(`div`,s({key:0,class:e.cx(`value`),style:f.progressStyle,"data-p":f.dataP},e.ptm(`value`)),[e.value!=null&&e.value!==0&&e.showValue?(n(),o(`div`,s({key:0,class:e.cx(`label`),"data-p":f.dataP},e.ptm(`label`)),[t(e.$slots,`default`,{},function(){return[i(r(e.value+`%`),1)]})],16,g)):a(``,!0)],16,h)):f.indeterminate?(n(),o(`div`,s({key:1,class:e.cx(`value`),"data-p":f.dataP},e.ptm(`value`)),null,16,_)):a(``,!0)],16,m)}p.render=v;export{p as n,f as t};