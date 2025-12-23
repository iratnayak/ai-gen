import React from 'react'

interface PageProps { 
    params: Promise<{ id:string }>;
}

async function BlogDetailPage({params}: PageProps) {
    const { id } = await params;
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50'>
        <div className='max-w-2xl p-6 bg-white shadow-lg rounded-xl'>
            <h1 className='mb-4 text-3xl font-bold text-gray-800'>
               Blog Post Detail Page
            </h1>
            <p className='text-lg text-gray-600'>
                <span className='ml-2 font-mono font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded'>
                    {id}
                </span>
            </p>
            <div className='mt-8 p-4 border-l-4 border-yellow-500 bg-yellow-50'>
                <p className='italic text-gray-700'>

                </p>
            </div>
        </div>
    </div>
  );
}

export default BlogDetailPage