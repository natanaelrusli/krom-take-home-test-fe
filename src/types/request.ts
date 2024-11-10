export type GetApplicationRequest = {
  location?: string;
  job_role_id?: number;
  status?: string;
  filter_keyword?: string;
  curr_page: number;
  page_size: number;
};

export type CreateApplicationRequest = {
  applicant_name: string;
  applicant_phone_number: string;
  applicant_email: string;
  role_id: number;
  years_of_experience: number;
  location_id: number;
  resume_link: string;
};
