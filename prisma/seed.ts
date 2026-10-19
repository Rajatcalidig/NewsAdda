import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  // DUMMY POSTS
  await prisma.post.upsert({
    where: { slug: 'architecting-scalable-rag-systems' },
    update: {},
    create: {
      title: 'Architecting Scalable RAG Systems with Next.js & FastAPI',
      slug: 'architecting-scalable-rag-systems',
      status: 'PUBLISHED',
      content: `
# Introduction to RAG

Retrieval-Augmented Generation (RAG) is transforming how we build AI applications. By combining LLMs with a vector database, we can create assistants that understand our private data.

## Bridging Full-Stack & AI Engineering

As a full-stack developer transitioning into AI engineering, the biggest differentiator is knowing how to make models reliable and production-ready:
1. **Server Actions & FastAPI**: Querying vector DBs securely without exposing credentials.
2. **Streaming & Low Latency**: Streaming LLM token responses directly to client components.
3. **Stateful Multi-Turn Agents**: Leveraging LangChain, LangGraph, and Claude API for dependable tool execution.

### Implementation Details
We utilized vector search with Claude 3.5 Sonnet, reducing hallucination rates by over 40% in real-world evaluations.
      `,
    }
  });

  await prisma.post.upsert({
    where: { slug: 'shipping-ai-with-fullstack-roots' },
    update: {},
    create: {
      title: 'Eight Years of Shipping: The Advantage of Full-Stack Roots in AI',
      slug: 'shipping-ai-with-fullstack-roots',
      status: 'PUBLISHED',
      content: `
# From Prototype to Production

Many AI demos stop at a Jupyter notebook or an unstable prototype. Bringing an AI feature to paying users requires deep full-stack engineering:
- Rock-solid backend reliability (Node.js & FastAPI)
- Robust data persistence & migrations (PostgreSQL, Prisma)
- Smooth, accessible user experiences (React, Next.js, Tailwind CSS)
- Resilient API error handling and graceful fallbacks

When you pair 8+ years of production full-stack engineering with machine learning and LLM tooling, you can take AI ideas from initial spark to reliable, scalable products end to end.
      `,
    }
  });

  // ==========================================
  // CALIDIG CASE STUDY PROJECTS
  // ==========================================

  // 1. My Buddy Mobile App
  await prisma.project.upsert({
    where: { slug: 'my-buddy-mobile-app' },
    update: {
      name: 'My Buddy Mobile App',
      description: 'Mobile workforce management app simplifying HR operations, project collaboration, attendance, and leave management.',
      techStack: ['Flutter', 'React Native', 'Node.js', 'PostgreSQL', 'Figma'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/my-buddy-mobile-app-ux',
      imageUrl: '/projects/my-buddy-mobile-app.jpg',
      content: `
## Overview
**MyBuddy Mobile App** is a next-generation workforce management mobile solution engineered to streamline human resource operations, attendance tracking, shift scheduling, and task management into a single, intuitive interface. Designed for distributed and mobile-first employees, it eliminates administrative friction across field and desk workers.

## The Challenge
- **Fragmented HR Touchpoints**: Employees had to use separate disjointed systems for marking attendance, requesting leaves, and reporting task progress.
- **Low Connectivity Environments**: Field employees frequently encountered low or zero network connectivity on customer sites, risking lost time logs.
- **Complex Approval Hierarchies**: Multi-level managerial approvals were bottlenecked in email threads with zero status transparency.

## What We Built
- **Streamlined Mobile Interface**: Clear, rapid navigation for daily clock-in/out, biometric validation, and real-time leave quota tracking.
- **Offline-First Synchronization**: Local SQLite/waterfall caching ensuring task updates and attendance logs are never lost, automatically synchronizing once connectivity is restored.
- **Unified Manager Approvals**: Instant push notifications with one-tap approval actions for team leads and HR administrators.
- **Task & Project Collaboration**: Real-time assignment cards, status updates, and milestone tracking directly on mobile.

## The Stack
- **Mobile Client**: Flutter / React Native
- **Backend API**: Node.js & Express
- **Database**: PostgreSQL with Prisma ORM
- **Design System**: Figma component system
      `,
    },
    create: {
      name: 'My Buddy Mobile App',
      slug: 'my-buddy-mobile-app',
      description: 'Mobile workforce management app simplifying HR operations, project collaboration, attendance, and leave management.',
      techStack: ['Flutter', 'React Native', 'Node.js', 'PostgreSQL', 'Figma'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/my-buddy-mobile-app-ux',
      imageUrl: '/projects/my-buddy-mobile-app.jpg',
      content: `
## Overview
**MyBuddy Mobile App** is a next-generation workforce management mobile solution engineered to streamline human resource operations, attendance tracking, shift scheduling, and task management into a single, intuitive interface. Designed for distributed and mobile-first employees, it eliminates administrative friction across field and desk workers.

## The Challenge
- **Fragmented HR Touchpoints**: Employees had to use separate disjointed systems for marking attendance, requesting leaves, and reporting task progress.
- **Low Connectivity Environments**: Field employees frequently encountered low or zero network connectivity on customer sites, risking lost time logs.
- **Complex Approval Hierarchies**: Multi-level managerial approvals were bottlenecked in email threads with zero status transparency.

## What We Built
- **Streamlined Mobile Interface**: Clear, rapid navigation for daily clock-in/out, biometric validation, and real-time leave quota tracking.
- **Offline-First Synchronization**: Local SQLite/waterfall caching ensuring task updates and attendance logs are never lost, automatically synchronizing once connectivity is restored.
- **Unified Manager Approvals**: Instant push notifications with one-tap approval actions for team leads and HR administrators.
- **Task & Project Collaboration**: Real-time assignment cards, status updates, and milestone tracking directly on mobile.

## The Stack
- **Mobile Client**: Flutter / React Native
- **Backend API**: Node.js & Express
- **Database**: PostgreSQL with Prisma ORM
- **Design System**: Figma component system
      `,
    },
  });

  // 2. MyBuddy Portal
  await prisma.project.upsert({
    where: { slug: 'my-buddy-portal' },
    update: {
      name: 'MyBuddy Portal',
      description: 'UX-driven enterprise workforce management platform designed to simplify HR operations and project collaboration through intuitive workflows.',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/my-buddy-portal',
      imageUrl: '/projects/my-buddy-portal.jpg',
      content: `
## Overview
**MyBuddy Portal** serves as the central operational cockpit for HR managers, executives, and department leads. It unifies workforce operations into a single command center with granular role-based permissions, automated attendance processing, organizational directories, and deep project telemetry.

## The Challenge
- **Data Silos**: HR administrators spent dozens of hours per payroll cycle cross-referencing CSV exports and disconnected spreadsheets.
- **Lack of Granular Control**: Legacy systems failed to provide flexible, role-based access for departmental managers versus executive leadership.
- **Scalability**: Supporting rapid organization growth without sluggish query response times or portal slowdowns.

## Architectural Solutions
- **Modern Next.js Architecture**: Server-side rendered views for instant page load times and zero-layout-shift UI experiences.
- **Role-Based Access Control (RBAC)**: Fine-grained security policies governing employee data access, departmental reports, and compensation structures.
- **Real-Time KPI Dashboards**: Visual workforce health analytics, absenteeism trends, project budget allocations, and compliance health checks.
- **Automated Payroll Reconciliation**: Automated pre-payroll processing that factors in leave balances, overtime logs, and shift penalties.

## Key Outcomes
- **90% reduction** in manual payroll preparation time.
- **100% centralized oversight** across all company branches.
- Real-time project resource allocation tracking.
      `,
    },
    create: {
      name: 'MyBuddy Portal',
      slug: 'my-buddy-portal',
      description: 'UX-driven enterprise workforce management platform designed to simplify HR operations and project collaboration through intuitive workflows.',
      techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/my-buddy-portal',
      imageUrl: '/projects/my-buddy-portal.jpg',
      content: `
## Overview
**MyBuddy Portal** serves as the central operational cockpit for HR managers, executives, and department leads. It unifies workforce operations into a single command center with granular role-based permissions, automated attendance processing, organizational directories, and deep project telemetry.

## The Challenge
- **Data Silos**: HR administrators spent dozens of hours per payroll cycle cross-referencing CSV exports and disconnected spreadsheets.
- **Lack of Granular Control**: Legacy systems failed to provide flexible, role-based access for departmental managers versus executive leadership.
- **Scalability**: Supporting rapid organization growth without sluggish query response times or portal slowdowns.

## Architectural Solutions
- **Modern Next.js Architecture**: Server-side rendered views for instant page load times and zero-layout-shift UI experiences.
- **Role-Based Access Control (RBAC)**: Fine-grained security policies governing employee data access, departmental reports, and compensation structures.
- **Real-Time KPI Dashboards**: Visual workforce health analytics, absenteeism trends, project budget allocations, and compliance health checks.
- **Automated Payroll Reconciliation**: Automated pre-payroll processing that factors in leave balances, overtime logs, and shift penalties.

## Key Outcomes
- **90% reduction** in manual payroll preparation time.
- **100% centralized oversight** across all company branches.
- Real-time project resource allocation tracking.
      `,
    },
  });

  // 3. Calidig IT Solutions
  await prisma.project.upsert({
    where: { slug: 'calidig-it-solutions' },
    update: {
      name: 'Calidig IT Solutions',
      description: 'Modern digital experience reflecting the company’s evolution from software boutique to an AI-powered innovation partner.',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'Figma'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/calidig-it-solutions',
      imageUrl: '/projects/calidig-it-solutions.jpg',
      content: `
## Overview
A complete digital reimagining of **Calidig IT Solutions**, architected to reflect the firm’s positioning from a regional software boutique into a world-class, AI-driven digital engineering and innovation consultancy.

## The Objective
- Present an ultra-modern, high-tech aesthetic communicating deep expertise across AI solutions, core software engineering, and digital transformation.
- Showcase deep case studies with interactive metrics, client success stories, and architectural deep-dives.
- Maximize performance benchmarks, sub-second latency, and global search engine visibility (SEO).

## Technical Implementation
- **Next.js & TypeScript**: Strict type safety paired with modular component architecture and server-side rendering for lightning performance.
- **Custom Interactive Design System**: Sleek dark mode styling, animated gradient glows, fluid typography, and bespoke micro-interactions built with Tailwind CSS.
- **Dynamic Content & Case Studies Hub**: Fast data retrieval with client-side filtering by category (AI, Custom Development, Hybrid Apps, UI/UX).
- **Core Web Vitals**: Scored 98+ on Google Lighthouse across Performance, Accessibility, and SEO.
      `,
    },
    create: {
      name: 'Calidig IT Solutions',
      slug: 'calidig-it-solutions',
      description: 'Modern digital experience reflecting the company’s evolution from software boutique to an AI-powered innovation partner.',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'Figma'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/calidig-it-solutions',
      imageUrl: '/projects/calidig-it-solutions.jpg',
      content: `
## Overview
A complete digital reimagining of **Calidig IT Solutions**, architected to reflect the firm’s positioning from a regional software boutique into a world-class, AI-driven digital engineering and innovation consultancy.

## The Objective
- Present an ultra-modern, high-tech aesthetic communicating deep expertise across AI solutions, core software engineering, and digital transformation.
- Showcase deep case studies with interactive metrics, client success stories, and architectural deep-dives.
- Maximize performance benchmarks, sub-second latency, and global search engine visibility (SEO).

## Technical Implementation
- **Next.js & TypeScript**: Strict type safety paired with modular component architecture and server-side rendering for lightning performance.
- **Custom Interactive Design System**: Sleek dark mode styling, animated gradient glows, fluid typography, and bespoke micro-interactions built with Tailwind CSS.
- **Dynamic Content & Case Studies Hub**: Fast data retrieval with client-side filtering by category (AI, Custom Development, Hybrid Apps, UI/UX).
- **Core Web Vitals**: Scored 98+ on Google Lighthouse across Performance, Accessibility, and SEO.
      `,
    },
  });

  // 4. Rent My Stuff
  await prisma.project.upsert({
    where: { slug: 'rent-my-stuff' },
    update: {
      name: 'Rent My Stuff',
      description: 'User-centric rental marketplace simplifying discovering and booking furniture, vehicles, electronics, and clothing across web and mobile.',
      techStack: ['React', 'Flutter', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/rent-my-stuff',
      imageUrl: '/projects/rent-my-stuff.jpg',
      content: `
## Overview
**Rent My Stuff** is a full-featured peer-to-peer and merchant rental marketplace platform designed to empower sustainable circular commerce. Users can list, discover, and securely rent items ranging from tools and electronics to furniture and vehicles.

## The Challenge
- **Dynamic Availability**: Handling complex calendar scheduling, overlapping booking dates, and turnaround inspection buffers.
- **Trust & Dispute Mitigation**: Ensuring deposit safety and condition validation before and after each rental lifecycle.
- **Multi-Platform Consistency**: Maintaining synchronized experiences across web and native mobile apps.

## What We Built
- **Real-Time Booking Engine**: Instant availability calendar with collision detection and automated delivery scheduling.
- **Secure Escrow & Deposits**: Safe deposit hold mechanisms that release funds only after mutual sign-off upon return.
- **Cross-Platform Experience**: Responsive web marketplace built with React paired with Flutter mobile apps for on-the-go rental management.
- **Item Condition Audits**: Mobile photo verification upload during pick-up and drop-off to protect both lenders and borrowers.
      `,
    },
    create: {
      name: 'Rent My Stuff',
      slug: 'rent-my-stuff',
      description: 'User-centric rental marketplace simplifying discovering and booking furniture, vehicles, electronics, and clothing across web and mobile.',
      techStack: ['React', 'Flutter', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/rent-my-stuff',
      imageUrl: '/projects/rent-my-stuff.jpg',
      content: `
## Overview
**Rent My Stuff** is a full-featured peer-to-peer and merchant rental marketplace platform designed to empower sustainable circular commerce. Users can list, discover, and securely rent items ranging from tools and electronics to furniture and vehicles.

## The Challenge
- **Dynamic Availability**: Handling complex calendar scheduling, overlapping booking dates, and turnaround inspection buffers.
- **Trust & Dispute Mitigation**: Ensuring deposit safety and condition validation before and after each rental lifecycle.
- **Multi-Platform Consistency**: Maintaining synchronized experiences across web and native mobile apps.

## What We Built
- **Real-Time Booking Engine**: Instant availability calendar with collision detection and automated delivery scheduling.
- **Secure Escrow & Deposits**: Safe deposit hold mechanisms that release funds only after mutual sign-off upon return.
- **Cross-Platform Experience**: Responsive web marketplace built with React paired with Flutter mobile apps for on-the-go rental management.
- **Item Condition Audits**: Mobile photo verification upload during pick-up and drop-off to protect both lenders and borrowers.
      `,
    },
  });

  // 5. Spyglaz Distribution Engine
  await prisma.project.upsert({
    where: { slug: 'spyglaz-distribution-engine' },
    update: {
      name: 'Spyglaz Distribution Engine',
      description: 'Enterprise AI distribution engine modernizing legacy assignment infrastructure through cloud-native microservices and intelligent queue orchestration.',
      techStack: ['React', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/spyglaz-distribution-engine',
      imageUrl: '/projects/spyglaz-distribution-engine.jpg',
      content: `
## Overview
**Spyglaz Distribution Engine** is an enterprise-grade automated lead and account distribution platform built to orchestrate high-volume sales routing across multi-national enterprise subsidiaries.

## The Challenges
- **Legacy Data Migration**: Translating over three decades of siloed, highly unstructured territory logs into a unified relational schema with zero record corruption or data loss.
- **Complex Workflows**: Orchestrating intricate assignment rules across 12 distinct international subsidiaries, each with unique compliance criteria and business hours.
- **Zero-Downtime Migration**: Transitioning live sales queues without a single dropped prospect.

## Technical Implementation
- **Cloud-Native Microservices**: Deployed on Kubernetes to isolate functional routing domains, eliminate single points of failure, and dynamically auto-scale with peak demand.
- **AI-Driven ETL Pipelines**: Applied machine learning algorithms to automatically validate, deduplicate, and verify millions of historical assignment records during ingestion.
- **Event-Driven Integration**: High-throughput Apache Kafka streaming bridge linking legacy CRM endpoints directly to the modern distribution engine in real time.

## Measurable Results
- **85% boost in core distribution efficiency** across subsidiaries.
- **Zero leads dropped or abandoned** during the entire global rollout.
- **3.6M+ historical records** migrated seamlessly.
      `,
    },
    create: {
      name: 'Spyglaz Distribution Engine',
      slug: 'spyglaz-distribution-engine',
      description: 'Enterprise AI distribution engine modernizing legacy assignment infrastructure through cloud-native microservices and intelligent queue orchestration.',
      techStack: ['React', 'Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/spyglaz-distribution-engine',
      imageUrl: '/projects/spyglaz-distribution-engine.jpg',
      content: `
## Overview
**Spyglaz Distribution Engine** is an enterprise-grade automated lead and account distribution platform built to orchestrate high-volume sales routing across multi-national enterprise subsidiaries.

## The Challenges
- **Legacy Data Migration**: Translating over three decades of siloed, highly unstructured territory logs into a unified relational schema with zero record corruption or data loss.
- **Complex Workflows**: Orchestrating intricate assignment rules across 12 distinct international subsidiaries, each with unique compliance criteria and business hours.
- **Zero-Downtime Migration**: Transitioning live sales queues without a single dropped prospect.

## Technical Implementation
- **Cloud-Native Microservices**: Deployed on Kubernetes to isolate functional routing domains, eliminate single points of failure, and dynamically auto-scale with peak demand.
- **AI-Driven ETL Pipelines**: Applied machine learning algorithms to automatically validate, deduplicate, and verify millions of historical assignment records during ingestion.
- **Event-Driven Integration**: High-throughput Apache Kafka streaming bridge linking legacy CRM endpoints directly to the modern distribution engine in real time.

## Measurable Results
- **85% boost in core distribution efficiency** across subsidiaries.
- **Zero leads dropped or abandoned** during the entire global rollout.
- **3.6M+ historical records** migrated seamlessly.
      `,
    },
  });

  // 6. Today Logistics
  await prisma.project.upsert({
    where: { slug: 'today-logistics' },
    update: {
      name: 'Today Logistics',
      description: 'Strategic supply chain and global freight orchestration platform delivering real-time cargo visibility, IoT telemetry, and automated compliance.',
      techStack: ['Next.js', 'PostgreSQL', 'Node.js', 'TailwindCSS', 'Docker'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/today-logistics',
      imageUrl: '/projects/today-logistics.jpg',
      content: `
## Overview
**Today Logistics** is an enterprise-grade logistics and global supply chain orchestration platform engineered to handle complex cross-continent freight tracking, maritime/air cargo management, and automated international compliance.

## The Challenges
- **Monolithic ERP Bottlenecks**: Constrained by a decade-old monolithic system that took hours to calculate consignment routes and inventory statuses.
- **Complex Approval Matrices**: Multi-tier customs and regulatory sign-offs varying across continents and regional jurisdictions.
- **IoT Hardware Integration**: Ingesting continuous GPS, temperature, and container status telemetry from legacy factory and vessel sensors without latency degradation.

## Architectural Architecture
- **Next.js Real-Time Logistics Cockpit**: High-density interactive freight maps and shipment status dashboards built with Next.js.
- **High-Throughput Ingestion**: Event-driven streaming layer processing thousands of sensor updates per minute into partitioned PostgreSQL tables.
- **Automated Compliance Verification**: Rule-based validation engine alerting dispatchers of regulatory bottlenecks or customs holds ahead of time.

## Measurable Results
- **80% efficiency improvement** across operational dispatch and tracking workflows.
- **Zero downtime** experienced during the global rollout.
- **5.2 Billion historical shipment records** migrated seamlessly.
      `,
    },
    create: {
      name: 'Today Logistics',
      slug: 'today-logistics',
      description: 'Strategic supply chain and global freight orchestration platform delivering real-time cargo visibility, IoT telemetry, and automated compliance.',
      techStack: ['Next.js', 'PostgreSQL', 'Node.js', 'TailwindCSS', 'Docker'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/today-logistics',
      imageUrl: '/projects/today-logistics.jpg',
      content: `
## Overview
**Today Logistics** is an enterprise-grade logistics and global supply chain orchestration platform engineered to handle complex cross-continent freight tracking, maritime/air cargo management, and automated international compliance.

## The Challenges
- **Monolithic ERP Bottlenecks**: Constrained by a decade-old monolithic system that took hours to calculate consignment routes and inventory statuses.
- **Complex Approval Matrices**: Multi-tier customs and regulatory sign-offs varying across continents and regional jurisdictions.
- **IoT Hardware Integration**: Ingesting continuous GPS, temperature, and container status telemetry from legacy factory and vessel sensors without latency degradation.

## Architectural Architecture
- **Next.js Real-Time Logistics Cockpit**: High-density interactive freight maps and shipment status dashboards built with Next.js.
- **High-Throughput Ingestion**: Event-driven streaming layer processing thousands of sensor updates per minute into partitioned PostgreSQL tables.
- **Automated Compliance Verification**: Rule-based validation engine alerting dispatchers of regulatory bottlenecks or customs holds ahead of time.

## Measurable Results
- **80% efficiency improvement** across operational dispatch and tracking workflows.
- **Zero downtime** experienced during the global rollout.
- **5.2 Billion historical shipment records** migrated seamlessly.
      `,
    },
  });

  // 7. Fotofinish
  await prisma.project.upsert({
    where: { slug: 'fotofinish' },
    update: {
      name: 'FotoFinish',
      description: 'Enterprise software for multi-site facility operators driving workforce accountability through photo validation of work execution.',
      techStack: ['Angular 15', 'Node.js', 'Redis', 'PostgreSQL', 'CSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/fotofinish',
      imageUrl: '/projects/fotofinish.jpg',
      content: `
## Overview
**FotoFinish** is an enterprise verification platform used by multi-site facility managers and service providers to drive on-the-ground workforce accountability through tamper-proof photographic proof of execution.

## The Problems
- **Inconsistent On-Site Media Management**: Cleaners and inspectors frequently operate in basements and remote zones with poor cellular reception, leading to lost time and unsubmitted records.
- **Disorganized Visual Trails**: Unstructured image uploads flooded email and messaging channels, making supervisor audits slow and painful.
- **Subjective Dispute Resolution**: Lack of structured, timestamped evidence caused friction between clients and operators over completed maintenance shifts.

## The Solution
- **Transparent Quality Proof**: Automated photographic audit trails with metadata verification replace subjective guesswork and build client trust.
- **Low-Connectivity Smart Sync**: Intelligent background asset caching holds media securely on device until reliable connectivity is restored.
- **Automated Supervisor Audits**: Organized inspection queues and instant notifications enable quick approvals and rapid dispute resolution.

## Measurable Results
- **100% visual proof coverage** across all managed facilities.
- **Zero missed task verifications** during nationwide multi-site rollout.
- Deployed across web and mobile platforms with high customer retention.
      `,
    },
    create: {
      name: 'FotoFinish',
      slug: 'fotofinish',
      description: 'Enterprise software for multi-site facility operators driving workforce accountability through photo validation of work execution.',
      techStack: ['Angular 15', 'Node.js', 'Redis', 'PostgreSQL', 'CSS'],
      githubLink: 'https://github.com/rajattripathi',
      liveLink: 'https://calidig.com/case-studies/fotofinish',
      imageUrl: '/projects/fotofinish.jpg',
      content: `
## Overview
**FotoFinish** is an enterprise verification platform used by multi-site facility managers and service providers to drive on-the-ground workforce accountability through tamper-proof photographic proof of execution.

## The Problems
- **Inconsistent On-Site Media Management**: Cleaners and inspectors frequently operate in basements and remote zones with poor cellular reception, leading to lost time and unsubmitted records.
- **Disorganized Visual Trails**: Unstructured image uploads flooded email and messaging channels, making supervisor audits slow and painful.
- **Subjective Dispute Resolution**: Lack of structured, timestamped evidence caused friction between clients and operators over completed maintenance shifts.

## The Solution
- **Transparent Quality Proof**: Automated photographic audit trails with metadata verification replace subjective guesswork and build client trust.
- **Low-Connectivity Smart Sync**: Intelligent background asset caching holds media securely on device until reliable connectivity is restored.
- **Automated Supervisor Audits**: Organized inspection queues and instant notifications enable quick approvals and rapid dispute resolution.

## Measurable Results
- **100% visual proof coverage** across all managed facilities.
- **Zero missed task verifications** during nationwide multi-site rollout.
- Deployed across web and mobile platforms with high customer retention.
      `,
    },
  });

  // SETTINGS
  await prisma.setting.upsert({
    where: { key: 'linkedinUrl' },
    update: { value: 'https://www.linkedin.com/in/rajat-tripathi-603b79108/' },
    create: { key: 'linkedinUrl', value: 'https://www.linkedin.com/in/rajat-tripathi-603b79108/' },
  });

  await prisma.setting.upsert({
    where: { key: 'nowStudyingText' },
    update: { value: 'Deep Learning & Neural Networks, LangChain & RAG, LLM Application Development' },
    create: { key: 'nowStudyingText', value: 'Deep Learning & Neural Networks, LangChain & RAG, LLM Application Development' },
  });

  console.log('Seeded successfully with all 7 Calidig case study projects!');
}

main().catch(console.error);
