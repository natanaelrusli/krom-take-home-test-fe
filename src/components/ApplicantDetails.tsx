const ApplicantDetails = () => {
  return (
    <div className='py-5 px-8 h-full'>
      <div className='w-full flex justify-center'>
        <img
          src='https://avatars.githubusercontent.com/u/124599?v=4'
          alt='avatar'
          className='w-36'
        />
      </div>

      <div className='mt-5'>
        <table className='w-full'>
          <tr>
            <td className='px-2 py-3'>Name</td>
            <td className='px-2 py-3'>Ethan Robinson</td>
          </tr>
          <tr>
            <td className='px-2 py-3'>Email</td>
            <td className='px-2 py-3'>
              <a href='mailto:ethan.robinson@email.com'>
                ethan.robinson@email.com
              </a>
            </td>
          </tr>
          <tr>
            <td className='px-2 py-3'>Phone No.</td>
            <td className='px-2 py-3'>+98273647392</td>
          </tr>
          <tr>
            <td className='px-2 py-3'>Role Applied For</td>
            <td className='px-2 py-3'>System Architect</td>
          </tr>
          <tr>
            <td className='px-2 py-3'>Location</td>
            <td className='px-2 py-3'>South Africa</td>
          </tr>
          <tr>
            <td className='px-2 py-3'>Resume</td>
            <td className='px-2 py-3'>
              <a href='http://'>Resume</a>
            </td>
          </tr>
          <tr>
            <td className='px-2 py-3'>Status</td>
            <td className='px-2 py-3'>Candidate Rejected</td>
          </tr>
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
