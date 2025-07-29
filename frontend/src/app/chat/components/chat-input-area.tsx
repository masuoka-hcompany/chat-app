"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChatInputForm } from "./chat-input-form";

export function ChatInputArea() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast(value);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ChatInputForm
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSubmit={handleSubmit}
      loading={isLoading}
      onStop={() => setIsLoading(false)}
    />
  );
}
