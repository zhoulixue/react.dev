'use client';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import styles from './page.module.scss'

import { usePathname, useSearchParams, useParams } from "next/navigation";

export default function ChildDemo() {
  const router = useRouter()
  const pathname = usePathname()
  const serachParams = useSearchParams()
  const params = useParams()
  console.log('path', pathname, serachParams.get('x'), params)
  return (
    <>
      <div className={styles['child-demo']}>child demo
        <Link href="demo/child-demo#hash123">to-hash123</Link>
        <button onClick={() => router.push('/demo')}>to-demo</button>
      </div>
      <div id='hash123'>xxx</div>
    </>
  )
}