import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import React from 'react';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // regular
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' }, // bold
  ],
});



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
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Roboto',
    width: 1000,
    scale: 1.2,
  },
  outerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  innerSectionLeft:{
    fontSize: 10,
  },
  innerSectionRight:{
    fontSize: 10.5,
    flexDirection: 'column',
    marginRight:0
  },
  section: {
    marginBottom: 10,
  },
  sectionHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10.5,
    gap:4
  },
  header: {
    fontSize: 24,
    marginBottom: 2,
  },
  subHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    color: 'maroon',
    fontSize: 18,
    marginBottom: 5,
    marginRight: 5,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'maroon',
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'normal',
  },
  textHeader: { 
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  topLine:{
    flexDirection: 'row',
    justifyContent: 'space-between',  
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: 'bold',
    width: '100%',
  },
   boldSubHeader: {
    fontSize: 12,
    fontWeight: 'bold',
   },
   skillContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  boldLabel: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 12,
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

// Create Document Component
const MyDocument: React.FC<MyDocumentProps> = ({ projectData, skillsData, experienceData, educationData, personalData }) => (
  <Document>
    <Page size={{ width: 800, height: 1066 }} style={styles.page}  >
      <View style={styles.outerSection}>
      <View style={styles.innerSectionLeft}>
        <Text style={styles.header}>{personalData[0]?.name}</Text>
        <View style={styles.sectionHorizontal}> 
        <Text >{personalData[0]?.phone}</Text>
        <Text >{personalData[0]?.city},</Text>
        <Text >{personalData[0]?.state}</Text>
        <Text >{personalData[0]?.email}</Text>
        </View>
      </View>  
      <View style={styles.innerSectionRight}>
        <Text> {personalData[0]?.website}</Text>
        <Text> {personalData[0]?.github}</Text>
        <Text> {personalData[0]?.linkedin}</Text>
      </View>
      </View>

     

      <View style={styles.section}>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>Education</Text>
          <View style={styles.horizontalLine} />
        </View>

        {educationData.map((education, index) => (
          <View key={index}>
            <View style={styles.topLine}> 
              <Text  style={styles.textHeader}>{education.university}</Text>
              <Text style={styles.text}>{education.major},{education.level}</Text>
              <Text style={styles.text}>{education.graduation_date}</Text>
            </View>
            <Text style={styles.text}>Coursework: {education.coursework}</Text>
          </View>
        ))}


      </View>





      <View style={styles.section}>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>Work Experience</Text>
          <View style={styles.horizontalLine} />
        </View>



        {experienceData.map((experience, index) => (
          <View key={index}>
            <View style={styles.topLine}>
              <Text style={styles.textHeader}>{experience.title}</Text>
              <Text style={styles.text}>{experience.company}</Text>
              <Text style={styles.text}>{experience.start_date}-{experience.end_date}</Text>
            </View>
            <Text style={styles.text}>{experience.detailed_experience}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>Projects</Text>
          <View style={styles.horizontalLine} />
        </View>

        {projectData.map((project, index) => (
          <View key={index}>
          <View style={{ flexDirection: 'row'}}>
            <Text style={styles.textHeader}>{project.name} -</Text>
            <Text style={styles.text}> {project.language}</Text>
          </View>


            <Text style={styles.text}>{project.description}</Text>
          </View>
        ))}

      </View>






      <View style={styles.section}>
      <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeader}>Skills</Text>
          <View style={styles.horizontalLine} />
        </View>
        {skillsData.map((skill, index) => (
          <View key={index}>
            <View style={styles.skillContainer}>
        <Text style={styles.boldLabel}>Languages: </Text>
        <Text style={styles.value}>{skill.languages}</Text>
      </View>
      <View style={styles.skillContainer}>
        <Text style={styles.boldLabel}>Frameworks: </Text>
        <Text style={styles.value}>{skill.frameworks}</Text>

      </View>
\          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
