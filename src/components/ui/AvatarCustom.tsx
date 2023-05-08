import Avatar from "@mui/material/Avatar";
import { useState } from "react";

interface Props {
  dimension: number;
  url?: string;
  name?: string;
}
const AvatarCustom: React.FC<Props> = ({ dimension, url, name }) => {
  const [isFirebaseUrl, setIsFirebaseUrl] = useState<boolean>(false);

  if (url) {
    url.startsWith("https://firebasestorage.googleapis.com/")
      ? setIsFirebaseUrl(true)
      : setIsFirebaseUrl(false);
  }

  return (
    <Avatar
      sx={{ widht: dimension, height: dimension }}
      src={`${isFirebaseUrl ? url : ""}`}
      alt={`${name}`}
    >
      {isFirebaseUrl ? name && name.charAt(0) : null}
    </Avatar>
  );
};

export default AvatarCustom;
