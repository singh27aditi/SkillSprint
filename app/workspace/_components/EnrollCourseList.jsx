'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard';

export default function EnrollCourseList() {
    const [enrolledCourseList, setEnrolledCourseList] = useState([])
    useEffect(() => {
        GetEnrolledCourse();
    }, []);
    const GetEnrolledCourse = async () => {
    try {
        const result = await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrolledCourseList(result.data);
    } catch (err) {
        console.error('Failed to fetch enrolled courses:', err);
    }
}

  return enrolledCourseList?.length > 0 && (
    <div className='mt-3'>
      <h2 className='font-bold text-xl mb-3'>Continue learning your courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
            {enrolledCourseList?.map((course, index) => (
                <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index}/>
            ))}
        </div>
    </div>
  )
}
