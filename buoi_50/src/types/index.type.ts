declare module "express" {
  export interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      avatar: string | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    };
    tokenJti?: string;
    tokenExp?: number;
  }
}