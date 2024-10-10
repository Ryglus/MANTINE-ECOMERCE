import MainLayout from "../layouts/index-layout";
import FsCarousel from "./index/_components/fs-carousel.component";
import ProductShowcaseButtonGroup from "./index/_components/showcase-categories-buttongroup.component";
import ProductRecommendedSection from "../components/product-recomended-section.component";
import SvgTopPageBg from "../components/svg-top-page-bg.component";

export default function Page() {
    return (
        <MainLayout takeSpace={false}>
            <FsCarousel/>
            <SvgTopPageBg>
                <ProductShowcaseButtonGroup/>
                <ProductRecommendedSection title="Recomended for men" category={"men's clothing"}/>
                <ProductRecommendedSection title="Some fire accessories" category={"jewelery"}/>
            </SvgTopPageBg>
        </MainLayout>
    );
}
