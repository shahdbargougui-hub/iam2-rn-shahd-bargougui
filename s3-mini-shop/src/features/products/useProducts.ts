import { api } from "@/lib/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
};

export type ProductDetail = Product & {
  description: string;
  rating: number;
  stock: number;
  brand?: string;
};

export type Category = { slug: string; name: string; url: string };

type ProductPage = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductFilter = { category: string | null; search: string };

const PAGE_SIZE = 20;

// Set to 1500 to simulate a slow network, then back to 0.
const DEBUG_DELAY_MS = 0;

function productsPath(filter: ProductFilter, skip: number): string {
  const paging = `limit=${PAGE_SIZE}&skip=${skip}`;
  const delay = DEBUG_DELAY_MS > 0 ? `&delay=${DEBUG_DELAY_MS}` : "";
  if (filter.search !== "") {
    return `/products/search?q=${encodeURIComponent(filter.search)}&${paging}${delay}`;
  }
  if (filter.category !== null) {
    return `/products/category/${filter.category}?${paging}${delay}`;
  }
  return `/products?${paging}${delay}`;
}

export function useProducts(filter: ProductFilter) {
  return useInfiniteQuery({
    queryKey: ["products", filter],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      api<ProductPage>(productsPath(filter, pageParam)),
    getNextPageParam: (last) =>
      last.skip + last.limit < last.total ? last.skip + last.limit : undefined,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api<Category[]>("/products/categories"),
    staleTime: Infinity,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api<ProductDetail>(`/products/${id}`),
  });
}
