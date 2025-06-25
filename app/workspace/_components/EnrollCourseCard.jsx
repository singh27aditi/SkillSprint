import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { PlayCircle } from "lucide-react";
import Image from 'next/image'
import Link from "next/link";
import React from 'react'

export default function EnrollCourseCard({ course, enrollCourse }) {
    let courseJson;
    let rawJson = typeof course.courseJson === 'string' ? course.courseJson : JSON.stringify(course.courseJson);
    rawJson = rawJson.replace(/^```json\s*/, '').replace(/```$/, '');
    courseJson = JSON.parse(rawJson).course;

    const calculatePerProgress = () => {
        return (enrollCourse?.completedChapters?.length??0/course?.courseContent?.length) * 100;
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
        <div className=''>
            <h2 className="flex justify-between text-sm text-primary">Progress <span>{calculatePerProgress()}%</span></h2>
            <Progress value={calculatePerProgress()} />
            <Link href={'/workspace/course/' + course?.cid}>
                <Button className='w-full mt-3'>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Continue Learning
                </Button>
            </Link>
        </div>
      </div>
    </div>
  )
}
