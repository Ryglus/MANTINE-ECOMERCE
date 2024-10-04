import MainLayout from "../layouts/index-layout";
import FsCarousel from "./index/_components/fs-carousel.component";
import ProductShowcaseButtonGroup from "./index/_components/showcase-categories-buttongroup.component";
import ProductShowcase from "./index/_components/product-showcase.component";
import IndexFooter from "./index/_components/index-footer.component";


export default function Page() {
    return (
        <MainLayout>
            <FsCarousel/>
            <div className="my-5" />
            <ProductShowcaseButtonGroup/>
            <ProductShowcase/>
            <IndexFooter/>
        </MainLayout>
    );
}
