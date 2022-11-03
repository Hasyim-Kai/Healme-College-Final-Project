import React from 'react'
import Link from 'next/link'
import { pinkGradientText } from '../../../styles/TailwindStyle'

export default function Navbar() {
    return <header><nav className='flex justify-between items-center py-3 px-10 text-3xl'>
        <h1 className={`${pinkGradientText} font-semibold`}>Healme</h1>
        <Link href="/login"><a className={`${pinkGradientText} py-1`}>Login</a></Link>
    </nav></header>
}