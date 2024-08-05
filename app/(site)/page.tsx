import React from 'react';
import Image from 'next/image';
import AuthFrom from '@/app/(site)/components/AuthForm'

const Page = () => {
  return (
    <div className='
      flex 
      flex-col
      items-center
      justify-center
      py-12 
      min-h-screen 
      sm:px-6 
      lg:px-8 
      bg-white'
    >
      <div className='flex flex-col items-center sm:w-full sm:max-w-full'>
        <Image 
          width={80} 
          height={80} 
          alt='logo' 
          src='/images/chat.png'
          className='' 
        />
        <h2 className='
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
        '>
          Sign in to your account
        </h2>
      </div>
      {/* Auth form */}
      <AuthFrom />
    </div>
  );
}

export default Page;
