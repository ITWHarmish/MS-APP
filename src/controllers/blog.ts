import BlogModel from '../models/blog';
import { IBlog } from '../types/IBlog';

export const allBlogs = async () => {
  const result: any = await BlogModel.find();
  return result;
};

export const createBlog = async (payload: IBlog) => {
  const blogData: any = new BlogModel(payload);
  await blogData.save();
  return blogData;
};

export const updateBlog = async (id: string, payload: IBlog) => {
  await BlogModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteBlog = async (id: string) => {
  console.log("id=>", id);

  await BlogModel.findByIdAndRemove(id);
};
