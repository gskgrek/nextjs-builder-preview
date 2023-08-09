// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx

import { builder } from '@builder.io/sdk'
import { GetServerSidePropsContext, Metadata } from 'next'

import { BUILDER_API_KEY } from 'utils/constants'

import { Footer, Navigation } from 'components'
import { RenderBuilderContent } from 'components/builder'

// Replace with your Public API Key
builder.init(BUILDER_API_KEY)

// Define the expected shape of the props
// object passed to the Page function
interface PageProps {
  params: {
    page: string[]
  }
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get('page', {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: '/' + (props?.params?.page?.join('/') || ''),
      },
      // Set prerender to false to prevent infinite rendering loops
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise()

  return {
    title: content?.data.title,
  }
}

// Async function called Page takes a single
// argument called props of type PageProps
export default async function Page(props: PageProps) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get('page', {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: '/' + (props?.params?.page?.join('/') || ''),
      },
      // Set prerender to false to prevent infinite rendering loops
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise()

  return (
    <>
      {/* Render the Builder page */}
      <Navigation />
      <RenderBuilderContent content={content} />
      <Footer />
    </>
  )
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get('page', {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        url: context.resolvedUrl,
      },
    })
    // Convert the result to a promise
    .promise()

  return {
    props: { content },
  }
}
