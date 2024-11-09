import { Link } from "react-router-dom";
import Table from "../components/Table";
import MainLayout from "../layouts/MainLayout";
import ApplicantDetails from "../components/ApplicantDetails";
import { useEffect, useState } from "react";
import { Application, Location, Role, Status } from "../types";
import { getAllApplications } from "../api/applications";
import Select from "../components/Select";

const ApplicationListPage = () => {
  const [data, setData] = useState<Application[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [status, setStatus] = useState<Status[]>([]);

  const fetchApplications = async () => {
    const response = await getAllApplications();
    setData(response);
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/location", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const result = await response.json();
      console.log(result);
      setLocations(result.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/role", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const result = await response.json();
      console.log(result);
      setRoles(result.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchAllStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/application_status",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const result = await response.json();
      console.log(result);
      setStatus(result.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchLocations();
    fetchRoles();
    fetchAllStatus();
  }, []);

  return (
    <MainLayout>
      <div className='h-full'>
        <div className='w-full flex justify-between mb-4'>
          <h1 className='text-lg font-semibold'>Applicants</h1>
          <Link
            to={"/create"}
            className='text-primaryGreen gap-3 flex items-center justify-between border border-primaryGreen py-2 px-8 hover:bg-primaryGreen hover:text-white text-sm'
          >
            <i className='fa-solid fa-upload'></i>
            Add Application
          </Link>
        </div>

        <div className='w-full flex items-center'>
          <div className='mb-3 flex gap-5 w-5/12'>
            <div className='my-3 w-full flex flex-col gap-2'>
              <Select
                title='Location'
                options={locations.map((loc) => ({
                  key: loc.id,
                  label: loc.location_name,
                }))}
              />
            </div>

            <div className='my-3 w-full flex flex-col gap-2'>
              <Select
                title='Role'
                options={roles.map((role) => ({
                  key: role.id,
                  label: role.role_name,
                }))}
              />
            </div>

            <div className='my-3 w-full flex flex-col gap-2'>
              <Select
                title='Status'
                options={status.map((stat) => ({
                  key: stat.id,
                  label: stat.status,
                }))}
              />
            </div>
          </div>

          <div className='ml-12 mt-4'>
            <p className='text-base'>
              Applicant details:{" "}
              <span className='font-bold ml-2'>Ethan Robinson</span>
            </p>
          </div>
        </div>

        <div className='w-full h-full bg-white flex gap-1'>
          <div className='w-1/2 overflow-y-scroll'>
            <Table data={data} onRowClick={() => {}} />
          </div>

          <div className='w-1/2'>
            <ApplicantDetails />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApplicationListPage;
