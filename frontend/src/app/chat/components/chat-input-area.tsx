"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChatInputForm } from "./chat-input-form";
import { sendMessageAction } from "../actions/send-message-action";

export function ChatInputArea() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 初期表示時に入力フォームへスクロール
  useEffect(() => {
    const anchor = document.getElementById("chat-input-area");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    const result = await sendMessageAction(value);
    if (result.ok) {
      toast(result.message ?? "送信しました");
    } else {
      toast(`送信に失敗しました: ${result.error}`);
    }

    setValue("");
    setIsLoading(false);
  };

  return (
    <div id="chat-input-area">
      <ChatInputForm
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
        loading={isLoading}
        onStop={() => setIsLoading(false)}
      />
    </div>
  );
}
