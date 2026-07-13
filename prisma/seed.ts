import { config } from 'dotenv'
config({ path: '.env.local' })
import { prisma } from '../src/lib/prisma'

async function main() {
  
  // DUMMY POSTS
  await prisma.post.upsert({
    where: { slug: 'architecting-scalable-rag-systems' },
    update: {},
    create: {
      title: 'Architecting Scalable RAG Systems with Next.js',
      slug: 'architecting-scalable-rag-systems',
      status: 'PUBLISHED',
      content: `
# Introduction to RAG

Retrieval-Augmented Generation (RAG) is transforming how we build AI applications. By combining LLMs with a vector database, we can create assistants that understand our private data.

## Why Next.js?

Next.js 15 App Router is the perfect framework for this. 
1. **Server Actions**: Securely query your vector DB without exposing keys.
2. **Streaming**: Stream the LLM response directly to the client.
3. **React Server Components**: Keep the heavy LangChain/LlamaIndex bundles on the server.

### Implementation Details
We utilized Pinecone for embeddings and OpenAI's text-embedding-3-small. The results were a 40% reduction in hallucination rates.
      `,
    }
  });

  await prisma.post.upsert({
    where: { slug: 'react-vs-vue-framework-journey' },
    update: {},
    create: {
      title: 'Why I switched from React to Vue, and back to React',
      slug: 'react-vs-vue-framework-journey',
      status: 'PUBLISHED',
      content: `
# The Journey

Every developer goes through a phase of framework fatigue. In 2024, I decided to rewrite a major dashboard in Vue 3 Composition API.

## The Good
Vue's reactivity system feels magical. No dependency arrays, no stale closures. It just works.

## The Bad
The ecosystem for complex enterprise tools (specifically advanced headless UI components) still lags slightly behind React. 

Ultimately, Next.js and React Server Components pulled me back into the ecosystem. The DX of server actions is simply unmatched right now.
      `,
    }
  });

  // DUMMY PROJECTS WITH CASE STUDIES
  await prisma.project.upsert({
    where: { slug: 'agromind-krishi' },
    update: {},
    create: {
      name: 'AgroMind Krishi',
      slug: 'agromind-krishi',
      description: 'AI Agricultural Advisory platform helping farmers diagnose diseases via WhatsApp.',
      techStack: ['WhatsApp API', 'LangGraph', 'Claude Vision', 'Hinglish NLP', 'Python'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://demo.example.com',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop', // Agriculture/Tech vibe
      content: `
## The Problem
Indian farmers lack immediate, expert-level advice on crop diseases and pest control in their native languages. Traditional methods are slow and often inaccessible in remote fields. When a disease hits, every hour counts, but getting an agronomist to the field can take days.

## The Solution
We built AgroMind Krishi—a WhatsApp-first AI advisory bot. 

Farmers simply take a picture of the diseased leaf and send it to the WhatsApp number. 

### Architecture
1. **Vision Analysis**: We use Claude 3.5 Sonnet Vision to analyze the crop image and identify the disease.
2. **Stateful Conversation**: LangGraph manages the conversational state, asking follow-up questions if the image is blurry or more context is needed.
3. **Multilingual NLP**: The entire system processes and responds in Hinglish and regional dialects.

## The Impact
In our 3-month pilot, we served over 2,000 farmers, diagnosing 15 distinct crop diseases with a 92% accuracy rate compared to human agronomists.
      `,
    },
  })

  await prisma.project.upsert({
    where: { slug: 'spyglaz-distribution-engine' },
    update: {},
    create: {
      name: 'Spyglaz Distribution Engine',
      slug: 'spyglaz-distribution-engine',
      description: 'Enterprise AI distribution engine for optimizing supply chain logistics and predicting demand spikes.',
      techStack: ['Next.js 15', 'Node.js', 'PostgreSQL', 'Redis', 'TailwindCSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://saas.example.com',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', // Data/Dashboard vibe
      content: `
## Overview
Spyglaz is an enterprise distribution engine designed to predict product demand and optimize warehouse stocking using historical data and predictive AI models.

## Challenges
The legacy system took 14 hours to run a full prediction batch across 500 warehouses. This latency meant managers were making decisions on yesterday's data.

## Technical Implementation
We completely re-architected the system using a modern stack:
- **Frontend**: Next.js App Router for a lightning-fast dashboard.
- **Caching**: Redis layer to serve common queries instantly.
- **Database**: PostgreSQL partitioned by region.

## Results
- **99% reduction** in query latency.
- Real-time demand forecasting.
- 15% reduction in overstock inventory waste across the pilot warehouses.
      `,
    },
  })

  // SETTINGS
  await prisma.setting.upsert({
    where: { key: 'linkedinUrl' },
    update: { value: 'https://www.linkedin.com/in/rajat-tripathi-603b79108/' },
    create: { key: 'linkedinUrl', value: 'https://www.linkedin.com/in/rajat-tripathi-603b79108/' },
  })

  console.log('Seeded successfully with rich content!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
