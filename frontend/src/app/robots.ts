import type { MetadataRoute } from 'next';
import { site } from '../content/site';

export const dynamic = 'force-static';

/*
 * Search and AI-search crawlers are always allowed: they are how families find
 * the site in Google, Bing/Copilot, ChatGPT search, Claude and Perplexity.
 *
 * Model-training crawlers are a separate business decision for the owner.
 * They are currently allowed (unchanged from before robots.txt existed). Set
 * this to false to opt out of training without affecting search visibility.
 */
const ALLOW_AI_TRAINING_CRAWLERS = true;

const SEARCH_CRAWLERS = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot'];
const TRAINING_CRAWLERS = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: SEARCH_CRAWLERS, allow: '/' },
      ALLOW_AI_TRAINING_CRAWLERS
        ? { userAgent: TRAINING_CRAWLERS, allow: '/' }
        : { userAgent: TRAINING_CRAWLERS, disallow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
