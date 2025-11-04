// 🎉 src/components/PortfolioChatbot.tsx

import { usePortfolioAssistantData } from "@/hooks/usePortfolioAssistantData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

export const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls whether the chatbot panel is open
  const scrollRef = useRef<HTMLDivElement>(null); // Ref for scrollable messages container

  const {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    isTyping,
    startListening,
    stopListening,
    isListening,
    voiceEnabled,
    toggleVoice,
  } = usePortfolioAssistantData({ voiceEnabled: true }); // Custom hook for chat logic

  // 🔄 Auto scroll to bottom whenever new messages arrive
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      {/* ---------------- Floating Chat Button ---------------- */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          {/* Toggle icon based on panel state */}
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* ---------------- Chat Panel ---------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[520px] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* --------- Header --------- */}
            <div className="p-4 border-b border-border bg-muted/50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Portfolio Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Ask about my projects, skills, or experience.
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* --------- Messages --------- */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 shadow-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                {isTyping && (
                  <div className="text-sm text-muted-foreground animate-pulse">
                    Assistant is typing...
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* --------- Input & Controls --------- */}
            <div className="p-3 border-t border-border flex gap-2 bg-muted/20">
              {/* Text input */}
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about my portfolio..."
                disabled={isLoading}
              />

              {/* Send button */}
              <Button
                size="icon"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>

              {/* Voice input toggle */}
              <Button
                size="icon"
                onClick={isListening ? stopListening : startListening}
                variant={isListening ? "secondary" : "outline"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              {/* Speech/voice output toggle */}
              <Button
                size="icon"
                onClick={toggleVoice}
                variant={voiceEnabled ? "secondary" : "outline"}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
