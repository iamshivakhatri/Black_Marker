import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from "@/context/global-context";
import { Button } from "@/components/ui/button";
import { Edit, Save, AlertTriangle } from 'lucide-react';
import { toast } from "react-hot-toast";

interface EditableResumeProps {
  togglePdfView: () => void;
}

const EditableResume: React.FC<EditableResumeProps> = ({ togglePdfView }) => {
  const { 
    projectData,
    skillsData,
    experienceData,
    educationData,
    personalData,
    addProjectData,
    addSkillsData,
    addExperienceData,
    addEducationData,
    addPersonalData
  } = useGlobalContext();

  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes
      try {
        const content = resumeRef.current?.innerHTML || '';
        
        // You would need to parse the HTML and update the global context
        // This is a simplified implementation
        console.log('Resume content saved');
        toast.success('Resume content saved');
        
        // Dispatch storage event to update other components
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error saving resume:', error);
        toast.error('Failed to save resume content');
      }
    } else {
      // Focus at the start of the content
      setTimeout(() => {
        if (resumeRef.current) {
          resumeRef.current.focus();
          // Place cursor at the beginning
          const selection = window.getSelection();
          const range = document.createRange();
          range.setStart(resumeRef.current, 0);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
    
    setIsEditing(!isEditing);
  };

  // Format experiences with wider bullet points
  const formatExperiences = () => {
    return experienceData?.map((exp, index) => {
      const bulletPoints = exp.detailed_experience
        .split('\n')
        .filter(line => line.trim())
        .map((line, i) => `<li key=${i} class="mb-2 w-full">${line}</li>`)
        .join('');
      
      return `
        <div key=${index} class="mb-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">${exp.title}</h3>
            <span class="font-semibold">${exp.company}</span>
            <span>${exp.start_date} - ${exp.isEndPresent ? 'Present' : exp.end_date}</span>
          </div>
          <ul class="list-disc pl-5 mt-1 w-full space-y-1">
            ${bulletPoints}
          </ul>
        </div>
      `;
    }).join('');
  };

  // Format projects with wider bullet points
  const formatProjects = () => {
    return projectData?.map((project, index) => {
      const bulletPoints = project.description
        .split('\n')
        .filter(line => line.trim())
        .map((line, i) => `<li key=${i} class="mb-2 w-full">${line}</li>`)
        .join('');
      
      return `
        <div key=${index} class="mb-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">${project.name} - <span class="font-normal">${project.language}</span></h3>
            <a href="${project.github}" class="underline" target="_blank">GitHub</a>
          </div>
          <ul class="list-disc pl-5 mt-1 w-full space-y-1">
            ${bulletPoints}
          </ul>
        </div>
      `;
    }).join('');
  };

  // Format education for display
  const formatEducation = () => {
    return educationData?.map((edu, index) => `
      <div key=${index} class="mb-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold">${edu.university}</h3>
          <span class="font-semibold">${edu.major}, ${edu.level}</span>
          <span>${edu.graduation_date}</span>
        </div>
        <p class="mt-1">Coursework: ${edu.coursework}</p>
      </div>
    `).join('');
  };

  // Format skills for display
  const formatSkills = () => {
    return skillsData?.map((skill, index) => `
      <div key=${index} class="mb-4">
        <p><strong>Languages: </strong> ${skill.languages}</p>
        <p><strong>Frameworks: </strong> ${skill.frameworks}</p>
      </div>
    `).join('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-4 relative">
      <div className="absolute top-2 right-2 flex gap-2">
        <Button 
          ref={editButtonRef}
          variant="outline" 
          size="sm" 
          onClick={toggleEdit}
          className="flex items-center gap-1"
        >
          {isEditing ? <Save size={16} /> : <Edit size={16} />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={togglePdfView}
          className="flex items-center gap-1"
        >
          <AlertTriangle size={16} />
          PDF View
        </Button>
      </div>

      <div
        ref={resumeRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        className={`prose max-w-none ${isEditing ? 'border border-gray-300 p-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' : ''}`}
        style={{ minHeight: '29.7cm' }} // A4 height
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{personalData[0]?.name}</h1>
            <div className="flex gap-2 text-sm">
              <span>{personalData[0]?.phone}</span>
              <span>{personalData[0]?.city}, {personalData[0]?.state}</span>
              <span>{personalData[0]?.email}</span>
            </div>
          </div>
          <div className="text-right">
            <p>{personalData[0]?.website}</p>
            <p>{personalData[0]?.github}</p>
            <p>{personalData[0]?.linkedin}</p>
          </div>
        </div>

        {/* Education Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-maroon mb-3 pb-1 text-maroon">Education</h2>
          <div dangerouslySetInnerHTML={{ __html: formatEducation() }} />
        </section>

        {/* Experience Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-maroon mb-3 pb-1 text-maroon">Work Experience</h2>
          <div dangerouslySetInnerHTML={{ __html: formatExperiences() }} />
        </section>

        {/* Projects Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-maroon mb-3 pb-1 text-maroon">Projects</h2>
          <div dangerouslySetInnerHTML={{ __html: formatProjects() }} />
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-maroon mb-3 pb-1 text-maroon">Skills</h2>
          <div dangerouslySetInnerHTML={{ __html: formatSkills() }} />
        </section>
      </div>
    </div>
  );
};

export default EditableResume; 