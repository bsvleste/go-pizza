import React from 'react'
import { Image } from '@components/Image';
import { PlaceholderImage } from '@components/PlaceholderImage';
type Props = {
  uri?: string | null
}
export function Photo({ uri }: Props) {
  return uri ? <Image source={{ uri }} /> : <PlaceholderImage />
}
parei no minuto 21: 14 modulo03 - parte01