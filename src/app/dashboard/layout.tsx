import React from 'react'
import { redirect } from 'next/navigation';
import { getUserData } from '@/lib/getUserData';

function layout({ children }: { children: React.ReactNode }) {
  const user = getUserData();
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div>{children}</div>
  )
}

export default layout