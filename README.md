# 🛡️ Enterprise AI Governance Platform

> **Making the safe path the easiest path.**  
> An end-to-end governance ecosystem that eliminates "Shadow AI" risks by combining moment-of-use risk detection, automated prompt sanitization, synthetic data generation, and audit-ready admin insights.

### Prototype Link (Dashboard): https://shadowseek.vercel.app 
### Prototype Link (AI Chat Simulator): https://shadowseek.vercel.app/ai-chat  

---

## 📌 Executive Summary

As enterprise employees increasingly adopt Generative AI tools to boost productivity, compliance and security teams face a growing governance gap—giving rise to the Shadow AI data leak problem.

Our platform solves this challenge by shifting from rigid inline blocks to **willing compliance**. It equips employees with real-time risk alerts and automated remediation tools while providing C-suite executives with full visibility and control over enterprise AI risk.

---

## ✨ Key Features

### Employee Experience
* 🏷️**AI Tool Catalog & "Nutrition Labels":** Browse approved and unapproved AI tools with glanceable cards displaying risk scores, data retention policies, and allowed data types.
* 🤖**AI Governance Assistant:** 
  * **Automated Prompt Sanitizer:** Automatically replaces sensitive variables (e.g., customer PII, credentials) with safe placeholders.
  * **Document Scanner & Synthetic Data Generator:** Generates structurally identical, fake mock files (.csv, .txt) so employees can safely interact with third-party AI tools.
* 🧩**Browser Extension (Moment-of-Use Alert):** Intercepts sensitive prompts in real-time directly on third-party sites, offering instant redacting, switching to approved enterprise assistants, or requesting access.
* 📝**Request Approval Workflow:** For employees to request access to new AI tools with business justifications.

### Admin & Executive Experience
* 📊**Executive Governance Dashboard:** High-level analytics tracking total AI adoption, risk distributions, and our key KPI: **Self-Resolved Risk Events**.
* ⚡**Streamlined Approval Management:** Review tool access requests with AI-generated risk summaries and one-click "Approve All Low Risk" automation.
* 🔒**Privacy-First Metadata Audit Logs:** Logs real-time activity context (User, Department, Tool, Risk Level) without ever recording raw prompt text or sensitive content.
* ⚙️**Policy & Analytics Management:** Monitor policy triggers and easily configure governance rules (Warn, Block, Sanitize).

---

## 🛠️ Tech Stack

* **Frontend:** React.js & Vite & Tailwind CSS
* **Backend:** Python FastAPI
* **Database:** PostgreSQL
* **AI/ML Engine:** Anthropic API for Prompt Sanitization & Risk Summarization

---

## 🚀 Getting Started 

Follow these steps to run the platform locally on your machine.

### Prerequisites

Ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [Git](https://git-scm.com/)
* npm or yarn package manager

---

### 1. Clone the Repository

```bash
git clone [https://github.com/Tan051107/ShadowSeek.git]
cd ShadowSeek
```

### 2. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

### 3. Start the Frontend Client:
```bash
cd frontend
npm run dev
```