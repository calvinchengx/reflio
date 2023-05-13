import { useRouter } from 'next/router';
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import { useUser } from '@/utils/useUser';
import { useUserAffiliate } from '@/affiliate-utils/UserAffiliateContext';
import Button from '@/components/Button'; 
import toast from 'react-hot-toast';
import { postData } from '@/utils/helpers';

const AffiliateInvites = (props: { campaignId?: string; }) => {
  const router = useRouter();
  const { session } = useUser();
  const { userAffiliateInvites } = useUserAffiliate();
  const [loading, setLoading] = useState(false);
  const affiliateInvitePage = router?.query?.handle ? true : false;
  let campaignInviteData = null as any;

  useEffect(() => {
    if(props?.campaignId && userAffiliateInvites !== null && userAffiliateInvites?.length > 0){
      if(userAffiliateInvites?.filter((invite: { campaign_id: string; }) => invite?.campaign_id === props?.campaignId).length > 0){
        // eslint-disable-next-line react-hooks/exhaustive-deps
        campaignInviteData = userAffiliateInvites?.filter((invite: { campaign_id: string; }) => invite?.campaign_id === props?.campaignId)[0];
      }
    }
  }, [userAffiliateInvites]);


  const handleInviteDecision = async (type: string, affiliateId: string) => {    
    setLoading(true);

    try {
      const { status } = await postData({
        url: '/api/affiliate/handle-invite',
        data: { 
          handleType: type,
          affiliateId: affiliateId
        },
        token: session.access_token
      });

      if(status === "success"){
        setLoading(false);
        router.replace(process.env.NEXT_PUBLIC_AFFILIATE_SITE_URL+'?inviteRefresh=true');
        toast.success(type === "accept" ? 'Congratulations! The invitation was accepted.' : 'The invitation was declined.')
      }
  
    } catch (error) {
      setLoading(false);
      toast.error(type === "accept" ? 'The invitation could not be accepted. Please try again later.' : 'The invitation could not be declined. Please try again later.')
    }
  };

  return(
    <div className="wrapper">
      {
        affiliateInvitePage === false &&
        <div className="mb-5">
          <h2 className="text-2xl sm:text-3xl tracking-tight font-extrabold">Campaign Invites</h2>
        </div> 
      }
      <div>
        {
          userAffiliateInvites !== null && userAffiliateInvites?.length > 0 ?
            <div>
              {
                affiliateInvitePage === true ?
                  <div>
                    {
                      campaignInviteData !== null ?
                        <Button
                          onClick={(e: any)=>{handleInviteDecision('accept', campaignInviteData?.affiliate_id)}}
                          disabled={loading}
                          secondary
                          large
                        >
                          {loading ? 'Joining campaign...' : 'Accept Campaign Invite'}
                        </Button>
                      :
                        <p className="text-lg">This campaign is not public, and requires a manual invite for you to join.</p>
                    }
                  </div>
                :
                  <div className="space-y-4">
                    {userAffiliateInvites?.map((invite: { campaign_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; company_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; affiliate_id: any; }) => {
                      return(
                        <div className="rounded-lg bg-secondary p-6">
                          <div className="flex">
                            <div className="xl:ml-3 flex-1 xl:flex xl:justify-between xl:items-center">
                              <p className="mb-3 xl:mb-0 text-md text-white font-semibold">You have been invited to join campaign <span className="font-bold underline">{invite?.campaign_name}</span> by <span className="font-bold underline">{invite?.company_name}</span></p>
                              <div className="xl:flex xl:flex-col xl:items-center xl:justify-center">
                                <Button
                                  onClick={(e: any)=>{handleInviteDecision('accept', invite?.affiliate_id)}}
                                  large
                                  primary
                                  disabled={loading}
                                >
                                  <span>Accept invite</span>
                                </Button>
                                <button disabled={loading} onClick={e=>{handleInviteDecision('decline', invite?.affiliate_id)}} className="ml-3 xl:ml-0 xl:mt-2 text-white font-semibold underline text-xs xl:text-sm">Decline invite</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
              }              
            </div>
          :
            <div>
              {
                affiliateInvitePage === true ?
                  <p className="text-lg">This campaign is not public, and requires a manual invite for you to join.</p>
                :
                  <p>You have no new invites.</p>
              }
            </div>
        }
      </div>
    </div>
  );
}

export default AffiliateInvites;