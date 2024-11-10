import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "../components/Select";
import { Location, Role } from "../types";
import toast from "react-hot-toast";

export type CreateApplicationRequest = {
  applicant_name: string;
  applicant_phone_number: string;
  applicant_email: string;
  role_id?: number;
  years_of_experience: number;
  location_id?: number;
  resume_link: string;
};

const CreateApplicationPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [loadingLocations, setLoadingLocations] = useState<boolean>(false);

  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateApplicationRequest>({
    applicant_name: "",
    applicant_phone_number: "",
    applicant_email: "",
    role_id: undefined,
    years_of_experience: 0,
    location_id: undefined,
    resume_link: "",
  });
  const numberFields = ["years_of_experience", "role_id", "location_id"];

  const history = useHistory();

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/location`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const result = await response.json();
      setLocations(result.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/role`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const result = await response.json();
      setRoles(result.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const createApplication = async (payload: CreateApplicationRequest) => {
    setLoadingCreate(true);
    try {
      const response: Response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/application/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        // Attempt to extract error message from response
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to create application";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data) {
        toast.success("Application created!");
        history.replace("/");
      }
    } catch (error: any) {
      console.error("Error creating application:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleCreateApplication = () => {
    createApplication(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "years_of_experience") {
      if (value.startsWith("0") && value.length > 1) {
        e.target.value = value.slice(1); // Remove the leading zero
      }
    }

    setFormData({
      ...formData,
      [name]: numberFields.includes(name) ? Number(value) : value,
    });
  };

  useEffect(() => {
    fetchRoles();
    fetchLocations();
  }, []);

  return (
    <div className='w-11/12 mx-auto min-w-[500px]'>
      <div className='w-full my-6 bg-primaryGreen px-4 py-6 text-white font-bold'>
        <Link to={"/"}>Applicant Tracker</Link>
      </div>

      <div className='text-xl ml-4 font-bold'>
        Upload a new candidate application
      </div>

      <div className='mt-8 h-[650px] w-full bg-white p-6 flex flex-col'>
        <div className='flex w-full gap-6'>
          <div className='w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='applicant_name'>Full Name</label>
              <input
                name='applicant_name'
                value={formData.applicant_name}
                onChange={handleChange}
                placeholder='Enter first and Last name'
                className='border border-borderGray py-1 px-3'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='applicant_email'>Email addresses</label>
              <input
                name='applicant_email'
                value={formData.applicant_email}
                onChange={handleChange}
                placeholder='Enter email address'
                className='border border-borderGray py-1 px-3'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='years_of_experience'>Years of experience</label>
              <input
                name='years_of_experience'
                type='number'
                value={formData.years_of_experience}
                onChange={handleChange}
                placeholder='E.g: 5'
                className='border border-borderGray py-1 px-3'
              />
            </div>
          </div>

          <div className='w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='applicant_phone_number'>Phone No</label>
              <input
                name='applicant_phone_number'
                value={formData.applicant_phone_number}
                onChange={handleChange}
                placeholder='Enter phone number including country prefix'
                className='border border-borderGray py-1 px-3'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='role_id'>Role</label>
              <Select
                name='role_id'
                disabled={loadingRoles}
                value={formData.role_id}
                onChange={handleChange}
                options={roles.map((role) => ({
                  key: role.id,
                  label: role.role_name,
                }))}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='location_id'>Location</label>
              <Select
                name='location_id'
                disabled={loadingLocations}
                value={formData.location_id}
                onChange={handleChange}
                options={locations.map((location) => ({
                  key: location.id,
                  label: location.location_name,
                }))}
              />
            </div>
          </div>
        </div>

        <div className='h-[200px] w-full bg-[#EEEEF4] mt-12 flex flex-col justify-center items-center gap-6'>
          <p className='font-bold text-lg'>Upload resume url</p>
          <input
            name='resume_link'
            value={formData.resume_link}
            onChange={handleChange}
            placeholder='Enter resume url'
            className='border border-borderGray py-1 px-3 w-1/4 min-w-[300px]'
          />
        </div>

        <div className='w-full flex justify-center mt-12'>
          <button
            disabled={loadingCreate}
            onClick={handleCreateApplication}
            className='h-12 w-52 bg-primaryGreen text-white border border-primaryGreen'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateApplicationPage;
