import { visitMetadata, VisitView } from '../../../views/visit';

export const metadata = visitMetadata('en');

export default function Page() {
  return <VisitView locale="en" />;
}
