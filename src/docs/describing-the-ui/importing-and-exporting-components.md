# 导入和导出组件
组件的魔力在于它们的可复用性。你可以用其他的组件创建一个新组件。但是随着你嵌套越来越多的组件，把组件分割到不同文件中具有很大的意义。组件分离可以令你的文件浏览更容易，组件可复用范围也会增大。

在本章中，你将会学到：
* 根组件文件是什么
* 如何导入导出组件
* 什么时候使用 default 和命名的导入导出
* 怎么从一个文件中导入和导出多个组件
* 怎么把组件分割到多个文件中

### 根组件文件
在[第一个组件](https://react.dev/learn/your-first-component)一章中,你实现了一个`Profile`组件和一个`Gallery`组件，并渲染了它们：
```javascript
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
这些代码存在于一个名为`App.js`的根组件文件中。在[Create React App](https://create-react-app.dev/),你的应用存在于`src/App.js`。你的根组件文件可以根据设置放入一个其他的文件中。如果你使用一个基于文件的路由系统，例如 Next.js.你的每一个页面的根组件都会不同。

### 导出和导入组件
如果你想在后续更改上面的页面放入一些科学书籍的列表需要怎么办呢？或者把`profiles`头像放到其他地方呢？把`Gallery`和`Profile`从根组件文件移除是一个明智的选择。放入其他文件会令他们更加模块化，可复用性更强。移动一个组件你可以经过下面的三个步骤：
1. 创建一个新的js文件并把组件放进去
2. 从文件中使用`export`导出你的函数组件（使用default或者命名导出）
3. 在使用组件的文件中使用`import`导入组件（使用响应的import default 或者引用命名导出的组件）

在下面的代码中，`Profile`和`Gallery`从`App.js`中移动到了一个新的文件`Gallery.js`中。然后修改`App.js`从`Gallery.js`中引入`Gallery`。
```javascript
// App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```
```javascript
// Gallery.js
function Profile() {
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
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```
注意这个例子现在已经被分割为两个组件文件了：
1. `Gallery.js`
* 定义了`Profile`组件，且组件只在相同的文件中使用并没有被导出
* 导出了`Gallery`组件作为 **default export**
2. `App.js`
* 从`Galley.js`导入了`Gallery`作为**default import**
* 导出了根组件 `App`作为  **default export**

#### 提示
你可能会遇到过文件不带 `.js`后缀名的情况，例如：
```javascript
import Gallery from './Gallery'
```
在React中`Gallery.js`或`Gallery`都是可以的，即使前者更接近 [navite ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules)

#### 深入理解
Javscript有两种导出变量的方式：default 导出和命名导出。迄今为止，我们的例子中只用到了默认导出。但是你可以在相同的文件中用它们两个其中的任意一个方式。**一个文件中只能有一个default导出，但是可以有很多个命名导出**
```javascript
// one default export 
export default function Button() {}
```
```javascript
// multiple named exprts 
export function Slider() {}
export function Checkbox() {}
```
```javascript
// named export(s) and on default export 
export function Avatar() {}
export default function FrirendsList() {}
```
导出变量的方式决定了导入的方式。如果你使用命名导入的方式导入一个default导出的变量，会出现错误。下面的表格展示了导入和导出语法的对应关系：

|  语法    | 导出语句 | 导入语句 |
|  ----  | ----  | ---- |
| `Default`  | `export default function Button() {}` | `import Button from './Btton.js';` |
| `Named`  | `export function Button() {}` | `import { Button } from './Button.js';` |

当你使用默认导入时，你可以在`import`后写入任意的名字。例如 你可以写`import Banana from './Button.js`这仍然会提供给你相同的导出变量。相反命名导入时，名字必须一致。这也是他们成为命名导出的原因。当让你也可以在引入命名组件时为你的变量起一个别名，例如`import { Button as Banana } from './Button.js`。


**如果一个文件中只有一个组件，人们会经常使用default导出，多个组件的话常使用命名导出组件和变量**。不管你喜欢什么样的编码风格，需要谨记给你的组件和组件所在的文件起一个有意义的名字。不鼓励使用像`export default () => {}`这样的导出方式，因为这种方式对代码调试会造成很大困难。

## 从一个文件中导出和导入多个组件
如果你只想显示一个`Profile`而不是gallery呢？你可以也导出 `Profile`组件。但是由于`Gallery.js`已经有一个`default export`了，而一个文件中不能有两个`default export`。你可以创建一个有`export default`的新文件，也可以在原文件中添加`Profile`的命名导出。`一个文件只能有一个 export default但是可以有多个命名导出`。
### 小提示
为了避免默认导出和命名导出造成的困惑，一些团队选择只是有一种导出方式，或者避免在一个文件中混用两种导出方式。你只需要根据实际情况选择即可。

### 第一步：使用命名导出从 `Gallery.js`中导出 `Profile`组件
```javascript
export function Profile() {
  // ...
}
```
### 第二步：使用命名引入，在`App.js`中，从`Gallery.js`中引入`Profile`
```javascript
import { Profile } from './Gallery.js';
```
### 第三步：在`App`组件中渲染`<Profile/>`
```javascript
export default function App() {
  return <Profile />;
}
```
现在 `Gallery.js`包含了两个导出：一个`Gallery`的默认导出，一个`Profile`的命名导出。`App.js`把两个都引入了。代码如下所示：
```js
// App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```
```js
// Gallery.js
export function Profile() {
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
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```
现在你正在混合使用使用默认导出和命名导出了：
1. `Gallery.js`:
* 使用命名导出的方式,将`Profile`组件以`Profile`名字导出
* 使用默认导出的方式，导出了`Gallery`组件
2. `APP.JS`:
* 使用命名导入的方式从`Gallery.js`导入了名为`Profile`的`Profile`组件
* 使用默认导出的方式从`Gallery.js`导入了`Gallery`组件
* 将根组件`App`以默认导出的方式导出

## 本章回顾
阅读本章内容，你可以学习到：
* 根组件文件是什么
* 如何导入和导出组件
* 何时和如何使用默认导出和命名导出
* 从相同的文件中如何导出多个组件

## 课后练习
### 1. 进一步拆分组件
目前`Gallery.js`导出了`Profile`和`Gallery`两个组件，这可能会有点让人疑惑。

将`Profile`组件移动到自己的文件`Profile.js`中，然后修改 `App`组件依次渲染`<Profile/>`和`<Gallery/>`.

你可能用对`Profile`使用了默认导出和命名导出中的一种，但是一定要确认在`App.js`和`Gallery.js`中使用了相同的导入语法。下面的表格展示了导入和导出语法的对应关系：

|  语法    | 导出语句 | 导入语句 |
|  ----  | ----  | ---- |
| `Default`  | `export default function Button() {}` | `import Button from './Btton.js';` |
| `Named`  | `export function Button() {}` | `import { Button } from './Button.js';` |

```js
// App.js
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
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}

```

```js
// Gallery.js

// Move me to Profile.js!
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

```

```js
// Profile.js

```
