import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollText, GraduationCap, Briefcase, FolderGit2, Code, User, FileText } from 'lucide-react';

interface SectionNavProps {
  sections: {
    id: string;
    label: string;
    icon: keyof typeof icons;
  }[];
}

const icons = {
  "job-description": ScrollText,
  "personal-info": User,
  "education": GraduationCap,
  "experience": Briefcase,
  "projects": FolderGit2,
  "skills": Code,
  "layout-tools": FileText
};

export function SectionNav({ sections }: SectionNavProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-10">
      <div className="bg-white rounded-r-lg shadow-lg p-2">
        <div className="flex flex-col gap-6"> {/* More spacing between items */}
          {sections.map((section) => {
            const IconComponent = icons[section.icon];
            return (
              <Button
                key={section.id}
                variant="ghost"
                size="icon"
                className="flex flex-col items-center justify-center h-14 p-2 hover:bg-gray-200"
                onClick={() => scrollToSection(section.id)}
                title={section.label}
              >
                <span className="text-[12px] transform -rotate-90 whitespace-nowrap tracking-wide">{section.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
