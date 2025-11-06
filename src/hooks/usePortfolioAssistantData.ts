// src/hooks/usePortfolioAssistantData.ts

import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Extend Window interface to include SpeechRecognition for browser compatibility
interface Window {
  SpeechRecognition: typeof SpeechRecognition | undefined;
  webkitSpeechRecognition: typeof SpeechRecognition | undefined;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface UseAssistantOptions {
  typingSpeed?: number; // milliseconds per character for typing effect
  voiceEnabled?: boolean; // whether speech output is enabled
}

export function usePortfolioAssistantData({
  typingSpeed = 20,
  voiceEnabled = true,
}: UseAssistantOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabledState, setVoiceEnabledState] = useState(voiceEnabled);

  // Speech setup
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const SpeechRecognition =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  // Start voice input
  const startListening = () => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Stop voice input
  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // Toggle voice output
  const toggleVoice = () => setVoiceEnabledState((prev) => !prev);

  // Send message and get response from the assistant
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const newMessage: ChatMessage = { role: "user", content: input };
    const updated = [...messages, newMessage];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "portfolio-chat",
        {
          body: { messages: updated },
        }
      );
      if (error) throw error;

      const content =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't understand that.";

      const assistant: ChatMessage = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistant]);

      // Simulate typing
      simulateTyping(content, (typed) => {
        setMessages((prev) => {
          const msgs = [...prev];
          msgs[msgs.length - 1] = { role: "assistant", content: typed };
          return msgs;
        });
      });

      // Optional speech output
      if (voiceEnabledState && synth) {
        const utter = new SpeechSynthesisUtterance(content);
        utter.lang = "en-US";
        synth.speak(utter);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, synth, voiceEnabledState]);

  // Typing effect simulation
  const simulateTyping = (text: string, onUpdate: (t: string) => void) => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setIsTyping(true);
    let index = 0;
    let current = "";

    const step = () => {
      current += text[index];
      index++;
      onUpdate(current);
      if (index < text.length) {
        typingTimer.current = setTimeout(step, typingSpeed);
      } else setIsTyping(false);
    };
    step();
  };

  // Return API
  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    isTyping,
    startListening,
    stopListening,
    isListening,
    voiceEnabled: voiceEnabledState,
    toggleVoice,
  };
}
