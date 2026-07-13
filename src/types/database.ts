export interface Post {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
}

export interface Project {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  tech_stack: string[] | null;
}
