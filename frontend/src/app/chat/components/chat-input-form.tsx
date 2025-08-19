import {
  ChatInput,
  ChatInputSubmit,
  ChatInputTextArea,
} from "@/components/ui/chat-input";

type ChatInputFormProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  onStop: () => void;
};

export function ChatInputForm({
  value,
  onChange,
  onSubmit,
  loading,
  onStop,
}: ChatInputFormProps) {
  return (
    <div className="w-full h-full space-y-8 px-4 py-4 sm:px-12 sm:py-8 md:px-24 md:py-12 lg:px-40 lg:py-16">
      <ChatInput
        variant="default"
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={loading}
        onStop={onStop}
      >
        <ChatInputTextArea placeholder="メッセージを入力してください" />
        <ChatInputSubmit />
      </ChatInput>
    </div>
  );
}
