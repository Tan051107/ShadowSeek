import policies from "../data/policies.json";

export function checkPrompt(prompt) {
  if (!prompt || prompt.trim() === "") return { safe: true };
  const text = prompt.toLowerCase();
  
  for (let policy of policies) {
    if (policy.status !== "Active") continue;
    
    for (let keyword of policy.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return {
          safe: false,
          matchedKeyword: keyword,
          policy: policy
        };
      }
    }
  }
  
  return {
    safe: true
  };
}

