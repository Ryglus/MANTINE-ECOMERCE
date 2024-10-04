
import MainLayout from "../layouts/index-layout.tsx";
import ProductShowcase from "./index.page/_components/product-showcase.component";
import FsCarousel from "./index.page/_components/fs-carousel.component";
import ProductShowcaseButtonGroup from "./index.page/_components/showcase-categories-buttongroup.component";
import IndexFooter from "./index.page/_components/index-footer.component";

export default function Page() {
    return (
        <MainLayout>
            <FsCarousel/>
            <ProductShowcaseButtonGroup/>
            <ProductShowcase/>
            <IndexFooter/>
        </MainLayout>
    );
}
