import { useState } from "react"
import { UploadImageForm } from "./components/UploadImageForm"
import { ImagePreview } from "./components/ImagePreview"

export default function App() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <UploadImageForm onUploadSuccess={setPreviewUrl} />
      <ImagePreview previewUrl={previewUrl} />
    </div>
  )
}
