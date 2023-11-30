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

export default function allListingPage() {
  const { data: products, error, isLoading } = useSWR("/api/products", fetcher);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>loading...</p>;

  if (!products) {
    return <div>is loading...</div>;
  }

  return (
    <>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              Name: {product.name}, Description: {product.description}, Price:{" "}
              {product.price}
              {product.currency}, category: {product.category}
            </li>
          );
        })}
      </ul>
    </>
  );
}
