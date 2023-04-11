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

const UserPhotos = () => {
  const [photos, setPhotos] = useState<Array<docDataType> | undefined>([]);

  useEffect(() => {
    const getUserPhotos = async () => {
      if (auth.currentUser) {
        const photosRef = collection(db, "photos");
        const q = query(
          photosRef,
          where("authorId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const photos: Array<docDataType> = [];
        querySnapshot.forEach(doc => {
          return photos.push({
            id: doc.id,
            data: doc.data() as photoType,
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
      {/* <h1> hello im user photos</h1> */}
      <div>
        {photos ? (
          <PhotosGrid photos={photos} />
        ) : (
          <div>there is nothing here</div>
        )}

        {/* {photos ? (
          photos.map(p => <div key={p.id}>{p.data()}</div>)
        ) : (
          <div> something went wrong</div>
        )} */}
      </div>
    </div>
  );
};

export default UserPhotos;
