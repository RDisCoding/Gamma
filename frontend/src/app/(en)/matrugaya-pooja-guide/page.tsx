import { guideMetadata, GuideView } from '../../../views/guide';

export const metadata = guideMetadata('en');

export default function Page() {
  return <GuideView locale="en" />;
}
