import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation set false to get real-time data
  token  
})

if(!writeClient.config().token) {
    throw new Error("write token not found")
}

