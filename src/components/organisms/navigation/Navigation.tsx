import { builder } from '@builder.io/sdk'

import { BUILDER_API_KEY } from 'utils/constants'

builder.init(BUILDER_API_KEY)

export const Navigation = async () => {
  const links = await builder.getAll('navigation', { prerender: false })
  console.log(links?.[0].data?.internalUrl?.value.data.url)
  return (
    <nav>
      {links.map((link, index) => (
        <a key={index} href={link.data.internalUrl.value.data.url}>
          {link.data.label}
        </a>
      ))}
    </nav>
  )
}
