import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import aiRiskProfiles from "../../data/aiRiskProfiles.json";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I’m Nova, your personal assistant. Ask me to summarize, brainstorm, or draft something.",
  },
];

const companyInitialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I’m Company AI Assistant, your approved private workspace assistant. Ask me to summarize, brainstorm, or draft something.",
  },
];

const sensitiveDataRules = [
  {
    label: "National ID number",
    pattern: /\b(national id|identity card|ic number|nric|passport|ssn)\b|\b\d{6}-?\d{2}-?\d{4}\b|\b\d{3}-?\d{2}-?\d{4}\b/i,
  },
  {
    label: "Customer name",
    pattern: /\b(customer|client)\s*(name|:)|\b(customer|client)\s+(?:name\s*:?\s*)?[A-Z][a-z]+|\bname\s*:\s*[a-z]/,
  },
  {
    label: "Email address",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  },
  {
    label: "Credit card number",
    pattern: /\b(?:\d[ -]*?){13,16}\b/,
  },
];

function detectSensitiveData(prompt) {
  return sensitiveDataRules
    .filter(({ pattern }) => pattern.test(prompt))
    .map(({ label }) => label);
}

function redactSensitiveContent(content) {
  return content
    .replace(/\b\d{3}-?\d{2}-?\d{4}\b|\b\d{6}-?\d{2}-?\d{4}\b/g, "[NATIONAL ID NUMBER]")
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, "[CARD NUMBER]")
    .replace(/\b(Customer|Client)\s+(?:name\s*:?\s*)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g, "$1 [NAME]")
    .replace(/\b(confidential|password|api key)\s*[:=]?\s*\S+/gi, "$1 [REDACTED]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[EMAIL]");
}

function logActivityEvent({ action, risk, tool }) {
  const event = { action, risk, tool, timestamp: new Date().toISOString(), user: "Current user", department: "General" };
  const storedEvents = JSON.parse(window.localStorage.getItem("shadowseekActivityLog") || "[]");
  window.localStorage.setItem("shadowseekActivityLog", JSON.stringify([event, ...storedEvents].slice(0, 100)));
}

function getLiveRiskAssessment(profile, detectedCategories) {
  const contentRiskPoints = Math.min(detectedCategories.length, 3) * 15;
  const unapprovedContentPoints = profile.approval.status !== "APPROVED" && detectedCategories.length > 0 ? 10 : 0;
  const score = Math.min(100, profile.riskScore + contentRiskPoints + unapprovedContentPoints);
  const level = score >= 70 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";

  return { score, level };
}

function buildReply(prompt) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("summary")) {
    return "Here’s the short version: focus on the objective, list the key constraints, and finish with a clear next action.";
  }

  if (normalized.includes("brainstorm")) {
    return "A few starting ideas: create a quick prototype, collect feedback from a small group, and use what you learn to prioritize the next iteration.";
  }

  if (normalized.includes("draft") || normalized.includes("write")) {
    return "Draft: “Thanks for sharing the context. I’ll review the details and come back with a concise recommendation and next steps.”";
  }

if (normalized.includes("give me ideas for improving team productivity")) {
  return "Here are several ways to improve team productivity:\n\n" +
    "1. Set clear goals and priorities – Make sure everyone understands what needs to be accomplished and which tasks are most important.\n\n" +
    "2. Improve communication – Use clear communication channels and avoid unnecessary meetings.\n\n" +
    "3. Break large tasks into smaller steps – Smaller, manageable tasks make progress easier to track.\n\n" +
    "4. Use project management tools – Tools such as task boards and shared calendars can help track responsibilities and deadlines.\n\n" +
    "5. Reduce unnecessary meetings – Only hold meetings when discussion or collaboration is genuinely needed.\n\n" +
    "6. Encourage collaboration – Create an environment where team members can share ideas, ask questions, and support each other.\n\n" +
    "7. Review progress regularly – Short check-ins can help identify problems early.\n\n" +
    "Overall, teams can improve productivity through clear priorities, effective communication, good organization, and regular feedback.";
}

  return `I received “${prompt.trim()}”. This is a local scripted response, so no message is sent to an AI service.`;
}

function Avatar({ role }) {
  const isAssistant = role === "assistant";

  return (
    <div
      aria-hidden="true"
      className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${
        isAssistant
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-slate-200 text-slate-700"
      }`}
    >
      {isAssistant ? "N" : "You"}
    </div>
  );
}

function RiskProfileCard({ company = false, detectedCategories, isEvaluating, onClose, onOpenCompanyChat }) {
  const profileId = company ? "company-ai-assistant" : "nova-ai";
  const profile = aiRiskProfiles.profiles.find(({ id }) => id === profileId);
  const liveAssessment = getLiveRiskAssessment(profile, detectedCategories);
  const isLowRisk = liveAssessment.level === "LOW";
  const isMediumRisk = liveAssessment.level === "MEDIUM";
  const riskStyle = isLowRisk
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : isMediumRisk
      ? "border-amber-200 bg-amber-50 text-amber-700"
    : "border-rose-200 bg-rose-50 text-red-600";
  return (
    <aside
      aria-label="AI tool risk profile"
      className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] lg:max-w-87.5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Currently using
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className={`grid size-12 place-items-center rounded-xl border text-2xl ${isLowRisk ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-rose-200 bg-rose-50 text-rose-600"}`}>
              ✧
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{profile.toolName}</h2>
              <p className="text-sm text-slate-600">{profile.provider}</p>
            </div>
          </div>
        </div>
        <button
          aria-label="Hide AI tool risk profile"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <dl className="space-y-4 border-b border-slate-200 pb-6 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate-500">Status</dt>
          <dd className={`font-medium ${isLowRisk ? "text-emerald-700" : "text-red-600"}`}>{profile.approval.label}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate-500">Risk</dt>
          <dd className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${riskStyle}`}>
            <span className={`size-2 rounded-full ${isLowRisk ? "bg-emerald-500" : isMediumRisk ? "bg-amber-500" : "bg-red-500"}`} /> {liveAssessment.level}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="flex items-center gap-1.5 text-slate-500"><span className={`size-1.5 rounded-full bg-emerald-500 ${isEvaluating ? "animate-pulse" : ""}`} />Live risk assessment</dt>
          <dd aria-live="polite" className={`text-lg font-bold transition-colors duration-300 ${isLowRisk ? "text-emerald-700" : isMediumRisk ? "text-amber-700" : "text-rose-700"}`}>{liveAssessment.score} / 100</dd>
        </div>
      </dl>

      <ul className="space-y-3 border-b border-slate-200 py-6 text-sm text-slate-600">
        {profile.riskFactors.map((factor) => <li className="flex items-start gap-3" key={factor}><span className={`mt-1.5 size-2 shrink-0 rounded-full ${isLowRisk ? "bg-emerald-500" : "bg-rose-500"}`} />{factor}</li>)}
      </ul>

      <section className={`mt-4 rounded-xl border p-4 transition-colors duration-300 ${detectedCategories.length ? "border-rose-200 bg-rose-50/70" : "border-slate-200 bg-slate-50"}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unsafe Data Categories</p>
        {detectedCategories.length ? (
          <ul className="mt-2 space-y-1.5 text-sm text-rose-700">
            {detectedCategories.map((category) => <li className="flex items-center gap-2" key={category}><span aria-hidden="true">⚠</span> Detected: {category}</li>)}
          </ul>
        ) : <p className="mt-2 text-sm text-slate-600">No sensitive data detected in the current input.</p>}
      </section>

      {profile.recommendedAlternative && (
        <section className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
          <p className="text-sm font-medium text-emerald-700">Safer Alternative</p>
          <h3 className="mt-2 text-base font-bold text-slate-950">{profile.recommendedAlternative.toolName}</h3>
          <p className="mt-1 text-sm leading-5 text-slate-600">{profile.recommendedAlternative.description}</p>
        <button
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          onClick={onOpenCompanyChat}
          type="button"
        >
          Switch to Company AI Assistant <span aria-hidden="true">→</span>
        </button>
      </section>
      )}
    </aside>
  );
}

function SensitiveDataAlert({ categories, onCancel, onContinue, onRequestAccess, onSwitch, onUseRedacted, redactedPreview, toolName }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]">
      <section
        aria-describedby="sensitive-alert-description"
        aria-labelledby="sensitive-alert-title"
        aria-modal="true"
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-160 flex-col overflow-hidden rounded-2xl border border-rose-300 bg-white shadow-2xl"
        role="alertdialog"
      >
        <header className="border-b border-rose-200 bg-linear-to-br from-rose-50 to-white px-7 py-7">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">
              <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 3h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">Moment-of-use alert</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900" id="sensitive-alert-title">Sensitive Information Detected</h2>
              <p className="mt-2 text-base text-slate-500" id="sensitive-alert-description">Personal customer data was detected before it left your device.</p>
            </div>
            <button
              aria-label="Close sensitive data warning"
              className="ml-auto rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              onClick={onCancel}
              type="button"
            >
              <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </header>

        <div className="space-y-6 overflow-y-auto px-7 py-7">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Destination</p>
              <p className="mt-2 font-semibold text-slate-900">{toolName}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Risk level</p>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-red-600"><span className="size-2 rounded-full bg-red-500" /> HIGH</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Detected data</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => <span className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm text-rose-600" key={category}>{category}</span>)}
            </div>
          </div>

          <section className="rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-4">
            <p className="text-sm font-semibold text-rose-700">Potential Data Leakage Detected</p>
            <p className="mt-1 text-sm text-slate-600">Preview — Redacted Version:</p>
            <p className="mt-2 rounded-lg border border-rose-100 bg-white px-3 py-2 font-mono text-sm leading-6 text-slate-700">&quot;{redactedPreview}&quot;</p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <h3 className="font-semibold text-slate-800">Why this matters</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">This AI tool is not approved for handling personal customer data. Sending it may violate PDPA / GDPR and expose the company to regulatory action.</p>
          </section>

          <section className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50/70 px-4 py-4">
            <span aria-hidden="true" className="text-2xl text-emerald-600">✧</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800">Recommended Action</p>
              <p className="text-base text-slate-800">Use <strong>Company AI Assistant</strong> — same task, safely.</p>
            </div>
            <button className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" onClick={onSwitch} type="button">Switch <span aria-hidden="true">→</span></button>
          </section>

          <div className="flex flex-col gap-2 border-t border-slate-100 pt-6 sm:flex-row">
            <button className="rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" onClick={onUseRedacted} type="button">Use Redacted Version</button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={onContinue} type="button">Continue Anyway</button>
            <button className="rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" onClick={onRequestAccess} type="button">Request Approved Access</button>
          </div>
          <p className="text-center text-xs text-slate-500">You are trusted to make the right call. Every choice is logged for audit.</p>
        </div>
      </section>
    </div>
  );
}

export default function MockAIChat({ company = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const transferredPrompt = company ? location.state?.prompt : null;
  const [messages, setMessages] = useState(() => {
    const startingMessages = company ? companyInitialMessages : initialMessages;
    if (!transferredPrompt) return startingMessages;

    return [
      ...startingMessages,
      { id: 2, role: "user", content: transferredPrompt },
      {
        id: 3,
        role: "assistant",
        content: `Your prompt was safely routed to Company AI Assistant. ${buildReply(transferredPrompt)}`,
      },
    ];
  });
  const [draft, setDraft] = useState("");
  const [assessedDraft, setAssessedDraft] = useState("");
  const [isRiskProfileOpen, setIsRiskProfileOpen] = useState(true);
  const [sensitiveAlert, setSensitiveAlert] = useState(null);
  const [inlineNotice, setInlineNotice] = useState(null);
  const [actionNotice, setActionNotice] = useState("");
  const inputRef = useRef(null);
  const activeProfile = aiRiskProfiles.profiles.find(({ id }) => id === (company ? "company-ai-assistant" : "nova-ai"));
  const detectedCategories = detectSensitiveData(assessedDraft);
  const isAssessingDraft = draft !== assessedDraft;

  useEffect(() => {
    if (draft === assessedDraft) return undefined;

    const assessmentTimer = window.setTimeout(() => setAssessedDraft(draft), 500);
    return () => window.clearTimeout(assessmentTimer);
  }, [draft, assessedDraft]);

  useEffect(() => {
    if (!actionNotice) return undefined;

    const noticeTimer = window.setTimeout(() => setActionNotice(""), 3000);
    return () => window.clearTimeout(noticeTimer);
  }, [actionNotice]);

  function handlePaste(event) {
    const input = event.currentTarget;
    window.setTimeout(() => setAssessedDraft(input.value), 0);
  }

  function deliverMessage(content, toolName = "ChatGPT Free") {

    const userMessage = { id: Date.now(), role: "user", content };
    const assistantMessage = {
      id: Date.now() + 1,
      role: "assistant",
      content: toolName === "Company AI Assistant"
        ? `Your prompt was routed to Company AI Assistant. ${buildReply(content)}`
        : buildReply(content),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft("");
    inputRef.current?.focus();
  }

  function sendMessage(event) {
    event?.preventDefault();
    const content = draft.trim();
    if (!content) return;

    const categories = detectSensitiveData(content);
    const isApproved = activeProfile.approval.status === "APPROVED";
    const toolName = activeProfile.toolName;

    if (!isApproved && categories.length > 0) {
      setSensitiveAlert({ content, categories, redactedPreview: redactSensitiveContent(content) });
      return;
    }

    if (isApproved && categories.length > 0) {
      setInlineNotice(categories);
      logActivityEvent({ action: "sent", risk: "medium", tool: toolName });
    } else {
      logActivityEvent({ action: "sent", risk: "low", tool: toolName });
    }

    deliverMessage(content, toolName);
  }

  function closeSensitiveAlert() {
    setSensitiveAlert(null);
    inputRef.current?.focus();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <section className="relative flex h-[calc(100vh-3rem)] min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)] lg:h-180">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-600 font-bold text-white shadow-sm">
              {company ? "C" : "N"}
            </div>
            <div>
              <p className="text-base font-semibold">{company ? "Company AI Assistant" : "Nova AI"}</p>
              <p className="text-sm text-slate-500">{company ? "Private, approved workspace assistant" : "Generative AI"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isRiskProfileOpen && (
              <button
                aria-label="Show AI tool risk profile"
                aria-expanded="false"
                className={`grid size-9 place-items-center rounded-full border shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${company ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"}`}
                onClick={() => setIsRiskProfileOpen(true)}
                title="Show risk profile"
                type="button"
              >
                <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.4 3 7.7 7 10 4-2.3 7-5.6 7-10V6l-7-3Z" />
                  <path strokeLinecap="round" d="M12 8v4m0 3h.01" />
                </svg>
              </button>
            )}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-linear-to-b from-slate-50 to-white px-5 py-7 sm:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <article
                  className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                  key={message.id}
                >
                  <Avatar assistantInitial={company ? "C" : "N"} role={message.role} />
                  <div className={`max-w-[82%] sm:max-w-[72%] ${isUser ? "text-right" : ""}`}>
                    <p className="mb-1 px-1 text-xs font-medium text-slate-500">
                      {isUser ? "You" : "Nova AI"}
                    </p>
                    <div
                      className={`rounded-2xl px-4 py-3 text-left text-sm leading-6 shadow-sm whitespace-pre-line ${
                        isUser
                          ? "rounded-tr-sm bg-blue-600 text-white"
                          : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <footer className="border-t border-slate-200 bg-white px-5 py-4 sm:px-7 sm:py-5">
          <form className="mx-auto max-w-3xl" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="chat-prompt">
              Message {company ? "Company AI Assistant" : "Nova AI"}
            </label>
            {inlineNotice && (
              <div className="mb-3 flex items-start justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-3 text-sm text-blue-800">
                <p><span aria-hidden="true">ℹ️ </span>This message contains {inlineNotice.join(", ").toLowerCase()}. This tool is approved for business use — please ensure this is necessary.</p>
                <button aria-label="Dismiss data awareness notice" className="shrink-0 text-blue-500 hover:text-blue-800" onClick={() => setInlineNotice(null)} type="button">×</button>
              </div>
            )}
            <div className="flex items-end gap-3 rounded-2xl border  bg-white p-2 shadow-sm transition focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-blue-100">
              <textarea
                className="min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
                id="chat-prompt"
                onChange={(event) => {
                  setDraft(event.target.value);
                  setInlineNotice(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) sendMessage(event);
                }}
                placeholder={`Message ${company ? "Company AI Assistant" : "Nova AI"}…`}
                onPaste={handlePaste}
                ref={inputRef}
                rows="1"
                value={draft}
              />
              <button
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed "
                disabled={!draft.trim()}
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </footer>
        {isRiskProfileOpen && (
          <div className="absolute inset-x-3 top-20 bottom-3 z-20 overflow-y-auto pr-1 sm:right-5 sm:left-auto sm:w-87.5">
            <RiskProfileCard company={company} detectedCategories={detectedCategories} isEvaluating={isAssessingDraft} onClose={() => setIsRiskProfileOpen(false)} onOpenCompanyChat={() => navigate("/company-ai")} />
          </div>
        )}
        </section>
      </div>
      {actionNotice && (
        <div aria-live="polite" className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          {actionNotice}
        </div>
      )}
      {sensitiveAlert && (
        <SensitiveDataAlert
          categories={sensitiveAlert.categories}
          redactedPreview={sensitiveAlert.redactedPreview}
          toolName={activeProfile.toolName}
          onCancel={closeSensitiveAlert}
          onContinue={() => {
            logActivityEvent({ action: "sent", risk: "high", tool: activeProfile.toolName });
            deliverMessage(sensitiveAlert.content, activeProfile.toolName);
            setSensitiveAlert(null);
          }}
          onUseRedacted={() => {
            setDraft(sensitiveAlert.redactedPreview);
            setAssessedDraft(sensitiveAlert.redactedPreview);
            setSensitiveAlert(null);
            setActionNotice("Redacted version applied");
            window.setTimeout(() => inputRef.current?.focus(), 0);
          }}
          onRequestAccess={() => {
            setSensitiveAlert(null);
            logActivityEvent({ action: "approval requested", risk: "high", tool: activeProfile.toolName });
            setActionNotice("Approved access request recorded. Your draft has not been sent.");
          }}
          onSwitch={() => navigate("/company-ai", { state: { prompt: sensitiveAlert.content } })}
        />
      )}
    </main>
  );
}
