'use client'
import { Margarine } from 'next/font/google'
import AddPost from './components/AddPost'
export default function Home() {
  return (
    <main>
      <h1>Hello next</h1>
      <AddPost/>
    </main>
  )
}
