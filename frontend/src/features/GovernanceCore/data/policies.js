const policies = [
  {
    id: 1,
    name: "Personal Data Protection",
    category: "Privacy",
    severity: "High",
    action: "Block",
    status: "Active",
    description:
      "Prevent employees from sharing personally identifiable information (PII) with external AI services.",
    keywords: [
      "passport",
      "identity card",
      "ic",
      "email",
      "phone",
      "address",
      "date of birth",
      "bank account",
      "credit card",
      "resume",
      "employee id"
    ],
    recommendation:
      "Remove or anonymize personal information before submitting prompts."
  },

  {
    id: 2,
    name: "Confidential Business Information",
    category: "Confidentiality",
    severity: "Critical",
    action: "Block",
    status: "Active",
    description:
      "Prevent disclosure of confidential company information and intellectual property.",
    keywords: [
      "salary",
      "payroll",
      "source code",
      "database",
      "api key",
      "access token",
      "secret key",
      "internal project",
      "roadmap",
      "financial report"
    ],
    recommendation:
      "Remove confidential company information or use an approved internal AI assistant."
  },

  {
    id: 3,
    name: "Credential Protection",
    category: "Security",
    severity: "Critical",
    action: "Block",
    status: "Active",
    description:
      "Prevent exposure of authentication credentials and security secrets.",
    keywords: [
      "password",
      "username",
      "private key",
      "ssh key",
      "jwt",
      "oauth",
      "client secret",
      "certificate",
      "token"
    ],
    recommendation:
      "Never share credentials with AI tools. Replace them with placeholder values."
  },

  {
    id: 4,
    name: "Financial Information",
    category: "Compliance",
    severity: "High",
    action: "Warn",
    status: "Active",
    description:
      "Detect financial records and customer payment information before sharing.",
    keywords: [
      "invoice",
      "bank statement",
      "tax",
      "budget",
      "profit",
      "revenue",
      "payment",
      "purchase order",
      "account number"
    ],
    recommendation:
      "Mask financial information before submitting prompts."
  },

  {
    id: 5,
    name: "Customer Information",
    category: "Privacy",
    severity: "High",
    action: "Sanitize",
    status: "Active",
    description:
      "Protect customer data from accidental disclosure to AI platforms.",
    keywords: [
      "customer",
      "client",
      "contact",
      "crm",
      "customer id",
      "support ticket",
      "case number"
    ],
    recommendation:
      "Automatically redact customer identifiers before submission."
  },

  {
    id: 6,
    name: "Approved AI Usage",
    category: "Governance",
    severity: "Medium",
    action: "Warn",
    status: "Active",
    description:
      "Encourage employees to use company-approved AI platforms for sensitive work.",
    keywords: [
      "chatgpt free",
      "claude free",
      "gemini",
      "perplexity"
    ],
    recommendation:
      "Consider using the organization's approved AI assistant instead."
  }
];

export default policies;
