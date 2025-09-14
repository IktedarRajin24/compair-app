"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Download, BarChart3, DollarSign, MessageSquare, Plus } from "lucide-react"
import { InsightsModal } from "./insights-modal"
import { ExportModal } from "./export-modal"
import Link from "next/link"

const competitorData = [
  {
    name: "Quantify Solutions",
    featureCompleteness: 75,
    pricingCompetitiveness: 75,
    messagingAlignment: 85,
  },
  {
    name: "AnalyticsPro Solutions",
    featureCompleteness: 85,
    pricingCompetitiveness: 70,
    messagingAlignment: 75,
  },
  {
    name: "DataStream Dynamics",
    featureCompleteness: 90,
    pricingCompetitiveness: 60,
    messagingAlignment: 80,
  },
  {
    name: "MarketInsight Co.",
    featureCompleteness: 70,
    pricingCompetitiveness: 80,
    messagingAlignment: 65,
  },
  {
    name: "Visionary Metrics",
    featureCompleteness: 60,
    pricingCompetitiveness: 85,
    messagingAlignment: 70,
  },
]

const insightsData = {
  "Quantify Solutions": {
    title: "Compair Feature Comparison: AI-Driven Insights",
    content:
      "Our analysis indicates that Quantify Solutions leverages a more advanced neural network for predictive market trends, offering a 15% higher accuracy rate in forecasting than traditional models. This insight was derived from their Q3 2023 investor call transcript and product documentation, highlighting a strategic focus on real-time data processing.",
    sourceUrl: "https://www.quantifysolutions.com/investor-relations/q3-2023-transcript",
    accessedDate: "2024-07-26 14:30 GMT",
  },
  "AnalyticsPro Solutions": {
    title: "Compair Feature Comparison: Market Positioning",
    content:
      "AnalyticsPro Solutions has positioned itself as the enterprise-focused solution with robust API integrations and white-label capabilities. Their recent partnership with Microsoft Azure has enhanced their cloud infrastructure, resulting in 40% faster data processing speeds compared to their previous architecture.",
    sourceUrl: "https://www.analyticspro.com/press-releases/microsoft-partnership-2024",
    accessedDate: "2024-07-25 09:15 GMT",
  },
  "DataStream Dynamics": {
    title: "Compair Feature Comparison: Technical Innovation",
    content:
      "DataStream Dynamics leads in feature completeness with their proprietary real-time streaming analytics engine. Their latest update includes machine learning-powered anomaly detection that reduces false positives by 60%, making them particularly strong in the financial services sector.",
    sourceUrl: "https://www.datastreamdynamics.com/product-updates/ml-anomaly-detection",
    accessedDate: "2024-07-24 16:45 GMT",
  },
  "MarketInsight Co.": {
    title: "Compair Feature Comparison: Pricing Strategy",
    content:
      "MarketInsight Co. has adopted an aggressive pricing strategy with their new 'Pay-per-Insight' model, making advanced analytics accessible to smaller businesses. This approach has resulted in a 200% increase in customer acquisition over the past quarter, though at lower average revenue per user.",
    sourceUrl: "https://www.marketinsight.co/pricing-model-announcement",
    accessedDate: "2024-07-23 11:20 GMT",
  },
  "Visionary Metrics": {
    title: "Compair Feature Comparison: User Experience Focus",
    content:
      "Visionary Metrics excels in pricing competitiveness and user experience design. Their recent UI overhaul has reduced time-to-insight by 35% and improved user satisfaction scores significantly. However, they lag in advanced analytical capabilities compared to more technical competitors.",
    sourceUrl: "https://www.visionarymetrics.com/ux-research-findings-2024",
    accessedDate: "2024-07-22 13:55 GMT",
  },
}

export function AnalysisResults() {
  const [featureWeight, setFeatureWeight] = useState([50])
  const [pricingWeight, setPricingWeight] = useState([50])
  const [messagingWeight, setMessagingWeight] = useState([50])
  const [selectedInsight, setSelectedInsight] = useState<{
    competitor: string
    insight: any
  } | null>(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const sortedCompetitors = useMemo(() => {
    const totalWeight = featureWeight[0] + pricingWeight[0] + messagingWeight[0]

    return competitorData
      .map((competitor) => {
        const weightedScore =
          (competitor.featureCompleteness * featureWeight[0]) / 100 +
          (competitor.pricingCompetitiveness * pricingWeight[0]) / 100 +
          (competitor.messagingAlignment * messagingWeight[0]) / 100

        const normalizedScore = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0

        return {
          ...competitor,
          totalScore: normalizedScore,
        }
      })
      .sort((a, b) => b.totalScore - a.totalScore)
  }, [featureWeight, pricingWeight, messagingWeight])

  const handleCompetitorClick = (competitorName: string) => {
    const insight = insightsData[competitorName as keyof typeof insightsData]
    if (insight) {
      setSelectedInsight({ competitor: competitorName, insight })
    }
  }

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6 min-h-screen">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-card-foreground mb-4 tracking-wide uppercase">Analysis Weights</h3>
          </div>

          <Link href="/">
            <Button
              variant="default"
              className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground mb-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full justify-start bg-transparent border-border hover:bg-primary/5 hover:border-primary text-card-foreground"
            onClick={() => setIsExportModalOpen(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <div className="space-y-8">
            {/* Feature Completeness */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Feature</p>
                  <p className="text-sm font-medium text-card-foreground">Completeness</p>
                </div>
              </div>
              <div className="space-y-2">
                <Slider value={featureWeight} onValueChange={setFeatureWeight} max={100} step={1} className="w-full" />
                <p className="text-right text-sm text-muted-foreground">{featureWeight[0]}%</p>
              </div>
            </div>

            {/* Pricing Competitiveness */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Pricing</p>
                  <p className="text-sm font-medium text-card-foreground">Competitiveness</p>
                </div>
              </div>
              <div className="space-y-2">
                <Slider value={pricingWeight} onValueChange={setPricingWeight} max={100} step={1} className="w-full" />
                <p className="text-right text-sm text-muted-foreground">{pricingWeight[0]}%</p>
              </div>
            </div>

            {/* Messaging Alignment */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Messaging</p>
                  <p className="text-sm font-medium text-card-foreground">Alignment</p>
                </div>
              </div>
              <div className="space-y-2">
                <Slider
                  value={messagingWeight}
                  onValueChange={setMessagingWeight}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-right text-sm text-muted-foreground">{messagingWeight[0]}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Q3 2024 Competitor Analysis Report</h1>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">Competitor Performance Overview</CardTitle>
              <p className="text-muted-foreground">Ranked by Total Score, reflecting weighted analysis criteria.</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Competitor Name</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                        Feature Completeness
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                        Pricing Competitiveness
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                        Messaging Alignment
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCompetitors.map((competitor, index) => (
                      <tr
                        key={index}
                        className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => handleCompetitorClick(competitor.name)}
                      >
                        <td className="py-4 px-4 text-card-foreground font-medium">{competitor.name}</td>
                        <td className="py-4 px-4 text-card-foreground hover:bg-primary/10 transition-colors cursor-pointer">
                          {competitor.featureCompleteness}%
                        </td>
                        <td className="py-4 px-4 text-card-foreground hover:bg-primary/10 transition-colors cursor-pointer">
                          {competitor.pricingCompetitiveness}%
                        </td>
                        <td className="py-4 px-4 text-card-foreground hover:bg-primary/10 transition-colors cursor-pointer">
                          {competitor.messagingAlignment}%
                        </td>
                        <td className="py-4 px-4 text-card-foreground font-semibold">{competitor.totalScore}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedInsight && (
        <InsightsModal
          isOpen={!!selectedInsight}
          onClose={() => setSelectedInsight(null)}
          competitor={selectedInsight.competitor}
          insight={selectedInsight.insight}
        />
      )}

      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  )
}
