export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">T</span>
      </div>
      <span className="font-bold text-xl text-foreground">TradeEase</span>
    </div>
  )
}

export function LogoIcon() {
  return (
    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
      <span className="text-primary-foreground font-bold text-sm">T</span>
    </div>
  )
} 