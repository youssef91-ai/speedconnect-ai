export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: "draft" | "published";
  read_time: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface AiTool {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  rating: number;
  badge: string;
  color: string;
  is_free: boolean;
  user_count: string;
  status: "active" | "pending" | "archived";
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalTools: number;
  activeTools: number;
  pendingTools: number;
}
