'use client'

export default function FigmaEmbed({ url, title }: { url: string; title: string }) {
  if (!url) return null

  return (
    <div className="w-full rounded-xl overflow-hidden border dark:border-mid-gray border-[#e0e0e0] aspect-video">
      <iframe
        src={url}
        title={`Prototipo Figma — ${title}`}
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  )
}
