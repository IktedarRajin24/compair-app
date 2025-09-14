"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Download, FileText, CheckCircle } from "lucide-react"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null)

  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log("[v0] Downloading PDF report...")
    setConfirmationMessage("PDF report download started successfully!")

    // Auto-close after showing confirmation
    setTimeout(() => {
      setConfirmationMessage(null)
      onClose()
    }, 2000)
  }

  const handleExportCSV = () => {
    // Simulate CSV export
    console.log("[v0] Exporting CSV data...")
    setConfirmationMessage("CSV data export completed successfully!")

    // Auto-close after showing confirmation
    setTimeout(() => {
      setConfirmationMessage(null)
      onClose()
    }, 2000)
  }

  const handleClose = () => {
    setConfirmationMessage(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-card-foreground">Export Analysis</DialogTitle>
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </DialogHeader>

        <div className="space-y-4">
          {confirmationMessage ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-card-foreground mb-2">Success!</p>
              <p className="text-muted-foreground">{confirmationMessage}</p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground">
                Choose your preferred format to download the competitor analysis report.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="w-full justify-center bg-background hover:bg-muted border-border text-foreground"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>

                <Button
                  onClick={handleExportCSV}
                  variant="outline"
                  className="w-full justify-center bg-background hover:bg-muted border-border text-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
