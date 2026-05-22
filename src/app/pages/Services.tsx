import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudUpload, GitBranch, ShieldCheck, RotateCw, Brain, Cpu, Server, Cloud, Check, ArrowRight, ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';

const services = [
  {
    icon: CloudUpload,
    title: 'Cloud-Native Architecture',
    tagline: 'Built for scale, designed for resilience',
    description: 'Transform your infrastructure with Kubernetes-native platforms engineered for multi-cloud environments, automatic scaling, and cost optimization.',
    color: '#00D4FF',
    colorRgb: '0,212,255',
    details: [
      'Multi-cloud strategy and architecture design',
      'Kubernetes platform setup and optimization',
      'Microservices architecture and API gateway design',
      'Service mesh implementation (Istio, Linkerd)',
      'Container orchestration and runtime security',
      'Cloud cost optimization and FinOps',
      'Infrastructure as Code (Terraform, Crossplane)',
      'GitOps workflows and continuous delivery',
    ],
    useCases: [
      'E-commerce platform serving 10M+ users with 99.99% uptime',
      'Financial services migration to multi-cloud architecture',
      'Healthcare platform with HIPAA-compliant Kubernetes',
    ],
  },
  {
    icon: GitBranch,
    title: 'Platform Engineering',
    tagline: 'Developer productivity at enterprise scale',
    description: 'Build Internal Developer Platforms that provide golden paths, self-service infrastructure, and accelerate time-to-production.',
    color: '#7B2FFF',
    colorRgb: '123,47,255',
    details: [
      'Internal Developer Platform (IDP) design and implementation',
      'Self-service infrastructure provisioning',
      'CI/CD pipeline automation and optimization',
      'Golden path templates and guardrails',
      'Developer portal and documentation',
      'Platform observability and metrics',
      'Secret management and credential rotation',
      'Ephemeral environment management',
    ],
    useCases: [
      'Deployment time cut from weeks to hours for Fortune 100 retailer',
      'Self-service platform supporting 200+ development teams',
      'Automated compliance checks integrated into every pipeline',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Security & Observability',
    tagline: 'See everything, protect everything',
    description: 'Comprehensive security posture with full-stack observability, threat detection, and automated incident response powered by AI.',
    color: '#00C96B',
    colorRgb: '0,201,107',
    details: [
      'Zero-trust security architecture',
      'Runtime security with Falco and eBPF',
      'SIEM/SOAR integration and automation',
      'Distributed tracing (OpenTelemetry, Jaeger)',
      'Metrics and monitoring (Prometheus, Grafana)',
      'Log aggregation and analysis (Loki, ELK)',
      'AIOps and anomaly detection',
      'Security policy as code (OPA, Kyverno)',
    ],
    useCases: [
      'Detected and prevented security breach in under 2 minutes',
      'Reduced MTTR by 75% with AI-powered root cause analysis',
      'Real-time compliance monitoring across 50+ clusters',
    ],
  },
  {
    icon: RotateCw,
    title: 'Application Modernization',
    tagline: 'Legacy to cloud-native, seamlessly',
    description: 'Modernize monolithic applications into cloud-native microservices with zero-downtime migration strategies.',
    color: '#FF9D00',
    colorRgb: '255,157,0',
    details: [
      'Strangler pattern migration strategies',
      'Monolith to microservices decomposition',
      'API-first design and implementation',
      'Database modernization and migration',
      'Serverless architecture and FaaS',
      'Event-driven architecture design',
      'Legacy integration and API gateways',
      'Performance optimization and caching',
    ],
    useCases: [
      'Migrated 15-year-old monolith to microservices over 18 months',
      'Zero-downtime migration for mission-critical banking application',
      '10× performance improvement after modernization',
    ],
  },
  {
    icon: Brain,
    title: 'AI-Driven AIOps',
    tagline: 'Intelligence that never sleeps',
    description: 'Leverage machine learning and AI to automate operations, predict failures, and optimize infrastructure performance continuously.',
    color: '#FF2E88',
    colorRgb: '255,46,136',
    details: [
      'Anomaly detection and predictive analytics',
      'Automated incident response and remediation',
      'Capacity planning and resource optimization',
      'Intelligent alerting and noise reduction',
      'Root cause analysis automation',
      'Performance forecasting and trend analysis',
      'ChatOps and natural language operations',
      'ML model deployment and serving (MLOps)',
    ],
    useCases: [
      'Prevented 95% of outages through predictive maintenance',
      'Reduced alert noise by 80% with AI-powered correlation',
      'Automated 60% of L1/L2 support tickets',
    ],
  },
  {
    icon: Cpu,
    title: 'OT Observability',
    tagline: 'Edge to cloud visibility',
    description: 'Monitor and optimize operational technology, IoT devices, and edge infrastructure with real-time analytics and predictive intelligence.',
    color: '#00C9B1',
    colorRgb: '0,201,177',
    details: [
      'Edge computing platform design',
      'IoT device management and monitoring',
      'OT/IT convergence and integration',
      'Real-time data processing and analytics',
      'Predictive maintenance for industrial systems',
      'Edge ML inference and optimization',
      'Protocol translation and data normalization',
      'Time-series data storage and analysis',
    ],
    useCases: [
      'Real-time monitoring of 10,000+ industrial sensors',
      'Predictive maintenance reducing downtime by 40%',
      'Edge-to-cloud pipeline processing 1TB/day',
    ],
  },
  {
    icon: Server,
    title: 'Red Hat OpenShift',
    tagline: 'Enterprise Kubernetes on any cloud',
    description: 'Deploy and manage enterprise-grade Kubernetes with Red Hat OpenShift — a consistent, secure hybrid cloud platform from bare metal to multi-cloud.',
    color: '#EE0000',
    colorRgb: '238,0,0',
    details: [
      'OpenShift cluster deployment and lifecycle management',
      'RHEL and CoreOS hardened node configuration',
      'OpenShift Virtualization (KubeVirt) for VM workloads',
      'Operator Framework and OperatorHub integration',
      'OpenShift GitOps and Pipelines (Tekton/ArgoCD)',
      'Red Hat Advanced Cluster Management (ACM)',
      'RBAC, SCC, and Policy-as-Code enforcement',
      'On-prem, AWS ROSA, Azure ARO, and GCP support',
    ],
    useCases: [
      'Hybrid cloud platform unifying on-prem and public cloud for a global bank',
      'Migrated 300+ VMs to OpenShift Virtualization with zero downtime',
      'Compliance-ready deployment for a regulated healthcare provider',
    ],
  },
  {
    icon: Cloud,
    title: 'AWS Managed Services',
    tagline: 'Fully managed cloud ops at scale',
    description: 'End-to-end management of your AWS environment — from architecture and cost optimisation to 24/7 operations, security compliance, and continuous improvement.',
    color: '#FF9900',
    colorRgb: '255,153,0',
    details: [
      'AWS account governance, landing zones, and Control Tower',
      'EKS cluster management and Fargate workload optimisation',
      'Cost optimisation: Reserved Instances, Savings Plans, rightsizing',
      'AWS Security Hub, GuardDuty, and Config compliance',
      'Multi-region high-availability architecture design',
      'RDS, Aurora, and DynamoDB managed database services',
      'CloudFront CDN, WAF, and Shield DDoS protection',
      'AWS Well-Architected reviews and remediation',
    ],
    useCases: [
      'Reduced AWS spend by 42% through Reserved Instance optimisation',
      'Zero-downtime multi-region failover for a SaaS platform serving 5M users',
      'Achieved SOC 2 Type II compliance across a 40-account AWS Organisation',
    ],
  },
];

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--glass-border)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `rgba(${service.colorRgb},0.45)`;
        el.style.boxShadow = `0 0 40px rgba(${service.colorRgb},0.10), 0 8px 32px rgba(0,0,0,0.12)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--glass-border)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Colored top bar */}
      <div className="h-1 w-full flex-shrink-0" style={{ background: service.color }} />

      <div className="flex flex-col flex-1 p-7 gap-5">

        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: `rgba(${service.colorRgb},0.12)`,
              border: `1px solid rgba(${service.colorRgb},0.2)`,
            }}
          >
            <service.icon size={26} style={{ color: service.color }} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3
              className="font-bold leading-tight mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                color: 'var(--text-primary)',
              }}
            >
              {service.title}
            </h3>
            <p className="text-sm font-medium" style={{ color: service.color }}>
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {service.description}
        </p>

        {/* Deliverables — always visible, first 4; rest expand */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
            style={{ color: service.color, fontFamily: 'var(--font-display)' }}
          >
            What We Deliver
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {service.details.slice(0, 4).map((d, j) => (
              <div key={j} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                {d}
              </div>
            ))}
            <AnimatePresence initial={false}>
              {expanded &&
                service.details.slice(4).map((d, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-start gap-2 text-xs overflow-hidden"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                    {d}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          {service.details.length > 4 && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-1 mt-3 text-[11px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: service.color, fontFamily: 'var(--font-display)' }}
            >
              {expanded ? 'Show less' : `+${service.details.length - 4} more`}
              <ChevronDown
                size={12}
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </button>
          )}
        </div>

        {/* Success Stories */}
        <div
          className="rounded-xl p-4"
          style={{
            background: `rgba(${service.colorRgb},0.06)`,
            border: `1px solid rgba(${service.colorRgb},0.18)`,
          }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3"
            style={{ color: service.color, fontFamily: 'var(--font-display)' }}
          >
            Success Stories
          </p>
          <div className="space-y-2">
            {service.useCases.map((u, j) => (
              <div key={j} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                  style={{ background: service.color }}
                />
                {u}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              border: `1.5px solid rgba(${service.colorRgb},0.4)`,
              color: service.color,
              background: `rgba(${service.colorRgb},0.08)`,
              fontFamily: 'var(--font-display)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = `rgba(${service.colorRgb},0.18)`;
              el.style.borderColor = `rgba(${service.colorRgb},0.7)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = `rgba(${service.colorRgb},0.08)`;
              el.style.borderColor = `rgba(${service.colorRgb},0.4)`;
            }}
          >
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Corner glow on hover */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-36 h-36 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at bottom right, rgba(${service.colorRgb},0.10), transparent 70%)` }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <PageHero
        badge="WHAT WE BUILD"
        headline="Intelligent services,"
        headlineGradient="end to end."
        subtext="From cloud-native architecture to AI-driven operations — every capability your enterprise needs to scale with confidence."
        variant="services"
        badgeColor="#7B2FFF"
      />

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 border-t"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <div className="px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                background: 'rgba(123,47,255,0.08)',
                border: '1px solid rgba(123,47,255,0.25)',
                color: '#7B2FFF',
                fontFamily: 'var(--font-display)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#7B2FFF' }} />
              Let's Build Together
            </div>

            <h2
              className="font-bold mb-4 leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--text-primary)',
              }}
            >
              Ready to transform your infrastructure?
            </h2>
            <p
              className="text-lg mb-10"
              style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 2.5rem' }}
            >
              Let's discuss how our services can accelerate your cloud-native journey.
            </p>
            <button
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 0 36px rgba(123,47,255,0.28), 0 4px 28px rgba(0,212,255,0.18)',
              }}
            >
              Schedule a Consultation
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
