import React from 'react'
import WelcomeBanner from '../_components/WelcomeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'

export default function MyLearning() {
  return (
    <div>
        <WelcomeBanner />
        <h2 className='font-bold text-2xl mt-5'>My Learning</h2>
        <EnrollCourseList />
    </div>
  )
}
