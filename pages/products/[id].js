import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function ProductDetailPage() {
  //  Use the `useRouter` hook to access the `id` query parameter from `router.query`
  const router = useRouter();
  const { id } = router.query;

  // Fetch data for the specific product based on the id
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`/api/products/${id}`, fetcher);

  // Error handling
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  // Handle loading state
  if (!product) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
