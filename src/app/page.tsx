"use client"
import {useRouter} from 'next/navigation'
import style from './page.module.scss'

export default function Home() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/docs/introduction/how-to-learn-react')
  }
  return (
    <div className={style.main}>
      <div className={style.nav} onClick={handleClick}>React文档</div>
    </div>
  )
}
