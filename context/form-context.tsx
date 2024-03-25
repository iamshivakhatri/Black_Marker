// context/FormContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { FormData, FormContextType } from '../types';

const initialFormData: FormData = {
  username: '',
  email: '',
  address: '',
  website: '',
  github: '',
  phoneNumber: '',
  linkedin: '',
};

const FormContext = createContext<FormContextType>({
  formData: initialFormData,
  updateFormData: () => {},
});

export const FormProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (data: FormData) => {
    setFormData(data);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
