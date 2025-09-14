"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface InsightsModalProps {
  isOpen: boolean
  onClose: () => void
  competitor: string
  insight: {
    title: string
    content: string
    sourceUrl: string
    accessedDate: string
  }
}

export function InsightsModal({ isOpen, onClose, competitor, insight }: InsightsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold text-card-foreground">{insight.title}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 hover:bg-muted">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-muted-foreground leading-relaxed">{insight.content}</div>

          <div className="space-y-2 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">{insight.sourceUrl}</div>
            <div className="text-sm text-muted-foreground">Accessed: {insight.accessedDate}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
