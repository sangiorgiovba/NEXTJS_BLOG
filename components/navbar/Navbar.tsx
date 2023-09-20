'use client'

import getCurrentUser from '@/app/actions/getCurrentUser'
import { SafeUser } from '@/types/type'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface UserMenuProps {
    currentUser: SafeUser | null
  }


export default function Navbar({currentUser}:UserMenuProps) {


  return (
    <header>
         <nav className='bg-gray-200 flex justify-between px-4 py-6 shadow-xl'>
            <div>{currentUser?.name}</div>

            <div className='flex gap-4'>
            <Link className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800" href='/'>Home</Link>
            <Link className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800" href={currentUser ? '/create':'/register'}>Criar Post</Link>
            {currentUser ? <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => signOut()}>Sair</button> : <Link className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800" href='/register'>Cadastrar</Link>}
            </div>
        </nav>
    </header>
  )
}