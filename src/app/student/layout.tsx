import DashboardNav from '@/components/DashboardNav';
import { getUserData } from '@/lib/getUserData';
import { redirect } from 'next/navigation';
import React from 'react'

async function layout({ children }: { children: React.ReactNode }) {
  const { name, image } = await getUserData();
  if (!name || !image) redirect("/")
  return (
    <>
      <DashboardNav name={name} image={image} />
      {children}
    </>

  )
}

export default layout