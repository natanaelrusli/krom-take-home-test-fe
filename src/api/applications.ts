export const getAllApplications = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/applications", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};
