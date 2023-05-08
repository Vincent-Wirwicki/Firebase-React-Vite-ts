import "../../styles/components/ui/photosGrid.css";
// import { useState } from "react";
import { DocPhotosType, UserRefType } from "../../types/Types";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// import Container from "@mui/material/Container";

interface Props {
  photos: Array<DocPhotosType>;
  user?: DocumentData | UserRefType;
  users?: UserRefType[];
  // user?: Array<DocType
}

const PhotosGrid: React.FC<Props> = ({ photos, user, users }) => {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <Box>
      <ImageList
        variant="masonry"
        gap={6}
        sx={{
          columnCount: {
            xs: "1 !important",
            sm: "2 !important",
            md: "3 !important",
            lg: "3 !important",
            xl: "3 !important",
          },
        }}
      >
        {photos.map(({ id, data: { title, likes, tags, url } }) => (
          <ImageListItem
            key={id}
            onMouseEnter={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
            component={RouterLink}
            to={`/photo/${id}`}
          >
            <img src={`${url}`} srcSet={`${url}`} alt={title} loading="lazy" />
            {hover === id && (
              <div>
                <ImageListItemBar
                  title={
                    user ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ widht: 40, height: 40 }}>M</Avatar>
                        <Typography
                          variant="body1"
                          m={2}
                          component={RouterLink}
                          sx={{ color: "inherit", textDecoration: "none" }}
                          to={`/user/${user.uid}`}
                        >
                          {user.userName}
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )
                  }
                  position="bottom"
                />
                <ImageListItemBar title={title} position="top" />
              </div>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default PhotosGrid;
