import "../../styles/components/ui/photosGrid.css";
// import { useState } from "react";
import { DocPhotosType } from "../../types/Types";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import Container from "@mui/material/Container";

interface Props {
  photos: Array<DocPhotosType>;
}

const PhotosGrid: React.FC<Props> = ({ photos }) => {
  return (
    <Box>
      {/* <Box sx={{ width: "50%" }}></Box>        sx={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
      }}*/}
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
        {photos.map(({ id, data: { author, title, likes, tags, url } }) => (
          <ImageListItem key={id}>
            <img
              src={`${url}`}
              srcSet={`${url}`}
              alt={title}
              // className="photo__grid__card__img"
              loading="lazy"
            />
            <ImageListItemBar
              title={title}
              position="bottom"
              subtitle={<span>{author}</span>}
            ></ImageListItemBar>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default PhotosGrid;
