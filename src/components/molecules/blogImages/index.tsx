import {
  ImagesContainer,
  ImageContainer,
  StyledImgNoBorder,
  ImageCaption,
  SetMargin,
} from "./styles";

const filterImageData = (
  data: any,
  universalImageHeight: number | undefined
) => {
  return data.map((item: any) => {
    let newWidth = item.width;
    let newHeight = item.height;

    if (universalImageHeight !== undefined) {
      // Calculate the new width based on the aspect ratio
      newWidth = (item.width / item.height) * universalImageHeight;
      newHeight = universalImageHeight;
    }

    return {
      url: item.url,
      width: newWidth,
      height: newHeight,
      title: item.title,
    };
  });
};

interface BlogImagesProps {
  enableImageBorder?: boolean | undefined;
  images: any;
  universalImageHeight?: number | undefined;
  maxImageWidth?: number;
  imageCaption?: string;
}

const BlogImages = ({
  enableImageBorder = true,
  images,
  universalImageHeight,
  imageCaption,
}: BlogImagesProps) => {
  const imagedata = filterImageData(images, universalImageHeight);
  return (
    <SetMargin>
      <ImagesContainer>
        {imagedata.map((image: any) => {
          if (enableImageBorder) {
            return (
              <ImageContainer key={image.id} width={image.width}>
                <img
                  src={image.url}
                  alt={image.title}
                  width={image.width}
                  height={image.height}
                />
              </ImageContainer>
            );
          } else {
            return (
              <StyledImgNoBorder
                key={image.id}
                src={image.url}
                alt={image.title}
                width={image.width}
              />
            );
          }
        })}
      </ImagesContainer>
      <ImageCaption>{imageCaption}</ImageCaption>
    </SetMargin>
  );
};

export default BlogImages;
