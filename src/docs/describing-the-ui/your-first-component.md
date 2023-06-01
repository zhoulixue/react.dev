# 第一个组件
组件是react的核心概念，是构建用户UI的基础。

在本章中，你将会学到：
* 什么是组件
* 组件在react 应用中的作用是什么
* 如何写一个react组件
## 组件是搭建UI的基本组成
在web编程中，HTML可以让我们使用`<h1> <li>`等标签创建内容丰富的结构化文档。例如：
```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```
上面的标签展示了一个文章标签`<article>`，头部用`<h1>`表示，还有一个有序列表`<ol>`列出了一些内容。在web上的每个内容，包括侧边栏，头像，弹窗，下拉框，都是依赖于HTML实现结构，CSS实现样式，javascript实现交互。

React允许你将HTML标签，CSS，javascript组合到自定义的组件中，并且可以在应用中重复使用。例如上面代码中的内容部分可以抽象为`<TableOfContents>`，可以渲染到每一个页面。而其他的标签，例如`<artical><h1>`仍然可以保持不变。

你可以像HTML标签一样，将自定义组件组合，排序，嵌套，来设计整个页面。例如，你现在阅读的文档页就是一个React组件组成的页面。
```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```
当你的项目越来越大，你就会发现你的很多页面设计都可以用之前已经写好的组件组合实现，这样极大的提高了你的开发速度。上面的无序列表组件`<TableOfContents>`可以放在任何一个页面中。甚至你可以从React开源社区中使用成千上万的开源组件来启动你的项目，例如：[chakraUI](https://chakra-ui.com/) 、 [Material UI](https://material-ui.com/)、[AntD](https://ant.design/index-cn)

## 设计组件
传统的web页面，开发者通过HTML标签表示内容，然后向内容中添加JavaScript代码实现交互。如果交互对页面不是很重要，那么以这种方式开发也十分方便。这也是满足很多网站和应用的需求的。React是把交互放在首位的，因此仍然使用相同的技术：**一个React组件就是一个可以使用HTML标记语言的JavaScript函数**。下面是一个例子：
```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```
那么如何创建一个组件？
### 第一步：导出组件
`export default`是javascript的标准语法。可以在一个文件中导出函数，之后在另外的文件中导入并使用。
### 第二步：定义函数
使用 `function Profile() {  }`定义了一个叫`Profile`的函数

### *注意*

React 组件是普通的javascript函数，但是他们的**名字必须以大写字母开头**，否则组件不会正常工作。
### 第三步：添加HTML标签
上面的组件返回了一个带 `src`和`alt`属性的标签 `</img>`。虽然`<img/>`写成了HTML的样子，但是实际上他是一个javascript语法。这种语法叫[JSX](https://react.dev/learn/writing-markup-with-jsx)，可以让你在javascript中写HTML标签。

返回语句也可以写成一行，例如：
```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```
如果标签不在一行，必须用圆括号括起来：
```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```
### *注意*

没有圆括号的话return后面的字符会被忽略掉

## 使用组件
在上述代码中，你实现了一个自定义组件`Profile`,可以将组件嵌套到其他组件中使用。例如，可以使用多个`Profile`组件内嵌到一个`Gallery`组件中，然后再导出组件。
```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```
## 浏览器如何解析组件
在上面的例子中，你可以看到一些区别：
* `<section>`是小写字母，React会知道我们指代的是一个HTML标签。
* `<Profile/>`是以字母P开头的，React会知道我们想要用一个自定义的叫做 `Profile`的组件

而且`Profile`包含更多的HTML标签：`<img/>`.最后浏览器中看到的结构为：
```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

## 组件的组织和嵌套
组件是常规的javascript函数，因此你可以在相同文件中维护多个组件。如果组件相对较小或者跟其他组件的联系比较紧密，这种方式也很方便。如果文件变得拥挤，你可以把`Profile`放到一个单独的文件中。在后面的章节你可以学习到组件的[导入导出](https://react.dev/learn/importing-and-exporting-components)

由于`Profile`组件在`Gallary`中渲染了多次，我们把`Gallary`叫做父组件，每个在内部渲染的`Profile`作为孩子。这就是React神奇的地方：定义一次组件，然后在其他地方随意的多次使用。

### *注意*
一个组件可以由其他组件渲染，但是**不要在组件内部定义其他的组件**。
```js
export default function Gallery() {
  // 🔴 不要在其他组件的内部定义组件
  function Profile() {
    // ...
  }
  // ...
}
```
上面的代码是[很慢的，而且会引起bug](https://react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)。你需要在顶层定义每一个组件。
```js
export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```
当一个子组件需要从父组件获取数据时，[使用props传递数据](https://react.dev/learn/passing-props-to-a-component)，而不是在组件内部定义组件。

## 深入学习-组件是从上往下的
你的React组件开始于一个“root”组件。通常情况下它在你启动一个新项目的时候会自动创建。例如，如果你使用[CodeSandbox](https://codesandbox.io/)或者[Create React App](https://create-react-app.dev/),根组件定义在`src/App.js`。如果你使用 [Next.js](https://nextjs.org/)框架，根组件定义在`pages/index.js`。在这些例子中，你已经导出了根组件。

大多数的React应用都是向下嵌套使用组件的。这意味着你不仅是使用像button一样的可服用的简单代码片段，也有可能使用大的代码片段例如 siderbars,lists，甚至于是一整个页面。即使一些组件只使用一次，它夜是组织UI和标签的最得心应手的方法。

[基于React的框架](https://react.dev/learn/start-a-new-react-project)会更进一步。除了使用空的HTML文件，并让React使用javascript“承接”管理页面的责任。它们还能根据你定义的组件自动生成HTML。这允许你的应用在javscript代码加载之前展示一些内容。

现在仍然有很多网站通过使用React为已存在的HTML添加交互。它们有很多根组件而不是整个页面只用一个根组件。你可以按照需求使用React的特性。

## 本章回顾
你已经初次使用React了。我们回忆下本章的主要内容。
* React可以让你创建组件，并且在应用中重复使用UI元素
* 在React应用中，每一段UI都是一个组件
* React组件都是常规的javascript函数，有以下限制
1. 函数名首字母必须大写
2. 返回JSX标签

## 示例代码
[第一个组件](/examples/describing-the-ui/your-first-component)

## 课后练习
### 1. 导出组件
下面代码中的根组件没有导出，导致应用无法工作，请修复它。
[sandbox fork](https://codesandbox.io/s/uc8qbf?file=/App.js&utm_medium=sandpack)
```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```
### 2.修复返回语句
下面代码中的返回语句不正确，修复它。
[sanbox fork](https://codesandbox.io/s/fggp8l?file=%2FApp.js&utm_medium=sandpack)
```js
export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}

```
### 3.指出错误
下面代码中的`Profile`组件的声明和使用有一些问题，找到其中的问题。
[sanbox forlk](https://codesandbox.io/s/u6n6nq?file=%2FApp.js&utm_medium=sandpack)

```js
function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <profile />
      <profile />
      <profile />
    </section>
  )
}

```
### 4.自己写一个组件
从头写一个组件，取一个合法的组件名，返回任意的标签。例如：你可以写一个`Congratulations`组件，展示`<h1>Good job@</h1>`标签。别忘记导出它。
[sanbox forlk](https://codesandbox.io/s/nxjlhi?file=%2FApp.js&utm_medium=sandpack)
```js
// Write your component below!
```
