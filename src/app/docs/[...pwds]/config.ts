export const menuItems = [
  {
    key: 'introduction',
    label: '译者序',
    children: [
      { key: 'how-to-learn-react', label: '前言' },
      { key: 'why-react', label: '为什么要使用react' },
    ]
  },
  {
    key: 'describing-the-ui',
    label: 'React如何实现UI',
    children: [
      { key: 'your-first-component', label: '第一个组件' },
      { key: 'importing-and-exporting-components', label: '导入和导出组件' } ,
      { key: 'writing-markup-with-jsx', label: '使用JSX编写标签' },
      { key: 'passing-props-to-a-component', label: '向组件传递Props' },
      { key: 'conditional-rendering', label: '条件渲染' },
      { key: 'rendering-lists', label: '列表渲染' },
    ]
  },
]