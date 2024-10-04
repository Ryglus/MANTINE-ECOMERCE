import ProductShowcase from "./index.page/_components/product-showcase.component";
import ProductShopperLayout from "./products.page/_layout/product-shopper-layout";

export default function Page() {
    return (
        <ProductShopperLayout>
            <ProductShowcase/>
        </ProductShopperLayout>
    );
}
