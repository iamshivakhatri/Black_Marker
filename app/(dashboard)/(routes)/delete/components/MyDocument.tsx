import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

interface MyDocumentProps {
  projectData: any[];
  skillsData: any[];
  experienceData: any[];
  educationData: any[];
  personalData: any[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
    width: '826px',
    height: '1066px',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: '1px solid #ccc',
    fontSize: 24,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Create Document Component
const MyDocument: React.FC<MyDocumentProps> = ({ projectData, skillsData, experienceData, educationData, personalData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{personalData[0]?.name}</Text>
        <Text style={styles.text}>{personalData[0]?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Personal Information</Text>
        {personalData.map((personal, index) => (
          <View key={index}>
            <Text style={styles.text}>Name: {personal.name}</Text>
            <Text style={styles.text}>Email: {personal.email}</Text>
            <Text style={styles.text}>City: {personal.city}</Text>
            <Text style={styles.text}>State: {personal.state}</Text>
            <Text style={styles.text}>Website: {personal.website}</Text>
            <Text style={styles.text}>Github: {personal.github}</Text>
            <Text style={styles.text}>Phone: {personal.phone}</Text>
            <Text style={styles.text}>Linkedin: {personal.linkedin}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Education</Text>
        {educationData.map((education, index) => (
          <View key={index}>
            <Text style={styles.text}>University: {education.university}</Text>
            <Text style={styles.text}>Degree: {education.major}</Text>
            <Text style={styles.text}>Level: {education.level}</Text>
            <Text style={styles.text}>Graduation Date: {education.graduation_date}</Text>
            <Text style={styles.text}>Coursework: {education.coursework}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Experience</Text>
        {experienceData.map((experience, index) => (
          <View key={index}>
            <Text style={styles.text}>Company: {experience.company}</Text>
            <Text style={styles.text}>Position: {experience.title}</Text>
            <Text style={styles.text}>From: {experience.start_date}</Text>
            <Text style={styles.text}>To: {experience.end_date}</Text>
            <Text style={styles.text}>Description: {experience.detailed_experience}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Projects</Text>
        {projectData.map((project, index) => (
          <View key={index}>
            <Text style={styles.text}>Name: {project.name}</Text>
            <Text style={styles.text}>Language: {project.language}</Text>
            <Text style={styles.text}>Description: {project.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Skills</Text>
        {skillsData.map((skill, index) => (
          <View key={index}>
            <Text style={styles.text}>Languages: {skill.languages}</Text>
            <Text style={styles.text}>Frameworks: {skill.frameworks}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
