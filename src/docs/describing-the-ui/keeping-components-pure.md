# 组件应该保持纯净（keeping components pure）

一些 JavaScript 函数是纯函数。纯函数只执行计算，不会做其他工作。通过严格地将您的组件编写为纯函数，您可以在代码库增长时避免一整类令人困惑的错误和不可预测的行为。但是，要获得这些好处，您必须遵守一些规则。

在本章中，你将会学到：

* 什么是纯函数以及它如何帮助您避免错误
* 如何避免在渲染阶段进行状态的修改和副作用的产生，来保持组件的纯净
* 如何使用严格模式（ Strict Mode ）查找组件中的错误

## 组件应该像数学公式一样纯净
在计算机科学（尤其是函数式编程领域）中，[纯函数](https://wikipedia.org/wiki/Pure_function)是具有以下特征的函数：

* **它只关心自己的内部的事**。在函数被调用钱，他不会修改之前存在的任何对象或变量。
* **相同的输入，相同的输出**。给定相同的输入，纯函数应该总是返回相同的结果。

您可能已经熟悉纯函数的一个示例：数学中的公式。

考虑这个数学公式：*y = 2x*。

如果 *x=2*, 总是会得到*y=4*.

如果 *x=3*, 总是会得到*y=6*.

如果 *x=3*, *y*一定不会在一天的某个时刻，或者股票在某个点位时编程 *9* 或者 *-1* 或者 *2.5* .

如果 *y=2x* 且 *x=3* , 那么 *y* 总会是 *6*.


如果我们把它做成一个 JavaScript 函数，它是这样的：
```js
function double(number) {
  return 2 * number;
}
```
在上面的例子中，`double` 是一个 **纯函数**。向函数中传入 `3`， 一定会返回`6`。

React 就是围绕这个概念设计的。**React 假设你写的每个组件都是一个纯函数**。这意味着您编写的 React 组件必须始终在给定相同输入的情况下返回相同的 JSX：

```js
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```
当您将 `drinkers={2}` 传递给 `Recipe` 时，它​总是返回包含 `2 cups of water` 的 JSX。总是。 如果您传递 `drinkers={4}`，它总是返回包含`4 cups of water`的JSX。

就像一个数学公式一样。

您可以将您的组件视为食谱：如果您遵循它们并且在烹饪过程中不引入新原料，那么您每次都会得到相同的菜肴。这个“菜肴”是组件提供给于 React 用来渲染的 JSX。

![烹饪](https://react.dev/images/docs/illustrations/i_puritea-recipe.png)

## 副作用（Side Effects）:预期之外的后果
React 的渲染过程必须始终是纯净的。组件应该只返回它们的 JSX，而不改变渲染前已存在的任何对象或变量——那会使它们变得不纯净！

这是一个打破这条规则的组件：

```js
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```
这个组件读取和写入了定义在组件外部的一个变量`guest`。这意味着多次调用这个组件会产生不同的 JSX！更进一步，如果其他组件读取 `guest`，它们也会产生不同的 JSX，这取决于它们被渲染的时间！可以看到组件的最终结果是不可预测的。

回到我们的公式 *y = 2x*，现在即使 *x = 2*，我们也不能确信 *y = 4*。我们的测试可能会失败，我们的用户会感到困惑，飞机竟然天上掉下来了——可以看到这将会导致很多奇怪的bug！

可以通过[将 `guest`作为 prop 传递到组件](https://react.dev/learn/passing-props-to-a-component)中来解决上面的问题：

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

现在你的组件是纯粹的，因为它返回的 JSX 只依赖于传入的prop `guest`。

通常，您不应该去关心您的组件应该以哪个特定顺序呈现。在 `y = 5x` 在 `y = 2x`之前和之后调用并没有区别：两个公式将彼此独立地解析。

#### 深度理解
使用 StrictMode 检测不纯净的计算方式

尽管您可能还没有使用过它们，但在 React 中，您可以在渲染时读取三种输入：[props](https://react.dev/learn/passing-props-to-a-component)、[state](https://react.dev/learn/state-a-components-memory) 和 [context](https://react.dev/learn/passing-data-deeply-with-context)。您应该始终将这些输入视为只读的值。

当您想要更改某些内容以响应用户输入时，您应该使用[set state](https://react.dev/learn/state-a-components-memory)而不是直接写入变量。当你的组件正在渲染时，你不应该改变预先存在的变量或对象。

React 提供了一种“严格模式”（Strict Mode），在这种模式下，在开发环境每个组件的函数会被调用两次。**通过两次调用组件函数，严格模式有助于找到违反纯函数规则的组件。**

可以观察下，使用严格模式后，我们的例子例子会展示"Guest#2", "Guest#4", "Guest#6"，而不是之前的"Guest#1", "Guest#2", "Guest#3"。这是因为原始的函数是不纯净的，两次调用函数可以看到这种不纯净。但是已经修复的纯净的版本，即使每次都被调用了两次仍然会起作用。除函数只进行技术安，所以调用两次不会改变任何事情，就像是调用`double(2)`两次，不会改变函数的返回值，计算两次 *y=2x*不回改变y的最终结果。相同的输入得到相同的输入，是永远不变的。

严格模式对生产环境没有影响，因此不会减慢您应用的运行速度。要选择进入严格模式，您可以将根组件放入到 `<React.StrictMode>` 中。一些框架会默认这样做。

### 局部突变（local mutation）：组件内部的操作
在上面的例子中，组件在渲染过程中修改了一个已经存在的变量，导致了一些问题。为了让大家意识到问题的严重性，我们通常称这种行为叫做*突变（mutation）*.纯函数不会再函数作用于范围内*突变*在函数调用前创建的变量或者对象。这种调用方式会破坏函数的纯净性。

但是，**在渲染时更改刚刚创建的变量和对象是完全可以的**。在下面的示例例中，您创建了一个 `[]` 数组，将其分配给一个 `cup`s 变量，然后将一些 `cups` `push`到了数组中：

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

如果`cups`变量或者数组`[]`在函数`TeaGathering`的外部创建，会出现很大的问题。向数组中`push`元素会修改*已存在*的对象。

但是，上面的代码是可以的，因为您是在*同一渲染过程*中在 `TeaGathering` 中创建它们的。`TeaGathering` 之外的任何代码都不会感知到函数内部发生的事情。这称为“**局部突变(local mutation)**”——它就像是您组件的小秘密。

## 在哪里会引起副作用(Side Effects)

虽然函数式编程在很大程度上依赖于函数的纯净性，但在某个时候，某个地方，某些东西必须改变。这也是编程的意义所在！例如更新页面、开始动画、修改数据等等操作，都称之为**副作用**。这些操作都是在组件渲染之外发生的。

在React中，**副作用通常应该放[事件处理函数](https://react.dev/learn/responding-to-events)中**。事件处理函数是在执行某些操作时（例如点击按钮）由 React 运行的函数。尽管事件处理函数是在组件内部定义的，但它们不会在渲染过程中运行！因此，事件处理函数不需要是纯函数。

如果你已经尝试了所有其他选项，但仍然找不到适合你的副作用的事件处理函数，你仍然可以在组件中使用 [useEffect](https://react.dev/reference/react/useEffect) 钩子将副作用附加到返回的 JSX 上。这告诉 React 在渲染后执行副作用，因为副作用只能在渲染过程之外执行。**但是，这种方法应该是你的最后选择**。

尽可能地使用渲染来表达你的逻辑。你会惊讶于这种方法可以带给你多大的收益！

#### 深入理解
为什么React那么在意纯净度呢？

编写纯函数组件需要习惯的养成，但是这种习惯会结果很多奇妙的体验，例如：

你的组件可以在不同的环境中运行，例如在服务器上！由于它们对于相同的输入返回相同的结果，一个组件可以为多个用户请求提供服务。

你可以通过跳过输入未改变的组件的渲染来提高性能。这是安全的，因为纯函数总是返回相同的结果，所以它们是安全的缓存对象。

如果在渲染深层组件树时某些数据发生了变化，React 可以重新启动渲染而不浪费时间来完成过时的渲染。纯度使得在任何时候停止计算都是安全的。

我们正在构建的每个新的 React 功能都利用了纯度。从数据获取到动画再到性能，保持组件的纯度释放了 React 范式的力量。


## 回顾
一个组件必须是纯函数，也就是说：

* 它只关心自己的事情。它不应该改变任何在渲染之前存在的对象或变量。
* 相同的输入应该得到相同的输出。给定相同的输入，组件应该始终返回相同的 JSX。
* 渲染可以在任何时候发生，因此组件不应该依赖于彼此的渲染顺序。
* 你不应该改变任何用于渲染的输入。这包括 props、state 和 context。更新页面时，应该使用[set state](https://react.dev/learn/state-a-components-memory)而不是改变已经存在的对象。
* 尽量在返回的 JSX 中表达组件的逻辑。当你需要“改变一些事情”时，通常会在事件处理函数中进行。作为最后的选择，可以使用 `useEffect`。
* 编写纯函数需要一些练习，但它可以体现 React 范式的力量。

## 课后练习
### 1. 修复坏掉的时钟
下面的组件尝试去设置`<h1>`的样式，在物业到早上6点设置为`night`，在其他时间设置为`day`。但是现在不能如预期一样工作。你可以修复这个组件吗？

```js
/// Clock.js
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}
```
```js
// App.js
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time} />
  );
}

```
### 2.修复一个错误的头像组件
两个`Profile`组件使用不同的数据并派渲染。点击第一个简介中的 "Collapse"关闭，然后点击“Expend”展开后，你可以看到两个简介展示了相同的人物。这是一个bug。

找到原因并修复bug：
```js
// Profile.js
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}

```

```js
// Panel.js
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}

```
```js
// App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}

```
### 3. 修复错误的故事托盘

贵公司的CEO要求您在在线时钟应用程序中添加“stories”，您不能拒绝。您已经编写了一个 `StoryTray` 组件，该组件接受一个`stories`列表，后跟一个“Create Story”占位符。

你通过在接收到的`stories`数组末尾推送一个额外的假 `story` 来实现“Create Story”占位符。但是由于某种原因，“Create Story”出现了多次。修复这个问题

