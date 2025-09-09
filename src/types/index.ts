
export interface UserProps {
  id: number;
  name: string;
  email: string
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[]
}

export interface Post {
  id: number;
  judul: string;
  konten: string;
  duplikasi: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: number;
}
