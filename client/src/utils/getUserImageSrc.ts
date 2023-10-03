const getUserImageSrc = (imageId: number) =>
  `/avatars/${imageId.toString()}.png`;

export default getUserImageSrc;
