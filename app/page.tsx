import { CompairHeader } from "@/components/compair-header"
import { AnalysisForm } from "@/components/analysis-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <CompairHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <AnalysisForm />
        </div>
      </main>
    </div>
  )
}
