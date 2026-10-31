import React, { useState } from "react";
import { MessageSquare, X, Send, Loader2, Sparkles, ShieldAlert } from "lucide-react";
import { AnalysisResult } from "../types";

interface AdvisorChatProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
  selectedIdeaTitle?: string;
}

interface ChatMessage {
  sender: "user" | "advisor";
  text: string;
}

export const AdvisorChat: React.FC<AdvisorChatProps> = ({
  isOpen,
  onClose,
  result,
  selectedIdeaTitle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "advisor",
      text: `Hello! I'm your EchoEarth Circular Advisor. I can help you safely craft with this ${result.object} (${result.material}). Ask me about cutting techniques, safe adhesives, non-toxic finishes, or tool alternatives!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Suggested prompt chips
  const quickQuestions = [
    `How do I clean and remove label adhesive?`,
    `What is the safest way to cut this without sharp edges?`,
    `What non-toxic glue or fastener works best on ${result.material.split(" ")[0]}?`,
    `Can I weatherproof this for outdoor garden use?`,
  ];

  async function handleSend(textToSend?: string) {
    const questionText = (textToSend || input).trim();
    if (!questionText || isSending) return;

    const newMessages: ChatMessage[] = [...messages, { sender: "user", text: questionText }];
    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          objectContext: result.object,
          materialContext: result.material,
          projectTitle: selectedIdeaTitle,
          analysisResult: result,
          history: messages,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Advisor request failed.");
      }

      setMessages((prev) => [...prev, { sender: "advisor", text: data.reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "advisor",
          text: `Error connecting to advisor: ${err.message || "Please try again later."}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">EchoEarth DIY Advisor</h3>
              <p className="text-[11px] text-stone-400">
                Context: {result.object}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-stone-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-emerald-700 text-white rounded-br-xs"
                    : "bg-white border border-stone-200/80 text-stone-800 rounded-bl-xs shadow-2xs whitespace-pre-line"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-stone-500 text-xs py-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Advisor is drafting DIY guidance...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 sm:px-4 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isSending}
              className="shrink-0 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-stone-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about crafting or recycling this..."
            className="flex-1 px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-emerald-600"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
