import { aboutMetadata, AboutView } from '../../../views/about';

export const metadata = aboutMetadata('en');

export default function Page() {
  return <AboutView locale="en" />;
}
