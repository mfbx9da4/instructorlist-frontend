type PageType = {
  path: string
  component: {
    getInitialProps: ((arg0: unknown) => Promise<{}>) | undefined
  }
}

type PageMatch = { match: any; page: PageType }
