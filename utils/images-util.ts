import { Photo } from '@/types/types';
import { createApi } from 'unsplash-js';

export async function getImages(
  client: ReturnType<typeof createApi>,
  query: string,
): Promise<Photo[]> {
  const photos = await client.photos.getRandom({
    count: 8,
    query,
  });

  const mappedPhotos: Photo[] = [];

  if (photos.type === 'success') {
    const responseArr = Array.isArray(photos.response)
      ? photos.response
      : [photos.response];

    const photosArr = responseArr.map((photo, index) => ({
      src: photo.urls.full,
      thumb: photo.urls.thumb,
      width: photo.width,
      height: photo.height,
      alt: photo.alt_description ?? 'ocean-image' + index,
      likes: photo.likes,
    }));

    mappedPhotos.push(...photosArr);
  } else {
    console.error("Couldn't find any photos");
  }

  return mappedPhotos;
}
