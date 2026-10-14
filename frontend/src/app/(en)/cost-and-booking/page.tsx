import { costMetadata, CostView } from '../../../views/cost';

export const metadata = costMetadata('en');

export default function Page() {
  return <CostView locale="en" />;
}
