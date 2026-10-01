import LearnMoreClient from './LearnMoreClient';
import { company } from '../../content/company';
import { learnMore } from '../../content/learn-more';

export default function LearnMorePage() {
  return <LearnMoreClient data={learnMore} company={company} />;
}
