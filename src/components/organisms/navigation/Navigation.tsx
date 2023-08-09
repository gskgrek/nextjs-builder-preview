import { builder } from '@builder.io/sdk'

import { BUILDER_API_KEY } from 'utils/constants'

builder.init(BUILDER_API_KEY)

export const Navigation = async () => {
  const links = await builder.getAll('navigation', { prerender: false })

  return (
    <nav>
      {links?.map((link, index) => (
        <span key={index}>
          <a href={link?.data?.internalUrl.value.data.url}>{link?.data?.label}</a>
          {index < links.length - 1 && ' | '}
        </span>
      ))}
    </nav>
  )
}
