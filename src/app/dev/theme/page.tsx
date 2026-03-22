import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const colors = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
]

export default function ThemePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          UX Clash | Theme Preview
        </h1>
        <p className="text-muted-foreground mt-2">
          Modern Editorial design system. Dark-mode first.
        </p>
      </div>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((name) => (
            <div key={name} className="space-y-1.5">
              <div
                className="border-border h-12 rounded-md border"
                style={{ backgroundColor: `var(--${name})` }}
              />
              <p className="font-mono text-xs text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typography</h2>
        <div className="space-y-3">
          <p className="text-4xl font-bold tracking-tight">
            Heading | Geist Sans
          </p>
          <p className="text-lg">Body text, clean and readable at any size.</p>
          <p className="text-muted-foreground text-sm">
            Muted text for secondary information.
          </p>
          <p className="font-mono text-sm">
            Monospace | Geist Mono for code contexts.
          </p>
        </div>
      </section>

      {/* Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Components</h2>

        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>

        <div className="max-w-sm">
          <Input placeholder="Type something..." />
        </div>

        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Challenge Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              This is how cards look in the UX Clash design system.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
