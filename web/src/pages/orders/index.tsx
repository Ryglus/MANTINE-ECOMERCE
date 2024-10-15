import {useState} from "react";
import {Box, Container, Loader} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import MainLayout from "../../layouts/index-layout";
import SvgPageBg from "../../components/svg-page-bg.component";
import {DataTable} from "mantine-datatable";
import {useOrderData} from "../../lib/api/order.api";

export default function OrderListPage() {
    const { ordersQuery, usersQuery, productsQuery } = useOrderData();

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    if (ordersQuery.isLoading || usersQuery.isLoading || productsQuery.isLoading) {
        return (
            <SvgPageBg>
                <MainLayout>
                    <Loader />
                </MainLayout>
            </SvgPageBg>
        );
    }

    if (ordersQuery.isError || usersQuery.isError || productsQuery.isError) {
        return (
            <SvgPageBg>
                <MainLayout>
                    <Box>Error loading data. Please try again later.</Box>
                </MainLayout>
            </SvgPageBg>
        );
    }

    const orders = ordersQuery.data || [];
    const users = usersQuery.data || [];
    const products = productsQuery.data || [];

    const paginatedOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const getUserNameById = (userId: number) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown User";
    };

    const getProductDetailsById = (productId: number) => {
        const product = products.find((product) => product.id === productId);
        return product ? `${product.title} ($${product.price})` : "Unknown Product";
    };

    return (
        <SvgPageBg>
            <MainLayout>
                <Container size={"xl"} bg={"dark"}>
                    <DataTable
                        withTableBorder
                        borderRadius="sm"
                        withColumnBorders
                        striped
                        highlightOnHover
                        minHeight={150}
                        records={paginatedOrders}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'Order ID',
                                textAlign: 'right',
                            },
                            {
                                accessor: 'userId',
                                title: 'User'
                            },
                            {
                                accessor: 'date',
                                title: 'Date',
                            },
                            {
                                accessor: 'products',
                                title: 'Products',
                                render: (record) =>
                                    record.products.map((product) => (
                                        <Box key={product.productId} fw={700}>
                                            {getProductDetailsById(product.productId)} - Quantity: {product.quantity}
                                        </Box>
                                    )),
                            },
                        ]}
                        onRowClick={({ record }) =>
                            showNotification({
                                title: `Order #${record.id} Clicked`,
                                message: `You clicked on order #${record.id} placed by user ${getUserNameById(
                                    record.userId
                                )}`,
                                withBorder: true,
                            })
                        }
                        page={page}
                        totalRecords={orders.length}
                        recordsPerPage={PAGE_SIZE}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}
