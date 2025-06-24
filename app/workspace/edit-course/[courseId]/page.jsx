'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

export default function EditCourse() {

    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(false);

    console.log(courseId);

    useEffect(() => {
        GetCourseInfo()
    }, [])

    const GetCourseInfo = async () => {
        setLoading(true);
        const result = await axios.get('/api/courses?courseId='+courseId);
        console.log(result.data);
        setLoading(false);
        setCourse(result.data);
    }

    return (
        <div>
            <CourseInfo course={course} />
            <ChapterTopicList course={course}/>
        </div>
  )
}
