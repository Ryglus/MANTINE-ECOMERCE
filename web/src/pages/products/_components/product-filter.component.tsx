import React from 'react';
import {Accordion, Button, Divider, RangeSlider, Rating, Select, Stack, TextInput} from '@mantine/core';

interface ProductFilterProps {
    nameFilter: string;
    minPrice: number | undefined;
    maxPrice: number | undefined;
    minRating: number | undefined;
    categoryFilter: string | null;
    categories?: string[];
    setNameFilter: (value: string) => void;
    setMinPrice: (value: number | undefined) => void;
    setMaxPrice: (value: number | undefined) => void;
    setMinRating: (value: number | undefined) => void;
    handleCategoryChange: (value: string | null) => void;
    clearFilters: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
                                                         nameFilter,
                                                         minPrice,
                                                         maxPrice,
                                                         minRating,
                                                         categoryFilter,
                                                         categories,
                                                         setNameFilter,
                                                         setMinPrice,
                                                         setMaxPrice,
                                                         setMinRating,
                                                         handleCategoryChange,
                                                         clearFilters,
                                                     }) => {
    return (
        <div>
            <Accordion defaultValue="filters">
                <Accordion.Item value="filters">
                    <Accordion.Control>
                        Filters
                    </Accordion.Control>

                    <Accordion.Panel>
                        <Stack>
                            <TextInput
                                label="Search by name"
                                placeholder="Enter product name"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.currentTarget.value)}
                                size="md"
                            />
                            <Divider label="Category" labelPosition="center" />
                            <Select
                                label="Category"
                                placeholder="Pick a category"
                                data={categories || []}
                                value={categoryFilter}
                                onChange={handleCategoryChange}
                                clearable
                                size="md"
                            />
                            <Divider label="Price Range" labelPosition="center" />
                            <RangeSlider
                                my={"lg"}
                                defaultValue={[minPrice || 0, maxPrice || 0]}
                                onChange={(val) => {setMinPrice(val[0]); setMaxPrice(val[1]);}}
                                min={0}
                                max={1000}
                                step={10}
                                labelAlwaysOn
                                marks={[
                                    { value: 0, label: '$0' },
                                    { value: 500, label: '$500' },
                                    { value: 1000, label: '$1000' },
                                ]}
                                size="md"
                            />
                            <Divider label="Rating" labelPosition="center" />
                            <Rating value={minRating} fractions={2} onChange={(value) => setMinRating(Number(value))} />
                            <Button fullWidth variant="outline" color="red" onClick={clearFilters} mt="sm">
                                Clear Filters
                            </Button>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default ProductFilter;
