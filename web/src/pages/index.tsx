import PageHeader from "../components/page-header.component.tsx";
import FsCarousel from "./_index.page/components/fs-carousel.component.tsx";

export default function Page() {
    return (
        <div > {/* Full height flex container */}
            <FsCarousel/>
            <PageHeader />


        </div>
    );
}
