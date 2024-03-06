import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let r = {};

  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    r = { photo, user };
  } catch (err) {
    r = { photo: null, user: null };
  }
  return r;
}
