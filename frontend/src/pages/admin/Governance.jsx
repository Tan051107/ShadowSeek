import { Fragment, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SideNavigationBar from "../../components/SideNavigationBar";

const adoption = [
  { tool: "ChatGPT Free", value: 76, color: "bg-rose-500" },
  { tool: "Claude Free", value: 52, color: "bg-amber-500" },
  { tool: "Gemini", value: 39, color: "bg-blue-500" },
  { tool: "Microsoft Copilot", value: 88, color: "bg-emerald-500" },
];

const dashboardMetrics = {
  totalAiInteractions: 1245,
  approvedUsageRate: 82,
  flaggedRiskEvents: 45,
  selfResolvedRate: 87,
};

const riskTrend = [
  { week: "Week 1", high: 62, medium: 74, low: 128 },
  { week: "Week 2", high: 58, medium: 73, low: 130 },
  { week: "Week 3", high: 51, medium: 71, low: 132 },
  { week: "Week 4", high: 45, medium: 70, low: 135 },
];

const departments = [
    {
    name: "Finance",
    highRiskTools: ["ChatGPT Free", "Claude Free", "Gemini"],
    pendingRequests: ["Claude Free — requested by John, 5 days ago", "Gemini Advanced — requested by Elena, 4 days ago"],
    repeatIncidents: ["ChatGPT Free flagged 3× by Sarah this week", "Claude Free flagged 2× by John this month", "Gemini flagged 2× by Elena this month"],
    selfResolved: 1,
    topFactor: "Driven mainly by repeated use of unapproved high-risk tools by team members.",
  },
  {
    name: "Engineering",
    highRiskTools: ["ChatGPT Free", "Midjourney", "Perplexity"],
    pendingRequests: ["Claude Free — requested by Maya, 5 days ago", "GitHub Copilot — requested by Daniel, 4 days ago"],
    repeatIncidents: ["ChatGPT Free flagged 3× by Sarah this week", "Midjourney flagged 2× by Alex this month", "Perplexity flagged 2× by Maya this month"],
    selfResolved: 2,
    topFactor: "Driven mainly by several high-risk tools currently in active use.",
  },
  {
    name: "HR",
    highRiskTools: ["ChatGPT Free", "Claude Free"],
    pendingRequests: ["Otter AI — requested by Nina, 7 days ago", "Claude Free — requested by Marco, 5 days ago"],
    repeatIncidents: ["ChatGPT Free flagged 2× by Nina this week", "Otter AI flagged 2× by Nina this month", "Claude Free flagged 2× by Marco this month"],
    selfResolved: 2,
    topFactor: "Driven mainly by repeated unapproved-tool incidents awaiting review.",
  },
  {
    name: "Marketing",
    highRiskTools: ["Midjourney", "ChatGPT Free"],
    pendingRequests: ["Canva AI — requested by Priya, 6 days ago"],
    repeatIncidents: ["Midjourney flagged 3× by Jordan this week", "ChatGPT Free flagged 2× by Jordan this month", "Midjourney flagged 2× by Priya this month"],
    selfResolved: 2,
    topFactor: "Driven mainly by repeat use of unapproved creative AI tools.",
  },
];

function getRiskScore(department) {
  const highRiskPoints = Math.min(department.highRiskTools.length * 15, 45);
  const pendingPoints = department.pendingRequests.length * 10;
  const repeatPoints = department.repeatIncidents.length * 10;
  const selfResolvedPoints = department.selfResolved * 5;

  return highRiskPoints + pendingPoints + repeatPoints - selfResolvedPoints;
}

function factorHint(department) {
  const factors = [
    department.highRiskTools.length,
    department.pendingRequests.length,
    department.repeatIncidents.length,
    department.selfResolved,
  ].filter(Boolean).length;

  return `${factors} ${factors === 1 ? "factor" : "factors"}`;
}

function KpiCard({ label, value, accent, detail }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 size-2 rounded-full ${accent}`} />
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      {detail && <p className="mt-2 text-xs text-slate-500">{detail}</p>}
    </section>
  );
}

function PreventionHero({ preventedEvents, selfResolvedRate, flaggedRiskEvents }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-7 text-white shadow-sm sm:p-8 lg:col-span-5">
      <div className="absolute -right-8 -top-10 size-48 rounded-full border-[28px] border-white/10" />
      <div className="relative max-w-xl">
        <p className="text-sm font-semibold text-emerald-100">Positive compliance outcome</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"><span aria-hidden="true">🟢 </span>{preventedEvents} potential data leaks prevented this month</h2>
        <p className="mt-5 text-base leading-7 text-emerald-50"><strong className="font-bold text-white">{selfResolvedRate}% of flagged moments</strong> — employees chose the safe path on their own.</p>
        <p className="mt-5 text-xs font-medium text-emerald-100/80">Based on {flaggedRiskEvents} flagged risk events this month</p>
      </div>
    </section>
  );
}

function RiskTrend() {
  const current = riskTrend.at(-1);
  const firstHighRisk = riskTrend[0].high;
  const highRiskDelta = Math.round(((firstHighRisk - current.high) / firstHighRisk) * 100);
  const totalCurrentEvents = current.low + current.medium + current.high;
  const currentSplit = [
    { label: "Low", value: current.low, color: "bg-emerald-500" },
    { label: "Medium", value: current.medium, color: "bg-amber-500" },
    { label: "High", value: current.high, color: "bg-rose-500" },
  ];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Risk Trend</h2>
          <p className="mt-1 text-sm text-slate-500">Weekly risk events by assessed level</p>
        </div>
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">{dashboardMetrics.flaggedRiskEvents} flagged moments</span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">High Risk Events: <strong className="text-lg text-slate-900">{current.high}</strong> <span className="ml-1 font-semibold text-emerald-700">(↓{highRiskDelta}% vs. 4 weeks ago)</span></p>
        <div className="mt-3 h-56" aria-label="Risk event trend over four weeks">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTrend} margin={{ top: 22, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", borderColor: "#e2e8f0", fontSize: "0.75rem" }} />
              <ReferenceLine x="Week 2" stroke="#94a3b8" strokeDasharray="4 4" />
              <ReferenceDot x="Week 2" y={58} r={4} fill="#ffffff" stroke="#f43f5e" strokeWidth={2} label={{ value: "Warning system launched", position: "bottom", fill: "#64748b", fontSize: 10 }} />
              <Line type="monotone" dataKey="high" name="High Risk" stroke="#f43f5e" strokeWidth={3} dot={{ r: 3, fill: "#f43f5e" }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="medium" name="Medium Risk" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: "#f59e0b" }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="low" name="Low Risk" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: "#10b981" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="mb-2 flex items-center justify-between text-xs"><span className="font-semibold uppercase tracking-wide text-slate-500">Current split</span><span className="text-slate-500">Week 4</span></div>
        <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">
          {currentSplit.map(({ label, value, color }) => <div key={label} className={color} style={{ width: `${(value / totalCurrentEvents) * 100}%` }} title={`${label} Risk: ${value}`} />)}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-600">
          {currentSplit.map(({ label, value, color }) => <span key={label} className="flex items-center gap-1.5"><span className={`size-2 rounded-full ${color}`} />{label} {value}</span>)}
        </div>
      </div>
    </article>
  );
}

function ScoreBadge({ score }) {
  const style = score >= 80
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : score >= 70
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return <span className={`inline-flex min-w-12 justify-center rounded-full border px-2.5 py-1 text-sm font-bold ${style}`}>{score}</span>;
}

function getFactorPoints(department) {
  return {
    highRisk: Math.min(department.highRiskTools.length * 15, 45),
    pending: department.pendingRequests.length * 10,
    repeat: department.repeatIncidents.length * 10,
  };
}

function getScoreSummary(department) {
  const points = getFactorPoints(department);
  const [mainFactor] = Object.entries(points).sort(([, left], [, right]) => right - left);
  const leadIncident = department.repeatIncidents[0];

  if (mainFactor === "repeat") {
    return `Driven mainly by repeated unapproved-tool incidents, led by ${leadIncident}.`;
  }

  if (mainFactor === "pending") {
    return `Driven mainly by ${department.pendingRequests.length} overdue approval requests awaiting review.`;
  }

  return `Driven mainly by ${department.highRiskTools.length} high-risk tools in active use, including repeated flagged use of ${leadIncident.split(" flagged")[0]}.`;
}

function getOldestRequest(requests) {
  return requests.reduce((oldest, request) => {
    const age = Number(request.match(/(\d+) days ago/)?.[1] ?? 0);
    const oldestAge = Number(oldest.match(/(\d+) days ago/)?.[1] ?? 0);
    return age > oldestAge ? request : oldest;
  });
}

function CompactRiskFactor({ icon, title, example, positive = false }) {
  return (
    <div className={`rounded-lg border px-3.5 py-3 ${positive ? "border-emerald-100 bg-emerald-50/60" : "border-slate-100 bg-slate-50"}`}>
      <p className="flex items-start gap-2 text-sm font-semibold text-slate-800"><span aria-hidden="true">{icon}</span>{title}</p>
      {example && <p className="mt-1 truncate pl-6 text-xs text-slate-500">{example}</p>}
    </div>
  );
}

function FullRiskDetail({ department }) {
  return (
    <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
      <RiskDetailList title="High-risk tools in active use" items={department.highRiskTools} />
      <RiskDetailList title="Pending approval requests" items={department.pendingRequests} />
      <RiskDetailList title="Repeat unapproved-tool incidents" items={department.repeatIncidents} />
      <RiskDetailList title="Self-resolved events" items={[`${department.selfResolved} employees chose an approved alternative after a warning.`]} />
    </div>
  );
}

function RiskDetailList({ title, items }) {
  return <div className="rounded-lg border border-slate-100 bg-slate-50 p-3"><p className="font-semibold text-slate-700">{title}</p><ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">{items.map((item) => <li key={item}>→ {item}</li>)}</ul></div>;
}

function ScoreRule({ label, value }) {
  return <div className="flex items-center justify-between gap-4"><span>{label}</span><strong className="shrink-0 text-slate-800">{value}</strong></div>;
}

export default function Governance() {
  const [expandedDepartment, setExpandedDepartment] = useState(null);
  const preventedEvents = Math.round(dashboardMetrics.flaggedRiskEvents * (dashboardMetrics.selfResolvedRate / 100));
  const unapprovedUsageRate = 100 - dashboardMetrics.approvedUsageRate;

  const toggleDepartment = (name) => {
    setExpandedDepartment((current) => current === name ? null : name);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNavigationBar role="admin" />
      <main className="min-w-0 flex-1 bg-slate-50 px-4 py-7 text-slate-900 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">ShadowSeek</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Executive AI Risk Dashboard</h1>
            <p className="mt-2 text-slate-500">AI adoption, governance, and compliance performance at a glance.</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500" /> Current reporting period
          </span>
        </header>

        <section aria-label="Monthly AI governance summary">
          <p className="mb-4 rounded-xl border border-slate-200 bg-white px-5 py-4 text-lg font-normal leading-7 text-slate-700 shadow-sm sm:text-xl">
            This month: <strong className="font-semibold text-slate-900">{dashboardMetrics.totalAiInteractions.toLocaleString()} AI interactions</strong> — <strong className="font-semibold text-slate-900">{dashboardMetrics.selfResolvedRate}% of risky moments</strong> self-resolved without admin intervention.
          </p>
          <div className="grid gap-4 lg:grid-cols-10">
            <PreventionHero preventedEvents={preventedEvents} selfResolvedRate={dashboardMetrics.selfResolvedRate} flaggedRiskEvents={dashboardMetrics.flaggedRiskEvents} />
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-5">
              <KpiCard accent="bg-slate-300" label="Total AI Activities" value={dashboardMetrics.totalAiInteractions.toLocaleString()} detail="Across monitored AI tools" />
              <KpiCard accent="bg-slate-300" label="Approved AI Usage" value={`${dashboardMetrics.approvedUsageRate}%`} detail="Within policy-approved tools" />
              <KpiCard accent="bg-slate-300" label="Unapproved Usage" value={`${unapprovedUsageRate}%`} detail="Requires governance attention" />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">AI Tool Adoption</h2>
                <p className="mt-1 text-sm text-slate-500">Relative activity volume by AI tool</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{dashboardMetrics.flaggedRiskEvents} flagged moments</span>
            </div>
            <div className="mt-8 space-y-5">
              {adoption.map(({ tool, value, color }) => (
                <div key={tool}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-slate-700">{tool}</span>
                    <span className="font-bold text-slate-900">{value}%</span>
                  </div>
                  <div aria-label={`${tool}: ${value}% adoption`} className="h-3 overflow-hidden rounded-full bg-slate-100" role="img">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <RiskTrend />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-5">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">Department AI Risk</h2>
              <p className="mt-1 text-sm text-slate-500">Current risk score by department</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-6 py-3 font-semibold">Department</th><th className="px-6 py-3 text-right font-semibold">Risk Score</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {departments.map((department) => {
                    const score = getRiskScore(department);
                    const isExpanded = expandedDepartment === department.name;
                    const needsAttention = score >= 80;

                    return (
                      <Fragment key={department.name}>
                        <tr
                          className={`cursor-pointer border-l-4 transition-colors hover:bg-slate-50 focus-within:bg-slate-50 ${needsAttention ? "border-l-rose-500" : score >= 70 ? "border-l-amber-400" : "border-l-transparent"}`}
                          onClick={() => toggleDepartment(department.name)}
                        >
                          <td className="px-5 py-4">
                            <button
                              type="button"
                              className="flex w-full items-center gap-3 text-left"
                              aria-expanded={isExpanded}
                              aria-controls={`${department.name.toLowerCase()}-risk-detail`}
                            >
                              <span className={`grid size-6 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-transform ${isExpanded ? "rotate-90" : ""}`} aria-hidden="true">›</span>
                              <span>
                                <span className="block font-semibold text-slate-800">{department.name}</span>
                                <span className="mt-0.5 block text-xs font-medium text-slate-500">{factorHint(department)} contributing to this score</span>
                              </span>
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right"><ScoreBadge score={score} /></td>
                        </tr>
                        {isExpanded && (
                          <tr id={`${department.name.toLowerCase()}-risk-detail`}>
                            <td colSpan="2" className="bg-slate-50 px-5 py-5 sm:px-6">
                              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                  <span className="mt-1 text-xl" aria-hidden="true">{score >= 80 ? "🔴" : "⚠️"}</span>
                                  <div>
                                    <h3 className="text-xl font-bold tracking-tight text-slate-950">{department.name} — {score}/100</h3>
                                    <p className="mt-1.5 text-base font-semibold leading-6 text-slate-800">{getScoreSummary(department)}</p>
                                  </div>
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                  <CompactRiskFactor icon="🔴" title={`${department.highRiskTools.length} high-risk tools in use`} example={`${department.highRiskTools[0]}${department.highRiskTools.length > 1 ? `, +${department.highRiskTools.length - 1} more` : ""}`} />
                                  <CompactRiskFactor icon="⏳" title={`${department.pendingRequests.length} pending approvals`} example={`Oldest: ${getOldestRequest(department.pendingRequests).match(/\d+ days ago/)?.[0]}`} />
                                  <CompactRiskFactor icon="⚠️" title={`${department.repeatIncidents.length} repeat incidents`} example={department.repeatIncidents[0]} />
                                  <CompactRiskFactor icon="✅" title={`${department.selfResolved} self-resolved events`} positive />
                                </div>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                                  <details>
                                    <summary className="cursor-pointer list-none hover:text-slate-700">View full detail</summary>
                                    <FullRiskDetail department={department} />
                                  </details>
                                  <details>
                                    <summary className="cursor-pointer list-none hover:text-slate-700">How is this calculated?</summary>
                                    <div className="mt-3 w-full min-w-72 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 sm:min-w-96">
                                      <ScoreRule label="High-risk tool in active use" value="+15 each (max 45)" />
                                      <ScoreRule label="Pending approval over 3 days old" value="+10 each" />
                                      <ScoreRule label="Repeat incident (same person/tool)" value="+10 each" />
                                      <ScoreRule label="Self-resolved event" value="−5 each (reduces score)" />
                                    </div>
                                  </details>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </article>

        </section>
      </div>
      </main>
    </div>
  );
}
