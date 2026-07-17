import policies from '../data/policies';
import { sanitizeText } from '../utils/sanitizer';

function generateMockContent(filename) {
  const lowerName = filename.toLowerCase();

  if (lowerName.includes('resume')) {
    return `Employee Resume

Name: John Tan
Email: john.tan@gmail.com
Phone: 012345678

Experience:
5 years of software engineering at TechCorp.
Developed highly scalable backend APIs.`;
  }

  if (lowerName.includes('passport') || lowerName.includes('ic')) {
    return `Malaysian Identity Card

Name: Jane Doe
IC Number: 900101-14-5566
Date of Birth: 01/01/1990
Address: 123 Tech Avenue, Cyberjaya`;
  }

  if (lowerName.includes('invoice') || lowerName.includes('finance')) {
    return `INVOICE #9921

Client: ACME Corp
Bank Account: 1234-5678-9012
Total Amount: $5,000.00
Tax: $500.00

Please pay within 30 days.`;
  }

  if (lowerName.includes('code') || lowerName.includes('api')) {
    return `// Database configuration
const DB_HOST = "prod-db.internal.company.com";
const API_KEY = "FAKEKEY";

function connect() {
  console.log("Connecting to database...");
}`;
  }

  // Safe fallback
  return `Project Notes for Q4

- Architecture looks solid for the upcoming release.
- Team is on track to deliver all milestones.
- Ensure marketing materials are prepared by next week.`;
}

export async function scanDocument(file) {
  return new Promise((resolve) => {
    // Simulate network delay for scan
    setTimeout(() => {
      const originalContent = generateMockContent(file.name);
      const textToScan = originalContent.toLowerCase();

      for (let policy of policies) {
        if (policy.status !== "Active") continue;

        for (let keyword of policy.keywords) {
          if (textToScan.includes(keyword.toLowerCase())) {

            // Match found!
            const sanitizedContent = sanitizeText(originalContent);

            let status = "WARNING";
            if (policy.action === "Block") {
              status = "BLOCKED";
            }

            return resolve({
              status,
              matchedPolicy: policy.name,
              category: policy.category,
              severity: policy.severity,
              detectedInformation: keyword,
              recommendation: policy.recommendation,
              originalContent,
              sanitizedContent
            });
          }
        }
      }

      // No matches
      resolve({
        status: "SAFE",
        originalContent,
        sanitizedContent: originalContent
      });

    }, 2000); // We will handle the granular step animation in the UI, this simulates the final resolution.
  });
}

