import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Extend the Window interface to include SpeechRecognition for browser compatibility
interface Window {
  SpeechRecognition: typeof SpeechRecognition | undefined;
  webkitSpeechRecognition: typeof SpeechRecognition | undefined;
}

// Message type for chat
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Options for customizing the assistant hook
interface UseAssistantOptions {
  typingSpeed?: number; // milliseconds per character for simulated typing
  voiceEnabled?: boolean; // whether speech output is enabled
}

export function usePortfolioAssistantData({
  typingSpeed = 20,
  voiceEnabled = true,
}: UseAssistantOptions = {}) {
  // -------------------- State --------------------
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Chat message history
  const [input, setInput] = useState(""); // Current input from user
  const [isLoading, setIsLoading] = useState(false); // Waiting for API response
  const [isTyping, setIsTyping] = useState(false); // Simulate assistant typing effect
  const [isListening, setIsListening] = useState(false); // Voice input active
  const [voiceEnabledState, setVoiceEnabledState] = useState(voiceEnabled); // Voice output enabled

  // -------------------- Speech Setup --------------------
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null; // SpeechSynthesis API
  const SpeechRecognition =
    typeof window !== "undefined"
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;

  const recognitionRef = useRef<SpeechRecognition | null>(null); // Ref to store recognition instance
  const typingTimer = useRef<NodeJS.Timeout | null>(null); // Timer for typing effect

  // -------------------- Voice Input --------------------
  const startListening = () => {
    if (!SpeechRecognition) return; // Exit if browser doesn't support it

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Language for recognition
    recognition.interimResults = false; // Only final results
    recognition.onstart = () => setIsListening(true); // Update UI state
    recognition.onend = () => setIsListening(false); // Reset UI state
    recognition.onerror = () => setIsListening(false); // Reset UI on error

    // Capture recognized speech and set input
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false); // Ensure state is reset
  };

  // -------------------- Voice Output Toggle --------------------
  const toggleVoice = () => setVoiceEnabledState((prev) => !prev);

  // -------------------- Send Message --------------------
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return; // Prevent empty sends or concurrent sends

    // Add user's message to state
    const newMessage: ChatMessage = { role: "user", content: input };
    const updated = [...messages, newMessage];
    setMessages(updated);
    setInput(""); // Clear input box
    setIsLoading(true);

    try {
      // Call Supabase Edge Function to get assistant response
      const { data, error } = await supabase.functions.invoke("portfolio-chat", {
        body: { messages: updated },
      });
      if (error) throw error;

      const content =
        data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

      // Add assistant message placeholder for typing simulation
      const assistant: ChatMessage = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistant]);

      // Animate assistant typing effect
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
      setIsLoading(false); // Reset loading state
    }
  }, [input, isLoading, messages, synth, voiceEnabledState]);

  // -------------------- Typing Effect --------------------
  const simulateTyping = (text: string, onUpdate: (t: string) => void) => {
    if (typingTimer.current) clearTimeout(typingTimer.current); // Clear previous timer
    setIsTyping(true);
    let index = 0;
    let current = "";

    const step = () => {
      current += text[index];
      index++;
      onUpdate(current); // Update displayed text
      if (index < text.length) {
        typingTimer.current = setTimeout(step, typingSpeed); // Recursive typing
      } else setIsTyping(false); // Typing done
    };
    step();
  };

  // -------------------- Return API --------------------
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
