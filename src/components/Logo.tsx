import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import React from 'react'

function Logo() {
  return (
    <Link href="/" className="text-xl font-bold text-white">
      <Image src={logo} alt="Logo" width={100} height={100} />
    </Link>
  )
}

export default Logo