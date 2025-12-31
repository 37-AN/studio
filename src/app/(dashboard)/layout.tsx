import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Nav } from "@/components/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-3 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary-foreground"><path d="m3 16 4 4 4-4"/><path d="m7 20 0-14"/><path d="M21 8s-1.33-2-4-2-4 2-4 2"/><path d="m17 8 0 12"/></svg>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-sidebar-foreground">ShiftUp</h2>
                    <p className="text-xs text-sidebar-foreground/80">Executive Dashboard</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <Nav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bg-background max-h-screen overflow-auto">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
