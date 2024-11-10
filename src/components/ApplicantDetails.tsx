import toast from "react-hot-toast";
import { Application } from "../types";

type ApplicantDetailsProps = {
  application: Application;
  triggerRefetch: () => void;
};

const ApplicantDetails = ({
  application,
  triggerRefetch,
}: ApplicantDetailsProps) => {
  const updateApplicationStatus = async (newStatus: string) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/application/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            application_id: application.id,
            new_status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to update application status";
        throw new Error(errorMessage);
      }

      toast.success("Application Status Updated!");
      triggerRefetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!application) {
    return (
      <div className='h-full w-full flex justify-center items-center border border-borderGray'>
        <p>No Applicant data</p>
      </div>
    );
  }

  return (
    <div className='py-5 px-8 h-full border border-borderGray'>
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
        <button
          onClick={() => updateApplicationStatus("Interview Scheduled")}
          className='h-full w-full bg-primaryGreen text-white disabled:bg-borderGray disabled:hover:scale-100 hover:scale-105 transition-all'
          disabled={application?.status === "Interview Scheduled"}
        >
          Schedule Interview
        </button>
        <button
          onClick={() => updateApplicationStatus("Pending")}
          className='h-full w-full bg-white text-primaryGreen border border-primaryGreen disabled:bg-borderGray disabled:border-none disabled:text-opacity-30 disabled:hover:scale-100 hover:scale-105 transition-all'
          disabled={application?.status === "Pending"}
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default ApplicantDetails;
