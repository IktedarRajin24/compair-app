"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { FileUploadArea } from "@/components/file-upload-area"
import { Plus, Loader2 } from "lucide-react"

export function AnalysisForm() {
  const [projectName, setProjectName] = useState("Q4 Market Research Report")
  const [competitorUrls, setCompetitorUrls] = useState([
    "https://competitor-a.com",
    "https://competitor-b.io",
    "https://competitor-c.net",
  ])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const addUrlField = () => {
    setCompetitorUrls([...competitorUrls, ""])
  }

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...competitorUrls]
    newUrls[index] = value
    setCompetitorUrls(newUrls)
  }

  const isFormValid = () => {
    return projectName.trim() !== "" && competitorUrls.some((url) => url.trim() !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsLoading(true)
    console.log("Starting analysis...", { projectName, competitorUrls })

    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false)
      router.push("/results")
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-foreground">Analyzing competitors...</p>
          <p className="text-sm text-muted-foreground">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl bg-card border-border">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Create a New Analysis</h2>
          <p className="text-muted-foreground">Get started by defining your project and adding competitor URLs.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-card-foreground font-medium">
              Project Name
            </Label>
            <Input
              id="project-name"
              placeholder="e.g., Q4 Market Research Report"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* File Upload Area */}
          <div className="space-y-2">
            <Label className="text-card-foreground font-medium">Competitor URLs</Label>
            <FileUploadArea />
          </div>

          {/* Manual Entry */}
          <div className="space-y-4">
            <Label className="text-card-foreground font-medium">Manual Entry</Label>
            <div className="space-y-3">
              {competitorUrls.map((url, index) => (
                <Input
                  key={index}
                  placeholder="https://competitor-url.com"
                  value={url}
                  onChange={(e) => updateUrl(index, e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addUrlField}
                className="w-full border-dashed border-border hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another URL
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            Start Analysis
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
