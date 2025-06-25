import { Button } from '@/components/ui/button';
import { enrollCourseTable } from '@/config/schema';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Cross, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

export default function ChapterContent({ courseInfo, refreshData }) {
    const enrollCourse = courseInfo?.enrollCourse;
    const { courseId } = useParams();
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

    if (!courseContent?.[selectedChapterIndex]) return <p>Loading chapter...</p>;

    const chapter = courseContent[selectedChapterIndex];
    const videoData = chapter?.youtubeVideo;
    const topics = chapter?.courseData;
    let completedChapter = enrollCourse?.completedChapters??[];
    const [loading, setLoading] = useState(false);

    const markChapterCompleted = async () => {
        completedChapter.push(selectedChapterIndex);
        setLoading(true);

        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChapter
        });
        console.log(result);
        refreshData();
        setLoading(false);
        toast.success('Chapter marked as completed.')
    }

    const markInCompleteChapter = async () => {
        setLoading(true);
        const completedChap = completedChapter.filter(item => item != selectedChapterIndex)
        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChap
        });
        console.log(result);
        refreshData();
        setLoading(false);
        toast.success('Chapter marked as incomplete.')
    }

  return (
    <div className="w-full px-4 md:px-10 py-6">

        <div className='flex justify-between items-center'>
            <h2 className="font-bold text-2xl mb-2">{selectedChapterIndex + 1}. {chapter?.courseData?.[0]?.chapterName}</h2>
            {!completedChapter?.includes(selectedChapterIndex) ? (
                <Button disabled={loading} onClick={markChapterCompleted}>
                    {loading ? <Loader2Icon className="animate-spin" /> : <CheckCircle />}
                    Mark as Completed
                </Button>
                ) : (
                <Button variant="outline" disabled={loading} onClick={markInCompleteChapter}>
                    {loading ? <Loader2Icon className="animate-spin" /> : <X />}
                    Marked Incomplete
                </Button>
            )}
        </div>

      <h3 className="my-4 font-semibold text-lg text-gray-700">Related Videos 🎬</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videoData?.slice(0, 4).map((video, index) => (
          <div
            key={video?.videoId || index}
            className="w-full rounded-lg overflow-hidden shadow-md"
          >
            <YouTube
              videoId={video?.videoId}
              title={video?.title || `Video ${index + 1}`}
              opts={{
                width: '100%',
                height: '220',
              }}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className='mt-7'>
        {topics.map((topic, index) => (
            <div
            key={index}
            className='mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md shadow-sm'
            >
            <h2 className='font-bold text-lg mb-2'>{topic?.topic}</h2>
            <div
                className="prose prose-sm md:prose-base max-w-none dark:prose-invert
                        prose-li:bg-gray-50 prose-li:rounded-md prose-li:px-2 prose-li:py-1
                        prose-code:bg-gray-200 prose-code:rounded prose-code:px-1 prose-code:font-mono"
                dangerouslySetInnerHTML={{ __html: topic?.content }}
            ></div>
            </div>
        ))}
        </div>
    </div>
  );
}
