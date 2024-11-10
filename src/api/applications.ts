import { Application, Response } from "../types";
import { GetApplicationRequest } from "../types/request";

export const getApplications = async (
  request: GetApplicationRequest
): Promise<Response<Application[]>> => {
  try {
    const {
      location,
      job_role_id,
      status,
      filter_keyword,
      curr_page,
      page_size,
    } = request;
    const requestBody = {
      location,
      job_role_id,
      status,
      filter_keyword,
      curr_page,
      page_size,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/applications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { data: [], message: `Error fetching: ${error}` };
  }
};
