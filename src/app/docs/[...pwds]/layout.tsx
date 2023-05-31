import Nav from '../../../components/nav/nav'
import style from './docs.module.scss'
import { menuItems } from './config'

export const metadata = {
  title: 'react.dev中文翻译',
  description: 'react.dev文档的中文翻译',
}

export default function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    pwds: string[];
  }
}) {

  const { pwds } = params
  const defaultOpenKeys = [pwds[0]]
  const defaultSelectedKeys = [pwds[1]]
  return <main className={style.main}>
    <Nav
      menuItems={menuItems}
      pathPrefix="docs"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
    ></Nav>
    <article className={style.article}>
      {children}
    </article>
  </main>
}