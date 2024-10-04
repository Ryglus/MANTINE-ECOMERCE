import ProductShowcase from "./index/_components/product-showcase.component";
import ProductShopperLayout from "./products/_layout/product-shopper-layout";

export default function Page() {
    return (
        <ProductShopperLayout>
            <ProductShowcase />
        </ProductShopperLayout>
    );
}
