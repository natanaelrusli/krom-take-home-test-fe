import { Link } from "react-router-dom";
import Select from "../components/Select";

const CreateApplicationPage = () => {
  return (
    <div className='w-11/12 mx-auto'>
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
              <label htmlFor=''>Full Name</label>
              <input
                placeholder='Enter first and Last name'
                className='border border-borderGray py-1 px-3'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor=''>Email addresses</label>
              <input
                placeholder='Enter email address'
                className='border border-borderGray py-1 px-3'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor=''>Years of experience</label>
              <input
                placeholder='E.g: 5'
                className='border border-borderGray py-1 px-3'
              />
            </div>
          </div>

          <div className='w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <label htmlFor=''>Phone No</label>
              <input
                placeholder='Enter phone number including country prefix'
                className='border border-borderGray py-1 px-3'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor=''>Role</label>
              <Select
                options={[
                  {
                    key: 1,
                    label: "ABC",
                  },
                ]}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor=''>Full Name</label>
              <input
                placeholder='Enter first and Last name'
                className='border border-borderGray py-1 px-3'
              />
            </div>
          </div>
        </div>

        <div className='h-[200px] w-full bg-[#EEEEF4] mt-12 flex flex-col justify-center items-center gap-6'>
          <p className='font-bold text-lg'>Upload resume url</p>
          <input
            placeholder='Enter resume url'
            className='border border-borderGray py-1 px-3 w-1/4'
          />
        </div>

        <div className='w-full flex justify-center mt-12'>
          <button className='h-12 w-52 bg-primaryGreen text-white border border-primaryGreen'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateApplicationPage;
