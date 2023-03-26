import { Photo } from '@/types/types';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import type { LightGallery } from 'lightgallery/lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGalleryComponent from 'lightgallery/react';
import Image from 'next/image';
import { useRef } from 'react';
import Masonry from 'react-masonry-css';

type GalleryProps = {
  photos: Photo[];
};

function Gallery({ photos }: GalleryProps) {
  const lightboxRef = useRef<LightGallery | null>(null);

  return (
    <>
      <Masonry breakpointCols={3} className="flex gap-4" columnClassName="">
        {photos.map((photo, index) => (
          <div key={photo.src} className="relative">
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              className="my-4 relative"
            />
            <div
              className="absolute w-full h-full inset-0 bg-transparent hover:bg-stone-900 hover:bg-opacity-10 cursor-pointer"
              onClick={() => {
                lightboxRef.current?.openGallery(index);
              }}
            ></div>
          </div>
        ))}
      </Masonry>
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightboxRef.current = ref.instance;
          }
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.src,
        }))}
      />
    </>
  );
}

export default Gallery;
