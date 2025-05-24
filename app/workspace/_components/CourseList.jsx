'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog';

export default function CourseList() {
    const [CourseList, setCourseList] = useState([]);

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl'>Course List</h2>
        {
            CourseList.length == 0 ?    <div className='flex flex-col p-7 items-center justify-content border rounded-xl mt-2 bg-secondary'>
                                            <Image className='grayscale' src="/online-education.png" alt="edu" width={80} height={80} />
                                            <h2 className='my-2 text-xl font-bold'>Looks like you haven't created any courses yet</h2>
                                            <AddNewCourseDialog>
                                                <Button>Create your first course</Button>
                                            </AddNewCourseDialog>
                                        </div> :
                                        <div>
                                            List of Courses
                                        </div>
        }
    </div>
  )
}
