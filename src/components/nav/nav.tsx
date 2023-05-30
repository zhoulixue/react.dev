'use client';
import { useRouter } from "next/navigation";
import { Menu } from 'antd'
import type { MenuProps } from 'antd';
import style from './nav.module.scss'

export default function Nav(
  { menuItems, pathPrefix, defaultOpenKeys, defaultSelectedKeys }: {
    menuItems: MenuItem[];
    pathPrefix: string;
    defaultOpenKeys: string[];
    defaultSelectedKeys: string[]
  }
) {
  const router = useRouter()
  const handleMenuItemClick: MenuProps['onClick'] = e => {
    router.push(`${pathPrefix}/${e.keyPath.reverse().join('/')}`)
  }
  return (
    <div className={style.nav}>
      <Menu
        items={menuItems}
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        mode="inline"
        onClick={handleMenuItemClick}
      ></Menu>
    </div>
  )
}

// ----- types ------
type MenuItem = Required<MenuProps>['items'][number];
