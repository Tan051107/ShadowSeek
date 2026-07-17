import { useState } from "react";
import { checkPrompt } from "../utils/promptChecker";
import { generateSuggestion } from "../utils/generateSuggestion";
import PolicyMatchCard from "../components/PolicyMatchCard";
import PromptComparison from "../components/PromptComparison";
import { Send } from "lucide-react";

export default function TestChatbot() {

    const [prompt, setPrompt] = useState("");

    const [result, setResult] = useState(null);

    const runTest = () => {

        if (!prompt.trim()) return;

        const response = checkPrompt(prompt);

        if (response.blocked) {

            setResult({
                blocked: true,
                matches: response.matchedPolicies,
                suggestion: generateSuggestion(prompt)
            });

        } else {

            setResult({
                blocked: false
            });

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-xl shadow">

                    <div className="border-b p-6">

                        <h1 className="text-2xl font-bold">

                            Test Chatbot

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Test how employee prompts are evaluated
                            against company AI policies.

                        </p>

                    </div>

                    <div className="p-6">

                        <textarea

                            rows={6}

                            value={prompt}

                            onChange={(e)=>setPrompt(e.target.value)}

                            className="w-full border rounded-lg p-4"

                            placeholder="Example:

Upload customer passport and salary details into ChatGPT."

                        />

                        <div className="mt-5">

                            <button

                                onClick={runTest}

                                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"

                            >

                                <Send size={18}/>

                                Run Test

                            </button>

                        </div>

                    </div>

                </div>

                {

                    result && !result.blocked && (

                        <div className="bg-green-50 border border-green-300 rounded-xl p-6 mt-6">

                            <h2 className="text-green-700 font-bold">

                                ✅ Prompt Passed

                            </h2>

                            <p className="mt-2">

                                No company policy was triggered.

                            </p>

                        </div>

                    )

                }

                {

                    result && result.blocked && (

                        <>

                            <PolicyMatchCard

                                policies={result.matches}

                            />

                            <PromptComparison

                                original={prompt}

                                suggested={result.suggestion}

                                onAccept={(text)=>setPrompt(text)}

                            />

                        </>

                    )

                }

            </div>

        </div>

    );

}