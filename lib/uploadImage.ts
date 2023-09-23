import { ID, storage } from '@/appwrite';

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    '6507c8e98025de6d5490',
    ID.unique(),
    file
  );

  return fileUploaded;
}

export default uploadImage;