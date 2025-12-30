import groq from 'groq';
import { client } from '../../sanity/client';
import LearnMoreClient from './LearnMoreClient';

async function getLearnMoreData() {
  const query = groq`*[_type == "learnMore"][0]`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

async function getCompanyInfo() {
  const query = groq`*[_type == "companyInfo"][0]`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function LearnMorePage() {
  const [data, company] = await Promise.all([
    getLearnMoreData(),
    getCompanyInfo()
  ]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No content available. Please add content in the CMS.</p>
      </div>
    );
  }

  return <LearnMoreClient data={data} company={company} />;
}
