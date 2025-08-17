import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

type HeaderProps = {
  pageTitle: string;
};

export function AppHeader({ pageTitle }: HeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
        # {pageTitle}
      </h2>
    </header>
  );
}
