import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mariano Solle — Product Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#6ee7b7',
              fontFamily: 'sans-serif',
            }}
          >
            PRODUCT DESIGNER
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 500,
              color: '#f5f5f0',
              fontFamily: 'sans-serif',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Mariano Solle
          </span>
          <span
            style={{
              fontSize: '22px',
              fontWeight: 300,
              color: 'rgba(245,245,240,0.5)',
              fontFamily: 'sans-serif',
            }}
          >
            Banking · Fintech · SaaS · Government
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '80px',
            fontSize: '16px',
            color: 'rgba(245,245,240,0.25)',
            fontFamily: 'sans-serif',
            letterSpacing: '1px',
          }}
        >
          marianosolle.com
        </div>
      </div>
    ),
    { ...size },
  )
}
