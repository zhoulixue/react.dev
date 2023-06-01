# 列表渲染
我们经常使用已有的数据展示多个重负的组件。你可以使用 [JavaScript的数组相关](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#)的方法来操作一个数组。在本章的内容中，你将会使用 [filter()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)和[map()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map)方法，结合React将数据数组转换为一个组件数组。

在本章中，你将会学习到：
* 怎么使用JavaScript的`map()`方法，将数组渲染为组件
* 怎么使用JavaScript的`filter()`方法，只渲染特定的组件
* 什么时候使用React的 key

## 将数组渲染为组件
假设你有一个内容列表：
```html
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```
在这些列表元素中，唯一不同的就是他们的内容，也就是数据。在构建界面时，您经常需要使用不同的数据显示同一组件的多个实例：例如评论列表、个人头像列表。在这些情况下，您可以将该数据存储在 JavaScript 对象和数组中，并使用 `map()` 和 `filter()` 等方法从中呈现组件列表。

以下是如何从数组生成项目列表的简短示例：
1. 将数据移动到数组中：
```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```
2. 将 `people` 成员映射到一个新的 JSX 节点数组 `listItems` 中：
```js
const listItems = people.map(person => <li>{person}</li>);
```
3. 将 `listItems` 放在 `ul`中返回
```js
return <ul>{listItems}</ul>;
```
最终的代码为：

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}

```
需要注意，按照上面的代码运行时，react会抛出一个错误

```
❌ Warning: Each child in a list should have a unique “key” prop.
```
您将在本页稍后了解如何修复此错误。在开始之前，让我们为您的数据添加一些结构。

## 过滤数组
我们的数据可以更加的结构化，例如：
```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```
假设，你只想展示 `profession` 是 `chemist` 的 `people`。你可以使用 JavaScript 的 `filter()` 方法只返回这些 `people`。这个方法接受一个数组，通过一个“测试”函数判断数组中的每个值是否能够通过“测试”（函数返回 `true` 或者 `false`）。最后返回一个新的数组，包含了所有能够通过“测试”函数的数据（也就是函数返回了 `true`）。

如果你只想要 `profession` 是 `chemist` 的数据。“测试”函数会写成这样：`(person) => person.profession === 'chemist'`。下面展示整个过程。
1. 通过使用`filter()`对`people`数据使用测试条件 `person.profession === 'chemist'`过滤，创建一个叫做 `chemists` 的新数组。
```js
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```
2. 使用 `map()` 转换 `chemists`
```js
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```
3. 最后在你的组件中返回`listItems`
```js
return <ul>{listItems}</ul>;
```

```js
// App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}

```

```js
// data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```
```js
// utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

#### 警告
箭头函数在 `=>` 之后隐式返回表达式，所以你不需要 `return` 语句：
```js
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```
但是，如果 `=>` 后跟 `{` 大括号，则必须显式地写 `return`！
```js
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```
包含 `=> {` 的箭头函数认为是一个[代码块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body)。你可以在其中写不止一行代码，但必须自己写一个返回语句。如果没有，那么不会返回任何东西（会返回undefined）。

## `key`保持了列表的顺序
我们上面的代码会有一些错误：
```
❌ Warning: Each child in a list should have a unique “key” prop.
```
您需要为每个数组项提供一个键值`key`——一个字符串或一个数字，用于在该数组的其他项中唯一标识它：
```js
<li key={person.id}>...</li>
```
#### 小提示
直接在 `map()` 返回的 JSX 元素一定要有 `key`！

`key`告诉React每个组件对应哪个数组项，这样它以后就可以匹配它们。如果数组项由于排序、插入或删除发生改变，`key`十分钟涛。一个精心选择的`key`可以帮助React推断到底发生了什么，并对DOM树进行正确的更新。

与其动态生成密钥，不如将它们包含在数据中：
```js
// App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}

```

```js
// data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```
```js
// utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```
#### 深度理解
如何为一个数组项展示多个DOM结点？

当每个项目需要呈现的不是一个而是多个 DOM 节点时，您会怎么做？

[<>...</>](https://react.dev/reference/react/Fragment) 语法是不允许您传递`key`的，因此您需要将它们分组到一个 `<div>` 中，或者使用更明确的[<Fragment>](https://react.dev/reference/react/Fragment#rendering-a-list-of-fragments)语法：

```js
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```
`<Fragment>`将会从 DOM 中消失，因此这将生成` <h1>、<p>、<h1>、<p>` 等的平铺列表。

### 去哪里找 `key`
不同的数据来源提供不同的`key`来源：
* **来自数据库的数据**：如果您的数据来自数据库，您可以使用自动生成的唯一的数据库 key/ID。
* **本地生成的数据：**如果您的数据是在本地生成和保存的（例如笔记应用程序中的笔记），请在创建项目时使用递增计数器、[crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) 或类似 [uuid](https://www.npmjs.com/package/uuid) 的包来生成`key`。

### 为什么React需要key
想象一下你桌面上的文件没有名字。您可以按顺序引用它们——第一个文件、第二个文件，依此类推。你可以习惯着昂饮用，但是一旦你删除了一个文件，它就会变得混乱。第二个文件将成为第一个文件，第三个文件将成为第二个文件，依此类推。

文件夹中的文件名和数组中的 JSX `key`具有相似的用途。它们让我们在其兄弟姐妹之间唯一地识别一个项目。精心选择的`key`提供的信息比数组中的位置更多。即使位置由于重新排序而改变，键也让 React 在其整个生命周期中识别数组严肃。

#### 警告
你可能会尝试使用数组中的项的索引作为它的 `key`。实际上，如果你没有指定 `key`，React 就会使用缩阴。但是，如果插入、删除或重新排序数组中的项，渲染项的顺序将会随之改变。使用索引作为 `key` 经常会导致微妙和令人困惑的错误。

同样，不要动态生成 `key`，例如使用 `key={Math.random()}`。这将导致 `key` 在两次渲染之间永远不匹配，导致每次都重新创建所有组件和 DOM。这不仅很慢，而且会丢失列表项内的任何用户输入。相反，使用基于数据的稳定 ID。

请注意，你的组件不会将 `key` 作为 prop 接收。它只是 React 自己使用的提示。如果你的组件需要一个 ID，你必须将它作为单独的 prop 传递：`<Profile key={id} userId={id} />`。


## 回顾
本章的主要内容有：
* 如何将数组和组件渲染为对象。
* 如何使用JavaScript的`map()`方法生成一组相似的组件
* 如果使用JavaScript的`filter()`方法过滤数组中的元素
* 为什么要给组件设置`key`,如何给组件设置`key`,通过`key`,React可以在组件位置和数据发生变化时追踪他们。

## 课后练习

### 1. 把 list 一分为二。
本文中的例子展示了一组人物列表。

将此列表改为依次展示 `chemists`(化学家) 和 **除 chmeists 外的其他人的两个列表**。你可以通过检查 `person.profession === 'chemist'`判断人物是否是 `chemist`。

```js
/// App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}

```


```js
// data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```
```js
// utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```
### 2. 在组件中展示一个嵌套列表
使用数组生成一个食谱的列表。数组中的每一个食谱，都适用`<h2>`标签展示 `name`，使用`<ul>`展示食材。
```js
// App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}

```
```js
// data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];

```

### 将列表元素抽象为一个组件
`RecipeList`组件包含了两个`map`的嵌套调用。为了简化代码，抽象一个`Recipe`组件，接受`id`、`name`、`ingredients`三个props。思考下，需要把key放在哪？为什么这么放？
```js
// App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js
// data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];

```
### 在列表中使用分隔符
下面是葛饰北斋（Katsushika Hokusai）的一句著名短诗（haiku），每句诗都放在<p>标签下。你的人物是在每段后都增加一个`<hr/>`分隔符。你的页面结构最后是下面的样子：

```html
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```
一首日本短诗包含三句话，但是你的解决方案需要考虑到任意多的行数。需要注意的是`<hr/>`之出现在`<p>`元素中间，并没有出现在开始和最后。

```js
// App.js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
```
（这是一种罕见的情况，索引作为键是可以接受的，因为一首诗的行永远不会重新排序。）

