// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdValue = Record<string, any> | Record<string, any>[]

type Props = {
  data: JsonLdValue
}

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
