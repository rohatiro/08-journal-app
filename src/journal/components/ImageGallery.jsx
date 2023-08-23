import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={'Imagen de la nota'}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: '/assets/stock_dog.png',
    title: 'Breakfast',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Burger',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Camera',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Coffee',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Hats',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Honey',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Basketball',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Fern',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Mushrooms',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Tomato basil',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Sea star',
  },
  {
    img: '/assets/stock_dog.png',
    title: 'Bike',
  },
];