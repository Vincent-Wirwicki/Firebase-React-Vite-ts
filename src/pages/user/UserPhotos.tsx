import {
  DocumentData,
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import PhotosGrid from "../../components/ui/PhotosGrid";
import { PhotoDataType, DocPhotosType } from "../../types/Types";

interface Props {
  userRef: string;
}

const UserPhotos: React.FC<Props> = ({ userRef }) => {
  const [photos, setPhotos] = useState<Array<DocPhotosType> | undefined>([]);

  useEffect(() => {
    const getUserPhotos = async () => {
      if (userRef) {
        const photosRef = collection(db, "photos");
        const q = query(
          photosRef,
          where("authorId", "==", userRef),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const photos: Array<DocPhotosType> = [];
        querySnapshot.forEach(doc => {
          return photos.push({
            id: doc.id,
            data: doc.data() as PhotoDataType,
          });
        });
        setPhotos(photos);
      }
    };
    getUserPhotos();
    console.log(photos);
  }, []);

  return (
    <div>
      {photos ? (
        <PhotosGrid photos={photos} />
      ) : (
        <div>there is nothing here</div>
      )}
    </div>
  );
};

export default UserPhotos;
