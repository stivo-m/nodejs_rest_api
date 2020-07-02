(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dab42"],{"6d75":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("body",{staticClass:"hold-transition register-page"},[e("div",{staticClass:"register-box"},[t._m(0),e("div",{staticClass:"card"},[e("div",{staticClass:"card-body register-card-body"},[e("p",{staticClass:"login-box-msg"},[t._v("Register a new account")]),t._l(t.getErrors,(function(s){return e("div",{key:s,staticClass:"alert alert-danger alert-dismissible"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-hidden":"true"}},[t._v(" × ")]),t._v(" "+t._s(s)+" ")])})),e("form",{on:{submit:t.onSubmit}},[e("div",{staticClass:"input-group mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"Full name"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}}),t._m(1)]),e("div",{staticClass:"input-group mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",name:"email",placeholder:"Email"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}}),t._m(2)]),e("div",{staticClass:"input-group mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),t._m(3)]),e("div",{staticClass:"input-group mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmPassword,expression:"confirmPassword"}],staticClass:"form-control",attrs:{type:"password",name:"confirmPassword",placeholder:"Retype password"},domProps:{value:t.confirmPassword},on:{input:function(s){s.target.composing||(t.confirmPassword=s.target.value)}}}),t._m(4)]),t._m(5)]),e("router-link",{staticClass:"text-center",attrs:{to:"/customer"}},[t._v("Already a member, login?")])],2)])])])},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"register-logo"},[e("a",{attrs:{href:""}},[e("b",[t._v("Curtsy")]),t._v(" Writing")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"input-group-append"},[e("div",{staticClass:"input-group-text"},[e("span",{staticClass:"fas fa-user"})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"input-group-append"},[e("div",{staticClass:"input-group-text"},[e("span",{staticClass:"fas fa-envelope"})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"input-group-append"},[e("div",{staticClass:"input-group-text"},[e("span",{staticClass:"fas fa-lock"})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"input-group-append"},[e("div",{staticClass:"input-group-text"},[e("span",{staticClass:"fas fa-lock"})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-8"},[e("div",{staticClass:"icheck-primary"},[e("input",{attrs:{type:"checkbox",id:"agreeTerms",name:"terms",value:"agree"}}),e("span",{staticClass:"spacer"}),e("label",{attrs:{for:"agreeTerms"}},[t._v(" I agree to the "),e("a",{attrs:{href:"#"}},[t._v("terms")])])])]),e("div",{staticClass:"col-4"},[e("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"submit"}},[t._v(" Register ")])])])}],i=(e("b0c0"),e("5530")),o=e("2f62"),n={name:"RegisterView",data:function(){return{name:"",email:"",password:"",confirmPassword:""}},methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])(["register","setError"])),{},{onSubmit:function(t){var s=this;if(t.preventDefault(),!this.email||!this.name||!this.password||!this.confirmPassword)return this.setError("One or More fields is empty"),console.log("One or More fields is empty");if(this.password.length<6)this.setError("Password must be more than 6 characters");else{if(this.password!=this.confirmPassword)return this.setError("Passwords did not match"),console.log("Passwords did not match");var e={name:this.name,email:this.email,password:this.password,role:"customer"};this.register(e).then((function(t){t?s.$router.push("/customer/dashboard"):(s.setError("Action cannot be completed at this time"),console.log("User is Null"))})).catch((function(t){return console.log(t)}))}}}),computed:Object(i["a"])({},Object(o["c"])(["getUser","getErrors","getAuthState"]))},l=n,c=e("2877"),m=Object(c["a"])(l,a,r,!1,null,null,null);s["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d0dab42.6a3d2568.js.map