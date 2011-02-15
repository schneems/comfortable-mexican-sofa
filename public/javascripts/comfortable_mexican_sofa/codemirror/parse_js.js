var tokenizeJavaScript=function(){function w(a,f){for(var c=false;!a.endOfLine();){var k=a.next();if(k==f&&!c)return false;c=!c&&k=="\\"}return c}function C(a,f){return function(c,k){var o=a,e=D(a,f,c,function(h){o=h}),g=e.type=="operator"||e.type=="keyword c"||e.type.match(/^[\[{}\(,;:]$/);if(g!=f||o!=a)k(C(o,g));return e}}function D(a,f,c,k){function o(){c.nextWhileMatches(r);var m=c.get(),l=x.hasOwnProperty(m)&&x.propertyIsEnumerable(m)&&x[m];return l?{type:l.type,style:l.style,content:m}:{type:"variable",
style:"js-variable",content:m}}function e(m){var l="/*";for(m=m=="*";;){if(c.endOfLine())break;var i=c.next();if(i=="/"&&m){l=null;break}m=i=="*"}k(l);return{type:"comment",style:"js-comment"}}function g(){c.nextWhileMatches(j);return{type:"operator",style:"js-operator"}}function h(m){var l=w(c,m);k(l?m:null);return{type:"string",style:"js-string"}}if(a=='"'||a=="'")return h(a);var n=c.next();if(a=="/*")return e(n);else if(n=='"'||n=="'")return h(n);else if(/[\[\]{}\(\),;\:\.]/.test(n))return{type:n,
style:"js-punctuation"};else if(n=="0"&&(c.equals("x")||c.equals("X"))){c.next();c.nextWhileMatches(s);return{type:"number",style:"js-atom"}}else if(/[0-9]/.test(n)){c.nextWhileMatches(/[0-9]/);if(c.equals(".")){c.next();c.nextWhileMatches(/[0-9]/)}if(c.equals("e")||c.equals("E")){c.next();c.equals("-")&&c.next();c.nextWhileMatches(/[0-9]/)}return{type:"number",style:"js-atom"}}else if(n=="/")if(c.equals("*")){c.next();return e(n)}else if(c.equals("/")){w(c,null);return{type:"comment",style:"js-comment"}}else{if(f){w(c,
"/");c.nextWhileMatches(/[gimy]/);a={type:"regexp",style:"js-string"}}else a=g();return a}else return j.test(n)?g():o()}var x=function(){function a(g,h){return{type:g,style:"js-"+h}}var f=a("keyword a","keyword"),c=a("keyword b","keyword"),k=a("keyword c","keyword"),o=a("operator","keyword"),e=a("atom","atom");return{"if":f,"while":f,"with":f,"else":c,"do":c,"try":c,"finally":c,"return":k,"break":k,"continue":k,"new":k,"delete":k,"throw":k,"in":o,"typeof":o,"instanceof":o,"var":a("var","keyword"),
"function":a("function","keyword"),"catch":a("catch","keyword"),"for":a("for","keyword"),"switch":a("switch","keyword"),"case":a("case","keyword"),"default":a("default","keyword"),"true":e,"false":e,"null":e,undefined:e,NaN:e,Infinity:e}}(),j=/[+\-*&%=<>!?|]/,s=/[0-9A-Fa-f]/,r=/[\w\$_]/;return function(a,f){return tokenizer(a,f||C(false,true))}}();var JSParser=Editor.Parser=function(){function w(j,s,r,a,f,c){this.indented=j;this.column=s;this.type=r;if(a!=null)this.align=a;this.prev=f;this.info=c}function C(j){return function(s){var r=s&&s.charAt(0),a=j.type,f=r==a;return a=="vardef"?j.indented+4:a=="form"&&r=="{"?j.indented:a=="stat"||a=="form"?j.indented+indentUnit:j.info=="switch"&&!f?j.indented+(/^(?:case|default)\b/.test(s)?indentUnit:2*indentUnit):j.align?j.column-(f?1:0):j.indented+(f?0:indentUnit)}}var D={atom:true,number:true,variable:true,
string:true,regexp:true},x=false;return{make:function(j,s){function r(b){for(var d=b.length-1;d>=0;d--)u.push(b[d])}function a(){r(arguments);E=true}function f(){r(arguments);E=false}function c(){t={prev:t,vars:{"this":true,arguments:true}}}function k(){t=t.prev}function o(b){if(t){y="js-variabledef";t.vars[b]=true}}function e(b,d){var v=function(){p=new w(A,B,b,null,p,d)};v.lex=true;return v}function g(){if(p.type==")")A=p.indented;p=p.prev}function h(b){return function(d){if(d==b)a();else b==";"?
f():a(arguments.callee)}}function n(){return f(l,n)}function m(){return f(i,m)}function l(b){if(b=="var")a(e("vardef"),H,h(";"),g);else if(b=="keyword a")a(e("form"),i,l,g);else if(b=="keyword b")a(e("form"),l,g);else if(b=="{")a(e("}"),I,g);else if(b==";")a();else if(b=="function")a(J);else if(b=="for")a(e("form"),h("("),e(")"),P,h(")"),g,l,g);else if(b=="variable")a(e("stat"),Q);else if(b=="switch")a(e("form"),i,e("}","switch"),h("{"),I,g,g);else if(b=="case")a(i,h(":"));else if(b=="default")a(h(":"));
else b=="catch"?a(e("form"),c,h("("),L,h(")"),l,g,k):f(e("stat"),i,h(";"),g)}function i(b){if(D.hasOwnProperty(b))a(q);else if(b=="function")a(J);else if(b=="keyword c")a(i);else if(b=="(")a(e(")"),i,h(")"),g,q);else if(b=="operator")a(i);else if(b=="[")a(e("]"),F(i,"]"),g,q);else b=="{"?a(e("}"),F(R,"}"),g,q):a()}function q(b,d){if(b=="operator"&&/\+\+|--/.test(d))a(q);else if(b=="operator")a(i);else if(b==";")f();else if(b=="(")a(e(")"),F(i,")"),g,q);else if(b==".")a(S,q);else b=="["&&a(e("]"),
i,h("]"),g,q)}function Q(b){b==":"?a(g,l):f(q,h(";"),g)}function S(b){if(b=="variable"){y="js-property";a()}}function R(b){if(b=="variable")y="js-property";D.hasOwnProperty(b)&&a(h(":"),i)}function F(b,d){function v(z){if(z==",")a(b,v);else z==d?a():a(h(d))}return function(z){z==d?a():f(b,v)}}function I(b){b=="}"?a():f(l,I)}function H(b,d){if(b=="variable"){o(d);a(M)}else a()}function M(b,d){if(d=="=")a(i,M);else b==","&&a(H)}function P(b){if(b=="var")a(H,G);else if(b==";")f(G);else b=="variable"?
a(T):f(G)}function T(b,d){d=="in"?a(i):a(q,G)}function G(b,d){if(b==";")a(N);else d=="in"?a(i):a(i,h(";"),N)}function N(b){b==")"?f():a(i)}function J(b,d){if(b=="variable"){o(d);a(J)}else b=="("&&a(c,F(L,")"),l,k)}function L(b,d){if(b=="variable"){o(d);a()}}var K=tokenizeJavaScript(j),u=[x?m:n],t=null,p=new w((s||0)-indentUnit,0,"block",false),B=0,A=0,E,y,O={next:function(){for(;u[u.length-1].lex;)u.pop()();var b=K.next();if(b.type=="whitespace"&&B==0)A=b.value.length;B+=b.value.length;if(b.content==
"\n"){A=B=0;if(!("align"in p))p.align=false;b.indentation=C(p)}if(b.type=="whitespace"||b.type=="comment")return b;if(!("align"in p))p.align=true;for(;;){E=y=false;u.pop()(b.type,b.content);if(E){if(y)b.style=y;else{var d;if(d=b.type=="variable")a:{for(d=t;d;){if(d.vars[b.content]){d=true;break a}d=d.prev}d=false}if(d)b.style="js-localvariable"}return b}}},copy:function(){var b=t,d=p,v=u.concat([]),z=K.state;return function(U){t=b;p=d;u=v.concat([]);B=A=0;K=tokenizeJavaScript(U,z);return O}}};g.lex=
true;return O},electricChars:"{}:",configure:function(j){if(j.json!=null)x=j.json}}}();