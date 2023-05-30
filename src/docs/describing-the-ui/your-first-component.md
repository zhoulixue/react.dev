# 第一个组件
组件是react的核心概念，是构建用户UI的基础。

本章主要内容包括：
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
```html
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

*注意*

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
*注意*

没有圆括号的话return后面的字符会被忽略掉

## 使用组件



### 示例代码
[第一个组件](/examples/describing-the-ui/your-first-component)