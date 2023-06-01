# 为什么使用React

## 提出问题：使用原生js实现一个可交互的页面是困难的
假设我们需要实现一个计数器，包含一个当前数字的展示和一个按钮。当点击按钮时，页面上的数字加1并更新。

使用原生js实现计数器，需要包含以下的步骤：
1. 初始化
* 设置一个span元素，元素内的文本内容为0
* 设置一个button元素，绑定点击事件onclick
* 设置count变量，初始值为0
2. 点击button数字改变
* 点击button，触发onclick事件
* 令count的值加1
* 找到span元素，并将count的值放入span中

实现代码如下：
```html
count的值为：<span>0</span>
<button onclick="onClick()">点击后count+1</button>
<script>
  let count = 0;
  function onClick() {
    count += 1;
    const span = document.getElementsByTagName('span')[0]
    span.textContent = count
  }
</script>
```
可以看到原生js实现页面交互包括几个步骤：
1. 修改数据
2. 找到需要操作的DOM
3. 使用新数据生成新DOM并替换老DOM

可以看到，修改数据时需要**不断的修改DOM**才能实现页面的更新。对开发者会造成很大的心智负担。

## 分析问题：如何减少这种开发负担？
造成开发负担的原因，是因为我们每次修改数据时，都要对DOM进行操作以实现页面更新。

如果有一种方法**在修改数据后，不需要任何操作就能直接更改DOM**那就可以解决我们的问题了。

## 解决问题：数据变化后，DOM自动更新
我们想引入一种方法，可以在数据变化后，DOM自动更新。以计数器为例，初始化元素和变量不变。

当点击button时：
* 触发onclick事件
* count加1
* span内容直接变为新的count

React实现了这种响应式的数据更新，具体代码如下：
```tsx
"use client"
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1)
  }
  return <>
    count的值为：<span>{count}</span>
    <button onClick={handleClick}>点击后count+1</button>
  </>
}
```
在上面的代码中，handleClick并没有操作DOM元素，count修改后DOM元素还是更新了。

## 总结
我们通常将哪些按步骤修改数据，再修改DOM的编程方式叫做**命令式编程**，例如原生js，jquery。

而哪些修改数据后，无需关心DOM如何修改的编程方式叫做**声明式编程**，例如React，Vue。

命令式编程和声明式编程有一个很好的例子可以去理解下他们的区别。

假设你下班回家叫了一个出租车。

* 使用命令式编程时，你需要告诉司机需要走哪条路，前面的路口是左拐还是右拐，司机会按照你指定的路线送你回家。

* 而使用声明式编程时，你只需要告诉司机你家在哪，然后躺在后排玩手机就好了，你不用告诉司机怎么走，而且如果对路况比较熟，司机还会走近的路线回家。

实际上，React就是一个不用你操心的司机。你的任何数据他都会准确，快速的更新到DOM中去。你不用去关心React内部是怎么更新DOM的，只需要告诉他最新的数据就好。

