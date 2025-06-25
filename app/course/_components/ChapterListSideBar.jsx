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
  const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext);

  return (
    <div className='w-80 p-5 bg-secondary h-screen overflow-y-auto'>
      <h2 className='my-3 font-bold text-xl'>Chapters ({courseContent?.length})</h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger onClick={() => setSelectedChapterIndex(index)}>
                {index + 1}. {chapter?.courseData?.[0]?.chapterName}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {chapter?.courseData?.map((item, idx) => {
                  // We can check if this topic is completed from state/props later
                  const isCompleted = false; // Placeholder
                  return (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-md text-sm cursor-pointer 
                        ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-muted hover:bg-muted/60'} 
                        transition-all duration-200`}
                    >
                      {item?.topic}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
