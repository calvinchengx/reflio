import CampaignInvite from '@/templates/CampaignInvite';
import { postData } from '@/utils/helpers';
import SEOMeta from '@/templates/SEOMeta';
import { useRouter } from 'next/router';

const typedPostData = postData as any;

export default function CampaignInviteIndex({ publicCampaignData }: { publicCampaignData: any }){
  const router = useRouter();
  let campaignImageUrl = `/api/public/campaign-image?companyHandle=${router?.query?.handle}`

  return(
    <>
      <SEOMeta 
        title={publicCampaignData?.campaign_name ?? 'Campaign not found'}
        description={`Join ${publicCampaignData?.campaign_name} and get ${publicCampaignData?.commission_type === 'percentage' ? `${publicCampaignData?.commission_value}% commission on all paid referrals.` : `${publicCampaignData?.company_currency}${publicCampaignData?.commission_value} commission on all paid referrals.`}`}
        img={campaignImageUrl}
      />
      <CampaignInvite publicCampaignData={publicCampaignData} />
    </>
  )
};

export async function getServerSideProps({ query }: any) {  
  const { handle } = query
  const { campaign } = await typedPostData({
    url: `${process.env.NEXT_PUBLIC_AFFILIATE_SITE_URL}/api/public/campaign`,
    data: {
      "companyHandle": handle ? handle : null,
      "campaignId": null
    }
  });
  return { props: { publicCampaignData: campaign } }
}