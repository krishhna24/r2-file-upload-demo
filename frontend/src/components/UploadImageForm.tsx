import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type UploadImageFormProps = {
  onUploadSuccess: (previewUrl: string) => void
}

export function UploadImageForm({ onUploadSuccess }: UploadImageFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Please choose an image.")
      return
    }

    setIsUploading(true)
    setMessage("Uploading...")

    try {
      const presignResponse = await fetch("http://localhost:3000/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      })

      if (!presignResponse.ok) {
        throw new Error("Failed to fetch presigned URL")
      }

      const { signedUrl } = (await presignResponse.json()) as { signedUrl: string }

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to signed URL")
      }

      onUploadSuccess(URL.createObjectURL(selectedFile))
      setMessage("Upload successful!")
    } catch {
      setMessage("Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        type="file"
        accept="image/*"
        onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
      />
      <Button onClick={handleUpload}>
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
      {message && <p>{message}</p>}
    </div>
  )
}
