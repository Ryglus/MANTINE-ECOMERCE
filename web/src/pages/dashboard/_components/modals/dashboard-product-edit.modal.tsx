// components/modals/ProductModal.tsx
import React from 'react';
import {Button, Group, Modal, TextInput} from '@mantine/core';
import {Product} from "../../../../lib/api/dto/product.dto";

interface ProductModalProps {
    opened: boolean;
    onClose: () => void;
    productData: Product;
    setProductData: (product: Product) => void;
    onSave: () => void;
    isEditing: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
                                                       opened,
                                                       onClose,
                                                       productData,
                                                       setProductData,
                                                       onSave,
                                                       isEditing,
                                                   }) => {
    return (
        <Modal opened={opened} onClose={onClose} title={isEditing ? 'Edit Product' : 'Create Product'}>
            <TextInput
                label="Product Name"
                value={productData.title}
                onChange={(e) => setProductData({ ...productData, title: e.currentTarget.value })}
                mb="sm"
            />
            <TextInput
                label="Price"
                type="number"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: parseFloat(e.currentTarget.value) })}
                mb="sm"
            />
            <TextInput
                label="Description"
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.currentTarget.value })}
                mb="sm"
            />
            <TextInput
                label="Category"
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.currentTarget.value })}
                mb="sm"
            />
            <TextInput
                label="Image URL"
                value={productData.image}
                onChange={(e) => setProductData({ ...productData, image: e.currentTarget.value })}
                mb="sm"
            />
            <Group gap="right" mt="md">
                <Button onClick={onSave}>{isEditing ? 'Update' : 'Create'}</Button>
            </Group>
        </Modal>
    );
};

export default ProductModal;
