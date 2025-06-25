import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react';
import YouTube from 'react-youtube';

export default function ChapterContent({ courseInfo }) {
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

  if (!courseContent?.[selectedChapterIndex]) return <p>Loading chapter...</p>;

  const chapter = courseContent[selectedChapterIndex];
  const videoData = chapter?.youtubeVideo;
  const topics = chapter?.courseData;

  return (
    <div className="w-full px-4 md:px-10 py-6">
      <h2 className="font-bold text-2xl mb-2">
        {selectedChapterIndex + 1}. {chapter?.courseData?.[0]?.chapterName}
      </h2>

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
