import React, {useEffect, useState} from 'react';
import {Accordion, Badge, Button, Divider, Group, RangeSlider, Rating, Select, Stack, TextInput} from '@mantine/core';
import {Link} from "react-router-dom";

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
    const [searchTerm, setSearchTerm] = useState(nameFilter);
    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([minPrice || 0, maxPrice || 1000]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setNameFilter(searchTerm);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, setNameFilter]);

    const handlePriceRangeChangeEnd = (range: [number, number]) => {
        const debounceTimer = setTimeout(() => {
            setMinPrice(range[0]);
            setMaxPrice(range[1]);
        }, 500);

        return () => clearTimeout(debounceTimer);
    };

    const handleClearFilter = (filterType: string) => {
        switch (filterType) {
            case 'name':
                setSearchTerm('');
                setNameFilter('');
                break;
            case 'category':
                handleCategoryChange(null);
                break;
            case 'price':
                setLocalPriceRange([0, 1000]);
                setMinPrice(undefined);
                setMaxPrice(undefined);
                break;
            case 'rating':
                setMinRating(undefined);
                break;
            default:
                break;
        }
    };

    const renderActiveFilters = () => (
        <Group>
            {nameFilter && (
                <Badge className={"cursor-pointer"} variant="outline" color="blue" onClick={() => handleClearFilter('name')}>
                    Name: {nameFilter} &times;
                </Badge>
            )}
            {categoryFilter && (
                <Badge className={"cursor-pointer"} variant="outline" color="teal" onClick={() => handleClearFilter('category')}>
                    Category: {categoryFilter} &times;
                </Badge>
            )}
            {(minPrice !== undefined && maxPrice !== undefined) && (
                <Badge className={"cursor-pointer"} variant="outline" color="grape" onClick={() => handleClearFilter('price')}>
                    Price: ${minPrice} - ${maxPrice} &times;
                </Badge>
            )}
            {minRating && (
                <Badge className={"cursor-pointer"} variant="outline" color="orange" onClick={() => handleClearFilter('rating')}>
                    Rating: {minRating}+ &times;
                </Badge>
            )}
        </Group>
    );

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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.currentTarget.value)}
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
                                value={localPriceRange}
                                onChange={setLocalPriceRange}
                                onChangeEnd={handlePriceRangeChangeEnd}
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

                            <Divider label="Active filters" labelPosition="center" />
                            {renderActiveFilters()}
                            <Divider />
                            <Button component={Link} to={"/products"} fullWidth variant="outline" color="red" onClick={clearFilters}>
                                Clear All Filters
                            </Button>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default ProductFilter;
