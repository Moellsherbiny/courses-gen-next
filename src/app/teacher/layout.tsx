import DashboardNav from '@/components/DashboardNav';
import { getUserData } from '@/lib/getUserData';
import { redirect } from 'next/navigation';
import React from 'react'

// localhost:3000/teacher/courses


/*
body = layout
div => h1 => children

dom => document object model
*/
async function layout({ children }: { children: React.ReactNode }) {
  const { name, image } = await getUserData();
  if (!name || !image) redirect("/")
  return (
    <>
      <DashboardNav name={name} image={image} role='teacher' />
      {children}
    </>

  )
}

export default layout