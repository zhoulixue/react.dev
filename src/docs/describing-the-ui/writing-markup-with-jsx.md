# 使用JSX编写标签
JSX是JavaScript的语法扩展，可以让你在JavaScript文件中像HTML一样写标签。尽管有很多方式写组件，但是大多数的React开发者更喜欢用简明的JSX，而且大多数的代码库也用它。

在本章中，你将会学习到：
* 为什么React把标签和渲染逻辑会和在一起
* JSX和HTML有什么区别
* 怎么使用JSX展示信息

## JSX：把标签放入JavaScript中
Web是通过HTML，CSS，JavaScript构建的。一直以来，web开发者都是使用HTML构建内容，使用CSS还原设计，使用JavaScript实现逻辑，通常是在不同的文件中。内容标记在HTML文件中，页面逻辑放在JavaScript中：

HTML:
![HTML](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_html.png&w=750&q=75 "HTML")

JavaScript:
![JavaScript](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_js.png&w=750&q=75 "JavaScript")

但是由于网页可交互性变得越来越强，逻辑决定内容的情况越来越多。JavaScript承担了管理HTML的责任。这就是为什么在React中,**渲染逻辑和标签都存在于一个位置-组件**的原因。

Sidebar.js React component:
![Sidebar.js React component](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_sidebar.png&w=750&q=75 "Sidebar.js React component")

Form.js React component:
![Form.js React component](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fwriting_jsx_form.png&w=750&q=75 "Form.js React component")

将一个button的逻辑和标签放在一起可以在每次编辑时让二者同步。相反，无关的细节，例如butoon的标签和siderbar的标签，是相对独立的，这样可以在编辑他们自己的内容是变得很安全。

每一个React组件都是包含了一些需要渲染到浏览器的标签的 JavaScript函数。React组件使用JSX语法去展示标签。JSX看起来非常像HTML，但是它的语法更严格，而且可以显示动态信息。理解JSX最好的方式就是把HTML标签站换成JSX标签。

## 把HTML标签转换为JSX标签
假设你有一些HTML标签：
```html
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```
你想将这些标签放入组件中：
```js
export default function TodoList() {
  return (
    // ???
  )
}
```
如果你直接复制粘贴的话，代码运行会报错：
```jsx
// App.js
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}

```
这是因为JSX比HTML多了一点严格的语法限制。上面代码报错的错误，会指引你修复标签的问题。或者你可以遵循下面的指引。
#### 提示
大多数时间，React在屏幕上展示的错误信息会帮助你找到问题所在。如果你卡住了，好好阅读一下他吧。

## JSX的规则
### 1. 返回单个的根元素结点
如果需要在一个组件中返回多个元素，**把他们用一个父标签包起来**。

例如，你可以使用一个`<div>`：
```html
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```
如果你不想在标签中添加一个二外的`<div>`,可以使用`<>`和`</>`替换。
```html
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```
这个空的标签叫做[Fragment](https://react.dev/reference/react/Fragment)。Fragements可以让你聚合标签而不再浏览器的HTML树中留下痕迹。
#### 深入学习
为什么多个JSX标签需要包起来呢？

JSX看起来像是HTM，但是实际上会被编译为普通的JavaScript对象。你可以通过把对象放入数组的方法，从一个函数中返回两个对象。这解释了为什么你不能返回两个JSX标签，而不把他们包裹在另外的标签或者Fragment中。（按我的理解就是函数只能返回一个值，如果你不包起来就返回了多个值了，语法会解析失败）

### 2. 所有的标签都需要闭合
JSX眼球标签必须是严格闭合的：子闭合的标签例如`<img>`必须写为`<img/>`，容器标签例如`<li>oranges`必须写为`<li>oranges</li>`。

下面是 海蒂拉玛尔的图片和列表项如何使用闭合标签展示的例子：
```html
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```
### 3. 所有的东西都适用驼峰命名
JSX会编译为JavaScript，所有在JSX中写入的属性都会变成JavaScript对象的键值。在你自己的组件中，将属性转换为变量的次数非常多。但是JavaScript对变量名有很懂限制。例如，名字不能包含波折号，也不能使用JavaScript中的关键词，例如`class`。

这就是在React中，很多HTML和SVG属性被写成驼峰名的原因。例如：使用`strokeWidth`而不是`stroke-width`。既然`class`是一个保留的关键字，在React中需要写成`className`，DOM属性和JSX变量的对应关系可以查看[ corresponding DOM property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

```html
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```
你可以找到[DOM组件的属性对应的所有对应的字段](https://react.dev/reference/react-dom/components/common)。如果你写错了，不用担心，React会在[浏览器控制台](https://developer.mozilla.org/docs/Tools/Browser_Console)展示一个正确的提示信息。

#### 警告
因为一些历史原因，`aria-*`和`data=*`属性像HTML一样书写。

## 更进一步：使用JSX转换器
转换所有的标签属性会非常麻烦。我们推荐了一个[转换器](https://transform.tools/html-to-jsx)，可以将已有的 HTML和SVG转换为JSX。转换器在实际工作中十分有用，但是但是仍然值得了解发生了什么，这样您就可以轻松地自己编写 JSX。

下面是最终的结果：
```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```
## 回顾
现在你知道为什么 JSX 存在以及如何在组件中使用它了：
* React 组件将渲染逻辑与标签组合在一起，因为它们是相关的。
* JSX 类似于 HTML，但有一些不同。如果需要，您可以使用[转换器](https://transform.tools/html-to-jsx)。
* 错误消息通常会为您指明修复标签的正确方向。

## 课后练习
### 1. 将一些HTML转换为JSZ
这个 HTML 被粘贴到一个组件中，但它不是有效的 JSX。修复它：
```js
// Appp.js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}

```