import React, { useState } from "react";
import { Application } from "../types";
import { useDebouncedCallback } from "use-debounce";

type TableProps = {
  data: Application[];
  onRowClick: (candidate: Application, index?: number) => void;
  onNextPage: (page: number) => void;
  onSearch: (value: string) => void;
  totalData: number;
  currPage: number;
  pageSize: number;
  setectedIndex?: number;
};

const Table: React.FC<TableProps> = ({
  data,
  onRowClick,
  currPage,
  totalData,
  pageSize,
  onNextPage,
  setectedIndex,
  onSearch,
}) => {
  const debounceDelay = 300;
  const totalPages = Math.ceil(totalData / pageSize);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebouncedCallback((value) => {
    onSearch(value);
  }, debounceDelay);

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    debouncedSearch(val);
  };

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
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
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
            {data.map((application, index) => (
              <tr
                key={index}
                className={`cursor-pointer hover:bg-gray-100 text-sm ${
                  setectedIndex === index && "bg-secondaryGreen"
                }`}
                onClick={() => onRowClick(application, index)}
              >
                <td className='p-[9px] border border-borderGray overflow-hidden max-w-28 whitespace-nowrap text-ellipsis'>
                  {application.applicant.name}
                </td>
                <td className='p-[9px] border border-borderGray overflow-hidden max-w-28 whitespace-nowrap text-ellipsis'>
                  {application.applicant.email}
                </td>
                <td className='p-[9px] border border-borderGray overflow-hidden max-w-28 whitespace-nowrap text-ellipsis'>
                  {application.role.role_name}
                </td>
                <td className='p-[9px] border border-borderGray overflow-hidden max-w-28 whitespace-nowrap text-ellipsis'>
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
