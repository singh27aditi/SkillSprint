import { Button } from '@/components/ui/button';
import { Book, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CourseCard({ course }) {
  let courseJson;

  try {
    let rawJson = typeof course.courseJson === 'string' ? course.courseJson : JSON.stringify(course.courseJson);
    rawJson = rawJson.replace(/^```json\s*/, '').replace(/```$/, '');
    courseJson = JSON.parse(rawJson).course;
  } catch (e) {
    console.error('Failed to parse course JSON', e);
    return <div>Error loading course</div>;
  }

  return (
    <div className='shadow rounded-xl overflow-hidden'>
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name}
        width={400}
        height={300}
        className='w-full aspect-video rounded-t-xl object-cover'
      />
      <div className='p-3 flex flex-col gap-3'>
        <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
        <p className='line-clamp-4 text-sm text-gray-500'>{courseJson?.description}...</p>
        <div className='flex justify-between items-center'>
            <h2 className='flex items-center gap-2 text-sm'><Book className='text-primary h-5 w-5'/>{courseJson?.chapters?.length} Chapters</h2>
            {course?.courseContent?.length ? <Button size={'sm'}><PlayCircle />Start Learning</Button> : <Link href={'/workspace/edit-course/'+ course?.cid}><Button variant='outline' size={'sm'}> <Settings />Generate Course</Button></Link>}
        </div>
      </div>
    </div>
  );
}
