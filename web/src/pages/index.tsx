import FsCarousel from "./_index.page/components/fs-carousel.component.tsx";
import ProductShowcase from "./_index.page/components/product-showcase.component.tsx";
import MainLayout from "../layouts/index-layout.tsx";

export default function Page() {
    return (
        <MainLayout>
            <FsCarousel/>
            <ProductShowcase/>
        </MainLayout>
    );
}
