(this.webpackJsonpjhureviews=this.webpackJsonpjhureviews||[]).push([[0],{126:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(22),i=a.n(l),c=(a(91),a(10)),o=a(11),s=a(13),u=a(12),m=a(25),p=a(15),h=(a(92),a(9)),g=a(35),d=a.n(g),f=a(18),v=Object(f.a)(),E=a(132),b=a(131),y=a(142),k=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"avg",value:function(){var e=this.props,t=0;return t+=Number.parseFloat(e.rev.w),t+=Number.parseFloat(e.rev.d),t+=Number.parseFloat(e.rev.g),t+=Number.parseFloat(e.rev.l),t+=Number.parseFloat(e.rev.t),t/=5,Number(t).toPrecision(3)}},{key:"render",value:function(){var e=this.props.rev.s;return"S20"===e?e="Spring 2019":"F19"===e?e="Fall 2019":"S19"===e?e="Spring 2019":"F18"===e?e="Fall 2018":"S18"===e&&(e="Spring 2018"),r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{style:{backgroundColor:"#f8f9fa",marginTop:"10px",marginBottom:"10px"}},r.a.createElement(y.a.Body,{style:{paddingTop:"15px",paddingBottom:"0px"}},r.a.createElement("b",{style:{fontSize:"0.95em"}},e," | Instructor: ",this.props.rev.i.trim()," | Rating: ",this.avg()),r.a.createElement("p",{style:{fontSize:"0.85em"}},this.props.rev.c.trim()))))}}]),a}(n.Component),C=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"stats",value:function(){for(var e=this.props.ratings,t=["success","success","success","success","success"],a=0;a<e.length;a++)e[a]<3?t[a]="danger":e[a]<4&&(t[a]="warning");return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"flex-wrapper"},r.a.createElement("h5",null,r.a.createElement(b.a,{variant:t[0],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Workload: ",e[0])),r.a.createElement("h5",null,r.a.createElement(b.a,{variant:t[1],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Difficulty: ",e[1])),r.a.createElement("h5",null,r.a.createElement(b.a,{variant:t[2],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Grading: ",e[2])),r.a.createElement("h5",null,r.a.createElement(b.a,{variant:t[3],style:{padding:"8px",marginRight:"10px",fontWeight:"400"}},"Learning: ",e[3])),r.a.createElement("h5",null,r.a.createElement(b.a,{variant:t[4],style:{padding:"8px",fontWeight:"400"}},"Instructor Quality: ",e[4]))))}},{key:"render",value:function(){var e=this,t=this.props,a=t.course,n=t.page;return t.course.rev.length>0?r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",null,"Average Stats"),this.stats(),r.a.createElement("div",{className:"flex-wrapper"},r.a.createElement("h5",{style:{paddingTop:"15px"}},"Reviews"),r.a.createElement("div",null,r.a.createElement(m.b,{to:"/submit-review/"+a._id+"/"+n},r.a.createElement(E.a,{variant:"outline-primary",size:"sm",style:{marginTop:"11.7px",marginLeft:"10px"}},"Submit a Review")))),r.a.createElement("div",null,t.course.rev.sort((function(t,a){return e.cmp(t.s,a.s)[0]<e.cmp(t.s)[1]?1:-1})).map((function(e,t){return r.a.createElement(k,{rev:e,key:t})})))):r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{style:{paddingTop:"5px"}},"Reviews"),r.a.createElement("p",null,"No one has reviewed this course yet. Be the first!"),r.a.createElement(m.b,{to:"/submit-review/"+a._id+"/"+n},r.a.createElement(E.a,{variant:"outline-primary",size:"sm",style:{marginTop:"-5px",marginBottom:"10px"}},"Submit a Review")))}},{key:"cmp",value:function(e,t){switch(e){case"S18":e=1;break;case"F18":e=2;break;case"S19":e=3;break;case"F19":e=4;break;default:e=5}switch(t){case"S18":t=1;break;case"F18":t=2;break;case"S19":t=3;break;case"F19":t=4;break;default:t=5}return[e,t]}}]),a}(n.Component),S=a(143),w=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.page,a=e.length;return r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,{size:"sm",style:{paddingTop:"5px"}},r.a.createElement(S.a.Prev,{disabled:1===t,onClick:function(){return e.changePage(t-1)}}),r.a.createElement(S.a.Item,{active:1===t,onClick:function(){return e.changePage(1)}},1),r.a.createElement(S.a.Item,{disabled:a<=50,active:2===t,onClick:function(){return e.changePage(2)}},2),r.a.createElement(S.a.Ellipsis,{disabled:!0}),r.a.createElement(S.a.Item,{disabled:a<=450,active:10===t,onClick:function(){return e.changePage(10)}},10),r.a.createElement(S.a.Item,{disabled:a<=500,active:11===t,onClick:function(){return e.changePage(11)}},11),r.a.createElement(S.a.Item,{disabled:a<=550,active:12===t,onClick:function(){return e.changePage(12)}},12),r.a.createElement(S.a.Ellipsis,{disabled:!0}),r.a.createElement(S.a.Item,{disabled:a<=2400,active:49===t,onClick:function(){return e.changePage(49)}},49),r.a.createElement(S.a.Item,{disabled:a<=2450,active:50===t,onClick:function(){return e.changePage(50)}},50),r.a.createElement(S.a.Next,{disabled:50===t||50*t>a,onClick:function(){return e.changePage(t+1)}})))}}]),a}(n.Component),O=a(139),N=a(141),j=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return r.a.createElement("div",{className:"flex-wrapper"},r.a.createElement("p",{style:{paddingRight:"2px",margin:"0"}},e.name),r.a.createElement(O.a,{placement:e.position,overlay:r.a.createElement(N.a,{id:"popover-basic"},r.a.createElement(N.a.Title,{as:"h3"},e.title),r.a.createElement(N.a.Content,null,r.a.createElement("p",{style:{margin:"0"}},e.scaleOne),r.a.createElement("p",{style:{margin:"0"}},e.scaleTwo)))},r.a.createElement("p",{style:{margin:"0",color:"#007bff"}},"(?)")))}}]),a}(n.Component),x=a(133),I=a(76),F=a(137),L=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"header-wrapper"},r.a.createElement("div",{className:"search-flex"},r.a.createElement(x.a,{style:{marginRight:"15px"},className:"mb-3"},r.a.createElement(I.a,{placeholder:"Search for a course...",defaultValue:e.filters[0],id:"basic-url1",onChange:e.filterNum})),r.a.createElement(x.a,{style:{marginRight:"15px"},className:"mb-3"},r.a.createElement(I.a,{placeholder:"Search for an instructor...",defaultValue:e.filters[2],id:"basic-url3",onChange:e.filterInstructor})),r.a.createElement(x.a,{className:"mb-3"},r.a.createElement(I.a,{defaultValue:e.filters[10],placeholder:"Search for a minimum rating...",id:"basic-url4",onChange:e.filterRating}))),r.a.createElement("div",{style:{marginTop:"5px",marginLeft:"1px"}},r.a.createElement(F.a,null,["checkbox"].map((function(t){return r.a.createElement("div",{key:"inline-".concat(t),className:"mb-3"},r.a.createElement("div",{className:"filter-wrapper"},r.a.createElement("div",{className:"flex-wrapper"},r.a.createElement(F.a.Check,{onChange:e.filterH,defaultChecked:e.filters[4],inline:!0,label:"H",type:t,id:"inline-".concat(t,"-2")}),r.a.createElement(F.a.Check,{onChange:e.filterS,defaultChecked:e.filters[5],inline:!0,label:"S",type:t,id:"inline-".concat(t,"-3")}),r.a.createElement(F.a.Check,{onChange:e.filterN,defaultChecked:e.filters[6],inline:!0,label:"N",type:t,id:"inline-".concat(t,"-4")}),r.a.createElement(F.a.Check,{onChange:e.filterE,defaultChecked:e.filters[7],inline:!0,label:"E",type:t,id:"inline-".concat(t,"-5")}),r.a.createElement(F.a.Check,{onChange:e.filterQ,defaultChecked:e.filters[8],inline:!0,label:"Q",type:t,id:"inline-".concat(t,"-6")})),r.a.createElement("div",{className:"flex-wrapper"},r.a.createElement(F.a.Check,{onChange:e.filterW,defaultChecked:e.filters[3],inline:!0,label:"Writing Only",type:t,id:"inline-".concat(t,"-1")}),r.a.createElement(F.a.Check,{onChange:e.filterNA,defaultChecked:e.filters[9],inline:!0,label:"No N/A",type:t,id:"inline-".concat(t,"-7")}),r.a.createElement("div",{style:{marginLeft:"-12px"}},r.a.createElement(j,{title:"What's this?",scaleOne:"Checking this option hides courses with no area designation"})))))}))))))}}]),a}(n.Component),T=a(140),W=a(134),R=a(135),A=a(138),P=a(136),G=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return r.a.createElement(P.a,Object.assign({},e,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),r.a.createElement(P.a.Header,{closeButton:!0},r.a.createElement(P.a.Title,{id:"contained-modal-title-vcenter"},"About JHUReviews")),r.a.createElement(P.a.Body,null,r.a.createElement("p",null,"Beginning with the Spring 2020 semester, Johns Hopkins is no longer posting summarized course evaluations. This platform was created in order to make up for that loss, so that students can continue to review courses and select courses that meet their needs."),r.a.createElement("p",null,r.a.createElement("b",null,"Any questions or feedback?")," Just email us at ",r.a.createElement("a",{href:"mailto:contact@jhureviews.com"},"contact@jhureviews.com"),".")),r.a.createElement(P.a.Footer,null,r.a.createElement(E.a,{onClick:e.onHide},"Close")))}}]),a}(n.Component),B=a(79),Q=a.n(B),U=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={showModal:!1},e}return Object(o.a)(a,[{key:"handleToggleModal",value:function(){this.setState({showModal:!this.state.showModal})}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(T.a,{style:{marginBottom:"5px",backgroundColor:"white",boxShadow:"0 0 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.15)"},sticky:"top",collapseOnSelect:!0,expand:"lg",variant:"light"},r.a.createElement(T.a.Brand,{href:"/"},r.a.createElement(W.a,{src:Q.a,style:{maxHeight:"30px",marginTop:"-2px",marginRight:"5px"},fluid:!0}),"JHUReviews"),r.a.createElement(R.a,{variant:"primary",style:{marginTop:"0px",marginLeft:"0px"},className:this.props.loading?"":"hidden",animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")),r.a.createElement(T.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(T.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(A.a,{className:"mr-auto"}),r.a.createElement(A.a,null,r.a.createElement(A.a.Link,{active:!0===this.state.showModal,onClick:function(){return e.handleToggleModal()}},"About")))),r.a.createElement(G,{show:this.state.showModal,onHide:function(){return e.handleToggleModal()}}))}}]),a}(n.Component),D=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={open:!1},n}return Object(o.a)(a,[{key:"handleClick",value:function(e){this.setState({open:e})}},{key:"render",value:function(){var e=this,t=this.props,a=t.course.rating,n="dark";return n=a<1?"dark":a<3?"danger":a<4?"warning":"success",r.a.createElement(r.a.Fragment,null,r.a.createElement("tr",{className:"hover",onClick:function(){return e.handleClick(!e.state.open)}},r.a.createElement("td",null,t.course.num),r.a.createElement("td",null,r.a.createElement("div",{className:"row",style:{paddingLeft:"17px"}},r.a.createElement("div",{style:{paddingRight:"5px"}},t.course.n),this.state.open&&r.a.createElement(E.a,{variant:"link",style:{padding:"0"},onClick:function(){return e.handleClick(!1)}},r.a.createElement("p",{style:{margin:"0",marginTop:"-2px"}},"[-]")),!this.state.open&&r.a.createElement(E.a,{variant:"link",style:{padding:"0"},onClick:function(){return e.handleClick(!0)}},r.a.createElement("p",{style:{margin:"0",marginTop:"-2px"}},"[+]")))),r.a.createElement("td",{style:{paddingLeft:"14px"}},t.course.a),r.a.createElement("td",{style:{paddingLeft:"15px"}},t.course.w),r.a.createElement("td",{style:{paddingLeft:"15px"}},t.course.c),r.a.createElement("td",{style:{paddingLeft:"15px"}},r.a.createElement(b.a,{variant:n,style:{fontSize:"15px",padding:"5px",fontWeight:"400"}},t.course.rating))),this.state.open&&r.a.createElement("tr",null,r.a.createElement("td",{colSpan:"100%"},r.a.createElement("div",null,r.a.createElement(C,{course:t.course,page:t.active,key:t._id,ratings:t.course.ratings})))))}}]),a}(n.Component),H=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).changePage=n.changePage.bind(Object(h.a)(n)),n.filterNum=n.filterNum.bind(Object(h.a)(n)),n.filterName=n.filterName.bind(Object(h.a)(n)),n.filterInstructor=n.filterInstructor.bind(Object(h.a)(n)),n.filterW=n.filterW.bind(Object(h.a)(n)),n.filterH=n.filterH.bind(Object(h.a)(n)),n.filterS=n.filterS.bind(Object(h.a)(n)),n.filterN=n.filterN.bind(Object(h.a)(n)),n.filterE=n.filterE.bind(Object(h.a)(n)),n.filterQ=n.filterQ.bind(Object(h.a)(n)),n.filterNA=n.filterNA.bind(Object(h.a)(n)),n.filterRating=n.filterRating.bind(Object(h.a)(n));var r=1;if(null!=n.props.match&&null!=n.props.match.params){var l=n.props.match.params.active;try{JSON.parse(l)>0&&(r=JSON.parse(l))}catch(o){}}r>1&&50*(r-1)>2481&&(r=50),r<=0&&(r=1),v.push("/page-"+r);var i=null;try{i=JSON.parse(localStorage.getItem("courses"))}catch(o){}return null===i&&(i=[]),n.state={courses:i,active:r,loading:!0,pageLoad:!1,filters:["","","",!1,!0,!0,!0,!0,!0,!1,""]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="https://jhu-course-rating-api.herokuapp.com/courses";this.setState({loading:!0}),0===this.state.courses.length?d.a.get("https://jhu-course-rating-api.herokuapp.com/courses/1-20").then((function(a){e.setState({courses:a.data}),d.a.get(t).then((function(t){localStorage.setItem("courses",JSON.stringify(t.data)),e.setState({courses:t.data,loading:!1})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)})):d.a.get(t).then((function(t){localStorage.setItem("courses",JSON.stringify(t.data)),e.setState({courses:t.data,loading:!1})})).catch((function(e){console.log(e)}))}},{key:"changePage",value:function(e){this.setState({active:e}),v.push("/page-"+e)}},{key:"courseList",value:function(e){var t=this.state.active;return e.slice(50*(t-1),50*t).map((function(e,a){return r.a.createElement(D,{course:e,active:t,key:a+t*Math.random(100)})}))}},{key:"render",value:function(){var e=this.state.active,t=[],a=this.state.filters,n=a[0].toUpperCase().trim(),l=a[1].toUpperCase().trim(),i=0;try{i=JSON.parse(a[10])}catch(c){}return this.state.courses.map((function(e,r){for(var c=[0,0,0,0,0],o=[0,0,0,0,0],s=[0,0,0,0,0],u=0,m=0,p=0;p<e.rev.length;p++)1===Number.parseFloat(e.rev[p].b)?(o[0]+=Number.parseFloat(e.rev[p].w),o[1]+=Number.parseFloat(e.rev[p].d),o[2]+=Number.parseFloat(e.rev[p].g),o[3]+=Number.parseFloat(e.rev[p].l),o[4]+=Number.parseFloat(e.rev[p].t),u++):0===Number.parseFloat(e.rev[p].b)&&(s[0]+=Number.parseFloat(e.rev[p].w),s[1]+=Number.parseFloat(e.rev[p].d),s[2]+=Number.parseFloat(e.rev[p].g),s[3]+=Number.parseFloat(e.rev[p].l),s[4]+=Number.parseFloat(e.rev[p].t),m++);var h=0;for(p=0;p<c.length;p++)0===m&&u>0&&(c[p]=o[p]/u),h+=c[p],c[p]=Number(c[p]).toPrecision(3),m>0&&(c[p]=(o[p]+s[p]/m)/(u+1),h+=c[p],c[p]=Number(c[p]).toPrecision(3));h/=5,h=Number(h).toPrecision(3),e.rating=h,e.ratings=c;var g=e.num.includes(n)&&e.n.toUpperCase().includes(l)&&h>=i;if(g&&a[3]&&"N"===e.w&&(g=!1),g&&a[9]&&"N/A"===e.a&&(g=!1),g){var d=e.a.toUpperCase(),f=["0","1","2","3","H","S","N","E","Q"],v=0;for(p=4;p<a.length;p++)if(a[p]&&d.includes(f[p])){v++;break}0===v&&(g=!1),d.includes("N/A")&&(g=!0)}return g&&t.push(e),0})),localStorage.setItem("courses-length",t.length),r.a.createElement(r.a.Fragment,null,r.a.createElement(U,{active:"sp20",loading:this.state.loading}),r.a.createElement("br",null),r.a.createElement("div",{className:"site-container"},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(L,{filters:a,filterNum:this.filterNum,filterName:this.filterName,filterInstructor:this.filterInstructor,filterW:this.filterW,filterH:this.filterH,filterS:this.filterS,filterN:this.filterN,filterE:this.filterE,filterQ:this.filterQ,filterNA:this.filterNA,filterRating:this.filterRating})),r.a.createElement("div",{className:"flex-wrapper",style:{float:"right"}},r.a.createElement(w,{page:e,changePage:this.changePage,length:t.length}))),r.a.createElement("table",{className:"table table-responsive",style:{marginTop:20}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"course-num"},"Course #"),r.a.createElement("th",{className:"course-name"},"Course Name"),r.a.createElement("th",null,"Areas"),r.a.createElement("th",null,"Writing"),r.a.createElement("th",null,"Credits"),r.a.createElement("th",null,r.a.createElement("div",{className:"flex-wrapper"},r.a.createElement(j,{name:"Rating",title:"Average Course Rating (out of 5)",scaleOne:"Based on five components: Workload, Difficulty, Grading, Learning, & Instructor Quality",position:"bottom"}))))),r.a.createElement("tbody",null,this.courseList(t))),r.a.createElement("div",{className:"flex-wrapper",style:{float:"right"}},r.a.createElement(w,{page:e,changePage:this.changePage,length:t.length}))))}},{key:"filterNum",value:function(e){var t=this.state.filters;t[0]=e.target.value,this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterName",value:function(e){var t=this.state.filters;t[1]=e.target.value,this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterInstructor",value:function(e){var t=this.state.filters;t[2]=e.target.value,this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterRating",value:function(e){var t=this.state.filters;t[10]=e.target.value,this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterW",value:function(e){var t=this.state.filters;t[3]=!t[3],this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterNA",value:function(e){var t=this.state.filters;t[9]=!t[9],this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterH",value:function(e){var t=this.state.filters;t[4]=!t[4],this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterS",value:function(e){var t=this.state.filters;t[5]=!t[5],this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterN",value:function(e){var t=this.state.filters;t[6]=!t[6],this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterE",value:function(e){var t=this.state.filters;t[7]=!t[7],this.setState({active:1,filters:t}),v.push("/page-1")}},{key:"filterQ",value:function(e){var t=this.state.filters;t[8]=!t[8],this.setState({active:1,filters:t}),v.push("/page-1")}}]),a}(n.Component),J=a(84),M=a(77),q=a(6),z=a.n(q),V=(a(57),a(81)),_=a.n(V),Y=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{paddingTop:"20px",paddingBottom:"30px"}},r.a.createElement("div",{style:{paddingBottom:"1px"}},r.a.createElement("h2",null,"Oops, you're not verified!"),r.a.createElement("h5",{style:{color:"#6c757d"}},"Before you can submit a review, we'll need to verify that you're a JHU student."),r.a.createElement("p",{style:{color:"#6c757d",fontSize:"0.9em"}},"If you don't use an @jh.edu email, your reviews won't be posted. We don't record any information about you other than your email address.")),r.a.createElement(_.a,{uiConfig:e.uiConfig,firebaseAuth:e.firebaseAuth})))}}]),a}(n.Component),Z=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).changeText=n.changeText.bind(Object(h.a)(n)),n.changeWorkload=n.changeWorkload.bind(Object(h.a)(n)),n.changeDifficulty=n.changeDifficulty.bind(Object(h.a)(n)),n.changeLearning=n.changeLearning.bind(Object(h.a)(n)),n.changeGrading=n.changeGrading.bind(Object(h.a)(n)),n.changeInstructorQuality=n.changeInstructorQuality.bind(Object(h.a)(n)),n.changeSemester=n.changeSemester.bind(Object(h.a)(n)),n.changeInstructorName=n.changeInstructorName.bind(Object(h.a)(n)),n.onSubmit=n.onSubmit.bind(Object(h.a)(n));var r=!1;return"true"===localStorage.getItem("loggedIn")&&(r=!0),n.state={number:"",title:"",text:"",workload:"",difficulty:"",learning:"",instructor_quality:"",grading:"",semester:"",instructor_name:"",isSignedIn:r,uid:null,uiConfig:{signInFlow:"popup",signInOptions:["microsoft.com"],callbacks:{signInSuccessWithAuthResult:function(){return!1}}}},n}return Object(o.a)(a,[{key:"login",value:function(e){var t=null;e&&(t=e.uid),this.setState({isSignedIn:!!e,uid:t}),e?localStorage.setItem("loggedIn",!0):localStorage.setItem("loggedIn",!1)}},{key:"componentDidMount",value:function(){var e=this;this.unregisterAuthObserver=z.a.auth().onAuthStateChanged((function(t){return e.login(t)})),d.a.get("https://jhu-course-rating-api.herokuapp.com/courses/"+this.props.match.params.id).then((function(t){e.setState({number:t.data.num,title:t.data.n})})).catch((function(e){console.log(e)}))}},{key:"componentWillUnmount",value:function(){this.unregisterAuthObserver()}},{key:"onSubmit",value:function(e){e.preventDefault();var t=[this.state.text,this.state.workload,this.state.difficulty,this.state.learning,this.state.grading,this.state.instructor_quality,this.state.semester,this.state.instructor_name];""===t[6]&&(t[6]="Spring 2020");for(var a=0;a<t.length;a++)""===t[a]&&(t[a]="3.00");var n={s:t[6],i:t[7],c:t[0],w:t[1],d:t[2],l:t[3],g:t[4],t:t[5],b:"0"};d.a.post("https://jhu-course-rating-api.herokuapp.com/courses/add-review/"+this.props.match.params.id+"/"+this.state.uid,n).then((function(e){console.log(e.data),window.location.reload()})).catch((function(e){console.log(e)})),this.props.history.push("/page-1")}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(U,{active:"sp20"}),r.a.createElement("div",{className:"site-container"},!this.state.isSignedIn&&r.a.createElement(Y,{uiConfig:this.state.uiConfig,firebaseAuth:z.a.auth()}),this.state.isSignedIn&&r.a.createElement("div",{style:{paddingTop:"20px",paddingBottom:"30px"}},r.a.createElement("div",{style:{paddingBottom:"15px"}},r.a.createElement("h2",null,"You are submitting a review for:"),r.a.createElement("h5",{style:{color:"#6c757d"}},this.state.number," ",this.state.title)),r.a.createElement(K,{page:this.props.match.params.page,changeText:this.changeText,changeWorkload:this.changeWorkload,changeDifficulty:this.changeDifficulty,changeGrading:this.changeGrading,changeLearning:this.changeLearning,changeInstructorQuality:this.changeInstructorQuality,changeSemester:this.changeSemester,changeInstructorName:this.changeInstructorName,onSubmit:this.onSubmit}))))}},{key:"changeInstructorName",value:function(e){this.setState({instructor_name:e.target.value.trim()})}},{key:"changeSemester",value:function(e){var t=e.target.value;"Spring 2020"===t||""===t?t="S20":"Fall 2019"===t?t="F19":"Spring 2019"===t?t="S19":"Fall 2018"===t?t="F18":"Spring 2018"===t&&(t="S18"),alert(t),this.setState({semester:t})}},{key:"changeText",value:function(e){this.setState({text:e.target.value.trim()})}},{key:"changeWorkload",value:function(e){this.setState({workload:e.target.value})}},{key:"changeDifficulty",value:function(e){this.setState({difficulty:e.target.value})}},{key:"changeLearning",value:function(e){this.setState({learning:e.target.value})}},{key:"changeGrading",value:function(e){this.setState({grading:e.target.value})}},{key:"changeInstructorQuality",value:function(e){this.setState({instructor_quality:e.target.value})}}]),a}(n.Component);function K(e){var t=Object(n.useState)(!1),a=Object(J.a)(t,2),l=a[0],i=a[1],c=e.page;return r.a.createElement(F.a,{noValidate:!0,validated:l,onSubmit:function(t){var a=t.currentTarget;!1===a.checkValidity()&&(t.preventDefault(),t.stopPropagation()),i(!0),a.checkValidity()&&e.onSubmit(t)}},r.a.createElement(F.a.Row,null,r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustomUsername"},r.a.createElement(F.a.Label,null,"Semester"),r.a.createElement(x.a,null,r.a.createElement(F.a.Control,{as:"select",defaultValue:"Spring 2020",required:!0,onChange:e.changeSemester},r.a.createElement("option",null,"Spring 2018"),r.a.createElement("option",null,"Fall 2018"),r.a.createElement("option",null,"Spring 2019"),r.a.createElement("option",null,"Fall 2019"),r.a.createElement("option",null,"Spring 2020")),r.a.createElement(F.a.Control.Feedback,null,"Looks good!"))),r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustom05"},r.a.createElement(F.a.Label,null,"Instructor Name"),r.a.createElement(F.a.Control,{as:"textarea",placeholder:"Type your instructor's name",rows:"1",required:!0,maxLength:50,onChange:e.changeInstructorName}),r.a.createElement(F.a.Control.Feedback,{type:"invalid"},"Please provide your instructor's name."))),r.a.createElement(F.a.Row,null,r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustomUsername"},r.a.createElement(F.a.Label,null,r.a.createElement(j,{name:"Workload",title:"Workload",scaleOne:"1 = Enough work for 3 classes",scaleTwo:"5 = A whole lot of nothing"})),r.a.createElement(x.a,null,r.a.createElement(F.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeWorkload},r.a.createElement("option",null,"1"),r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5")),r.a.createElement(F.a.Control.Feedback,null,"Looks good!"))),r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustomUsername"},r.a.createElement(F.a.Label,null,r.a.createElement(j,{name:"Difficulty",title:"Difficulty",scaleOne:"1 = Were the lectures in English??",scaleTwo:"5 = Me and all my bois aced it"})),r.a.createElement(x.a,null,r.a.createElement(F.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeDifficulty},r.a.createElement("option",null,"1"),r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5")),r.a.createElement(F.a.Control.Feedback,null,"Looks good!"))),r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustomUsername"},r.a.createElement(F.a.Label,null,r.a.createElement(j,{name:"Grading",title:"Grading",scaleOne:"1 = Prof had no mercy on my soul",scaleTwo:"5 = Was it possible to not get an A??"})),r.a.createElement(x.a,null,r.a.createElement(F.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeGrading},r.a.createElement("option",null,"1"),r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5")),r.a.createElement(F.a.Control.Feedback,null,"Looks good!")))),r.a.createElement(F.a.Row,null,r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustomUsername"},r.a.createElement(F.a.Label,null,r.a.createElement(j,{name:"Learning",title:"Learning",scaleOne:"1 = I only have two brain cells left",scaleTwo:"5 = I'm a big 200iq brain now"})),r.a.createElement(x.a,null,r.a.createElement(F.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeLearning},r.a.createElement("option",null,"1"),r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5")),r.a.createElement(F.a.Control.Feedback,null,"Looks good!"))),r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustomUsername"},r.a.createElement(F.a.Label,null,r.a.createElement(j,{name:"Instructor Quality",title:"Instructor Quality",scaleOne:"1 = I had to completely self-teach",scaleTwo:"5 = The prof was basically God"})),r.a.createElement(x.a,null,r.a.createElement(F.a.Control,{as:"select",defaultValue:"3",required:!0,onChange:e.changeInstructorQuality},r.a.createElement("option",null,"1"),r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5")),r.a.createElement(F.a.Control.Feedback,null,"Looks good!")))),r.a.createElement(F.a.Row,null,r.a.createElement(F.a.Group,{as:M.a,controlId:"validationCustom05"},r.a.createElement(F.a.Label,null,"Review"),r.a.createElement(F.a.Control,{as:"textarea",placeholder:"Type your thoughts about the course...",rows:"3",required:!0,maxLength:550,onChange:e.changeText}),r.a.createElement(F.a.Control.Feedback,{type:"invalid"},"Please provide a review."))),r.a.createElement(E.a,{type:"submit"},"Submit"),r.a.createElement(m.b,{to:"/page-"+c},r.a.createElement(E.a,{variant:"danger",onClick:function(){v.push("/page-"+c)},type:"cancel",style:{marginLeft:"15px"}},"Cancel")))}var X=a(83),$=a.n(X),ee=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(U,null),r.a.createElement("div",{className:"site-container"},r.a.createElement("h2",{style:{paddingTop:"20px"}},"Oops, we can't find the page you're looking for."),r.a.createElement("h5",{style:{color:"#6c757d"}},"Click ",r.a.createElement(m.b,{to:"/page-1/"},"here")," to go back to the main page."),r.a.createElement(W.a,{src:$.a,style:{maxHeight:"500px"},fluid:!0})))}}]),a}(n.Component),te={apiKey:"AIzaSyDzDAmYRzuAcvsZRWGisFfCUmD1TC137Cw",authDomain:"jhu-reviews-7d47b.firebaseapp.com",databaseURL:"https://jhu-reviews-7d47b.firebaseio.com",projectId:"jhu-reviews-7d47b",storageBucket:"jhu-reviews-7d47b.appspot.com",messagingSenderId:"990322116404",appId:"1:990322116404:web:9d135baaca8b1b8ad1c761",measurementId:"G-JXZMR06V8Q"};z.a.initializeApp(te);var ae=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(m.a,null,r.a.createElement(p.c,null,r.a.createElement(p.a,{path:"/",exact:!0,component:function(){return r.a.createElement(H,{page:1})}}),r.a.createElement(p.a,{path:"/page-:active/",exact:!0,component:H}),r.a.createElement(p.a,{path:"/submit-review/:id/:page/",component:Z}),r.a.createElement(p.a,{component:ee})))}}]),a}(n.Component),ne=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function re(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ae,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ne?(!function(e,t){fetch(e).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):re(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):re(t,e)}))}}()},79:function(e,t,a){e.exports=a.p+"static/media/logo1.fcfdda9c.png"},83:function(e,t,a){e.exports=a.p+"static/media/jay.ed73e569.gif"},86:function(e,t,a){e.exports=a(126)},91:function(e,t,a){}},[[86,1,2]]]);