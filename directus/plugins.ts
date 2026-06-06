import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createDirectus, rest, readItems, createItem, CollectionType, CreateItemOutput, DirectusClient, NestedPartial, Query, ReadItemOutput, RegularCollections, RestClient, RestCommand, UnpackList } from '@directus/sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const directus = createDirectus(config.public.directusUrl).with(rest())

  return {
    provide: { directus, readItems, createItem }
  }
})


