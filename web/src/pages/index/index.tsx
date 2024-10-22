import MainLayout from "../../layouts/index-layout";
import FsCarousel from "./_components/fs-carousel.component";
import ProductShowcaseButtonGroup from "./_components/showcase-categories-buttongroup.component";
import ProductRecommendedSection from "../../components/product-recomended-section.component";
import SvgPageBg from "../../components/common/svg-page-bg.component";
import useDynamicTitle from "../../hooks/useDynamicTitle";

export default function Page() {
    useDynamicTitle(`Home`);
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
