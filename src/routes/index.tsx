import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Hello World from TanStack !</p>
    </div>
  )
}
