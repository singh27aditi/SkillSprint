"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CourseCard from '../_components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Explore() {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    const result = await axios.get('/api/courses?courseId=0');
    console.log(result.data);
    setCourseList(result.data);
  };

  return (
    <div className='px-4 md:px-10 py-6'>
      <h2 className='font-bold text-3xl mb-6'>Explore more courses</h2>

      {/* Search Bar */}
      <div className='flex gap-3 max-w-xl mb-8'>
        <Input placeholder="Search" className="flex-1" />
        <Button variant="default"><Search className='w-4 h-4 mr-2' />Search</Button>
      </div>

      {/* Course Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {courseList.length > 0 ? courseList.map((course, index) => (
          <CourseCard course={course} key={index} refreshData={GetCourseList} />
        )) : [0, 1, 2, 3].map((item, index) => (
          <Skeleton key={index} className='w-full h-[240px]' />
        ))}
      </div>
    </div>
  );
}
