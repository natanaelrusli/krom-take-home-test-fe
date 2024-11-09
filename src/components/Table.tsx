import React, { useState } from "react";

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

type TableProps = {
  data: Application[];
  onRowClick: (candidate: Application) => void;
};

const Table: React.FC<TableProps> = ({ data, onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((candidate) =>
    candidate.applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex border border-borderGray min-w-96 w-full'>
      <div className='bg-white w-full'>
        <div className='flex items-center justify-between m-2 min-w-96'>
          <input
            type='text'
            placeholder='Search...'
            className='px-2 py-[2px] text-sm border border-borderGray outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className='flex gap-1 items-center'>
            <button className='border h-full border-borderGray px-[4px] py-[1px] disabled:bg-borderGray'>
              {"<"}
            </button>
            <div className='border border-borderGray px-[10px] py-[3px] h-full text-sm'>
              1
            </div>
            <button className='border h-full border-borderGray px-[4px] py-[1px] disabled:bg-borderGray'>
              {">"}
            </button>
          </div>
        </div>

        <table className='w-full bg-white border border-borderGray'>
          <thead className='text-tableText border border-borderGray'>
            <tr className='text-left text-sm'>
              <th className='px-2 py-1 border border-borderGray'>
                candidate_name
              </th>
              <th className='px-2 py-1 border border-borderGray'>
                candidate_email
              </th>
              <th className='px-2 py-1 border border-borderGray'>
                applied_role
              </th>
              <th className='px-2 py-1 border border-borderGray'>
                application_status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((application, index) => (
              <tr
                key={index}
                className='cursor-pointer hover:bg-gray-100 text-sm'
                onClick={() => onRowClick(application)}
              >
                <td className='p-[9px] border border-borderGray overflow-ellipsis max-w-24 overflow-hidden'>
                  {application.applicant.name}
                </td>
                <td className='p-[9px] border border-borderGray overflow-ellipsis max-w-24 overflow-hidden'>
                  {application.applicant.email}
                </td>
                <td className='p-[9px] border border-borderGray overflow-ellipsis max-w-32 overflow-hidden'>
                  {application.role.role_name}
                </td>
                <td className='p-[9px] border border-borderGray overflow-ellipsis w-12 max-w-12 overflow-hidden'>
                  {application.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
