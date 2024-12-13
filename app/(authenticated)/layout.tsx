import { Sidebar } from "@/components/dashboard/sidebar"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex h-screen">
          <Sidebar/>
          <div className="flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
      
    )
  }