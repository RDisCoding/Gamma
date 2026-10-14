import { servicesMetadata, ServicesView } from '../../../views/services';

export const metadata = servicesMetadata('en');

export default function Page() {
  return <ServicesView locale="en" />;
}
