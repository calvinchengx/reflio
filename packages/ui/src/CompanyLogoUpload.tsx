import { useState, useRef } from 'react';
import { uploadLogoImage } from '@/utils/useUser';
import { useRouter } from 'next/router';
import { useCompany } from '@/utils/CompanyContext';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import Image from 'next/image';

export const CompanyLogoUpload = () => {
  const router = useRouter();
  const { activeCompany } = useCompany();
  const [logoError, setLogoError] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
      
  const handleFileClick = () => {
    if(fileInput.current){
      fileInput.current.click()
    }
  }

  const handleFileUpload = async (e: any) => {
    if(e.target.files[0].size < 2000000){
      if(e.target.files[0].name?.includes("jpg") || e.target.files[0].name?.includes("jpeg") || e.target.files[0].name?.includes("png")){
        await uploadLogoImage(router?.query?.companyId, e.target.files[0]).then((result: any) => {
          if(result !== "error"){
            setLogoError(false);
            router.replace(window.location.href);
          } else {
            toast.error('There was an error when uploading your image. Please make sure that it is either a JPG or PNG file and is less than 2mb.');
          }
        });
      }
    } else {
      setLogoError(true);
      return false;
    }
  };

  return(
    <>
      <h3 className="font-semibold">Company Logo</h3>
      <div>
        <div className="mt-3 flex items-center">
          {
            activeCompany?.company_image !== null &&
            <Image alt="Logo" src={process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL+activeCompany?.company_image} className="w-10 h-auto mr-4" width={80} height={80}/>
          }
          <input
            onChange={handleFileUpload}
            type="file"
            accept="image/*"
            style={{display: 'none'}}
            multiple={false}
            ref={fileInput}
          />
          <Button 
            primary
            small
            onClick={() => handleFileClick()}
          >
            Upload File
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Must be a PNG or JPEG file and less than 2mb.
        </p>
        {
          logoError &&
          <div className="mt-4 bg-red p-4 rounded-lg text-md text-white text-center">
            There was an error when uploading your file.
          </div>
        }
      </div>
    </>
  )
};

export default CompanyLogoUpload;