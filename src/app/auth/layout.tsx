import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (session)
    redirect("/");
  return (
    <main>
      {children}
    </main>
  )
}

export default layout