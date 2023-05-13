import setupStepCheck from '@/utils/setupStepCheck';
import LoadingTile from '@/components/LoadingTile'; 
import { useRouter } from 'next/router';
import { useCompany } from '@/utils/CompanyContext';
import { useCampaign } from '@/utils/CampaignContext';

export default function SetupPage() {
  const router = useRouter();
  const { activeCompany } = useCompany();
  const { userCampaignDetails } = useCampaign();
  setupStepCheck('normal', router, activeCompany, userCampaignDetails);

  return (
    <div className="pt-12 wrapper">
      <LoadingTile/>
    </div>
  );
}