import {useState} from 'react';
import {IconBuildingWarehouse, IconCubeSend, IconTruckDelivery} from '@tabler/icons-react';
import {Badge, Card, Flex, Grid, Group, Radio, RadioGroup, Text} from '@mantine/core';
import {ShippingCompanyOptions, shippingOptions} from '../../../lib/api/dto/shipping.dto';
import {DeliveryData} from '../../../lib/api/dto/checkout.dto';

interface DeliveryOptionsFormProps {
    form: { values: DeliveryData; setFieldValue: (field: string, value: any) => void };
}

export default function DeliveryOptionsForm(
    {
        form
    }: DeliveryOptionsFormProps) {

    const [selectedOption, setSelectedOption] = useState(
        form.values.shippingOption?.company + '-' + form.values.shippingOption?.option.optionName
    );

    const getIconByDeliveryType = (deliveryType: string) => {
        switch (deliveryType) {
            case 'home':
                return <IconTruckDelivery size={30} />;
            case 'pickup':
                return <IconBuildingWarehouse size={30} />;
            case 'express':
                return <IconCubeSend size={34} />;
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
        <RadioGroup value={selectedOption} onChange={handleSelectionChange} p={"md"}>
            <Grid gutter="md">
                {shippingOptions.map((companyOption: ShippingCompanyOptions) => (
                    <Grid.Col key={companyOption.company} span={{ base: 12, sm: 6, md: 4 }}>
                        <div>
                            <Text fw={600} size="lg">
                                {companyOption.company}
                            </Text>
                            {companyOption.options.map((method) => (
                                <Card
                                    key={method.optionName}
                                    shadow="md"
                                    radius="md"
                                    mt={"md"}
                                    className="cursor-pointer transition hover:shadow-lg hover:bg-primary-100"
                                    onClick={() =>
                                        handleSelectionChange(`${companyOption.company}-${method.optionName}`)
                                    }
                                >
                                    <Flex justify="space-between" align="center">
                                        <Group gap="sm">
                                            <Radio
                                                className="cursor-pointer"
                                                value={`${companyOption.company}-${method.optionName}`}
                                                checked={selectedOption === `${companyOption.company}-${method.optionName}`}
                                                color="primary"
                                            />
                                            <Text size="md">{method.optionName}</Text>
                                        </Group>
                                        {getIconByDeliveryType(method.deliveryType)}
                                    </Flex>

                                    <Group mt="sm">
                                        <Badge color="green" variant="light">{method.estimatedDeliveryTime}</Badge>
                                        <Badge color="blue" variant="light">{method.price}</Badge>
                                    </Group>
                                </Card>
                            ))}
                        </div>
                    </Grid.Col>
                ))}
            </Grid>
        </RadioGroup>
    );
}
