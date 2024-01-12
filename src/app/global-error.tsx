'use client'

import * as React from 'react'
import * as Sentry from '@sentry/nextjs'
import { default as NextError } from 'next/error'

export default function GlobalError({
  error,
  reset
}: {
  error: NextError & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang='en'>
      <body>
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <NextError statusCode={undefined as any} />
        <button type='button' onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  )
}
