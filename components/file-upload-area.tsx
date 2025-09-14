"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

export function FileUploadArea() {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    // Handle file drop logic here
    console.log("Files dropped:", e.dataTransfer.files)
  }

  const handleClick = () => {
    // Trigger file input click
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      console.log("Files selected:", files)
    }
    input.click()
  }

  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-primary/5"}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
      <p className="text-foreground font-medium mb-1">Drag & drop your CSV file here, or click to browse</p>
      <p className="text-sm text-muted-foreground">Supports CSV with a single column of URLs</p>
    </div>
  )
}
