export interface Article {
  type_id: number;
  title: string;
  article_content: string;
  introduce: string;
  addTime: number;
  view_count: number;
  id: number;
}

export interface ArticleImage {
  content: string;
  type?:string;
  id: number;
}
