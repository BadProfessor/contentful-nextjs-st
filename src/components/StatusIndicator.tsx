import { CheckCircle, WarningCircle, CircleNotch } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

export type ConnectionStatus = 'connected' | 'disconnected' | 'loading' | 'error'

interface StatusIndicatorProps {
  status: ConnectionStatus
  message?: string
}

export function StatusIndicator({ status, message }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: <CheckCircle className="text-green-600" />,
          text: 'Connected',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200',
        }
      case 'loading':
        return {
          icon: <CircleNotch className="animate-spin text-blue-600" />,
          text: 'Connecting...',
          variant: 'secondary' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        }
      case 'error':
        return {
          icon: <WarningCircle className="text-red-600" />,
          text: 'Error',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200',
        }
      default:
        return {
          icon: <WarningCircle className="text-gray-600" />,
          text: 'Not Connected',
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className="flex items-center gap-2">
      <Badge className={`flex items-center gap-1.5 px-3 py-1.5 ${config.className}`}>
        {config.icon}
        <span className="font-medium text-xs uppercase tracking-wide">{config.text}</span>
      </Badge>
      {message && <span className="text-sm text-muted-foreground">{message}</span>}
    </div>
  )
}
