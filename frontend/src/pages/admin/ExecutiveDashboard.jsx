const adoption = [
  { tool: "ChatGPT Free", value: 76, color: "bg-rose-500" },
  { tool: "Claude Free", value: 52, color: "bg-amber-500" },
  { tool: "Gemini", value: 39, color: "bg-blue-500" },
  { tool: "Microsoft Copilot", value: 88, color: "bg-emerald-500" },
];

const departments = [
  { name: "Engineering", score: 85 },
  { name: "Marketing", score: 60 },
  { name: "Finance", score: 90 },
  { name: "HR", score: 70 },
];

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

function ScoreBadge({ score }) {
  const style = score >= 80
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : score >= 70
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return <span className={`inline-flex min-w-12 justify-center rounded-full border px-2.5 py-1 text-sm font-bold ${style}`}>{score}</span>;
}

export default function ExecutiveDashboard() {
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

        <section aria-label="Key performance indicators" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard accent="bg-blue-500" label="Total AI Activities" value="1,245" detail="Across monitored AI tools" />
          <KpiCard accent="bg-emerald-500" label="Approved AI Usage" value="82%" detail="Within policy-approved tools" />
          <KpiCard accent="bg-rose-500" label="Unapproved Usage" value="18%" detail="Requires governance attention" />
          <KpiCard accent="bg-amber-500" label="Risk Events Detected" value="45" detail="Moment-of-use warnings issued" />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">AI Tool Adoption</h2>
                <p className="mt-1 text-sm text-slate-500">Relative activity volume by AI tool</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">Activities</span>
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

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">Risk Distribution</h2>
            <p className="mt-1 text-sm text-slate-500">AI activity by assessed risk level</p>
            <div className="mt-7 flex flex-col items-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
              <div aria-label="Risk distribution: 54 percent low, 28 percent medium, 18 percent high" className="size-40 shrink-0 rounded-full" role="img" style={{ background: "conic-gradient(#10b981 0 54%, #f59e0b 54% 82%, #f43f5e 82% 100%)" }}>
                <div className="m-5 grid size-[120px] place-items-center rounded-full bg-white text-center">
                  <span className="text-xs font-medium text-slate-500">Risk<br />events</span>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between gap-8"><span className="flex items-center gap-2 text-slate-600"><span className="size-3 rounded-full bg-emerald-500" />Low Risk</span><strong>54%</strong></li>
                <li className="flex items-center justify-between gap-8"><span className="flex items-center gap-2 text-slate-600"><span className="size-3 rounded-full bg-amber-500" />Medium Risk</span><strong>28%</strong></li>
                <li className="flex items-center justify-between gap-8"><span className="flex items-center gap-2 text-slate-600"><span className="size-3 rounded-full bg-rose-500" />High Risk</span><strong>18%</strong></li>
              </ul>
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
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
                  {departments.map(({ name, score }) => <tr key={name}><td className="px-6 py-4 font-medium text-slate-800">{name}</td><td className="px-6 py-4 text-right"><ScoreBadge score={score} /></td></tr>)}
                </tbody>
              </table>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-sm lg:col-span-2">
            <div className="absolute -right-10 -top-10 size-40 rounded-full border-[24px] border-white/10" />
            <p className="relative text-sm font-semibold text-emerald-100">Positive compliance metric</p>
            <h2 className="relative mt-3 max-w-xs text-xl font-bold">Self-Resolved Risk Events</h2>
            <p className="relative mt-4 text-6xl font-bold tracking-tight">87%</p>
            <p className="relative mt-4 max-w-sm text-sm leading-6 text-emerald-50">Employees chose approved alternatives after warnings.</p>
          </article>
        </section>
      </div>
      </main>
    </div>
  );
}
import SideNavigationBar from "../../components/SideNavigationBar";
