import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I’m Nova, your local demo assistant. Ask me to summarize, brainstorm, or draft something.",
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
    pattern: /\b(national id|identity card|ic number|nric|passport|ssn)\b|\b\d{6}-?\d{2}-?\d{4}\b/i,
  },
  {
    label: "Customer name",
    pattern: /\b(customer|client)\s*(name|:)|\bname\s*:\s*[a-z]/i,
  },
  {
    label: "Email address",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  },
];

function detectSensitiveData(prompt) {
  return sensitiveDataRules
    .filter(({ pattern }) => pattern.test(prompt))
    .map(({ label }) => label);
}

function buildReply(prompt) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("summary")) {
    return "Here’s the short version: focus on the objective, list the key constraints, and finish with a clear next action.";
  }

  if (normalized.includes("brainstorm") || normalized.includes("idea")) {
    return "A few starting ideas: create a quick prototype, collect feedback from a small group, and use what you learn to prioritize the next iteration.";
  }

  if (normalized.includes("draft") || normalized.includes("write")) {
    return "Draft: “Thanks for sharing the context. I’ll review the details and come back with a concise recommendation and next steps.”";
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

function RiskProfileCard({ company = false, onClose }) {
  const profile = company
    ? {
        name: "Company AI Assistant",
        provider: "ShadowSeek",
        status: "Approved",
        risk: "LOW",
        score: "12 / 100",
        concernOne: "Enterprise privacy agreement",
        concernTwo: "Does not train on company data",
      }
    : {
        name: "ChatGPT Free",
        provider: "OpenAI",
        status: "Unapproved",
        risk: "HIGH",
        score: "82 / 100",
        concernOne: "No enterprise agreement",
        concernTwo: "Data may train models",
      };
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
            <div className="grid size-12 place-items-center rounded-xl border border-rose-200 bg-rose-50 text-2xl text-rose-600">
              ✧
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{profile.name}</h2>
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
          <dd className={`font-medium ${company ? "text-emerald-700" : "text-red-600"}`}>{profile.status}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate-500">Risk</dt>
          <dd className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${company ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-red-600"}`}>
            <span className={`size-2 rounded-full ${company ? "bg-emerald-500" : "bg-red-500"}`} /> {profile.risk}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-slate-500">Risk Score</dt>
          <dd className="text-lg font-bold text-slate-950">{profile.score}</dd>
        </div>
      </dl>

      <ul className="space-y-3 border-b border-slate-200 py-6 text-sm text-slate-600">
        <li className="flex items-center gap-3">
          <svg aria-hidden="true" className="size-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path strokeLinecap="round" d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {profile.concernOne}
        </li>
        <li className="flex items-center gap-3">
          <svg aria-hidden="true" className="size-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.4 3 7.7 7 10 4-2.3 7-5.6 7-10V6l-7-3Z" />
            <path strokeLinecap="round" d="M12 8v4m0 3h.01" />
          </svg>
          {profile.concernTwo}
        </li>
      </ul>

      <section className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
        <p className="text-sm font-medium text-emerald-700">{company ? "Approved for sensitive work" : "Safer Alternative"}</p>
        <h3 className="mt-2 text-base font-bold text-slate-950">{company ? "Private and enterprise-approved" : "Company AI Assistant"}</h3>
        <p className="mt-1 text-sm leading-5 text-slate-600">Private, audited, enterprise-approved.</p>
      </section>
    </aside>
  );
}

function SensitiveDataAlert({ categories, onCancel, onContinue, onRequestAccess, onSwitch }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]">
      <section
        aria-describedby="sensitive-alert-description"
        aria-labelledby="sensitive-alert-title"
        aria-modal="true"
        className="w-full max-w-160 overflow-hidden rounded-2xl border border-rose-300 bg-white shadow-2xl"
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
          </div>
        </header>

        <div className="space-y-6 px-7 py-7">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Destination</p>
              <p className="mt-2 font-semibold text-slate-900">ChatGPT Free</p>
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
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={onCancel} type="button">Cancel</button>
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
  const [isRiskProfileOpen, setIsRiskProfileOpen] = useState(true);
  const [sensitiveAlert, setSensitiveAlert] = useState(null);
  const [actionNotice, setActionNotice] = useState("");
  const inputRef = useRef(null);
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
    if (!company && categories.length > 0) {
      setSensitiveAlert({ content, categories });
      return;
    }

    deliverMessage(content);
  }

  function closeSensitiveAlert() {
    setSensitiveAlert(null);
    inputRef.current?.focus();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <section className="relative flex min-h-[calc(100vh-3rem)] flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.35)] lg:min-h-180">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-600 font-bold text-white shadow-sm">
              {company ? "C" : "N"}
            </div>
            <div>
              <p className="text-base font-semibold">{company ? "Company AI Assistant" : "Nova AI"}</p>
              <p className="text-sm text-slate-500">{company ? "Private, approved workspace assistant" : "Local generative AI demo"}</p>
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
            <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
              <span className="size-2 rounded-full bg-emerald-500" />
              Mock mode
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-linear-to-b from-slate-50 to-white px-5 py-7 sm:px-10">
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
                      className={`rounded-2xl px-4 py-3 text-left text-sm leading-6 shadow-sm ${
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
            <div className="flex items-end gap-3 rounded-2xl border  bg-white p-2 shadow-sm transition focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-blue-100">
              <textarea
                className="min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
                id="chat-prompt"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) sendMessage(event);
                }}
                placeholder={`Message ${company ? "Company AI Assistant" : "Nova AI"}…`}
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
          <div className="absolute inset-x-3 top-20 z-20 sm:right-5 sm:left-auto">
            <RiskProfileCard company={company} onClose={() => setIsRiskProfileOpen(false)} />
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
          onCancel={closeSensitiveAlert}
          onContinue={() => {
            deliverMessage(sensitiveAlert.content);
            setSensitiveAlert(null);
          }}
          onRequestAccess={() => {
            setSensitiveAlert(null);
            setActionNotice("Approved access request recorded. Your draft has not been sent.");
          }}
          onSwitch={() => navigate("/company-ai", { state: { prompt: sensitiveAlert.content } })}
        />
      )}
    </main>
  );
}
