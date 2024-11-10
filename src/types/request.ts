export type GetApplicationRequest = {
  location?: string;
  job_role_id?: number;
  status?: number;
  filter_keyword?: number;
  curr_page: number;
  page_size: number;
};
