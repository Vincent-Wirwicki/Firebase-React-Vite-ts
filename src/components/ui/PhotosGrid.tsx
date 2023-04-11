import { Timestamp } from "firebase/firestore";
import "../../styles/components/ui/photosGrid.css";

interface photoType {
  author: string;
  authorId: string;
  description: string;
  title: string;
  url: string;
  likes: number;
  tags: [];
  createdAt: Timestamp;
}

interface docDataType {
  id: string;
  data: photoType;
}

interface Props {
  photos: Array<docDataType>;
}

const PhotosGrid: React.FC<Props> = ({ photos }) => {
  //   photos.map((id, data) => console.log(typeof id, typeof data));
  return (
    <div className="photo__grid__wrap">
      <div className="photo__grid__layout">
        {photos.map(({ id, data: { author, title, likes, tags, url } }) => (
          <div id={id} className="photo__grid__card">
            {/* <img src={photo.data.url} alt="" /> */}
            <div className="photo__grid__card__wrap__img">
              <img src={url} alt="" className="photo__grid__card__img" />
            </div>
            <div className="photo__grid__car__info">
              <p>{author}</p>
              <p>{title}</p>
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
