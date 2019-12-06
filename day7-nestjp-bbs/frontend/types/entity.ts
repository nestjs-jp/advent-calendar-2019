export interface ItemData {
  id: number;
  title: string;
  body: string;
  deletePassword: string;
  createdAt: number;
}

export interface CommentData {
  id: number;
  itemId: number;
  body: string;
  createdAt: number;
}
