import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, PlayCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function CourseInfo({ course, viewCourse }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!course || !course.courseJson) return <div>Loading...</div>;

  // Parse courseJson safely
  let courseLayout;
  try {
    let rawJson =
      typeof course.courseJson === 'string'
        ? course.courseJson
        : JSON.stringify(course.courseJson);

    // Remove markdown syntax if present
    rawJson = rawJson.replace(/^```json\s*/, '').replace(/```$/, '');

    courseLayout = JSON.parse(rawJson).course;
  } catch (e) {
    console.error('Failed to parse course JSON', e);
    return <div>Error loading course data</div>;
  }

  // API call handler
  const GenerateCourseContent = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/generate-course-content', {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });
      console.log(result.data);
      setLoading(false);
      router.replace('/workspace');
      toast.success('Course generated successfully!');
    } catch (err) {
      console.error('Error generating course content:', err);
      setLoading(false);
      toast.error("Server Side Error");
    }
  };

  return (
    <div className='md:flex gap-5 justify-between p-5 rounded-2xl shadow items-center'>
      <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl'>{courseLayout.name}</h2>
        <p className='text-gray-500'>{courseLayout?.description}</p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex gap-5 items-center rounded-lg p-3 shadow'>
            <Clock />
            <section>
              <h2 className='font-bold'>Duration</h2>
              <h2>
                {courseLayout.chapters?.reduce(
                  (acc, ch) => acc + parseFloat(ch.duration || 0),
                  0
                )}{' '}
                mins
              </h2>
            </section>
          </div>
          <div className='flex gap-5 items-center rounded-lg p-3 shadow'>
            <Book />
            <section>
              <h2 className='font-bold'>Chapters</h2>
              <h2>{courseLayout.chapters?.length || 0}</h2>
            </section>
          </div>
          <div className='flex gap-5 items-center rounded-lg p-3 shadow'>
            <TrendingUp />
            <section>
              <h2 className='font-bold'>Difficulty level</h2>
              <h2>{courseLayout?.level || course?.level}</h2>
            </section>
          </div>
        </div>

        {!viewCourse ? <Button onClick={GenerateCourseContent} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Content'}
        </Button> : <Link href={'/course/'+course?.cid}><Button><PlayCircle />Continue learning</Button></Link>}
      </div>

      <Image
        src={course?.bannerImageUrl}
        alt='banner Image'
        width={400}
        height={400}
        className='w-full h-[240px] rounded-2xl mt-5 md:mt-0 object-cover'
      />
    </div>
  );
}
