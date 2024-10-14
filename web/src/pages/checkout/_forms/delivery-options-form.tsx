import {useState} from 'react';
import {IconBuildingWarehouse, IconTruckDelivery} from '@tabler/icons-react';
import {Badge, Card, Grid, Group, Radio, RadioGroup, Text} from '@mantine/core';
import {ShippingCompanyOptions, shippingOptions} from '../../../lib/api/dto/shipping.dto';
import {DeliveryData} from "../../../lib/api/dto/checkout.dto";

interface DeliveryOptionsFormProps {
    form: { values: DeliveryData; setFieldValue: (field: string, value: any) => void };
}

export default function DeliveryOptionsForm({ form }: DeliveryOptionsFormProps) {
    const [selectedOption, setSelectedOption] = useState(form.values.shippingOption?.company +"-" +form.values.shippingOption?.option.optionName);

    const getIconByDeliveryType = (deliveryType: string) => {
        switch (deliveryType) {
            case 'home':
                return <IconTruckDelivery size={30} />;
            case 'pickup':
                return <IconBuildingWarehouse size={30} />;
            default:
                return null;
        }
    };

    const handleSelectionChange = (value: string) => {
        setSelectedOption(value);
        const selectedShippingOption = shippingOptions
            .flatMap((company) =>
                company.options.map((option) => ({
                    ...option,
                    company: company.company,
                    uniqueValue: `${company.company}-${option.optionName}`,
                }))
            )
            .find((option) => option.uniqueValue === value);

        if (selectedShippingOption) {
            form.setFieldValue('shippingOption', {
                company: selectedShippingOption.company,
                option: selectedShippingOption,
            });
        }
    };

    return (
        <RadioGroup value={selectedOption} onChange={handleSelectionChange}>
            <Grid gutter="md">
                {shippingOptions.map((companyOption: ShippingCompanyOptions) => (
                    <Grid.Col key={companyOption.company} span={{ base: 12, sm: 6, md: 4 }}>
                        <Card shadow="sm" padding="lg" withBorder>
                            <Text fw={500} size="lg" mb="sm">
                                {companyOption.company}
                            </Text>

                            {companyOption.options.map((method) => (
                                <Card key={method.optionName} shadow="xs" padding="md" mt="sm" withBorder>
                                    <Group p="apart">
                                        <Text size="sm">{method.optionName}</Text>
                                        {getIconByDeliveryType(method.deliveryType)}
                                    </Group>

                                    <Group p="apart" mt="xs">
                                        <Badge color="green">{method.estimatedDeliveryTime}</Badge>
                                        <Badge color="blue">{method.price}</Badge>
                                    </Group>

                                    <Radio
                                        value={`${companyOption.company}-${method.optionName}`}
                                        label={`Choose ${method.optionName}`}
                                        mt="md"
                                    />
                                </Card>
                            ))}
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </RadioGroup>
    );
}
