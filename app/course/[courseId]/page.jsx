'use client'
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState } from 'react'
import ChapterListSideBar from '../_components/ChapterListSideBar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation';
import axios from 'axios'

export default function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    useEffect(() => {
            GetEnrolledCourseById();
    }, []);
    const GetEnrolledCourseById = async () => {
        try {
            const result = await axios.get('/api/enroll-course?courseId='+courseId);
            console.log(result.data);
            setCourseInfo(result.data);
        } catch (err) {
            console.error('Failed to fetch enrolled courses:', err);
        }
    }
  return (
    <div>
      <AppHeader hideSideBar={true}/>
      <div className='flex gap-10'>
        <ChapterListSideBar courseInfo={courseInfo}/>
        <ChapterContent courseInfo={courseInfo}/>
      </div>
    </div>
  )
}
