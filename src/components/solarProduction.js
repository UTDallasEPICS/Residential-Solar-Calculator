import {
    RingProgress, Center, Container, Space,
    MantineProvider, rem, Skeleton, Grid, SimpleGrid, Text
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mantine/charts';
import classes from './Stats.module.css'


const PRIMARY_COL_HEIGHT = rem(500);
const SolarProduction = () => {

    const location = useLocation();
    const PVWResult_JSON = location.state.response;
    const monthlyEnergyUse = location.state.annualEnergyUse / 12;
    const ac_annual = PVWResult_JSON?.ac_annual || '';
    const capacity_factor = PVWResult_JSON?.capacity_factor || '';
    const num_batteries = PVWResult_JSON?.num_batteries || '';
    const num_panels = PVWResult_JSON?.num_panels || '';
    const pv_system = PVWResult_JSON?.pv_system || '';
    const pv_cost = PVWResult_JSON?.pv_cost || '';
    const solrad_annual = PVWResult_JSON?.solrad_annual || '';
    const ac_monthly = PVWResult_JSON?.monthly_ac

    const data = [
        { month: 'Jan', energy: ac_monthly[0].toFixed(2) },
        { month: 'Feb', energy: ac_monthly[1].toFixed(2) },
        { month: 'Mar', energy: ac_monthly[2].toFixed(2) },
        { month: 'Apr', energy: ac_monthly[3].toFixed(2) },
        { month: 'May', energy: ac_monthly[4].toFixed(2) },
        { month: 'Jun', energy: ac_monthly[5].toFixed(2) },
        { month: 'Jul', energy: ac_monthly[6].toFixed(2) },
        { month: 'Aug', energy: ac_monthly[7].toFixed(2) },
        { month: 'Sep', energy: ac_monthly[8].toFixed(2) },
        { month: 'Oct', energy: ac_monthly[9].toFixed(2) },
        { month: 'Nov', energy: ac_monthly[10].toFixed(2) },
        { month: 'Dec', energy: ac_monthly[11].toFixed(2) }
    ];

    // const info = [
    //     {
    //       title: 'Annual Solar Production (kWh)',
    //       stats: ac_annual.toFixed(2),
    //     },
    //     {
    //       title: 'Annual Solar Radiation (kWh/m2/day)',
    //       stats: solrad_annual.toFixed(2),
    //     },
    //     {
    //       title: 'Panels Needed',
    //       stats: num_panels,
    //     },
    //   ];

    // const stats = info.map((stat) => (
    //     <div key={stat.title} className={classes.stat}>
    //         <Text className={classes.title}>{stat.title}</Text>
    //         <Text className={classes.count}>{stat.stats}</Text>
    //     </div>
    // ));

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    return (
        <MantineProvider>
            <Container my="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Container bg='var(--mantine-color-gray-3)'>
                        <Space w="400px" />
                    </Container>
                    <Grid gutter="md">
                        <Grid.Col>
                            <Container size="xs" bg='var(--mantine-color-blue-light)'>
                                <Text ta="center">Estimated Monthly Solar Production (kWh)</Text>
                                <Space h="lg" />
                                <BarChart
                                    h={200}
                                    data={data}
                                    dataKey="month"
                                    series={[
                                        { name: 'energy', color: 'violet.6' }
                                    ]}
                                    referenceLines={[
                                        {
                                            y: monthlyEnergyUse,
                                            color: 'red.5',
                                            label: 'Your Monthly Energy Consumption',
                                            labelPosition: 'insideBottomRight',
                                        },
                                    ]}
                                    withTooltip={false}
                                />
                                <Space h="md" />
                            </Container>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Container bg='var(--mantine-color-gray-3)' radius="25px">
                                <Center>
                                    <RingProgress
                                        bg="ffffff"
                                        sections={[{ value: Math.round(capacity_factor), color: 'teal' }]}
                                        label={
                                            <Text c="teal" fw={700} ta="center" size="xl">{Math.round(capacity_factor)}%</Text>
                                        }
                                    />
                                </Center>
                                <Text ta="center">Predicted Energy Generated out of Max Panel Output</Text>
                                <Space h="lg" />
                            </Container>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            </Container>
        </MantineProvider>
    );
}


export default SolarProduction;



