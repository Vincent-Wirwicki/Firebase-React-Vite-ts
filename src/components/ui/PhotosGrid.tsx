import "../../styles/components/ui/photosGrid.css";
// import { useState } from "react";
import { DocPhotosType } from "../../types/Types";

interface Props {
  photos: Array<DocPhotosType>;
}

const PhotosGrid: React.FC<Props> = ({ photos }) => {
  return (
    <div className="photo__grid__wrap">
      <div className="photo__grid__layout">
        {photos.map(({ id, data: { author, title, likes, tags, url } }) => (
          <div key={id} id={id} className="photo__grid__card">
            <div className="photo__grid__card__wrap__img">
              <img src={url} alt={title} className="photo__grid__card__img" />
            </div>
            <div className="photo__grid__car__info">
              <p>{title}</p>
              <p>{author}</p>
              {tags.map((tag, i) => (
                <p key={i}>{tag}</p>
              ))}
              <p>{likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosGrid;
