import { AgentType } from '../types';
import { Users, HelpCircle, BarChart, GraduationCap, UserPlus, LogOut, Search, Calendar, FileSearch, FileText, LineChart, FileEdit, BrainCircuit, File as FileReport } from 'lucide-react';

export const agents: AgentType[] = [
  // Employee Zone
  {
    id: 'hr-helpdesk',
    title: 'HR Helpdesk Agent',
    description: 'Answer FAQs and HR-related queries',
    icon: 'HelpCircle',
    category: 'employee',
    examplePrompt: 'What is the leave policy for maternity?',
    exampleResponse: 'Our company offers 26 weeks of paid maternity leave for employees who have worked at least 80 days in the 12 months preceding the expected delivery date. This policy is in compliance with the Maternity Benefit Act, 1961 (as amended).',
    status: 'online'
  },
  {
    id: 'performance-review',
    title: 'Performance Review',
    description: 'Assist in submitting and receiving feedback',
    icon: 'BarChart',
    category: 'employee',
    examplePrompt: 'Submit self-review for Q2',
    exampleResponse: 'Self-review for Q2 2025 submitted successfully. Your manager will be notified to complete their review by July 15, 2025.',
    status: 'online'
  },
  {
    id: 'employee-satisfaction',
    title: 'Employee Satisfaction Survey',
    description: 'Generate and analyze surveys',
    icon: 'Users',
    category: 'employee',
    examplePrompt: 'Show latest survey results',
    exampleResponse: 'Survey response rate: 78%, satisfaction score: 4.2/5. Top areas of improvement: career development opportunities, work-life balance.',
    status: 'online'
  },
  {
    id: 'learning-development',
    title: 'Learning & Development',
    description: 'Recommend courses and track progress',
    icon: 'GraduationCap',
    category: 'employee',
    examplePrompt: 'Recommend leadership courses',
    exampleResponse: 'Enroll in Leadership 101 - 87% course match based on your career path. Also recommended: Effective Communication (92% match) and Strategic Thinking (85% match).',
    status: 'maintenance'
  },
  {
    id: 'onboarding-assistant',
    title: 'Onboarding Assistant',
    description: 'Guide new hires through onboarding',
    icon: 'UserPlus',
    category: 'employee',
    examplePrompt: 'Show my onboarding progress',
    exampleResponse: 'Your Day 1 Checklist: 5 items remaining. Next actions: Complete IT security training, Submit personal documents for HR records.',
    status: 'online'
  },
  {
    id: 'exit-interview',
    title: 'Exit Interview',
    description: 'Conduct and summarize exit interviews',
    icon: 'LogOut',
    category: 'employee',
    examplePrompt: 'Schedule exit interview',
    exampleResponse: 'Exit interview scheduled for July 5, 2025 at 10:00 AM with HR representative Sarah Johnson. Top reasons for exit across company: Career growth (65%), Compensation (22%), Work environment (13%).',
    status: 'online'
  },
  
  // HR Zone
  {
    id: 'candidate-sourcing',
    title: 'Candidate Sourcing',
    description: 'Find candidates from job boards',
    icon: 'Search',
    category: 'hr',
    examplePrompt: 'Source candidates for Software Engineer role',
    exampleResponse: 'Sourced 150 candidates for Software Engineer role from LinkedIn, Indeed, and company careers page. 68 candidates match all required skills, 42 match experience level.',
    status: 'online'
  },
  {
    id: 'candidate-matching',
    title: 'Candidate Matching',
    description: 'Match resumes to job descriptions',
    icon: 'Users',
    category: 'hr',
    examplePrompt: 'Match Jane Doe resume to Data Analyst role',
    exampleResponse: 'Match score: Jane Doe - 92% fit for Data Analyst. Strengths: SQL (100%), Python (95%), Data Visualization (90%). Missing skills: Tableau (recommended training if hired).',
    status: 'online'
  },
  {
    id: 'interview-scheduler',
    title: 'Interview Scheduler',
    description: 'Coordinate interview logistics',
    icon: 'Calendar',
    category: 'hr',
    examplePrompt: 'Schedule interviews for Product Designer role',
    exampleResponse: 'Interviews scheduled for 12 candidates between June 10-15, 2025. Interview panel: Design Director, Product Manager, Senior Designer. Calendar invites sent to all participants.',
    status: 'maintenance'
  },
  {
    id: 'hr-document-search',
    title: 'HR Document Search',
    description: 'Search HR documents and templates',
    icon: 'FileSearch',
    category: 'hr',
    examplePrompt: 'Find remote work policy',
    exampleResponse: 'Found: "Remote Work Policy 2025" (Last updated: March 15, 2025). Document outlines eligible roles, equipment provisions, security protocols, and performance evaluation criteria for remote employees.',
    status: 'online'
  },
  {
    id: 'hr-policy-generator',
    title: 'HR Policy Generator',
    description: 'Auto-generate policy drafts',
    icon: 'FileText',
    category: 'hr',
    examplePrompt: 'Create flexi-time policy draft',
    exampleResponse: 'Flexi-Time Policy v1 ready for review. Generated based on industry best practices, legal compliance requirements, and company values. Key sections: Eligibility, Core Hours, Approval Process, Monitoring Mechanism.',
    status: 'online'
  },
  {
    id: 'hr-analytics',
    title: 'Self-Serve HR Analytics',
    description: 'Visualize HR KPIs',
    icon: 'LineChart',
    category: 'hr',
    examplePrompt: 'Show turnover rate for this quarter',
    exampleResponse: 'Turnover rate this quarter: 12% (↓2% QoQ). Engineering: 15%, Marketing: 10%, Sales: 14%, Product: 8%. Primary exit reasons: Career growth opportunities (45%), Compensation (30%).',
    status: 'online'
  },
  
  // Personal Agents
  {
    id: 'jd-creator',
    title: 'JD Creator',
    description: 'Draft job descriptions based on templates',
    icon: 'FileEdit',
    category: 'personal',
    examplePrompt: 'Create JD for Senior UX Designer',
    exampleResponse: 'JD created: Senior UX Designer. Includes sections for responsibilities, qualifications, benefits, and company culture. Based on standard template plus industry benchmarking for similar roles.',
    status: 'online'
  },
  {
    id: 'hiring-strategy',
    title: 'Hiring Strategy',
    description: 'Provide hiring insights and recommendations',
    icon: 'BrainCircuit',
    category: 'personal',
    examplePrompt: 'Optimize sourcing budget for engineering hires',
    exampleResponse: 'Optimize sourcing budget by 20% with LinkedIn priority. Analysis shows LinkedIn delivers 65% of qualified engineering candidates, while job boards account for only 15% of successful hires despite 35% of budget allocation.',
    status: 'online'
  },
  {
    id: 'report-generator',
    title: 'Report Generator',
    description: 'Automate HR reports and dashboards',
    icon: 'FileReport',
    category: 'personal',
    examplePrompt: 'Generate monthly hiring metrics',
    exampleResponse: 'Monthly Hiring Metrics generated. Key highlights: 35 new hires (↑15% MoM), average time-to-hire: 21 days (↓3 days MoM), offer acceptance rate: 82% (↑5% MoM), top hiring sources: Employee referrals (45%), LinkedIn (30%).',
    status: 'maintenance'
  }
];

export const getAgentIcon = (iconName: string) => {
  const icons = {
    Users,
    HelpCircle,
    BarChart,
    GraduationCap,
    UserPlus,
    LogOut,
    Search,
    Calendar,
    FileSearch,
    FileText,
    LineChart,
    FileEdit,
    BrainCircuit,
    FileReport
  };
  
  return icons[iconName as keyof typeof icons] || HelpCircle;
};

export const getAgentsByCategory = (category: 'employee' | 'hr' | 'personal') => {
  return agents.filter(agent => agent.category === category);
};