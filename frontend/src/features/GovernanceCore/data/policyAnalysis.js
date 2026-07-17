export const governanceData = {
  kpi: {
    totalRules: 24,
    rulesTrend: "+2",
    totalRequests: "12,450",
    requestsTrend: "+14%",
    policyViolations: "1,245",
    violationsTrend: "-8%",
    complianceScore: 92,
    scoreTrend: "+3%"
  },
  confusionData: [
    { name: "Privacy", requests: 320 },
    { name: "Security", requests: 150 },
    { name: "Compliance", requests: 280 },
    { name: "Financial", requests: 95 },
    { name: "Governance", requests: 45 }
  ],
  triggerFrequency: [
    { name: "Personal Data Protection", triggers: 450 },
    { name: "Credential Protection", triggers: 310 },
    { name: "Financial Information", triggers: 220 },
    { name: "Customer Information", triggers: 180 },
    { name: "Confidential Business", triggers: 85 }
  ],
  promptSuccess: [
    { name: "Original Passed", value: 65, color: "#10b981" },
    { name: "Passed After Suggestion", value: 20, color: "#3b82f6" },
    { name: "Original Blocked", value: 10, color: "#f59e0b" },
    { name: "Still Blocked", value: 5, color: "#ef4444" }
  ],
  fileUploadDist: [
    { name: "Identity Card", value: 45, color: "#8b5cf6" },
    { name: "Passport", value: 25, color: "#6366f1" },
    { name: "Resume", value: 15, color: "#a855f7" },
    { name: "Invoice", value: 10, color: "#d946ef" },
    { name: "Financial Statement", value: 5, color: "#ec4899" }
  ],
  weeklyTrend: [
    { day: "Mon", violations: 24 },
    { day: "Tue", violations: 28 },
    { day: "Wed", violations: 22 },
    { day: "Thu", violations: 18 },
    { day: "Fri", violations: 15 },
    { day: "Sat", violations: 5 },
    { day: "Sun", violations: 8 }
  ],
  topTriggeredRules: [
    { id: 1, rule: "Personal Data Protection", category: "Privacy", triggers: 450, risk: "High", trend: "+12%" },
    { id: 2, rule: "Credential Protection", category: "Security", triggers: 310, risk: "Critical", trend: "-5%" },
    { id: 3, rule: "Financial Information", category: "Compliance", triggers: 220, risk: "High", trend: "+2%" },
    { id: 4, rule: "Customer Information", category: "Privacy", triggers: 180, risk: "Medium", trend: "-8%" },
    { id: 5, rule: "Confidential Business", category: "Confidentiality", triggers: 85, risk: "Critical", trend: "-15%" }
  ],
  requestedClarifications: [
    { id: 1, category: "Privacy", requests: 320, avgResolution: "1.2 hrs", improvement: "+18%" },
    { id: 2, category: "Compliance", requests: 280, avgResolution: "2.4 hrs", improvement: "+5%" },
    { id: 3, category: "Security", requests: 150, avgResolution: "0.8 hrs", improvement: "+22%" },
    { id: 4, category: "Financial", requests: 95, avgResolution: "1.5 hrs", improvement: "-2%" },
    { id: 5, category: "Governance", requests: 45, avgResolution: "3.1 hrs", improvement: "+10%" }
  ]
};

export default governanceData;

