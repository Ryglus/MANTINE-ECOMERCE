import MainLayout from "../layouts/index-layout";
import FsCarousel from "./index/_components/fs-carousel.component";
import ProductShowcaseButtonGroup from "./index/_components/showcase-categories-buttongroup.component";
import ProductRecommendedSection from "../components/product-recomended-section.component";
import SvgPageBg from "../components/ui/svg-page-bg.component";

export default function Page() {
    return (
        <MainLayout takeSpace={false}>
            <FsCarousel/>
            <SvgPageBg>
                <ProductShowcaseButtonGroup/>
                <ProductRecommendedSection title="Recomended for men" category={"men's clothing"}/>
                <ProductRecommendedSection title="Recomended for women" size={"lg"} category={"women's clothing"}/>
                <ProductRecommendedSection title="Some fire accessories" size={"sm"} category={"jewelery"}/>
            </SvgPageBg>
        </MainLayout>
    );
}
