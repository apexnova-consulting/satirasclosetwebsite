import { User, Product, Category, Auction, Bid, Order } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ProductWithRelations = Product & {
  category: Category;
  auction?: Auction & {
    bids: Bid[];
  };
};

export type AuctionWithRelations = Auction & {
  product: Product;
  bids: Bid[];
};

export type BidWithRelations = Bid & {
  user: User;
  auction: Auction;
  product: Product;
};

export type OrderWithRelations = Order & {
  items: OrderItem[];
  user: User;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isAuction: boolean;
};

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: "USER" | "ADMIN";
  }

  interface Session extends DefaultSession {
    user?: User & {
      role: "USER" | "ADMIN";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "USER" | "ADMIN";
  }
}

export interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
} 