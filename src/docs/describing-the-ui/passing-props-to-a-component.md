# 向组件传递Props
React 组件使用 props 相互通信。每个父组件都可以通过给它们 props 将一些信息传递给它的子组件。Props 可能会让您想起 HTML 属性，但您可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。

在本章中，你将会学习到：
* 如何将props传递给组件
* 如何从组件中读取 props
* 如何为props指定默认值
* 如何将一些 JSX 传递给组件
* props如何随时间变化

## 熟悉的Props
props是您传递给 JSX 标签的信息。例如，`className`、`src`、`alt`、`width` 和 `height` 是您可以传递给 `<img>` 的一些props：
```js
// App.js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
```
您可以传递给 `<img>` 标签的props是HTML预设（ReactDOM 符合 [HTML 标准](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)）。您可以将任何props(而不是预设)传递给您自己的组件，例如 `<Avatar>`，以自定义它们。


## 向组件传递 props
在这段代码中，`Profile` 组件没有将任何 props 传递给它的子组件 `Avatar`：
```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```
你可以分两步给`Avatar`一些props。
### 第一步：将props传递给子组件
首先，将一些props传递给 Avatar。例如，让我们传递两个 props：`person`（一个对象）和 `size`（一个数字）：
```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
#### 提示
如果 person= 之后的双花括号让你感到困惑，请记住它们只是 JSX 花括号中的[一个对象](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx)。

现在您可以在 `Avatar` 组件中读取到这些props了。

### 第二步：在子组件内部读取props
您可以通过直接在函数 `Avatar` 之后列出它们的名称 `person`、`size` 并在`（{` and `}）`内部用逗号分隔来读取这些props。这使您可以在`Avatar` 代码中使用它们，就像使用变量一样。
```js
function Avatar({ person, size }) {
  // person and size are available here
}
```
向 `Avatar` 添加一些使用 `person` 和 `size` 属性进行渲染的逻辑，就完成了。

现在，您可以将 `Avatar` 配置为使用不同的props, 渲染不同的内容。尝试调整值！
```js
// App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}
```
```js
// utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}

```

Props 让您独立地考虑父组件和子组件。例如，您可以在 `Profile` 中更改`persion`或`size`两个props，而无需考虑 `Avatar` 如何使用它们。同样，您可以更改 `Avatar` 使用这些props的方式，而无需查看 `Profile`。

你可以把props想象成你可以调整的“旋钮”。它们的作用与参数对函数的作用相同——事实上，props 是组件的唯一参数！ React 组件函数接受一个参数，一个 `props` 对象：
```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

通常你不需要整个 props 对象本身，所以你将它解构为单独的 props。

#### 警告
声明props时，不要丢掉 `(` and `)` 内的一对 `{` and `}`：
```js
function Avatar({ person, size }) {
  // ...
}
```
这种语法称为“解构赋值”，相当于从函数参数中读取属性：
```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## 为props指定默认值
如果你想在 prop 没有指定值时返回时制定一个默认值，你可以通过在参数后面放置 `=` 和`默认值`来实现解构：
```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

现在，如果 `<Avatar person={...} />` 渲染时没有使用 `size` 属性，则大小将设置为 `100`。

默认值仅在缺少 `size` 属性或传递 `size={undefined}` 时使用。但是，如果您传递 `size={null}` 或 `size={0}`，则不会使用默认值。

## 使用 JSX spread 语法传递 props
有时候，我们会重复的传递props：
```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}

```
重复代码没有错，而且可读性更好。但有时您可能会看重代码的简洁性。一些组件像 `Profile` 如何处理 `Avatar` 一样将他们所有的props传递给他们的子组件。因为他们不直接使用任何props，所以使用更简洁的“spread”语法更好。
```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}

```
这会将 `Profile` 的所有 props 转发给 `Avatar`，但不会列出它们的每个名称。

使用扩展语法需要谨慎。如果你在所有组件中使用它，那就是错误的。通常，它表示您应该拆分组件并将子组件作为 JSX 传递。接下来会详细介绍！
## 将JSX作为children传递
嵌套在浏览器内置标签中很常见：
```html
<div>
  <img />
</div>
```
有时您会希望以相同的方式嵌套自己的组件：
```html
<Card>
  <Avatar />
</Card>
```
当您将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 prop 中接收该内容。例如，下面的 `Card` 组件将接收一个设置为 `<Avatar />` 的 `children` 属性并将其呈现在容器标签 `div` 中：
```js
// App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
```js
// Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

```
```js
// utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}

```

尝试用一些文本替换` <Card>` 内的 `<Avatar>` 以查看 `Card` 组件如何包装任何嵌套内容。它不需要“知道”它内部正在渲染什么。你会在很多地方看到这种灵活的模式。

您可以将具有 `children` prop 的组件视为具有"hole"，可以由其父组件使用任意 JSX “填充”。你会经常使用 `children` 属性来进行视觉包装：面板、网格等。
![](https://react.dev/images/docs/illustrations/i_children-prop.png)

## props的值如何变化
下面的时钟组件从其父组件接收两个props：`color`和`time`。 （父组件的代码被省略了，因为它使用了状态，我们暂时不会深入研究。）

```js
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}

```
这个例子说明了组件**可能会随着时间的推移接收不同的 props**。Props 并不总是静态的！在这里，`time` prop 每秒钟都会改变，而 `color` prop 在选择其他颜色时会改变。Props 反映了组件在任何时间点的数据，而不仅仅是在开始时。

props 是不可变的——这是计算机科学中的一个术语。当组件需要改变其 props（例如，响应用户交互或新数据）时，它将不得不“请求”其父组件传递不同的 props——一个新的对象！它的旧 props 将被丢弃，最终 JavaScript 引擎将回收它们占用的内存。

**不要尝试“更改 props”**。当你需要响应用户输入（比如更改所选颜色）时，你需要“设置状态”，你可以在[状态：组件的数据存储器](https://react.dev/learn/state-a-components-memory)中了解更多信息。

## 回顾
* 传递 props，只需像 HTML 属性一样将它们添加到 JSX 中即可。
* 读取 props，使用 `function Avatar({ person, size })` 的解构语法。
* 你可以指定一个默认值，比如 `size = 100`，它会用于缺失和值为 `undefined` 的 props。
* 你可以使用 JSX 扩展语法 `<Avatar {...props} />` 转发所有 props，但不要过度使用！
* 像 `<Card><Avatar /></Card>` 这样的嵌套 JSX。可以使用 `Card` 组件的 `children` prop 展示嵌套内容。
* props 是只读的时间快照：每次渲染都会接收到 props 的新版本。
* 你不能更改 props。当你需要交互性时，你需要 set state。

## 课后练习
### 1. 抽象组件
这个 `Gallery` 组件包含了两个非常相似的 `Profile` 组件。提取一个 `Profile` 组件来减少重复。你需要选择要传递给它的 props。

```js
// App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js
// utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}

```

### 2. 使用prop调整图片大小
在这个例子中，`Avatar` 接收一个数字大小的 `size` prop，它确定了 `<img>` 的宽度和高度。在这个例子中，`size` prop 被设置为 40如果你在新标签页中打开这个图片，你会发现图片本身更大（160 像素）。真实的图片大小取决于你请求的缩略图大小。

修改 `Avatar` 组件，根据 `size` prop 设置图像大小。具体来说，如果 `size` 小于 90，则将 's'（“小”）而不是 'b'（“大”）传递给 getImageUrl 函数。通过渲染具有不同 `size` prop 值的头像并在新标签页中打开图像来验证你的更改是否有效。
```js
// app.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js
// utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}

```
### 3. 使用 `children`prop传递JSX
从下面的diamanté中提取一个 `Card` 组件，并使用 `children` 属性将不同的 JSX 传递给它：

```js
// App.js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}

```