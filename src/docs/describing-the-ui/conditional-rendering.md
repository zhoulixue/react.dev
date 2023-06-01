# 条件渲染
您的组件通常需要根据不同的条件显示不同的内容。在 React 中，您可以使用 `if` 语句、`&&` 和 `?:`等 JavaScript 语法有条件地渲染 JSX。

在本章中，你将会学到：
* 如何根据条件返回不同的 JSX
* 如何有条件地包含或排除一段 JSX
* 在 React 代码中遇到的常见条件快捷语法

## 使用条件返回JSX
假设您有一个 `PackingList `组件渲染了多个`item`，`item`可以标记为 已打包（isPacked为true）未打包（isPacked为false）：
```js
// App.js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```
可以看到一些 `Item`组件的`isPacked` prop设置为了 `true`。如果 `isPacked={true}`，需要在 item后添加 (✔)标记他已经被打包了。

你可以使用 [if/else 语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)实现这种效果：
```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```
如果 `isPacked` 的 prop 是`true`，这段代码**返回一个不同的 JSX 树**。通过此更改，某些`Item`在末尾会得到一个已勾选的标记：

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```
尝试编辑在这两种情况下返回的内容，看看结果如何变化！

请注意您是如何使用 JavaScript 的 `if` 和 `return` 语句创建分支逻辑的。在 React 中，控制流（如条件）由 JavaScript 处理。

## 条件语句使用`null`返回空值
在某些情况下，您根本不想渲染任何东西。例如，假设您根本不想显示打包好的物品。一个组件必须返回一些东西。在这种情况下，您可以返回 `null`：
```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```
如果 `isPacked` 为真，组件将不返回任何内容，`null`。否则，它将返回 JSX 进行渲染。
```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

```
实际上，从组件返回 null 并不常见，因为它可能会让试图渲染它的开发人员感到奇怪。更常见的是，您会在父组件的 JSX 中有条件地包含或排除该组件。这是如何做到的！

## 在条件语句中包含JSX
在前面的示例中，您控制组件返回哪个（如果有的话！）JSX 树。您可能已经注意到渲染输出中存在一些重复：
```js
<li className="item">{name} ✔</li>
```
跟下面的语句很像
```js
<li className="item">{name}</li>
```
两个条件分支都返回 `<li className="item">...</li>`：
```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```
虽然这种重复并无害处，但它会使您的代码更难维护。如果你想改变`className`怎么办？您必须在代码中的两个位置执行此操作！在这种情况下，在条件语句中包含 JSX 以使您的代码重复更少([DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself))。

### 三元操作符 (`? :`)

JavaScript 有一个用于编写条件表达式的紧凑语法——条件运算符或“三元运算符”。

将下面的代码改写：
```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```
你可以这样写：
```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```
你可以把代码看作“如果`isPacked`是真的，那么 (`?`) 后面的 `name + ' ✔'`渲染，否则 (`:`) 后面的`name`渲染”

#### 深入探究
上面的两个例子完全等价吗？

如果你有面向对象编程学习经历，你可能会认为上面的两个例子有细微的不同，因为其中一个例子可能会创建`<li>`的两个不同的“实例”。但JSX元素不是“实例”，因为它们不包含任何内部状态，也不是真正的DOM节点。它们是轻量级的描述，就像蓝图一样。所以这两个例子，实际上是完全等价的。[ Preserving and Resetting State ](https://react.dev/learn/preserving-and-resetting-state)详细介绍了它的工作原理。


现在假设您要将完成的项目的文本包装到另一个 HTML 标记中，例如` <del>` 将其删除。您可以添加更多换行符和括号，以便在每种情况下更容易嵌套更多 JSX：
```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

```
这种风格适用于简单的条件，但要适度使用。如果您的组件因嵌套的条件标记过多而变得混乱，请考虑提取子组件来清理。在React中，标记是代码的一部分，因此可以使用变量和函数等工具来整理复杂的表达式。
### 逻辑与操作符(`&&`)
另外的一个常见的快捷方式是使用 [JavaScript的逻辑与（&&）操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.)。在 React 组件中，当你想在条件为真时渲染一些 JSX，或者在其他情况下什么都不渲染时，它经常出现。使用 &&，您可以仅在 `isPacked` 为真时有条件地渲染一选择的标记。
```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```
上面的代码可以理解为“如果 `isPacked` 为真，那么(`&&`)后面的内容渲染，否则，不渲染任何内容。”

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

```
如果左侧为true，[JavaScript && 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)将返回其右侧的值（在我们的情况下，为选中标记）。但如果条件为false，则整个表达式将变为false。React将false视为JSX树中的一个“洞”，就像null或undefined一样，并且不在其位置呈现任何内容。

#### 小提示
不要把数字放在 `&&` 左边

为了判断条件，JavaScript 自动将左侧转换为布尔值。然而，如果左边是 `0`，那么整个表达式都会得到那个值 (`0`)，React 会呈现 0 而不是什么都没有。

例如，一个常见的错误是编写类似 `messageCount && <p>New messages</p>` 的代码。很容易假设当 `messageCount` 为 `0` 时它不呈现任何内容，但它确实呈现了 `0` 本身！

要修复它，请将左侧设置为布尔值：`messageCount > 0 && <p>New messages</p>`。

### 根据条件语句，把JSX赋值给变量
当快捷方式不能正常编写代码时，请尝试使用 `if` 语句和变量。您可以重新分配使用 `let` 定义的变量。首先提供您要显示的默认内容，`name`：
```js
let itemContent = name;
```
如果 `isPacked` 为真，则使用 `if` 语句将 JSX 表达式重新分配给 `itemContent`：
```js
if (isPacked) {
  itemContent = name + " ✔";
}
```
[在花括号中可以直接使用JavaScript表达式](https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world)。在返回的 JSX 树中嵌入带有花括号的变量，将之前计算的表达式嵌套在 JSX 中
```js
<li className="item">
  {itemContent}
</li>
```
这种风格是最冗长的，但也是最灵活的。下面是实际的代码：
```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

```

和以前一样，这不仅适用于文本，也适用于任意 JSX：

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

```

如果您不熟悉 JavaScript，乍一看可能会觉得这些样式繁多让人不知所措。但是，学习它们将帮助您阅读和编写任何 JavaScript 代码——而不仅仅是 React 组件！选择您一种编码方式，如果您忘记了其他方式，请再次查阅此参考资料。

## 本章回顾
* 在 React 中，您可以使用 JavaScript 控制分支逻辑。
* 您可以使用 `if` 语句有条件地返回 JSX 表达式。
* 您可以有条件地将一些 JSX 保存到一个变量，然后使用大括号将其包含在其他 JSX 中。
* 在 JSX 中，`{cond ? <A /> : <B />}` 意思是“如果 `cond`，渲染`<A />`，否则`<B />`”。
* 在 JSX 中，`{cond && <A />}` 表示“如果 `cond`，则渲染 `<A />`，否则什么都没有”。
* 快捷方式很常见，但如果您喜欢普通的 `if` 语句，则不必使用它们。

## 课后练习
### 1. 使用 `?:` 让未完成打包的 item 显示图标
如果 `isPacked` 不为真，则使用条件运算符` (cond ? a : b)` 渲染 ❌。

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

```
### 2. 使用 `&&` 展示项目的 `importance`
在此示例中，每个 Item 都会收到一个数字类型的 `import` prop。使用 && 运算符以斜体呈现“（重要性：X）”，仅显示 非零的 `importance` 的 item。您的item列表最终应如下所示：
* Space suit *(Importance: 9)*
* Helmet with a golden leaf
* Photo of Tam *(Importance: 6)*

不要忘记在两个标签之间添加一个空格！
```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

### 3. 把所有的三元表达式 `?:` 改为 `if` 加变量的格式
`Drink`组件根据`name` prop 是 `tea`还是 `coffee`，使用了 三元表达式`?:` 展示了不同的信息。可是每种饮料的信息都在几个条件下展示不是很好。使用一条简单的 `if`语句替换条件语句`?:` 来重构下面的代码。
```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```