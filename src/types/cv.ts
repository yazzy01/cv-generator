export interface PersonalInfo {
  fullName: string;
  title: string;
  dateOfBirth: string;
  nationality: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface Experience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Certification {
  title: string;
  organization: string;
  date: string;
  url?: string;
  details: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface TechnicalSkill {
  category: string;
  skills: string[];
}

export interface SocialMedia {
  platform: string;
  username: string;
  url?: string;
}

export interface CV {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  experience: Experience[];
  certifications: Certification[];
  education: Education[];
  technicalSkills: TechnicalSkill[];
  languages: string[];
  socialMedia: SocialMedia[];
} 