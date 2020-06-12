(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{fyF7:function(t,e,i){"use strict";i.r(e);var n=i("ofXK"),s=i("tyNb"),r=i("XNiG"),o=i("3N8a");class a extends o.a{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}schedule(t,e=0){return e>0?super.schedule(t,e):(this.delay=e,this.state=t,this.scheduler.flush(this),this)}execute(t,e){return e>0||this.closed?super.execute(t,e):this._execute(t,e)}requestAsyncId(t,e,i=0){return null!==i&&i>0||null===i&&this.delay>0?super.requestAsyncId(t,e,i):t.flush(this)}}var c=i("IjjT");class u extends c.a{}const l=new u(a);var d=i("quSY"),h=i("7o/Q"),g=i("EY2u"),p=i("LRne"),f=i("HDdC");let b=(()=>{class t{constructor(t,e,i){this.kind=t,this.value=e,this.error=i,this.hasValue="N"===t}observe(t){switch(this.kind){case"N":return t.next&&t.next(this.value);case"E":return t.error&&t.error(this.error);case"C":return t.complete&&t.complete()}}do(t,e,i){switch(this.kind){case"N":return t&&t(this.value);case"E":return e&&e(this.error);case"C":return i&&i()}}accept(t,e,i){return t&&"function"==typeof t.next?this.observe(t):this.do(t,e,i)}toObservable(){switch(this.kind){case"N":return Object(p.a)(this.value);case"E":return t=this.error,new f.a(e=>e.error(t));case"C":return Object(g.b)()}var t;throw new Error("unexpected notification kind value")}static createNext(e){return void 0!==e?new t("N",e):t.undefinedValueNotification}static createError(e){return new t("E",void 0,e)}static createComplete(){return t.completeNotification}}return t.completeNotification=new t("C"),t.undefinedValueNotification=new t("N",void 0),t})();class m extends h.a{constructor(t,e,i=0){super(t),this.scheduler=e,this.delay=i}static dispatch(t){const{notification:e,destination:i}=t;e.observe(i),this.unsubscribe()}scheduleMessage(t){this.destination.add(this.scheduler.schedule(m.dispatch,this.delay,new w(t,this.destination)))}_next(t){this.scheduleMessage(b.createNext(t))}_error(t){this.scheduleMessage(b.createError(t)),this.unsubscribe()}_complete(){this.scheduleMessage(b.createComplete()),this.unsubscribe()}}class w{constructor(t,e){this.notification=t,this.destination=e}}var _=i("9ppp"),v=i("Ylt2");class C extends r.a{constructor(t=Number.POSITIVE_INFINITY,e=Number.POSITIVE_INFINITY,i){super(),this.scheduler=i,this._events=[],this._infiniteTimeWindow=!1,this._bufferSize=t<1?1:t,this._windowTime=e<1?1:e,e===Number.POSITIVE_INFINITY?(this._infiniteTimeWindow=!0,this.next=this.nextInfiniteTimeWindow):this.next=this.nextTimeWindow}nextInfiniteTimeWindow(t){const e=this._events;e.push(t),e.length>this._bufferSize&&e.shift(),super.next(t)}nextTimeWindow(t){this._events.push(new O(this._getNow(),t)),this._trimBufferThenGetEvents(),super.next(t)}_subscribe(t){const e=this._infiniteTimeWindow,i=e?this._events:this._trimBufferThenGetEvents(),n=this.scheduler,s=i.length;let r;if(this.closed)throw new _.a;if(this.isStopped||this.hasError?r=d.a.EMPTY:(this.observers.push(t),r=new v.a(this,t)),n&&t.add(t=new m(t,n)),e)for(let o=0;o<s&&!t.closed;o++)t.next(i[o]);else for(let o=0;o<s&&!t.closed;o++)t.next(i[o].value);return this.hasError?t.error(this.thrownError):this.isStopped&&t.complete(),r}_getNow(){return(this.scheduler||l).now()}_trimBufferThenGetEvents(){const t=this._getNow(),e=this._bufferSize,i=this._windowTime,n=this._events,s=n.length;let r=0;for(;r<s&&!(t-n[r].time<i);)r++;return s>e&&(r=Math.max(r,s-e)),r>0&&n.splice(0,r),n}}class O{constructor(t,e){this.time=t,this.value=e}}var M,N=i("2Vo4"),P=i("SxV6"),I=i("fXoL");class y{constructor(t){var e;this.lazyLoad=!1,this.providers=new Map,this._ready=new C,(e=t)&&(e instanceof f.a||"function"==typeof e.lift&&"function"==typeof e.subscribe)?t.pipe(Object(P.a)()).subscribe(t=>{this.initialize(t)}):this.initialize(t)}initialize(t){for(let e=0;e<t.length;e++){let i=t[e];this.providers.set(i.id,i.provider),this.lazyLoad=this.lazyLoad||i.lazyLoad}this._ready.next(),this._ready.complete()}}let x=(()=>{let t=M=class{constructor(t){this._user=null,this._authState=new C(1),this._readyState=new N.a([]),this.initialized=!1,t._ready.subscribe(()=>{this.providers=t.providers,t.lazyLoad||this.initialize()})}get authState(){return this._authState.asObservable()}get readyState(){return this._readyState.asObservable()}initialize(){this.initialized=!0,this.providers.forEach((t,e)=>{t.initialize().then(()=>{let i=this._readyState.getValue();i.push(e),this._readyState.next(i),t.getLoginStatus().then(t=>{t.provider=e,this._user=t,this._authState.next(t)}).catch(t=>{this._authState.next(null)})})})}signIn(t,e){return this.initialized||this.initialize(),new Promise((i,n)=>{let s=this.providers.get(t);s?s.signIn(e).then(e=>{e.provider=t,i(e),this._user=e,this._authState.next(e)}).catch(t=>{n(t)}):n(M.ERR_LOGIN_PROVIDER_NOT_FOUND)})}signOut(t=!1){return this.initialized||this.initialize(),new Promise((e,i)=>{if(this._user){let n=this.providers.get(this._user.provider);n?n.signOut(t).then(()=>{e(),this._user=null,this._authState.next(null)}).catch(t=>{i(t)}):i(M.ERR_LOGIN_PROVIDER_NOT_FOUND)}else i(M.ERR_NOT_LOGGED_IN)})}};return t.\u0275fac=function(e){return new(e||t)(I.Vb(y))},t.\u0275prov=I.Hb({token:t,factory:t.\u0275fac}),t.ERR_LOGIN_PROVIDER_NOT_FOUND="Login provider not found",t.ERR_NOT_LOGGED_IN="Not logged in",t})();var R;let S=(()=>{let t=R=class{constructor(t){if(t)throw new Error("SocialLoginModule is already loaded. Import it in the AppModule only")}static initialize(t){return{ngModule:R,providers:[x,{provide:y,useValue:t}]}}};return t.\u0275mod=I.Jb({type:t}),t.\u0275inj=I.Ib({factory:function(e){return new(e||t)(I.Vb(t,12))},providers:[x],imports:[[n.b]]}),t})();class E{}let k=(()=>{class t extends class{constructor(){this._readyState=new N.a(!1)}onReady(){return new Promise((t,e)=>{this._readyState.subscribe(e=>{e&&t()})})}loadScript(t,e,i,n=!0,s=""){if("undefined"!=typeof document&&!document.getElementById(t)){let t=document.createElement("script");t.async=n,t.src=e,t.onload=i,document.head.appendChild(t)}}}{constructor(t,e={scope:"email"}){super(),this.clientId=t,this.opt=e}initialize(){return new Promise((e,i)=>{this.loadScript(t.PROVIDER_ID,"https://apis.google.com/js/platform.js",()=>{gapi.load("auth2",()=>{this.auth2=gapi.auth2.init(Object.assign(Object.assign({},this.opt),{client_id:this.clientId})),this.auth2.then(()=>{this._readyState.next(!0),e()}).catch(t=>{i(t)})})})})}getLoginStatus(){return new Promise((t,e)=>{this.onReady().then(()=>{if(this.auth2.isSignedIn.get()){let e=new E,i=this.auth2.currentUser.get().getBasicProfile(),n=this.auth2.currentUser.get().getAuthResponse(!0).access_token,s=this.auth2.currentUser.get().getAuthResponse(!0).id_token;e.id=i.getId(),e.name=i.getName(),e.email=i.getEmail(),e.photoUrl=i.getImageUrl(),e.firstName=i.getGivenName(),e.lastName=i.getFamilyName(),e.authToken=n,e.idToken=s,t(e)}else e("No user is currently logged in.")})})}signIn(t){return new Promise((e,i)=>{this.onReady().then(()=>{(t&&t.offline_access||this.opt&&this.opt.offline_access?this.auth2.grantOfflineAccess(t):this.auth2.signIn(t)).then(t=>{let i=new E,n=this.auth2.currentUser.get().getBasicProfile(),s=this.auth2.currentUser.get().getAuthResponse(!0).access_token,r=this.auth2.currentUser.get().getAuthResponse(!0).id_token;i.id=n.getId(),i.name=n.getName(),i.email=n.getEmail(),i.photoUrl=n.getImageUrl(),i.firstName=n.getGivenName(),i.lastName=n.getFamilyName(),i.authToken=s,i.idToken=r,t&&t.code&&(i.authorizationCode=t.code),e(i)},t=>{i("User cancelled login or did not fully authorize.")}).catch(t=>{i(t)})})})}signOut(t){return new Promise((e,i)=>{this.onReady().then(()=>{let n;n=t?this.auth2.disconnect():this.auth2.signOut(),n.then(t=>{t?i(t):e()}).catch(t=>{i(t)})})})}}return t.PROVIDER_ID="GOOGLE",t})();var A=i("PSD3"),L=i.n(A),Q=i("cplz"),T=i("cxgq"),z=i("668k"),U=i("3Pt+");function V(t,e){1&t&&(I.Rb(0,"p",6),I.Ac(1," Sign Up with your Slot Blockr Account "),I.Qb())}function F(t,e){1&t&&(I.Rb(0,"p",6),I.Ac(1," Sign In with your Slot Blockr Account "),I.Qb())}function G(t,e){if(1&t){const t=I.Sb();I.Rb(0,"div",7),I.Rb(1,"div",8),I.Rb(2,"button",9),I.Zb("click",(function(){return I.sc(t),I.dc().loginWithFacebook()})),I.Ac(3," Sign Up with Facebook "),I.Qb(),I.Qb(),I.Rb(4,"div",8),I.Rb(5,"button",10),I.Zb("click",(function(){return I.sc(t),I.dc().signInWithGoogle()})),I.Ac(6," Sign Up with Google "),I.Qb(),I.Qb(),I.Mb(7,"hr"),I.Rb(8,"div",8),I.Rb(9,"input",11),I.Zb("input",(function(){return I.sc(t),I.dc().firstNameChanged("input")}))("focusin",(function(){return I.sc(t),I.dc().firstNameChanged("focusin")}))("focusout",(function(){return I.sc(t),I.dc().firstNameChanged("focusout")}))("ngModelChange",(function(e){return I.sc(t),I.dc().firstName=e})),I.Qb(),I.Rb(10,"input",12),I.Zb("input",(function(){return I.sc(t),I.dc().lastNameChanged("input")}))("focusin",(function(){return I.sc(t),I.dc().lastNameChanged("focusin")}))("focusout",(function(){return I.sc(t),I.dc().lastNameChanged("focusout")}))("ngModelChange",(function(e){return I.sc(t),I.dc().lastName=e})),I.Qb(),I.Qb(),I.Rb(11,"div",8),I.Rb(12,"input",13),I.Zb("ngModelChange",(function(e){return I.sc(t),I.dc().email=e}))("input",(function(){return I.sc(t),I.dc().emailChanged("input")}))("focusin",(function(){return I.sc(t),I.dc().emailChanged("focusin")}))("focusout",(function(){return I.sc(t),I.dc().emailChanged("focusout")})),I.Qb(),I.Qb(),I.Rb(13,"div",14),I.Rb(14,"input",15),I.Zb("ngModelChange",(function(e){return I.sc(t),I.dc().password=e}))("input",(function(){return I.sc(t),I.dc().passwordChanged("input")}))("focusin",(function(){return I.sc(t),I.dc().passwordChanged("focusin")}))("focusout",(function(){return I.sc(t),I.dc().passwordChanged("focusout")})),I.Qb(),I.Rb(15,"div",16),I.Rb(16,"img",17),I.Zb("click",(function(){return I.sc(t),I.dc().showPassword()})),I.Qb(),I.Qb(),I.Qb(),I.Rb(17,"div",8),I.Rb(18,"button",18),I.Zb("click",(function(){return I.sc(t),I.dc().signUpHelper()})),I.Ac(19,"Sign Up"),I.Qb(),I.Qb(),I.Rb(20,"div",19),I.Rb(21,"span"),I.Ac(22,"Already a member ? "),I.Rb(23,"a",20),I.Zb("click",(function(){return I.sc(t),I.dc().changeMode("login")})),I.Ac(24,"Sign In"),I.Qb(),I.Qb(),I.Qb(),I.Qb()}if(2&t){const t=I.dc();I.Ab(9),I.ic("ngModel",t.firstName),I.Ab(1),I.ic("ngModel",t.lastName),I.Ab(2),I.ic("ngModel",t.email),I.Ab(2),I.ic("type",t.passwordInputType)("ngModel",t.password)("type",t.show?"text":"password"),I.Ab(2),I.ic("src","../../assets/images/autorization/"+(t.show?"eye-icon.svg":"eye-open.svg"),I.uc)}}function Z(t,e){if(1&t){const t=I.Sb();I.Rb(0,"div",21),I.Rb(1,"div",8),I.Rb(2,"button",9),I.Zb("click",(function(){return I.sc(t),I.dc().loginWithFacebook()})),I.Ac(3," Sign In with Facebook "),I.Qb(),I.Qb(),I.Rb(4,"div",8),I.Rb(5,"button",10),I.Zb("click",(function(){return I.sc(t),I.dc().signInWithGoogle()})),I.Ac(6," Sign In with Google "),I.Qb(),I.Qb(),I.Mb(7,"hr"),I.Rb(8,"div",8),I.Rb(9,"input",13),I.Zb("ngModelChange",(function(e){return I.sc(t),I.dc().email=e}))("input",(function(){return I.sc(t),I.dc().emailChanged("input")}))("focusin",(function(){return I.sc(t),I.dc().emailChanged("focusin")}))("focusout",(function(){return I.sc(t),I.dc().emailChanged("focusout")})),I.Qb(),I.Qb(),I.Rb(10,"div",14),I.Rb(11,"input",15),I.Zb("ngModelChange",(function(e){return I.sc(t),I.dc().password=e}))("input",(function(){return I.sc(t),I.dc().passwordChanged("input")}))("focusin",(function(){return I.sc(t),I.dc().passwordChanged("focusin")}))("focusout",(function(){return I.sc(t),I.dc().passwordChanged("focusout")})),I.Qb(),I.Rb(12,"div",16),I.Rb(13,"img",17),I.Zb("click",(function(){return I.sc(t),I.dc().showPassword()})),I.Qb(),I.Qb(),I.Qb(),I.Rb(14,"div",8),I.Rb(15,"button",22),I.Zb("click",(function(){return I.sc(t),I.dc().signInHelper()})),I.Ac(16,"Sign In"),I.Qb(),I.Qb(),I.Rb(17,"div",19),I.Rb(18,"span"),I.Ac(19,"Not a member yet ? "),I.Rb(20,"a",20),I.Zb("click",(function(){return I.sc(t),I.dc().changeMode("register")})),I.Ac(21,"Sign Up"),I.Qb(),I.Qb(),I.Qb(),I.Qb()}if(2&t){const t=I.dc();I.Ab(9),I.ic("ngModel",t.email),I.Ab(2),I.ic("type",t.passwordInputType)("ngModel",t.password)("type",t.show?"text":"password"),I.Ab(2),I.ic("src","../../assets/images/autorization/"+(t.show?"eye-icon.svg":"eye-open.svg"),I.uc)}}const D=[{path:"",component:(()=>{class t{constructor(t,e,i,n,s){this.route=t,this.authService=e,this.router=i,this.serv=n,this.loaderservice=s,this.loaderId="login-register",this.show=!1,this.mode="login",this.passwordInputType="text",this.email="Email Address",this.password="Password",this.firstName="First Name",this.lastName="Last Name"}ngOnInit(){this.route.params.subscribe(t=>{this.mode=t.mode}),this.authService.authState.subscribe(t=>{this.user=t,this.loggedIn=null!=t}),this.serv.currentUserObj.subscribe(t=>{null==t&&this.logout()})}passwordChanged(t){"input"===t&&(this.passwordInputType="password"),"focusin"===t&&"Password"===this.password&&(this.password=""),"focusout"===t&&""===this.password&&(this.password="Password",this.passwordInputType="text")}emailChanged(t){"focusin"===t&&"Email Address"===this.email&&(this.email=""),"focusout"===t&&""===this.email&&(this.email="Email Address")}firstNameChanged(t){"focusin"===t&&"First Name"===this.firstName&&(this.firstName=""),"focusout"===t&&""===this.firstName&&(this.firstName="First Name")}lastNameChanged(t){"focusin"===t&&"Last Name"===this.lastName&&(this.lastName=""),"focusout"===t&&""===this.lastName&&(this.lastName="Last Name")}loginWithFacebook(){FB.login(t=>{if(!t.authResponse)throw"FB error";FB.api("/me",{fields:"name,email"},t=>{const e={email:t.email,firstName:t.name,lastName:"",passwordSalt:t.id,fbId:t.id,isSocialLogin:!0,socialLoginType:"facebook"};this.serv.httpPost("users/add-new-user",e).subscribe(t=>{!1===t.error&&t.result?L.a.fire({title:"Account Created",icon:"success"}).then(()=>{this.router.navigate(["/login-regiter/login"])}):!0===t.error&&"user-already-exists"===t.code?L.a.fire({title:"User Logged in",icon:"success"}).then(()=>{this.serv.publishUserLogin(e),this.router.navigate(["/home"])}):L.a.fire({title:"Error creating account",text:t.err,icon:"error"})},t=>{L.a.fire({title:"Error creating account",text:t,icon:"error"})})})},{scope:"email"})}signInWithGoogle(){this.authService.signIn(k.PROVIDER_ID).then(t=>{const e={email:t.email,firstName:t.firstName,lastName:t.lastName,passwordSalt:t.id,googleId:t.id,isSocialLogin:!0,socialLoginType:"google"};this.serv.httpPost("users/add-new-user",e).subscribe(t=>{!1===t.error&&t.result?L.a.fire({title:"Account Created",icon:"success"}).then(()=>{this.router.navigate(["/login-regiter/login"])}):!0===t.error&&"user-already-exists"===t.code?L.a.fire({title:"User Logged in",icon:"success"}).then(()=>{this.serv.publishUserLogin(e),this.router.navigate(["/home"])}):L.a.fire({title:"Error creating account",text:t.err,icon:"error"})},t=>{L.a.fire({title:"Error creating account",text:t,icon:"error"})})}).catch(t=>{throw t})}signOut(){this.authService.signOut()}signInHelper(){this.loaderservice.start(this.loaderId,"login-register");const t=this.validateSignIn();!0===t.isValid?this.serv.httpPost("users/sign-in-user",{passwordSalt:this.password,email:this.email}).subscribe(t=>{this.loaderservice.stop(this.loaderId,"login-register"),!1===t.error&&"user-valid"==t.result?L.a.fire({title:"User Logged in",icon:"success"}).then(()=>{this.serv.publishUserLogin(t.user),this.router.navigate(["/home"])}):L.a.fire({title:"Error",text:t.err,icon:"error"})},t=>{L.a.fire({title:"Error Logging in",text:t.err,icon:"error"}),this.loaderservice.stop(this.loaderId,"login-register")}):L.a.fire({text:t.text})}signUpHelper(){this.loaderservice.start(this.loaderId,"login-register");const t=this.validateSignUp();!0===t.isValid?this.serv.httpPost("users/add-new-user",{firstName:this.firstName,lastName:this.lastName,passwordSalt:this.password,email:this.email}).subscribe(t=>{this.loaderservice.stop(this.loaderId,"login-register"),!1===t.error&&t.result?L.a.fire({title:"Account Created",icon:"success"}).then(()=>{this.router.navigate(["/home"])}):L.a.fire({title:"Error creating account",text:t.err,icon:"error"})},t=>{this.loaderservice.stop(this.loaderId,"login-register"),L.a.fire({title:"Error creating account",text:t,icon:"error"})}):L.a.fire({text:t.text})}changeMode(t){this.email="Email Address",this.password="Password",this.passwordInputType="text",this.router.navigate(["/login-register",t])}validateSignIn(){const t={text:"",isValid:!0};return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(this.email).toLowerCase())?0===this.password.length||"Password"===this.password?(t.isValid=!1,t.text="Please enter password",t):t:(t.isValid=!1,t.text="Invalid email format !",t)}validateSignUp(){const t={text:"",isValid:!0};return""===this.firstName||"First Name"===this.firstName?(t.isValid=!1,t.text="Please enter first name !",t):""===this.lastName||"Last Name"===this.lastName?(t.isValid=!1,t.text="Please enter last name !",t):this.firstName===this.lastName?(t.isValid=!1,t.text="First name and last name cannot be the same !",t):/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(this.email).toLowerCase())?this.password.length<6||!1===/.*[0-9].*/.test(this.password)?(t.isValid=!1,t.text="Password length must be atleast 6 and must contain a digit !",t):t:(t.isValid=!1,t.text="Invalid email format !",t)}logout(){FB.getLoginStatus((function(t){t&&"connected"===t.status&&FB.logout((function(t){}))})),this.authService.signOut(!0)}showPassword(){this.show=!this.show}}return t.\u0275fac=function(e){return new(e||t)(I.Lb(s.a),I.Lb(x),I.Lb(s.f),I.Lb(Q.a),I.Lb(T.a))},t.\u0275cmp=I.Fb({type:t,selectors:[["app-login-register"]],decls:7,vars:5,consts:[[3,"loaderId"],[1,"login-register-wrapper"],["class","page-title",4,"ngIf"],[1,"content-wrapper"],["class","register-wrapper",4,"ngIf"],["class","login-wrapper",4,"ngIf"],[1,"page-title"],[1,"register-wrapper"],[1,"a-row"],[1,"btn-facebook",3,"click"],[1,"btn-google",3,"click"],["type","text",1,"input-first-name",3,"ngModel","input","focusin","focusout","ngModelChange"],["type","text",1,"input-last-name",3,"ngModel","input","focusin","focusout","ngModelChange"],["type","text",1,"input-email",3,"ngModel","ngModelChange","input","focusin","focusout"],[1,"a-row","password-toggle"],[1,"input-password",3,"type","ngModel","ngModelChange","input","focusin","focusout"],[1,"password-icon"],["alt","",3,"src","click"],[1,"btn-signin",3,"click"],[1,"bottom"],[1,"mode-change-link",3,"click"],[1,"login-wrapper"],[1,"btn-signup",3,"click"]],template:function(t,e){1&t&&(I.Rb(0,"app-loader",0),I.Rb(1,"div",1),I.yc(2,V,2,0,"p",2),I.yc(3,F,2,0,"p",2),I.Rb(4,"div",3),I.yc(5,G,25,7,"div",4),I.yc(6,Z,22,5,"div",5),I.Qb(),I.Qb(),I.Qb()),2&t&&(I.ic("loaderId",e.loaderId),I.Ab(2),I.ic("ngIf","register"==e.mode),I.Ab(1),I.ic("ngIf","login"==e.mode),I.Ab(2),I.ic("ngIf","register"==e.mode),I.Ab(1),I.ic("ngIf","login"==e.mode))},directives:[z.a,n.j,U.a,U.f,U.i],styles:["*[_ngcontent-%COMP%]{font-size:1.6rem}.login-register-wrapper[_ngcontent-%COMP%]{font-family:Montserrat;font-size:1.6rem;margin:2rem 0;min-height:70vh}.login-register-wrapper[_ngcontent-%COMP%]   .page-title[_ngcontent-%COMP%]{text-align:center;font-size:2.4rem;margin:3rem 0;font-weight:700}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]{max-width:320px;margin:0 auto}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .a-row[_ngcontent-%COMP%]{margin:1rem 0}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .password-toggle[_ngcontent-%COMP%]{position:relative}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .password-toggle[_ngcontent-%COMP%]   .password-icon[_ngcontent-%COMP%]{position:absolute;right:0;top:15px}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .password-toggle[_ngcontent-%COMP%]   .password-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:15px;height:15px;margin-right:8px}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .btn-facebook[_ngcontent-%COMP%]{font-family:Montserrat;background-color:#3b5998;border:1px solid #324b80;width:100%;color:#fff;font-weight:700;padding:1rem;border-radius:5px;cursor:pointer}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .btn-google[_ngcontent-%COMP%]{font-family:Montserrat;background-color:#fff;border:1px solid #d3d3d3;width:100%;color:grey;font-weight:700;padding:1rem;border-radius:5px;cursor:pointer}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .input-email[_ngcontent-%COMP%], .login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .input-first-name[_ngcontent-%COMP%], .login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .input-last-name[_ngcontent-%COMP%], .login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .input-password[_ngcontent-%COMP%]{width:100%;padding:1rem;border:1px solid #d3d3d3;border-radius:5px;font-family:Montserrat;font-size:1.6rem}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .input-first-name[_ngcontent-%COMP%]{width:calc(50% - 20px)}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .input-last-name[_ngcontent-%COMP%]{margin-left:20px;width:50%}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .btn-signin[_ngcontent-%COMP%], .login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .btn-signup[_ngcontent-%COMP%]{font-family:Montserrat;background-color:#0af;border:none;width:100%;color:#fff;font-weight:700;padding:1rem;border-radius:5px;cursor:pointer}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]{text-align:center;font-size:1.4rem;margin-top:3rem}.login-register-wrapper[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .mode-change-link[_ngcontent-%COMP%]{color:#0af;font-weight:700;text-decoration:underline;cursor:pointer}hr[_ngcontent-%COMP%]{margin:2rem 0}"]}),t})()}];let j=(()=>{class t{}return t.\u0275mod=I.Jb({type:t}),t.\u0275inj=I.Ib({factory:function(e){return new(e||t)},imports:[[s.h.forChild(D)],s.h]}),t})();var B=i("PCNd");i.d(e,"provideConfig",(function(){return Y})),i.d(e,"LoginRegisterModule",(function(){return H}));let W=new y([{id:k.PROVIDER_ID,provider:new k("560099373222-2lvj2chopclld2jjss7tpnftl23dutup.apps.googleusercontent.com")}]);function Y(){return W}let H=(()=>{class t{}return t.\u0275mod=I.Jb({type:t}),t.\u0275inj=I.Ib({factory:function(e){return new(e||t)},providers:[{provide:y,useFactory:Y}],imports:[[n.b,j,U.b,S,B.a]]}),t})()}}]);