(this["webpackJsonpjhu-course-evals"]=this["webpackJsonpjhu-course-evals"]||[]).push([[0],{111:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(21),i=a.n(r),c=(a(85),a(9)),o=a(10),s=a(12),u=a(11),m=a(27),g=a(29),h=(a(86),a(8)),p=a(37),d=a.n(p),f=a(15),E=Object(f.a)(),v=a(117),b=a(116),y=a(119),k=a(128),S=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(k.a,{style:{backgroundColor:"#f8f9fa",marginTop:"10px",marginBottom:"10px"}},l.a.createElement(k.a.Body,{style:{paddingTop:"15px",paddingBottom:"0px"}},l.a.createElement("p",null,this.props.review.text))))}}]),a}(n.Component),w=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"stats",value:function(){for(var e=this.props,t=[0,0,0,0,0],a=["success","success","success","success","success"],n=0;n<e.course.reviews.length;n++)t[0]+=Number(e.course.reviews[n].workload),t[1]+=Number(e.course.reviews[n].difficulty),t[2]+=Number(e.course.reviews[n].grade_leniency),t[3]+=Number(e.course.reviews[n].learn_quality),t[4]+=Number(e.course.reviews[n].teacher_quality);for(n=0;n<t.length;n++)t[n]/=e.course.reviews.length,t[n]=Number(t[n]).toPrecision(3),t[n]<3?a[n]="danger":t[n]<4&&(a[n]="warning");return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement("h5",null,l.a.createElement(b.a,{variant:a[0],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Workload: ",t[0])),l.a.createElement("h5",null,l.a.createElement(b.a,{variant:a[1],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Difficulty: ",t[1])),l.a.createElement("h5",null,l.a.createElement(b.a,{variant:a[2],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Grading Leniency: ",t[2])),l.a.createElement("h5",null,l.a.createElement(b.a,{variant:a[3],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Learning Experience: ",t[3])),l.a.createElement("h5",null,l.a.createElement(b.a,{variant:a[4],style:{padding:"8px",fontWeight:"400"}},"Instructor Quality: ",t[4]))))}},{key:"render",value:function(){var e=this.props,t=e.course,a=e.page;return e.course.reviews.length>0?l.a.createElement(l.a.Fragment,null,l.a.createElement("h4",null,"Average Stats"),this.stats(),l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement("h4",{style:{paddingTop:"15px"}},"Reviews"),l.a.createElement("div",null,l.a.createElement(m.b,{to:"/submit-review/"+t._id+"/"+a},l.a.createElement(v.a,{variant:"outline-primary",size:"sm",style:{marginTop:"16px",marginLeft:"10px"}},"Submit a Review")))),l.a.createElement("div",null,e.course.reviews.map((function(e,t){return l.a.createElement(S,{review:e,key:t})})))):l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",{style:{paddingTop:"5px"}},"Reviews"),l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement("p",null,"No one has reviewed this course yet. Be the first!"),l.a.createElement(m.b,{to:"/submit-review/"+t._id+"/"+a},l.a.createElement(v.a,{variant:"outline-primary",size:"sm",style:{marginTop:"-5px",marginLeft:"10px"}},"Submit a Review"))))}}]),a}(n.Component),C=a(129),O=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.page,a=e.length;return l.a.createElement(l.a.Fragment,null,l.a.createElement(C.a,null,l.a.createElement(C.a.Prev,{disabled:1===t,onClick:function(){return e.changePage(t-1)}}),l.a.createElement(C.a.Item,{active:1===t,onClick:function(){return e.changePage(1)}},1),l.a.createElement(C.a.Item,{disabled:a<=52,active:2===t,onClick:function(){return e.changePage(2)}},2),l.a.createElement(C.a.Ellipsis,{disabled:!0}),l.a.createElement(C.a.Item,{disabled:a<=468,active:10===t,onClick:function(){return e.changePage(10)}},10),l.a.createElement(C.a.Item,{disabled:a<=520,active:11===t,onClick:function(){return e.changePage(11)}},11),l.a.createElement(C.a.Item,{disabled:a<=572,active:12===t,onClick:function(){return e.changePage(12)}},12),l.a.createElement(C.a.Ellipsis,{disabled:!0}),l.a.createElement(C.a.Item,{disabled:a<=936,active:19===t,onClick:function(){return e.changePage(19)}},19),l.a.createElement(C.a.Item,{disabled:a<=988,active:20===t,onClick:function(){return e.changePage(20)}},20),l.a.createElement(C.a.Next,{disabled:20===t||52*t>a,onClick:function(){return e.changePage(t+1)}})))}}]),a}(n.Component),I=a(125),N=a(127),x=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement("p",{style:{paddingRight:"2px",margin:"0"}},e.name),l.a.createElement(I.a,{placement:e.position,overlay:l.a.createElement(N.a,{id:"popover-basic"},l.a.createElement(N.a.Title,{as:"h3"},e.title),l.a.createElement(N.a.Content,null,l.a.createElement("p",{style:{margin:"0"}},e.scaleOne),l.a.createElement("p",{style:{margin:"0"}},e.scaleTwo)))},l.a.createElement("p",{style:{margin:"0",color:"#007bff"}},"(?)")))}}]),a}(n.Component),j=a(118),L=a(71),T=a(123),W=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"header-wrapper"},l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement(j.a,{className:"mb-3"},l.a.createElement(j.a.Prepend,null,l.a.createElement(j.a.Text,{id:"basic-addon1"},"Course #")),l.a.createElement(L.a,{defaultValue:e.filters[0],id:"basic-url1",onChange:e.filterNum})),l.a.createElement(j.a,{style:{marginLeft:"15px"},className:"mb-3"},l.a.createElement(j.a.Prepend,null,l.a.createElement(j.a.Text,{id:"basic-addon2"},"Course Name")),l.a.createElement(L.a,{defaultValue:e.filters[1],id:"basic-url2",onChange:e.filterName})),l.a.createElement(j.a,{style:{marginLeft:"15px"},className:"mb-3"},l.a.createElement(j.a.Prepend,null,l.a.createElement(j.a.Text,{id:"basic-addon3"},"Instructor")),l.a.createElement(L.a,{defaultValue:e.filters[2],id:"basic-url3",onChange:e.filterInstructor})),l.a.createElement(j.a,{style:{marginLeft:"15px"},className:"mb-3"},l.a.createElement(j.a.Prepend,null,l.a.createElement(j.a.Text,{id:"basic-addon4"},"Min. Rating")),l.a.createElement(L.a,{defaultValue:e.filters[10],id:"basic-url4",onChange:e.filterRating}))),l.a.createElement("div",{style:{marginTop:"5px"}},l.a.createElement(T.a,null,["checkbox"].map((function(t){return l.a.createElement("div",{key:"inline-".concat(t),className:"mb-3"},l.a.createElement("div",{className:"filter-wrapper"},l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement(T.a.Check,{onChange:e.filterH,defaultChecked:e.filters[4],inline:!0,label:"H",type:t,id:"inline-".concat(t,"-2")}),l.a.createElement(T.a.Check,{onChange:e.filterS,defaultChecked:e.filters[5],inline:!0,label:"S",type:t,id:"inline-".concat(t,"-3")}),l.a.createElement(T.a.Check,{onChange:e.filterN,defaultChecked:e.filters[6],inline:!0,label:"N",type:t,id:"inline-".concat(t,"-4")}),l.a.createElement(T.a.Check,{onChange:e.filterE,defaultChecked:e.filters[7],inline:!0,label:"E",type:t,id:"inline-".concat(t,"-5")}),l.a.createElement(T.a.Check,{onChange:e.filterQ,defaultChecked:e.filters[8],inline:!0,label:"Q",type:t,id:"inline-".concat(t,"-6")})),l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement(T.a.Check,{onChange:e.filterW,defaultChecked:e.filters[3],inline:!0,label:"Writing Only",type:t,id:"inline-".concat(t,"-1")}),l.a.createElement(T.a.Check,{onChange:e.filterNA,defaultChecked:e.filters[9],inline:!0,label:"No N/A",type:t,id:"inline-".concat(t,"-7")}),l.a.createElement("div",{style:{marginLeft:"-12px"}},l.a.createElement(x,{title:"What's this?",scaleOne:"Checking this option hides courses with no area designation"})))))}))))))}}]),a}(n.Component),R=a(126),P=a(124),q=a(122),A=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return l.a.createElement(q.a,Object.assign({},e,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),l.a.createElement(q.a.Header,{closeButton:!0},l.a.createElement(q.a.Title,{id:"contained-modal-title-vcenter"},"About This Site")),l.a.createElement(q.a.Body,null,l.a.createElement("p",null,"Beginning with the Spring 2020 semester, Johns Hopkins is no longer posting summarized course evaluations. This platform was created in order to make up for that loss, so that students can continue to select courses that meet their needs."),l.a.createElement("p",null,l.a.createElement("b",null,"Any questions or feedback?")," Just email us at [enter email here].")),l.a.createElement(q.a.Footer,null,l.a.createElement(v.a,{onClick:e.onHide},"Close")))}}]),a}(n.Component),D=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={showModal:!1},e}return Object(o.a)(a,[{key:"handleToggleModal",value:function(){this.setState({showModal:!this.state.showModal})}},{key:"render",value:function(){var e=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement(R.a,{collapseOnSelect:!0,expand:"lg",bg:"light",variant:"light"},l.a.createElement(R.a.Brand,{href:"/"},"JHU Course Reviews"),l.a.createElement(R.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),l.a.createElement(R.a.Collapse,{id:"responsive-navbar-nav"},l.a.createElement(P.a,{className:"mr-auto"}),l.a.createElement(P.a,null,l.a.createElement(P.a.Link,{active:"bookmark"===this.props.active,disabled:!0},"Bookmarked Courses"),l.a.createElement(P.a.Link,{active:"contact"===this.props.active,onClick:function(){return e.handleToggleModal()}},"About")))),l.a.createElement(A,{show:this.state.showModal,onHide:function(){return e.handleToggleModal()}}))}}]),a}(n.Component),F=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={open:!1},n}return Object(o.a)(a,[{key:"handleClick",value:function(e){this.setState({open:e})}},{key:"render",value:function(){var e=this,t=this.props;return l.a.createElement(l.a.Fragment,null,l.a.createElement("tr",{className:"hover"},l.a.createElement("td",null,t.course.number),l.a.createElement("td",null,l.a.createElement("div",{className:"row",style:{paddingLeft:"17px"}},l.a.createElement("div",{style:{paddingRight:"5px"}},t.course.name),this.state.open&&l.a.createElement(v.a,{variant:"link",style:{padding:"0"},onClick:function(){return e.handleClick(!1)}},l.a.createElement("p",{style:{margin:"0",marginTop:"-2px"}},"[-]")),!this.state.open&&l.a.createElement(v.a,{variant:"link",style:{padding:"0"},onClick:function(){return e.handleClick(!0)}},l.a.createElement("p",{style:{margin:"0",marginTop:"-2px"}},"[+]")))),l.a.createElement("td",null,t.course.instructor),l.a.createElement("td",null,t.course.area),l.a.createElement("td",null,t.course.writing),l.a.createElement("td",null,t.course.credits),l.a.createElement("td",null,l.a.createElement(b.a,{variant:"dark"===t.course.color?"light":t.course.color,style:{fontSize:"15px",padding:"5px",fontWeight:"400"}},t.course.rating))),this.state.open&&l.a.createElement("tr",null,l.a.createElement("td",{colSpan:"100%"},l.a.createElement("div",null,l.a.createElement(w,{course:t.course,page:t.active,key:t._id})))))}}]),a}(n.Component),Q=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).changePage=n.changePage.bind(Object(h.a)(n)),n.filterNum=n.filterNum.bind(Object(h.a)(n)),n.filterName=n.filterName.bind(Object(h.a)(n)),n.filterInstructor=n.filterInstructor.bind(Object(h.a)(n)),n.filterW=n.filterW.bind(Object(h.a)(n)),n.filterH=n.filterH.bind(Object(h.a)(n)),n.filterS=n.filterS.bind(Object(h.a)(n)),n.filterN=n.filterN.bind(Object(h.a)(n)),n.filterE=n.filterE.bind(Object(h.a)(n)),n.filterQ=n.filterQ.bind(Object(h.a)(n)),n.filterNA=n.filterNA.bind(Object(h.a)(n)),n.filterRating=n.filterRating.bind(Object(h.a)(n));var l=["","","",!1,!0,!0,!0,!0,!0,!1,""];null!==localStorage.getItem("number")&&(l[0]=localStorage.getItem("number")),null!==localStorage.getItem("name")&&(l[1]=localStorage.getItem("name")),null!==localStorage.getItem("instructor")&&(l[2]=localStorage.getItem("instructor")),null!==localStorage.getItem("rating")&&(l[10]=localStorage.getItem("rating")),null!==localStorage.getItem("w")&&(l[3]=JSON.parse(localStorage.getItem("w"))),null!==localStorage.getItem("h")&&(l[4]=JSON.parse(localStorage.getItem("h"))),null!==localStorage.getItem("s")&&(l[5]=JSON.parse(localStorage.getItem("s"))),null!==localStorage.getItem("n")&&(l[6]=JSON.parse(localStorage.getItem("n"))),null!==localStorage.getItem("e")&&(l[7]=JSON.parse(localStorage.getItem("e"))),null!==localStorage.getItem("q")&&(l[8]=JSON.parse(localStorage.getItem("q"))),null!==localStorage.getItem("na")&&(l[9]=JSON.parse(localStorage.getItem("na")));var r=1;if(null!=n.props.match&&null!=n.props.match.params){var i=n.props.match.params.active;try{JSON.parse(i)>0&&(r=JSON.parse(i))}catch(o){}}return r>1&&(null!=localStorage.getItem("courses-length")?52*(r-1)>JSON.parse(localStorage.getItem("courses-length"))&&(r=Math.ceil(JSON.parse(localStorage.getItem("courses-length"))/52)):52*(r-1)>1037&&(r=20)),E.push("/page-"+r),n.state={courses:[],active:r,loading:!0,pageLoad:!1,filters:l},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="https://jhu-course-rating-api.herokuapp.com/courses";d.a.get(t).then().catch((function(e){console.log(e)})),d.a.get(t).then((function(t){e.setState({courses:t.data,loading:!1})})).catch((function(e){console.log(e)}))}},{key:"changePage",value:function(e){this.setState({active:e}),E.push("/page-"+e)}},{key:"courseList",value:function(e){var t=this.state.active;return e.slice(52*(t-1),52*t).map((function(e,a){return l.a.createElement(F,{course:e,active:t,key:a+t*Math.random(100)})}))}},{key:"render",value:function(){var e=this.state.active,t=this.state.loading,a=[],n=this.state.filters,r=n[0].toUpperCase().trim(),i=n[1].toUpperCase().trim(),c=n[2].toUpperCase().trim(),o=0;try{o=JSON.parse(n[10])}catch(s){}return this.state.courses.map((function(e,t){var l=e.number.includes(r)&&e.name.toUpperCase().includes(i)&&e.instructor.toUpperCase().includes(c)&&e.rating>=o;if(l&&n[3]&&"N"===e.writing&&(l=!1),l&&n[9]&&"N/A"===e.area&&(l=!1),l){for(var s=e.area.toUpperCase(),u=["0","1","2","3","H","S","N","E","Q"],m=0,g=4;g<n.length;g++)if(n[g]&&s.includes(u[g])){m++;break}0===m&&(l=!1),s.includes("N/A")&&(l=!0)}return l&&a.push(e),0})),localStorage.setItem("courses-length",a.length),l.a.createElement(l.a.Fragment,null,l.a.createElement(D,{active:"sp20"}),l.a.createElement("br",null),l.a.createElement("div",{className:"site-container"},l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement(W,{filters:n,filterNum:this.filterNum,filterName:this.filterName,filterInstructor:this.filterInstructor,filterW:this.filterW,filterH:this.filterH,filterS:this.filterS,filterN:this.filterN,filterE:this.filterE,filterQ:this.filterQ,filterNA:this.filterNA,filterRating:this.filterRating})),l.a.createElement("div",{className:"flex-wrapper",style:{float:"right"}},l.a.createElement(y.a,{variant:"primary",style:{marginTop:"3px",marginRight:"15px"},className:t?"":"hidden",animation:"border",role:"status"},l.a.createElement("span",{className:"sr-only"},"Loading...")),l.a.createElement(O,{page:e,changePage:this.changePage,length:a.length}))),l.a.createElement("table",{className:"table table-responsive",style:{marginTop:20}},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"course-num"},"Course #"),l.a.createElement("th",{className:"course-name"},"Course Name"),l.a.createElement("th",{className:"instructor"},"Instructor(s)"),l.a.createElement("th",null,"Areas"),l.a.createElement("th",null,"Writing"),l.a.createElement("th",null,"Credits"),l.a.createElement("th",null,l.a.createElement("div",{className:"flex-wrapper"},l.a.createElement(x,{name:"Rating",title:"Average Course Rating (out of 5)",scaleOne:"Based on five components: Workload, Difficulty, Grading Leniency, Learning Experience, & Instructor Quality",position:"bottom"}))))),l.a.createElement("tbody",null,this.courseList(a))),l.a.createElement("div",{style:{float:"right"}},l.a.createElement(O,{page:e,changePage:this.changePage,length:a.length}))))}},{key:"filterNum",value:function(e){var t=this.state.filters;t[0]=e.target.value,localStorage.setItem("number",t[0]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterName",value:function(e){var t=this.state.filters;t[1]=e.target.value,localStorage.setItem("name",t[1]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterInstructor",value:function(e){var t=this.state.filters;t[2]=e.target.value,localStorage.setItem("instructor",t[2]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterRating",value:function(e){var t=this.state.filters;t[10]=e.target.value,localStorage.setItem("rating",t[10]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterW",value:function(e){var t=this.state.filters;t[3]=!t[3],localStorage.setItem("w",t[3]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterNA",value:function(e){var t=this.state.filters;t[9]=!t[9],localStorage.setItem("na",t[9]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterH",value:function(e){var t=this.state.filters;t[4]=!t[4],localStorage.setItem("h",t[4]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterS",value:function(e){var t=this.state.filters;t[5]=!t[5],localStorage.setItem("s",t[5]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterN",value:function(e){var t=this.state.filters;t[6]=!t[6],localStorage.setItem("n",t[6]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterE",value:function(e){var t=this.state.filters;t[7]=!t[7],localStorage.setItem("e",t[7]),this.setState({active:1,filters:t}),E.push("/page-1")}},{key:"filterQ",value:function(e){var t=this.state.filters;t[8]=!t[8],localStorage.setItem("q",t[8]),this.setState({active:1,filters:t}),E.push("/page-1")}}]),a}(n.Component),_=a(78),G=a(72);function J(e){var t=Object(n.useState)(!1),a=Object(_.a)(t,2),r=a[0],i=a[1],c=e.page;return l.a.createElement(T.a,{noValidate:!0,validated:r,onSubmit:function(t){var a=t.currentTarget;!1===a.checkValidity()&&(t.preventDefault(),t.stopPropagation()),i(!0),a.checkValidity()&&e.onSubmit(t)}},l.a.createElement(T.a.Row,null,l.a.createElement(T.a.Group,{as:G.a,controlId:"validationCustomUsername"},l.a.createElement(T.a.Label,null,l.a.createElement(x,{name:"Workload",title:"Workload",scaleOne:"1 = enough work for 3 classes",scaleTwo:"5 = a whole lot of nothing"})),l.a.createElement(j.a,null,l.a.createElement(T.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeWL},l.a.createElement("option",null,"1"),l.a.createElement("option",null,"2"),l.a.createElement("option",null,"3"),l.a.createElement("option",null,"4"),l.a.createElement("option",null,"5")),l.a.createElement(T.a.Control.Feedback,null,"Looks good!"))),l.a.createElement(T.a.Group,{as:G.a,controlId:"validationCustomUsername"},l.a.createElement(T.a.Label,null,l.a.createElement(x,{name:"Difficulty",title:"Difficulty",scaleOne:"1 = were the lectures in English??",scaleTwo:"5 = me and all my bois aced it"})),l.a.createElement(j.a,null,l.a.createElement(T.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeDiff},l.a.createElement("option",null,"1"),l.a.createElement("option",null,"2"),l.a.createElement("option",null,"3"),l.a.createElement("option",null,"4"),l.a.createElement("option",null,"5")),l.a.createElement(T.a.Control.Feedback,null,"Looks good!"))),l.a.createElement(T.a.Group,{as:G.a,controlId:"validationCustomUsername"},l.a.createElement(T.a.Label,null,l.a.createElement(x,{name:"Grading Leniency",title:"Grading Leniency",scaleOne:"1 = grammar Nazi",scaleTwo:"5 = was it possible to not get an A??"})),l.a.createElement(j.a,null,l.a.createElement(T.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeGL},l.a.createElement("option",null,"1"),l.a.createElement("option",null,"2"),l.a.createElement("option",null,"3"),l.a.createElement("option",null,"4"),l.a.createElement("option",null,"5")),l.a.createElement(T.a.Control.Feedback,null,"Looks good!")))),l.a.createElement(T.a.Row,null,l.a.createElement(T.a.Group,{as:G.a,controlId:"validationCustomUsername"},l.a.createElement(T.a.Label,null,l.a.createElement(x,{name:"Learning Experience",title:"Learning Experience",scaleOne:"1 = on my last two brain cells",scaleTwo:"5 = i'm a big 200iq brain now"})),l.a.createElement(j.a,null,l.a.createElement(T.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeLE},l.a.createElement("option",null,"1"),l.a.createElement("option",null,"2"),l.a.createElement("option",null,"3"),l.a.createElement("option",null,"4"),l.a.createElement("option",null,"5")),l.a.createElement(T.a.Control.Feedback,null,"Looks good!"))),l.a.createElement(T.a.Group,{as:G.a,controlId:"validationCustomUsername"},l.a.createElement(T.a.Label,null,l.a.createElement(x,{name:"Instructor Quality",title:"Instructor Quality",scaleOne:"1 = i had to completely self-teach",scaleTwo:"5 = the prof was basically God"})),l.a.createElement(j.a,null,l.a.createElement(T.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeIQ},l.a.createElement("option",null,"1"),l.a.createElement("option",null,"2"),l.a.createElement("option",null,"3"),l.a.createElement("option",null,"4"),l.a.createElement("option",null,"5")),l.a.createElement(T.a.Control.Feedback,null,"Looks good!")))),l.a.createElement(T.a.Row,null,l.a.createElement(T.a.Group,{as:G.a,controlId:"validationCustom05"},l.a.createElement(T.a.Label,null,"Review"),l.a.createElement(T.a.Control,{as:"textarea",placeholder:"Type your thoughts about the course...",rows:"3",required:!0,maxLength:550,onChange:e.changeText}),l.a.createElement(T.a.Control.Feedback,{type:"invalid"},"Please provide a valid review."))),l.a.createElement(v.a,{type:"submit"},"Submit"),l.a.createElement(m.b,{to:"/page-"+c},l.a.createElement(v.a,{variant:"danger",onClick:function(){E.push("/page-"+c)},type:"cancel",style:{marginLeft:"15px"}},"Cancel")))}var B=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).changeText=n.changeText.bind(Object(h.a)(n)),n.changeWL=n.changeWL.bind(Object(h.a)(n)),n.changeDiff=n.changeDiff.bind(Object(h.a)(n)),n.changeLE=n.changeLE.bind(Object(h.a)(n)),n.changeGL=n.changeGL.bind(Object(h.a)(n)),n.changeIQ=n.changeIQ.bind(Object(h.a)(n)),n.onSubmit=n.onSubmit.bind(Object(h.a)(n)),n.state={number:"",title:"",instructor:"",reviews:[],text:"",workload:"",difficulty:"",learn_quality:"",teacher_quality:"",grade_leniency:""},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;d.a.get("https://jhu-course-rating-api.herokuapp.com/courses/"+this.props.match.params.id).then((function(t){e.setState({number:t.data.number,title:t.data.name,instructor:t.data.instructor,reviews:t.data.reviews})})).catch((function(e){console.log(e)}))}},{key:"onSubmit",value:function(e){e.preventDefault();for(var t=[this.state.text,this.state.workload,this.state.difficulty,this.state.learn_quality,this.state.grade_leniency,this.state.teacher_quality],a=0;a<t.length;a++)""===t[a]&&(t[a]="3.00");var n={text:t[0],workload:t[1],difficulty:t[2],learn_quality:t[3],grade_leniency:t[4],teacher_quality:t[5],userID:localStorage.getItem("userID")},l=!0;try{for(var r=0;r<this.state.reviews.length;r++)if(this.state.reviews[r].userID===localStorage.getItem("userID")){l=!1;break}}catch(e){l=!1}null==n.userID&&(l=!1),l?(d.a.post("https://jhu-course-rating-api.herokuapp.com/courses/add-review/"+this.props.match.params.id,n).then((function(e){return console.log(e.data)})),this.props.history.push("/page-1")):(this.props.history.push("/page-"+this.props.match.params.page),alert("You have already reviewed this course. New submission was not posted."))}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(D,{active:"sp20"}),l.a.createElement("div",{className:"site-container"},l.a.createElement("div",{style:{paddingTop:"20px",paddingBottom:"30px"}},l.a.createElement("div",{style:{paddingBottom:"15px"}},l.a.createElement("h2",null,"You are submitting a review for:"),l.a.createElement("h5",{style:{color:"#6c757d"}},"Spring 2020 ",this.state.number," ",this.state.title,", taught by ",this.state.instructor)),l.a.createElement(J,{page:this.props.match.params.page,changeText:this.changeText,changeWL:this.changeWL,changeDiff:this.changeDiff,changeGL:this.changeGL,changeLE:this.changeLE,changeIQ:this.changeIQ,onSubmit:this.onSubmit}))))}},{key:"changeText",value:function(e){this.setState({text:e.target.value})}},{key:"changeWL",value:function(e){this.setState({workload:e.target.value})}},{key:"changeDiff",value:function(e){this.setState({difficulty:e.target.value})}},{key:"changeLE",value:function(e){this.setState({learn_quality:e.target.value})}},{key:"changeGL",value:function(e){this.setState({grade_leniency:e.target.value})}},{key:"changeIQ",value:function(e){this.setState({teacher_quality:e.target.value})}}]),a}(n.Component),M=a(75),U=a.n(M),H=a(120),V=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(D,null),l.a.createElement("div",{className:"site-container"},l.a.createElement("h2",{style:{paddingTop:"20px"}},"Oops, we can't seem to find the page you're looking for."),l.a.createElement("h5",{style:{color:"#6c757d"}},"Click a link in the header to go back to a valid page."),l.a.createElement(H.a,{src:U.a,style:{maxHeight:"500px"},fluid:!0})))}}]),a}(n.Component),z=a(121),Y=a(76),$=a.n(Y),K=a(77),X=a.n(K),Z=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a),(e=t.call(this)).responseFacebook=function(t){null!=t.userID&&(localStorage.setItem("sign-in","true"),localStorage.setItem("userID",t.userID),e.setState({isSignedIn:!0}))};var n=!1;return null!==localStorage.getItem("sign-in")&&(n=!0),e.state={isSignedIn:n},e}return Object(o.a)(a,[{key:"render",value:function(){return this.state.isSignedIn?l.a.createElement(m.a,null,l.a.createElement(g.c,null,l.a.createElement(g.a,{path:"/",exact:!0,component:function(){return l.a.createElement(Q,{page:1})}}),l.a.createElement(g.a,{path:"/page-:active/",exact:!0,component:Q}),l.a.createElement(g.a,{path:"/submit-review/:id/:page/",component:B}),l.a.createElement(g.a,{component:V}))):(E.push("/"),l.a.createElement(l.a.Fragment,null,l.a.createElement(D,null),l.a.createElement("div",{className:"site-container flex-wrapper"},l.a.createElement("div",{style:{width:"60%"}}),l.a.createElement("div",{style:{textAlign:"center",marginTop:"70px"}},l.a.createElement(z.a,{style:{width:"100%",paddingTop:"20px",paddingBottom:"40px"}},l.a.createElement(H.a,{src:$.a,fluid:!0}),l.a.createElement("h5",{style:{paddingBottom:"10px"}},"Search for high-quality courses and rate courses you've taken."),l.a.createElement(X.a,{autoLoad:!1,disableMobileRedirect:!0,isMobile:!1,appId:"736328007172590",fields:"name,email,picture",callback:this.responseFacebook,icon:"fa-facebook"}))),l.a.createElement("div",{style:{width:"60%"}}))))}}]),a}(n.Component),ee=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function te(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(Z,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ee?(!function(e,t){fetch(e).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):te(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):te(t,e)}))}}()},75:function(e,t,a){e.exports=a.p+"static/media/jay.ed73e569.gif"},76:function(e,t,a){e.exports=a.p+"static/media/jhu-cr-logo.9ff6f094.png"},80:function(e,t,a){e.exports=a(111)},85:function(e,t,a){}},[[80,1,2]]]);