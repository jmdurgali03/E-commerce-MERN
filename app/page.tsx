export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCar from "./components/products/ProductCart";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";


interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  // algoritm for show aleatory products in home page

  if (products.length === 0) {
    return (
      <NullData title="Oops! No products found. Click 'All' to clear filters"></NullData>
    );
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffleProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2x1:grid-cols-6 gap-8">
          {shuffleProducts.map((product: any) => {
            return <ProductCar data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
