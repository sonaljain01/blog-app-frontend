import { cn } from "@/lib/utils";
import { SidePanel } from "@/components/dashboard/sidepanel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen w-full bg-white text-black flex ")}>
        <SidePanel />
        <div className="lg:ml-52 p-8 w-full ml-0 ">{children}</div>
      </body>
    </html>
  );
}
