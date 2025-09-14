import { CompairHeader } from "@/components/compair-header"
import { AnalysisResults } from "@/components/analysis-results"

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompairHeader />
      <main className="flex">
        <AnalysisResults />
      </main>
    </div>
  )
}
