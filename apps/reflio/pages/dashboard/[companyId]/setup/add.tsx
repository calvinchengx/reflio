import { useRouter } from 'next/router';
import SetupProgress from '@/components/SetupProgress';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Button from '@/components/Button'; 
import Card from '@/components/Card'; 
import { SEOMeta } from '@/templates/SEOMeta'; 
import { useCompany } from '@/utils/CompanyContext';

export default function TrackingSetupPage() {
  const router = useRouter();
  const { activeCompany } = useCompany();

  const embedCode = 
  `<script async src='https://reflio.com/js/reflio.min.js' data-reflio='${router?.query?.companyId}'></script>`;

  const scriptCode = 
  `<script type="text/javascript">
    await Reflio.signup('yourcustomer@email.com')
</script>`
  
  return (
    <>
      <SEOMeta title="Setup Reflio" />
      <div className="border-b-4 border-gray-300 py-12">
        <div className="wrapper">
          <SetupProgress />
        </div>
      </div>
      <div className="mb-6 pt-12">
        <div className="wrapper">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Add Reflio to your site
          </h1>
        </div>
      </div>
      <div className="wrapper">
        <div>
          <Card className="max-w-4xl lg:col-span-6 xl:col-span-8">
            <h2 className="mb-5 text-3xl font-semibold">Manual setup</h2>
            <div className="mb-8">
              <h3 className="mb-1 text-2xl font-semibold">
                Step 1: Installing the snippet on your website
              </h3>
              <p className="mb-5 text-lg">
                Paste the following JavaScript snippet into your website&apos;s{' '}
                <code className="text-lg font-bold tracking-tight text-pink-500">{`<head>`}</code>{' '}
                tag
              </p>
              <div className="w-full overflow-hidden rounded-xl text-lg shadow-lg">
                <SyntaxHighlighter language="javascript" style={monokaiSublime}>
                  {embedCode}
                </SyntaxHighlighter>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="mb-1 text-2xl font-semibold">
                Step 2: Tracking the referral
              </h3>
              <p className="mb-5 text-lg">
                To track a referral on your website, you need to run the below
                function when you are first creating the user. This process
                usually happens on your sign up page.{' '}
                <strong>
                  You should do this for every sign up to make sure you catch
                  all valid referrals. It doesn&rsquo;t matter if you send every
                  single sign up to Reflio; our system will only save users who
                  signed up after visiting a referral link, and has a valid
                  cookie in their browser.
                </strong>
              </p>
              <div className="w-full overflow-hidden rounded-xl text-lg shadow-lg">
                <SyntaxHighlighter language="javascript" style={monokaiSublime}>
                  {scriptCode}
                </SyntaxHighlighter>
              </div>
              {activeCompany?.payment_integration_type === 'stripe' && (
                <p className="mt-3 text-lg">
                  Reflio will automatically add the referral ID to an existing
                  Stripe customer with the same email address, or later if the
                  Stripe customer is created at a different time. When the user
                  converts to a paying customer, Reflio will automatically
                  create a commission if there was an eligible referral ID
                  associated with that user.
                </p>
              )}
              <p className="mt-4 text-lg">
                For more detailed instructions on setting Reflio up, as well as
                more details on features such as Cross Sub-Domain Tracking, Auto
                Cookie Consent Collection, and more, visit our{' '}
                <a
                  href="https://reflio.com/resources/quickstart-guide"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline"
                >
                  QuickStart Guide.
                </a>
              </p>
            </div>
            {activeCompany?.payment_integration_type === 'paddle' && (
              <div className="mb-5">
                <h3 className="mb-1 text-2xl font-semibold">
                  Step 3: Add referral data to your Paddle checkout
                </h3>
                <p className="mb-1 text-lg">
                  For Paddle based integrations, you will need to pass the
                  referral ID to your Paddle checkout function.{' '}
                </p>
                <p className="mb-3 text-lg">
                  <strong>
                    Your initial Paddle checkout setup code will look something
                    like this:
                  </strong>
                </p>
                <div className="w-full overflow-hidden rounded-xl text-lg shadow-lg">
                  <SyntaxHighlighter
                    language="javascript"
                    style={monokaiSublime}
                  >
                    {`<a href="#" id="buy-button">Buy now!</a>
<script type="text/javascript">
    function paddleCheckout() {
        Paddle.Checkout.open({ product: 123 });
    }
    document.getElementById('buy-button').addEventListener('click', paddleCheckout, false);
</script>`}
                  </SyntaxHighlighter>
                </div>
                <p className="mb-4 mt-4 text-lg">
                  <strong>
                    You will need to update the code to include an additional
                    passthrough parameter which contains the Reflio referral ID,
                    the parameter should look like this:
                  </strong>
                </p>
                <div className="w-full overflow-hidden rounded-xl text-lg shadow-lg">
                  <SyntaxHighlighter
                    language="javascript"
                    style={monokaiSublime}
                  >
                    {`<a href="#" id="buy-button">Buy now!</a>
<script type="text/javascript">
    function paddleCheckout() {
        var reflioReferral = null;
        if(typeof Reflio !== "undefined"){
          reflioReferral = Reflio.getReferralId();
        }
        Paddle.Checkout.open({ 
            product: 123,
            passthrough: JSON.stringify({ referral: reflioReferral })
        });
    }
    document.getElementById('buy-button').addEventListener('click', paddleCheckout, false);
</script>`}
                  </SyntaxHighlighter>
                </div>
                <p className="mb-4 mt-4 text-lg">
                  Using the{' '}
                  <code className="text-lg font-bold tracking-tight text-pink-500">
                    if typeof
                  </code>{' '}
                  statement, we are ensuring that the Reflio script is
                  definitely detected, meaning we can safely run the{' '}
                  <code className="text-lg font-bold tracking-tight text-pink-500">
                    Reflio.getReferralId()
                  </code>{' '}
                  function. If no referral is found in the user&apos;s browser,
                  this value will automatically default to{' '}
                  <code className="text-lg font-bold tracking-tight text-pink-500">
                    null
                  </code>
                  .
                </p>
                <p className="text-lg">
                  Once the checkout is complete, Reflio will automatically
                  handle the commisssion creation via the Paddle webhooks you
                  setup earlier.
                </p>
              </div>
            )}
            <div className="mt-5">
              <Button
                large
                primary
                href={`/dashboard/${router?.query?.companyId}/setup/verify`}
                className="mt-4"
              >
                <span>Verify installation</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}