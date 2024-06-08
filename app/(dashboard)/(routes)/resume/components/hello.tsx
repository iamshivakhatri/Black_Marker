import React from 'react'
import { useGlobalContext } from '@/context/global-context'

function Hello() {
    const { projectData, skillsData, experienceData, educationData, personalData } = useGlobalContext();
    console.log("This is projectData in hello ", projectData)
    console.log("This is skillsData in hello", skillsData)
    console.log("This is experienceData in hello", experienceData)
    console.log("This is educationData in hello", educationData)
    console.log("This is personalData in hello", personalData)
  
  return (
    <div>
      HELLO WORLD
    </div>
  )
}

export default Hello
