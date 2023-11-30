import { getAllProducts } from "@/services/productServices";

export default function handler(request, response) {
  return response.status(200).json(getAllProducts());
}
