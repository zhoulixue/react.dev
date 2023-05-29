import { Metadata } from 'next'
import Link from "next/link";
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'demo page',
}
export default function Demo() {
  return (
    <>
      <Link href="demo/child-demo">to-child-demo</Link>
      <div className={styles.red}>
        demo
      </div>
    </>
  )
}