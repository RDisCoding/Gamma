import { learnMoreMetadata, LearnMoreView } from '../../../views/learn-more';

export const metadata = learnMoreMetadata('en');

export default function Page() {
  return <LearnMoreView locale="en" />;
}
