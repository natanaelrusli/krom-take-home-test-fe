import React, { useState } from "react";
import { Application } from "../types";

type TableProps = {
  data: Application[];
  onRowClick: (candidate: Application, index?: number) => void;
  onNextPage: (page: number) => void;
  totalData: number;
  currPage: number;
  pageSize: number;
};

const Table: React.FC<TableProps> = ({
  data,
  onRowClick,
  currPage,
  totalData,
  pageSize,
  onNextPage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((candidate) =>
    candidate.applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalData / pageSize);

  const handleNextPage = () => {
    if (currPage < totalPages) {
      onNextPage(currPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currPage > 1) {
      onNextPage(currPage - 1);
    }
  };

  const isFirstPage = currPage === 1;

  const isLastPage = currPage === totalPages;

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
            <button
              className='border h-full border-borderGray px-[4px] py-[1px] disabled:bg-borderGray'
              disabled={isFirstPage}
              onClick={handlePrevPage}
            >
              {"<"}
            </button>
            <div className='border border-borderGray px-[10px] py-[3px] h-full text-sm'>
              {currPage}
            </div>
            <button
              className='border h-full border-borderGray px-[4px] py-[1px] disabled:bg-borderGray'
              disabled={isLastPage}
              onClick={handleNextPage}
            >
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
                onClick={() => onRowClick(application, index)}
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
