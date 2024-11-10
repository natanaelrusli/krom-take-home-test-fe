import { Link } from "react-router-dom";
import Table from "../components/Table";
import MainLayout from "../layouts/MainLayout";
import ApplicantDetails from "../components/ApplicantDetails";
import { useEffect, useState } from "react";
import { Application, Location, ResponseMeta, Role, Status } from "../types";
import { getApplications } from "../api/applications";
import Select from "../components/Select";
import { GetApplicationRequest } from "../types/request";

const ApplicationListPage = () => {
  const [data, setData] = useState<Application[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [loadingApplications, setLoadingApplications] =
    useState<boolean>(false);
  const [loadingLocations, setLoadingLocations] = useState<boolean>(false);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [applicationsDataMeta, setApplicationsDataMeta] = useState<
    ResponseMeta | undefined
  >();
  const [currentApplicationPage, setCurrentApplicationPage] =
    useState<number>(0);

  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );

  const fetchApplications = async (payload: GetApplicationRequest) => {
    setLoadingApplications(true);
    try {
      const response = await getApplications(payload);
      setData(response?.data);
      setApplicationsDataMeta(response?.meta);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoadingApplications(false);
    }
  };

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await fetch("http://localhost:3000/api/location", {
        method: "GET",
      });
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
      const response = await fetch("http://localhost:3000/api/role", {
        method: "GET",
      });
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

  const fetchAllStatus = async () => {
    setLoadingStatus(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/application_status",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch application statuses");
      }
      const result = await response.json();
      setStatus(result.data);
    } catch (error) {
      console.error("Error fetching application statuses:", error);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    try {
      fetchApplications({
        curr_page: 1,
        page_size: 15,
      });
      fetchLocations();
      fetchRoles();
      fetchAllStatus();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      fetchApplications({
        curr_page: currentApplicationPage,
        page_size: 15,
        location: selectedLocation,
        job_role_id: Number(selectedRole),
        status: Number(selectedStatus),
      });
      setSelectedIndex(0);
    } catch (error) {
      console.error(error);
    }
  }, [currentApplicationPage, selectedLocation, selectedRole, selectedStatus]);

  const handleLocationChange = (selectedValue: string) => {
    setSelectedLocation(selectedValue);
  };

  const handleRoleChange = (selectedValue: string) => {
    setSelectedRole(selectedValue);
  };

  const handleStatusChange = (selectedValue: string) => {
    setSelectedStatus(selectedValue);
  };

  const Loader = ({ text }: { text: string }) => (
    <div className='flex justify-center items-center h-full'>
      <p>{text}</p>
    </div>
  );

  return (
    <MainLayout>
      <div className='h-full'>
        <div className='w-full flex justify-between mb-4'>
          <h1 className='text-lg font-semibold'>Applicants</h1>
          <Link
            to='/create'
            className='text-primaryGreen gap-3 flex items-center justify-between border border-primaryGreen py-2 px-8 hover:bg-primaryGreen hover:text-white text-sm'
          >
            <i className='fa-solid fa-upload'></i> Add Application
          </Link>
        </div>

        <div className='w-full flex items-center'>
          <div className='mb-3 flex gap-5 w-5/12'>
            <div className='my-3 w-full flex flex-col gap-2'>
              {loadingLocations ? (
                <Loader text='Loading Locations...' />
              ) : (
                <Select
                  title='Location'
                  options={locations.map((loc) => ({
                    key: loc.id,
                    label: loc.location_name,
                  }))}
                  value={selectedLocation}
                  onChange={(e) => handleLocationChange(e.target.value)}
                />
              )}
            </div>

            <div className='my-3 w-full flex flex-col gap-2'>
              {loadingRoles ? (
                <Loader text='Loading Roles...' />
              ) : (
                <Select
                  title='Role'
                  options={roles.map((role) => ({
                    key: role.id,
                    label: role.role_name,
                  }))}
                  value={selectedRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                />
              )}
            </div>

            <div className='my-3 w-full flex flex-col gap-2'>
              {loadingStatus ? (
                <Loader text='Loading Status...' />
              ) : (
                <Select
                  title='Status'
                  options={status.map((stat) => ({
                    key: stat.id,
                    label: stat.status,
                  }))}
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className='ml-12 mt-4'>
            <p className='text-base'>
              Applicant details:{" "}
              <span className='font-bold ml-2'>
                {data[selectedIndex]?.applicant?.name}
              </span>
            </p>
          </div>
        </div>

        <div className='w-full h-full bg-white flex gap-1 overflow-y-auto'>
          <div className='w-1/2 max-h-[700px] overflow-y-scroll'>
            {loadingApplications ? (
              <Loader text='Loading Applications...' />
            ) : (
              <Table
                data={data}
                totalData={applicationsDataMeta?.total_data || 0}
                currPage={applicationsDataMeta?.curr_page || 0}
                pageSize={applicationsDataMeta?.page_size || 0}
                onRowClick={(_, index) => setSelectedIndex(index || 0)}
                onNextPage={(page) => setCurrentApplicationPage(page)}
                setectedIndex={selectedIndex}
              />
            )}
          </div>

          <div className='w-1/2 max-h-[700px] overflow-y-scroll'>
            {loadingApplications ? (
              <Loader text='Loading Applicant Details...' />
            ) : (
              <ApplicantDetails application={data[selectedIndex]} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApplicationListPage;
