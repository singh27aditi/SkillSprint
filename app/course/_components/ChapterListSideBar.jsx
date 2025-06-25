'use client';
import React, { useContext } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

export default function ChapterListSideBar({ courseInfo }) {
  const courseContent = courseInfo?.courses?.courseContent;
  const completedChapters = courseInfo?.enrollCourse?.completedChapters ?? [];
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

  return (
    <div className='w-80 p-5 bg-secondary h-screen overflow-y-auto'>
      <h2 className='my-3 font-bold text-xl'>Chapters ({courseContent?.length})</h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => {
          const isChapterCompleted = completedChapters.includes(index);
          return (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger onClick={() => setSelectedChapterIndex(index)}>
                <span className={`flex items-center gap-2 ${isChapterCompleted ? 'text-green-600' : ''}`}>
                  {index + 1}. {chapter?.courseData?.[0]?.chapterName}
                  {isChapterCompleted && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Completed
                    </span>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {chapter?.courseData?.map((item, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-md text-sm cursor-pointer 
                        ${isChapterCompleted ? 'bg-green-100 text-green-800' : 'bg-muted hover:bg-muted/60'} 
                        transition-all duration-200`}
                    >
                      {item?.topic}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
