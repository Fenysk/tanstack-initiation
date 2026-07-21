import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/pokemons')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Pokemons</div>
}
