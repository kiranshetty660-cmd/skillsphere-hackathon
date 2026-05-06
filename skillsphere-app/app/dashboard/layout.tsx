import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { AntigravityProvider } from '@/components/AntigravityProvider'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AntigravityProvider>
      <div className="app">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </AntigravityProvider>
  )
}
