import { Sidebar } from "@/components/dashboard/sidebar"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <Sidebar/>
        <div>asdasdsadasdas</div>
        {children}
        </>
      
    )
  }