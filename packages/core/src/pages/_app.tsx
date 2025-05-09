import { UIProvider } from '@faststore/ui'
import type { AppProps } from 'next/app'
import Layout from 'src/Layout'
import AnalyticsHandler from 'src/sdk/analytics'
import ErrorBoundary from 'src/sdk/error/ErrorBoundary'
import SEO from '../../next-seo.config'

// FastStore UI's base styles
import '../styles/global/index.scss'
import '../plugins/index.scss'
import '../customizations/src/themes/index.scss'

import { DefaultSeo } from 'next-seo'

function App({ Component, pageProps }: AppProps) {
  const { key } = pageProps

  return (
    <ErrorBoundary>
      <DefaultSeo {...SEO} />

      <AnalyticsHandler />

      <UIProvider>
        <Layout>
          <Component {...pageProps} key={key} />
        </Layout>
      </UIProvider>
    </ErrorBoundary>
  )
}

export default App
