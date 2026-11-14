import Image from "next/image";
import Link from "next/link";
import { disciplines } from "@/lib/services";
import { pageMetadata } from "@/lib/site";
import { Arrow, Button, ClosingCTA, Eyebrow, TextLink } from "@/components/ui";

export const metadata = pageMetadata(
  "Integrated Cybersecurity Services",
  "Vulnerability assessment and penetration testing, governance and risk, and security solutions for a connected view of cybersecurity.",
  "/",
);

const challenges = [
  ["01", "Unknown exposure", "Understand where systems, applications, and configurations may be exposed."],
  ["02", "Complex environments", "Bring cloud, network, application, and endpoint risks into view."],
  ["03", "Unclear priorities", "Connect technical findings with the decisions and work that matter."],
  ["04", "Fragmented ownership", "Clarify security responsibilities, policies, and oversight."],
  ["05", "Disconnected tools", "Make security platforms work within your operating environment."],
  ["06", "Changing requirements", "Build a practical response to evolving business and security needs."],
];
const environments = [
  ["Applications", "Web, mobile, and business applications", "web-application-penetration-testing"],
  ["Networks", "Internal, external, and wireless infrastructure", "network-penetration-testing"],
  ["Cloud", "Cloud configuration, access, and exposure", "cloud-security-assessment"],
  ["Endpoints", "Endpoint security coverage and deployment", "edr-xdr-deployment"],
  ["Email", "Email protection and impersonation controls", "email-security"],
  ["Security operations", "Visibility, events, and case workflows", "siem-solution-deployment"],
  ["Governance", "Policies, program structure, and ownership", "security-program-design"],
  ["Leadership", "Security reporting and informed oversight", "board-management-security-reporting"],
];
const principles = [
  ["01", "Context comes first", "We begin with the environment, objectives, and security questions that shape the work."],
  ["02", "Technical depth matters", "Testing and implementation should be grounded in the systems and controls in scope."],
  ["03", "Make findings understandable", "Clear language helps connect observations to business priorities and decisions."],
  ["04", "Recommendations should be practical", "The next steps should reflect what an organization can meaningfully address."],
  ["05", "Security is connected work", "Testing, governance, and technology are most useful when considered together."],
];

function AssuranceMap() {
  return (
    <div className="assurance-map" role="img" aria-label="Vigilix connects offensive security testing, governance, and defensive security solutions">
      <div className="assurance-map-head"><span>VIGILIX / SECURITY MODEL</span><span>01 — 03</span></div>
      <div className="assurance-map-graphic">
        <div className="assurance-lines" aria-hidden="true"><i/><i/><i/><i/><b/><b/></div>
        <div className="assurance-node attack"><span>01</span><strong>Identify</strong><small>Test exposure</small></div>
        <div className="assurance-node context"><span>02</span><strong>Understand</strong><small>Set direction</small></div>
        <div className="assurance-node defend"><span>03</span><strong>Strengthen</strong><small>Build resilience</small></div>
      </div>
      <div className="assurance-map-foot"><span>VAPT</span><span>GOVERNANCE</span><span>SECURITY SOLUTIONS</span></div>
    </div>
  );
}

function ServicePillars() {
  const images = ["/images/network.webp", null, "/images/infrastructure.webp"];
  const alts = ["Network connections representing assessment scope", "Abstract geometric security visual", "Enterprise infrastructure and data center systems"];
  return <div className="pillar-grid">{disciplines.map((d, index) => {
    const image = images[index];
    return <article key={d.id} className={`pillar-card ${d.tone}`}>
    <div className="pillar-photo">{image ? <Image src={image} alt={alts[index]} fill sizes="(max-width: 700px) 100vw, 33vw" /> : <div className="pillar-diagram" role="img" aria-label="Governance connects policy, accountable ownership, and oversight"><span>POLICY</span><i aria-hidden="true"/><span>OWNERSHIP</span><i aria-hidden="true"/><span>OVERSIGHT</span><b aria-hidden="true">GRC</b></div>}</div>
    <div className="pillar-body"><Eyebrow tone={d.tone}>{d.label}</Eyebrow><h3>{d.short}</h3><p>{d.description}</p>
      <ul>{d.services.slice(0, 3).map((s) => <li key={s.id}><Link href={`/services/${d.id}#${s.id}`}>{s.name}<Arrow diagonal /></Link></li>)}</ul>
      <TextLink href={`/services/${d.id}`}>Explore {d.short}</TextLink>
    </div>
  </article>;
  })}</div>;
}

function ChallengeMark({ index }: { index: number }) {
  return <span className={`challenge-mark mark-${index + 1}`} aria-hidden="true"><i/><i/><i/></span>;
}

export default function Home() {
  return <>
    <section className="home-hero"><div className="container hero-shell">
      <div className="hero-copy"><Eyebrow>INDEPENDENT CYBERSECURITY EXPERTISE</Eyebrow>
        <h1>One integrated<br/>cybersecurity<br/><span>approach.</span></h1>
        <p>Identify vulnerabilities. Strengthen defenses. Build resilience.</p>
        <div className="hero-actions"><Button href="/contact">Speak to an Expert</Button><TextLink href="/services">Explore Our Services</TextLink></div>
        <div className="hero-note"><span className="red-team"><strong>RED TEAM</strong> / TEST &amp; ASSESS</span><span className="blue-team"><strong>BLUE TEAM</strong> / DETECT &amp; DEFEND</span></div>
      </div><AssuranceMap />
    </div><div className="container hero-bottom"><span>Vulnerability testing&nbsp; · &nbsp;Governance&nbsp; · &nbsp;Security solutions</span><a href="#intro">A connected view <b>↓</b></a></div></section>

    <section className="intro-section" id="intro"><div className="container intro-split"><div><Eyebrow>SECURITY BUILT ON UNDERSTANDING</Eyebrow><h2>Security is more useful<br/>when it makes <em>sense.</em></h2></div><div className="intro-text"><p>Vigilix brings technical assessment, security governance, and technology implementation into one conversation. The aim is a clearer understanding of where you are and what to strengthen next.</p><TextLink href="/about">Get to know Vigilix</TextLink></div></div>
      <div className="container credential-row"><div><strong>03</strong><span>core disciplines</span></div><div><strong>15</strong><span>defined services</span></div><div><strong>01</strong><span>connected perspective</span></div><p>Offensive and defensive security capabilities, supported by governance and business context.</p></div></section>

    <section className="services-section"><div className="container"><div className="section-heading"><div><Eyebrow>OUR SERVICES</Eyebrow><h2>Three disciplines.<br/><em>One security picture.</em></h2></div><p>Engagements take shape around your environment, priorities, and scope. Explore a capability or speak with us about a specific question.</p></div><ServicePillars /></div></section>

    <section className="challenges-section"><div className="container"><div className="section-heading"><div><Eyebrow>SECURITY CHALLENGES</Eyebrow><h2>Risks we can help<br/>you <em>understand.</em></h2></div><p>Clearer security decisions start by understanding the conditions that make protection difficult.</p></div><div className="challenge-grid">{challenges.map(([number,title,copy],i)=><article className="challenge-card" key={number}><div className="challenge-top"><ChallengeMark index={i}/><span>{number} / 06</span></div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="scenarios-section"><div className="container"><div className="section-heading"><div><Eyebrow>CAPABILITY SCENARIOS</Eyebrow><h2>Security questions<br/>in a <em>real context.</em></h2></div><p>Illustrative situations show how Vigilix capabilities can support an assessment, a governance conversation, or a technology deployment.</p></div>
      <article className="scenario-feature"><div className="scenario-image"><Image src="/images/network.webp" alt="Abstract network infrastructure" fill sizes="(max-width:760px) 100vw, 50vw"/></div><div className="scenario-copy"><span className="scenario-tag">ILLUSTRATIVE SCENARIO / APPLICATION SECURITY</span><h3>When an application changes, its security assumptions should be revisited.</h3><p>A scoped assessment can examine access controls, session behavior, data handling, and business logic. Findings can then be considered alongside the application&apos;s role and the organization&apos;s priorities.</p><TextLink href="/services/vapt#web-application-penetration-testing">Explore application testing</TextLink></div></article>
      <div className="scenario-pair"><article><span>SCENARIO 02 / GOVERNANCE</span><h3>Security responsibilities are unclear.</h3><p>Program design can help define ownership, priorities, and a practical structure for oversight.</p><TextLink href="/services/grc#security-program-design">Explore security program design</TextLink></article><article><span>SCENARIO 03 / SECURITY OPERATIONS</span><h3>Security signals are spread across tools.</h3><p>A considered deployment connects relevant event sources, workflows, and reporting needs.</p><TextLink href="/services/security-solutions#siem-solution-deployment">Explore SIEM deployment</TextLink></article></div>
    </div></section>

    <section className="method-section"><div className="container method-shell"><div className="method-intro"><Eyebrow>HOW WE WORK</Eyebrow><h2>A thoughtful process<br/>for <em>meaningful progress.</em></h2><p>The work is shaped around agreed scope. Context and priorities guide each stage, from the first conversation to practical next steps.</p><TextLink href="/approach">Explore our approach</TextLink></div><div className="method-steps">{["Understand","Assess","Recommend","Strengthen"].map((step,i)=><article key={step}><span>0{i+1}</span><h3>{step}</h3><p>{["Your business, environment, and priorities.","The relevant exposure, needs, or requirements.","Clear findings connected to useful decisions.","Practical improvement aligned with the agreed scope."][i]}</p></article>)}</div><div className="method-footer"><span>VIGILIX / ENGAGEMENT FRAMEWORK</span><span>UNDERSTAND → ASSESS → RECOMMEND → STRENGTHEN</span></div></div></section>

    <section className="environment-section"><div className="container"><div className="section-heading"><div><Eyebrow>WHERE WE WORK</Eyebrow><h2>Security across<br/>your <em>environment.</em></h2></div><p>Choose an area to see relevant Vigilix services. The right scope depends on your systems, objectives, and operating context.</p></div><div className="environment-grid">{environments.map(([title,copy,id],i)=><Link className="environment-card" href={id.includes("policy")||id.includes("program")||id.includes("reporting")?`/services/grc#${id}`:id.includes("siem")||id.includes("edr")||id.includes("email")||id.includes("case")||id.includes("dashboards")?`/services/security-solutions#${id}`:`/services/vapt#${id}`} key={title}><div className={`environment-art art-${i+1}`} aria-hidden="true"><span>{String(i+1).padStart(2,"0")}</span><i/><b/><em/></div><span className="environment-count">ENVIRONMENT / 0{i+1}</span><h3>{title}</h3><p>{copy}</p><Arrow diagonal /></Link>)}</div></div></section>

    <section className="why-section"><div className="container why-grid"><div className="why-copy"><Eyebrow>WHY VIGILIX</Eyebrow><h2>Bring the right<br/>perspective to<br/><em>security.</em></h2><p>Cybersecurity involves technical detail and business choices. Vigilix works across the disciplines that connect them.</p><TextLink href="/about">More about Vigilix</TextLink></div><div className="why-list">{principles.map(([num,title,copy])=><article key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div><Arrow diagonal /></article>)}</div></div></section>

    <section className="about-feature"><div className="container about-feature-grid"><div className="about-feature-image"><Image src="/images/infrastructure.webp" alt="Data center infrastructure" fill sizes="(max-width:760px) 100vw, 50vw"/></div><div><Eyebrow>ABOUT VIGILIX</Eyebrow><h2>Technical detail.<br/><em>Business context.</em></h2><p>Vigilix provides vulnerability assessment and penetration testing, governance and risk consulting, and enterprise security solutions. We help organizations connect security questions to informed next steps.</p><div className="about-facts"><span>03 / DISCIPLINES</span><span>15 / SERVICES</span><span>ONE / PERSPECTIVE</span></div><TextLink href="/about">Learn about us</TextLink></div></div></section>

    <ClosingCTA />
  </>;
}
