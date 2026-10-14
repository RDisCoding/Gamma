import { thankYouMetadata, ThankYouView } from '../../../views/thank-you';

export const metadata = thankYouMetadata('en');

export default function Page() {
  return <ThankYouView locale="en" />;
}
