import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  User,
  Bot,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: Array<{ label: string; action: () => void }>;
}

export const SkillGapAI: React.FC = () => {
  const {
    employees,
    roles,
    topGaps,
    workforceReadiness,
    setSelectedEmployeeId,
    setActiveTab,
    setIsAssignTrainingOpen,
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Which skills are putting Engineering projects at risk?',
    'Who should receive Kubernetes training?',
    'What skills does Nishanth need for Senior Backend Engineer?',
    'Generate a 6-week AWS learning plan.',
    'Compare Engineering and DevOps skill readiness.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic smart response synthesis
    setTimeout(() => {
      let replyText = '';
      let replyActions: Array<{ label: string; action: () => void }> | undefined = undefined;

      const lower = promptText.toLowerCase();

      if (lower.includes('risk') || lower.includes('putting engineering')) {
        replyText = `Based on current Q3 diagnostics across 1,842 employees, the primary competencies creating delivery bottlenecks in Engineering are:

1. **Kubernetes (Critical Deficit -1.4 levels)**: 124 platform and backend engineers are operating below the Level 4 required benchmark. This directly slows the ECS-to-EKS container migration.
2. **Generative AI & LLMs (Critical Deficit -1.6 levels)**: 214 engineers across AI/ML and Product squads lack production fine-tuning (LoRA) and high-throughput vLLM serving expertise.
3. **AWS Architecture (High Deficit -1.3 levels)**: 89 engineers require remediation in VPC networking and multi-AZ database clustering.

Remediating these 3 skill areas will elevate overall workforce readiness from 76% to an estimated 84%.`;
        replyActions = [
          {
            label: 'View Critical Gaps Report',
            action: () => setActiveTab('reports'),
          },
          {
            label: 'Simulate 50 K8s Upskilling',
            action: () => setActiveTab('simulator'),
          },
        ];
      } else if (lower.includes('who should receive kubernetes') || lower.includes('kubernetes training')) {
        replyText = `Analyzing employee evaluation records for Kubernetes proficiency (Current < 3.0 vs Target ≥ 4.0):

Top prioritized candidates:
- **Nishanth B (Backend Engineer)**: Current 2.1/5.0 (Target 3.5). Key blocker for Senior Backend promotion.
- **Priya S (Cloud Engineer)**: Current 2.8/5.0 (Target 4.0). High AWS proficiency (4.6) makes her prime candidate for accelerated CKA.
- **Rahul V (DevOps Engineer)**: Current 2.9/5.0 (Target 4.5). Already at 75% course progress.
- **David K (Security Engineer)**: Current 2.7/5.0 (Target 4.0). Needed for container runtime admission security.

We recommend enrolling them in the upcoming 6-week "Kubernetes Fundamentals & Cluster Architecture" cohort.`;
        replyActions = [
          {
            label: 'Open Nishanth B Profile',
            action: () => {
              setSelectedEmployeeId('emp-1');
              setActiveTab('employees');
            },
          },
          {
            label: 'Assign Kubernetes Cohort',
            action: () => setIsAssignTrainingOpen(true),
          },
        ];
      } else if (lower.includes('nishanth') || lower.includes('senior backend engineer')) {
        replyText = `Here is the career progression assessment for **Nishanth B** towards **Senior Backend Engineer (IC4)**:

- **Current Overall Readiness**: 71% towards Senior benchmark (78% for Mid IC3).
- **Strengths**: Python (4.5/5), REST APIs (4.3/5), SQL (4.1/5).

**Missing Competencies Required for Promotion:**
1. **System Design (Critical)**: Needs to demonstrate distributed event streaming, Kafka partition models, and cache stampede mitigation.
2. **Kubernetes in Production (Critical)**: Current score is 2.1/5 vs required 4.0.
3. **AWS Architecture (Moderate)**: Current 2.7/5 vs required 4.0.
4. **Technical Leadership (Moderate)**: Needs to author at least 2 cross-team RFCs.

Recommended action: Complete the 6-week AWS & Kubernetes curriculum, which is projected to boost his promotion readiness from 71% to 88%.`;
        replyActions = [
          {
            label: 'Inspect Nishanth’s Full Profile',
            action: () => {
              setSelectedEmployeeId('emp-1');
              setActiveTab('employees');
            },
          },
          {
            label: 'Assign AWS Architecture Mastery',
            action: () => setIsAssignTrainingOpen(true),
          },
        ];
      } else if (lower.includes('6-week') || lower.includes('aws learning plan')) {
        replyText = `Here is the personalized 6-week AWS Cloud Architecture curriculum tailored for NexaTech microservices:

- **Week 1: AWS Fundamentals & Core VPC**: Subnets, route tables, security groups, and NAT gateways.
- **Week 2: IAM & Networking**: Cross-account role assumption, least-privilege policies, and KMS envelope encryption.
- **Week 3: EC2, S3 & Relational Databases**: Aurora PostgreSQL multi-AZ clustering, storage tiering, and connection pooling.
- **Week 4: Docker on AWS**: Container task definitions, ECS Fargate, and EKS pod networking.
- **Week 5: Cloud Architecture & Resilience**: Circuit breakers, distributed tracing with OpenTelemetry, and auto-healing.
- **Week 6: Production Capstone Project**: Zero-downtime blue/green deployment automated via Terraform.

Expected Skill Delta: +1.3 levels (from 2.7 to 4.0).`;
        replyActions = [
          {
            label: 'Apply Plan to Nishanth B',
            action: () => {
              setSelectedEmployeeId('emp-1');
              setActiveTab('employees');
            },
          },
        ];
      } else if (lower.includes('compare engineering and devops') || lower.includes('engineering and devops')) {
        replyText = `### Comparative Readiness: Engineering vs DevOps

- **Engineering Department**:
  - Headcount: 520 engineers
  - Overall Readiness: **82%** (Healthy)
  - Primary Strengths: Python (4.1/5), REST APIs (4.3/5), Testing (3.8/5)
  - Key Vulnerability: Cloud container deployment & distributed system design.

- **DevOps Department**:
  - Headcount: 282 engineers
  - Overall Readiness: **55%** (Critical Action Needed)
  - Primary Strengths: CI/CD automation (4.4/5), Terraform IaC (4.1/5)
  - Key Vulnerability: Kubernetes cluster administrative operations (etcd recovery, CNI Cilium) and OpenTelemetry instrumentation.

**Cross-Team Synergy**: Pairing DevOps engineers with Backend developers in dual-mentorship sprints can accelerate Kubernetes readiness 2.4x faster than isolated self-study.`;
        replyActions = [
          {
            label: 'View Department Breakdown',
            action: () => setActiveTab('overview'),
          },
        ];
      } else {
        replyText = `Analyzing NexaTech talent intelligence graph for "${promptText}"...

- **Workforce Readiness**: Currently at ${workforceReadiness}%.
- **Active Critical Gaps**: 17 identified across Cloud, AI/ML, and Security.
- **Key Recommendation**: Focus upskilling on Kubernetes and Generative AI foundation modeling to prevent scheduled delivery delays in Q4.`;
        replyActions = [
          {
            label: 'Open What-If Simulator',
            action: () => setActiveTab('simulator'),
          },
        ];
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: replyActions,
        },
      ]);
    }, 700);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto h-[calc(100vh-8.5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">SkillGap AI Assistant</h1>
            <p className="text-[11px] text-slate-500">
              Conversational talent intelligence grounded in NexaTech’s live competency database.
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        )}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="max-w-md">
              <h2 className="text-base font-bold text-slate-900">How can I assist your talent strategy?</h2>
              <p className="text-xs text-slate-500 mt-1">
                Ask about critical project risks, candidate selections for training cohorts, employee promotion
                gaps, or department readiness comparisons.
              </p>
            </div>

            {/* Suggested Prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl w-full text-left">
              {suggestedPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPrompt(p)}
                  className="p-3 bg-white hover:bg-indigo-50/40 border border-slate-200/80 hover:border-indigo-300 rounded-xl text-xs text-slate-700 transition-all shadow-2xs group flex items-start justify-between gap-2"
                >
                  <span className="leading-snug">{p}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line space-y-2">{msg.text}</div>

                {/* Optional embedded action buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                    {msg.actions.map((act, ai) => (
                      <button
                        key={ai}
                        onClick={act.action}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200/80"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 text-xs font-semibold">
                  SC
                </div>
              )}
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs shadow-2xs flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"
                style={{ animationDelay: '0.15s' }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"
                style={{ animationDelay: '0.3s' }}
              />
              <span className="ml-1 text-[11px]">SkillGap AI evaluating data...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(input);
        }}
        className="p-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask SkillGap AI about employee gaps, training, or career trajectories..."
          className="flex-1 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl disabled:opacity-30 transition-colors shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
