type ImagePreviewProps = {
  previewUrl: string | null
}

export function ImagePreview({ previewUrl }: ImagePreviewProps) {
  if (!previewUrl) return null

  return (
    <div className="mt-6 w-full max-w-sm">
      <img
        src={previewUrl}
        alt="Uploaded preview"
        className="h-auto w-full rounded-md border object-cover"
      />
    </div>
  )
}
