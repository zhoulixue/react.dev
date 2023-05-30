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