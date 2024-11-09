export type Response<T> = {
  data: T;
  message: string;
};

export type Application = {
  id: number;
  applicant: Applicant;
  role: Role;
  resume_link: string;
  status: string;
  year_of_experience: number;
};

export type Applicant = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  profile_image: string;
};

export type Role = {
  id: number;
  role_name: string;
};

export type Location = {
  id: number;
  location_name: string;
};

export type Status = {
  id: number;
  status: string;
};
