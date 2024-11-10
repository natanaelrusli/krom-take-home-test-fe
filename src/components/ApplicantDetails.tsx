import { Application } from "../types";

type ApplicantDetailsProps = {
  application: Application;
};

const ApplicantDetails = ({ application }: ApplicantDetailsProps) => {
  return (
    <div className='py-5 px-8 h-full'>
      <div className='w-full flex justify-center'>
        <img
          src={`${application?.applicant?.profile_image || ""}`}
          alt='avatar'
          className='size-36'
        />
      </div>

      <div className='mt-5'>
        <table className='w-full'>
          <tbody>
            <tr>
              <td className='px-2 py-3'>Name</td>
              <td className='px-2 py-3 min-w-[300px]'>
                {application?.applicant?.name || ""}
              </td>
            </tr>
            <tr>
              <td className='px-2 py-3'>Email</td>
              <td className='px-2 py-3'>
                <a href='mailto:ethan.robinson@email.com'>
                  {application?.applicant?.email || ""}
                </a>
              </td>
            </tr>
            <tr>
              <td className='px-2 py-3'>Phone No.</td>
              <td className='px-2 py-3'>
                {application?.applicant?.phone_number || ""}
              </td>
            </tr>
            <tr>
              <td className='px-2 py-3'>Role Applied For</td>
              <td className='px-2 py-3'>{application?.role.role_name || ""}</td>
            </tr>
            <tr>
              <td className='px-2 py-3'>Location</td>
              <td className='px-2 py-3'>{application?.applicant?.location}</td>
            </tr>
            <tr>
              <td className='px-2 py-3'>Resume</td>
              <td className='px-2 py-3'>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={application?.resume_link}
                >
                  Resume
                </a>
              </td>
            </tr>
            <tr>
              <td className='px-2 py-3'>Status</td>
              <td className='px-2 py-3'>{application?.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='flex gap-3 px-2 mt-6 w-full h-16'>
        <button className='h-full w-full bg-primaryGreen text-white'>
          Schedule Interview
        </button>
        <button className='h-full w-full bg-white text-primaryGreen border border-primaryGreen'>
          Review
        </button>
      </div>
    </div>
  );
};

export default ApplicantDetails;
