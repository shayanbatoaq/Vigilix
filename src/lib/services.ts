export type Service = {
  id: string;
  name: string;
  summary: string;
  challenge: string;
  focus: string[];
};
export type Discipline = {
  id: string;
  name: string;
  short: string;
  label: string;
  tone: "red" | "neutral" | "blue";
  headline: string;
  description: string;
  services: Service[];
};

export const disciplines: Discipline[] = [
  {
    id: "vapt",
    name: "Vulnerability Assessment & Penetration Testing",
    short: "VAPT",
    label: "Find the exposure",
    tone: "red",
    headline: "Find the weakness. Understand the risk.",
    description:
      "Understand how your systems could be exposed, what those weaknesses mean for your business, and where remediation should begin.",
    services: [
      {
        id: "network-penetration-testing",
        name: "Network Penetration Testing",
        summary:
          "Examine network services, access boundaries, and potential attack paths across your agreed infrastructure scope.",
        challenge:
          "A single exposed service or overly permissive connection can create a route to systems that were assumed to be isolated. Network testing helps put those relationships into context.",
        focus: [
          "External and internal network exposure",
          "Segmentation and access boundaries",
          "Configuration weaknesses and potential attack paths",
        ],
      },
      {
        id: "web-application-penetration-testing",
        name: "Web Application Penetration Testing",
        summary:
          "Explore weaknesses in web applications, from authentication and session handling to authorization and business logic.",
        challenge:
          "Applications connect users to sensitive functions and data. A feature that works as intended for one user may still allow another user to access information or actions they should not.",
        focus: [
          "Authentication and session behavior",
          "Authorization and access to sensitive data",
          "Input handling and business logic",
        ],
      },
      {
        id: "mobile-application-testing",
        name: "Mobile Application Testing",
        summary:
          "Assess the security of mobile applications and the way they store information, communicate, and interact with the device.",
        challenge:
          "Mobile software operates beyond a controlled corporate network. Local data, platform permissions, and client-server interactions each introduce different security questions.",
        focus: [
          "Local storage and sensitive information",
          "Network communication and session handling",
          "Platform interaction and application configuration",
        ],
      },
      {
        id: "api-security-testing",
        name: "API Security Testing",
        summary:
          "Assess how APIs authenticate requests, enforce permissions, handle input, and expose business functionality.",
        challenge:
          "An API can return technically valid responses while revealing another account’s records or allowing unintended operations. Testing needs to consider who can do what, and to which objects.",
        focus: [
          "Object and function-level authorization",
          "Token handling and authentication",
          "Input validation and resource-use controls",
        ],
      },
      {
        id: "cloud-security-assessment",
        name: "Cloud Security Assessment",
        summary:
          "Examine cloud configuration and access design to understand where identities, services, or data may be unnecessarily exposed.",
        challenge:
          "Cloud environments change quickly. Broad permissions, public resources, and inconsistent configuration can make it difficult to understand the real boundary of your environment.",
        focus: [
          "Identity permissions and access relationships",
          "Resource exposure and configuration",
          "Logging, visibility, and security controls",
        ],
      },
      {
        id: "wireless-security-testing",
        name: "Wireless Security Testing",
        summary:
          "Review wireless access controls and network separation across the wireless environment included in the engagement.",
        challenge:
          "Wireless access extends beyond a physical network port. Authentication choices and the separation of guest and corporate traffic influence what an unauthorized connection could reach.",
        focus: [
          "Wireless authentication and encryption",
          "Guest and corporate network separation",
          "Access-point configuration and exposure",
        ],
      },
      {
        id: "vulnerability-assessment-scanning",
        name: "Vulnerability Assessment & Scanning",
        summary:
          "Identify known weaknesses across agreed assets and organize findings into a practical view of exposure and remediation priorities.",
        challenge:
          "A long list of scanner findings is not the same as a clear view of risk. Asset context and the significance of each weakness help determine what deserves attention first.",
        focus: [
          "Asset scope and known vulnerability detection",
          "Configuration findings and risk context",
          "Prioritization of remediation activities",
        ],
      },
    ],
  },
  {
    id: "grc",
    name: "Governance, Risk & Compliance",
    short: "GRC",
    label: "Create the clarity",
    tone: "neutral",
    headline: "Better governance. Better security decisions.",
    description:
      "Connect security priorities with business responsibilities. Create the policies, program structure, and reporting that help leadership make informed decisions.",
    services: [
      {
        id: "information-security-policy-development",
        name: "Information Security Policy Development",
        summary:
          "Develop security policies that define expectations, responsibilities, and the principles guiding information protection.",
        challenge:
          "Security expectations are difficult to apply consistently when they live in unwritten assumptions. A coherent policy foundation helps teams understand the decisions and responsibilities expected of them.",
        focus: [
          "Policy objectives and organizational context",
          "Ownership, responsibilities, and applicability",
          "Clear guidance for review and communication",
        ],
      },
      {
        id: "security-program-design",
        name: "Security Program Design",
        summary:
          "Shape a structured security program around the organization’s priorities, operating environment, and ability to implement change.",
        challenge:
          "Individual tools and projects can leave important responsibilities disconnected. Program design brings priorities, ownership, and improvement activities into a more coherent structure.",
        focus: [
          "Business objectives and security priorities",
          "Program structure and accountable ownership",
          "A practical sequence for improvement",
        ],
      },
      {
        id: "board-management-security-reporting",
        name: "Board/Management Security Reporting",
        summary:
          "Translate technical security information into clear reporting for leadership oversight and decisions.",
        challenge:
          "Technical detail alone rarely explains what leadership needs to decide. Reporting should connect exposure and progress to business consequences, priorities, and the decisions requiring attention.",
        focus: [
          "Business-relevant security narratives",
          "Meaningful indicators and reporting structure",
          "Decisions, ownership, and improvement priorities",
        ],
      },
    ],
  },
  {
    id: "security-solutions",
    name: "Security Solutions & Deployment",
    short: "Security Solutions",
    label: "Strengthen the defense",
    tone: "blue",
    headline: "Make your security technology work together.",
    description:
      "Deploy and integrate enterprise security technologies that improve visibility, protect endpoints, and support more effective security workflows.",
    services: [
      {
        id: "siem-solution-deployment",
        name: "SIEM Solution Deployment",
        summary:
          "Implement security information and event management technology to bring relevant event sources into a more coherent analysis environment.",
        challenge:
          "Security events spread across disconnected systems can be difficult to interpret. A considered SIEM deployment connects relevant sources and supports useful correlation and investigation.",
        focus: [
          "Event-source planning and ingestion",
          "Parsing, correlation, and use-case configuration",
          "Access, retention, and operational handover considerations",
        ],
      },
      {
        id: "edr-xdr-deployment",
        name: "EDR/XDR Deployment",
        summary:
          "Deploy endpoint detection and response or extended detection and response tooling within the agreed technology environment.",
        challenge:
          "Protection depends on more than installing an agent. Coverage, policy configuration, integration, and operational ownership affect how effectively endpoint security technology can be used.",
        focus: [
          "Deployment planning and coverage",
          "Protection policies and integration",
          "Operational readiness and administration",
        ],
      },
      {
        id: "email-security",
        name: "Email Security",
        summary:
          "Implement email security controls to help address malicious messages, impersonation, and unsafe email content.",
        challenge:
          "Email connects people to content and requests from outside the organization. Security configuration needs to consider both inbound threats and the impact of controls on legitimate communication.",
        focus: [
          "Mail-flow and security configuration",
          "Filtering and impersonation controls",
          "Policy tuning and administration",
        ],
      },
      {
        id: "case-management-deployment",
        name: "Case Management Deployment",
        summary:
          "Deploy case management technology to organize security work, track ownership, and preserve the context of an investigation.",
        challenge:
          "Scattered tickets and disconnected notes make security work harder to coordinate. A structured case workflow helps teams understand what is being handled, by whom, and what happens next.",
        focus: [
          "Case lifecycle and workflow configuration",
          "Ownership, access, and collaboration",
          "Integration with relevant security tools",
        ],
      },
      {
        id: "dashboards-reports",
        name: "Dashboards & Reports",
        summary:
          "Develop dashboards and reports that make security information useful to the people who need to act on it.",
        challenge:
          "A dashboard can contain many charts without answering a useful question. Reporting should begin with the audience, the available data, and the actions that information needs to support.",
        focus: [
          "Audience and decision requirements",
          "Relevant data sources and visual structure",
          "Operational views and reporting outputs",
        ],
      },
    ],
  },
];

export const approach = [
  {
    title: "Understand",
    text: "Start with the business context, the environment, and the security questions that matter.",
  },
  {
    title: "Assess",
    text: "Examine the relevant exposure, governance needs, or technology requirements.",
  },
  {
    title: "Recommend",
    text: "Connect observations with practical priorities and informed decisions.",
  },
  {
    title: "Strengthen",
    text: "Focus the next steps on meaningful improvements to your security posture.",
  },
];
