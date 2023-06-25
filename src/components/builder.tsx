// components/builder.tsx
'use client'
// Import BuilderComponent and useIsPreviewing hooks from React
// and DefaultErrorPage from Next
import { BuilderComponent, useIsPreviewing } from '@builder.io/react'
import { builder } from '@builder.io/sdk'
import DefaultErrorPage from 'next/error'

import { BUILDER_API_KEY } from 'utils/constants'

// Replace with your Public API Key
builder.init(BUILDER_API_KEY)

// Define an interface for the BuilderPageProps object
// with a `content` property type `any`
interface BuilderPageProps {
  content: any
}

export const RenderBuilderContent = ({ content }: BuilderPageProps) => {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing()
  // If `content` has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model="page" />
  }
  // If the `content` is falsy and the page is
  // not being previewed in Builder, render the
  // DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />
}
