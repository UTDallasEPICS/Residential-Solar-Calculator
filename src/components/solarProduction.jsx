
import { PrimeReactProvider } from "primereact/api";
import { Knob } from 'primereact/knob';
import { RadioButton } from 'primereact/radiobutton';
import Chart, { layouts } from 'chart.js/auto'
import { Chart as PrimeChart } from 'primereact/chart';
import { React, useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import panel from '../assets/panel.png';
import inverter from '../assets/inverter.png'
import battery from '../assets/battery.png'
import payback from '../assets/payback.png'
import annotationPlugin from 'chartjs-plugin-annotation';
import { useLocation } from 'react-router-dom';


const SolarProduction = () => {
    Chart.register(annotationPlugin);

    const [consumption, setConsumption] = useState(100); //default value is 100%
    const [components, setComponents] = useState("neither"); //default value is only panels included

    const [pieData, setPieData] = useState({});
    const [pieOptions, setPieOptions] = useState({});
    const [barData, setBarData] = useState({});
    const [barOptions, setBarOptions] = useState({});

    const location = useLocation();
    const PVWResult_JSON = location.state.response;
    const monthlyEnergyUse = location.state.annualEnergyUse / 12;
    const ac_annual = PVWResult_JSON?.ac_annual || '';
    const capacity_factor = PVWResult_JSON?.capacity_factor || '';
    const num_batteries = PVWResult_JSON?.num_batteries || '';
    const num_panels = (PVWResult_JSON?.num_panels * (consumption / 100)).toFixed(0) || '';
    const pv_system = PVWResult_JSON?.pv_system || '';
    const pv_cost = (PVWResult_JSON?.pv_cost * (consumption / 100)).toFixed(2) || '';
    const solrad_annual = PVWResult_JSON?.solrad_annual || '';
    const ac_monthly = PVWResult_JSON?.monthly_ac


    useEffect(() => {


        const costData = {
            labels: ['Panels', 'Batteries', 'Inverters'],
            datasets: [
                {
                    label: 'Cost',
                    data: [pv_cost, 0, 0], //need to change to include batteries and inverters if selected
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const costOptions = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        };


        const monthlyProdData = [
            ac_monthly[0].toFixed(2),
            ac_monthly[1].toFixed(2),
            ac_monthly[2].toFixed(2),
            ac_monthly[3].toFixed(2),
            ac_monthly[4].toFixed(2),
            ac_monthly[5].toFixed(2),
            ac_monthly[6].toFixed(2),
            ac_monthly[7].toFixed(2),
            ac_monthly[8].toFixed(2),
            ac_monthly[9].toFixed(2),
            ac_monthly[10].toFixed(2),
            ac_monthly[11].toFixed(2)
        ];

        const prodData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Cost',
                    data: monthlyProdData,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const prodOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: false,
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: monthlyEnergyUse, // Value where the line should be
                            borderColor: 'red',
                            borderWidth: 2,

                        },
                        label1: {
                            type: 'label',
                            position: 'start',
                            yValue: monthlyEnergyUse,
                            content: 'Your Average Monthly Energy Consumption',
                            font: {
                                size: 12
                            },
                            color: 'red'
                        }
                    }
                }
            }

        };

        setPieData(costData);
        setPieOptions(costOptions);
        setBarData(prodData);
        setBarOptions(prodOptions);
    }, [consumption, components]);

    return (
        <PrimeReactProvider value={{ unstyled: true }}>
            <section id="layout" className="flex mb-4  h-screen bg-white">
                <div className="w-1/6 flex flex-col items-center gap-4 h-screen bg-slate-200">
                    <div className="text-bold text-xl text-center text-black mt-8">Advanced Settings</div>
                    <Card>
                        <div className="bg-white border border-slate-300 h-1/2 w-5/6 text-slate-400 ml-4">
                            <div className="flex items-center justify-center p-2">
                                <Knob
                                    ptOptions={{ mergeSections: false }}
                                    pt={{
                                        range: 'stroke-current transition duration-100 ease-in stroke-gray-200 dark:stroke-gray-700 fill-none',
                                        value: 'animate-dash-frame  stroke-blue-500 fill-none',
                                        label: 'text-center text-xl'
                                    }}
                                    min={0}
                                    max={100}
                                    value={consumption}
                                    onChange={(e) => setConsumption(e.value)}
                                />
                            </div>
                            <div className="justify-center items-center text-center font-bold">
                                Percentage Covered By Solar
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="bg-white border border-slate-300 h-1/2 w-5/6 p-4 text-slate-400 mb-4 ml-4">
                            <div className="flex flex-wrap gap-3">
                                <div className="font-bold">Solar Energy System</div>
                                <div className="flex align-items-center mt-3 ml-1">
                                    <RadioButton inputId="option1" value="neither" onChange={(e) => setComponents(e.value)} checked={components === 'neither'} />
                                    <label htmlFor="option1" className="ml-2">Only Panels</label>
                                </div>
                                <div className="flex align-items-center ml-1">
                                    <RadioButton inputId="option2" disabled value="batteries" onChange={(e) => setComponents(e.value)} checked={components === 'batteries'} />
                                    <label htmlFor="option2" className="ml-2">Panels & Batteries</label>
                                </div>
                                <div className="flex align-items-center ml-1">
                                    <RadioButton inputId="option3" disabled value="inverters" onChange={(e) => setComponents(e.value)} checked={components === 'inverters'} />
                                    <label htmlFor="option3" className="ml-2">Panels & Inverters</label>
                                </div>
                                <div className="flex align-items-center ml-1">
                                    <RadioButton inputId="option4" disabled value="all" onChange={(e) => setComponents(e.value)} checked={components === 'all'} />
                                    <label htmlFor="option4" className="ml-2">Panels, Batteries, & Inverters</label>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-screen mb-40 mt-5">
                    <div className="flex gap-4 w-full mt-4">
                        <div className="bg-white rounded-sm ml-8 p-2 flex-1 border border-gray-200 flex items-center">
                            <div className="rounded-full h-20 w-20 flex items-center justify-center">
                                <img src={panel} className="text-2xl text-white" />
                            </div>
                            <div className="pl-6">
                                <span className="text-sm text-gray-500 font-light">Solar Panels</span>
                                <div className="flex items-center">
                                    <strong className="text-2xl text-gray-700 font-semibold">{num_panels}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-sm p-2 flex-1 border border-gray-200 flex items-center">
                            <div className="rounded-full h-20 w-20 flex items-center justify-center">
                                <img src={battery} className="text-2xl text-white" />
                            </div>
                            <div className="pl-6">
                                <span className="text-sm text-gray-500 font-light">Batteries</span>
                                <div className="flex items-center">
                                    <strong className="text-2xl text-gray-700 font-semibold">TBD</strong>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-sm mr-8 p-2 flex-1 border border-gray-200 flex items-center">
                            <div className="rounded-full h-20 w-20 flex items-center justify-center">
                                <img src={inverter} className="text-2xl text-white" />
                            </div>
                            <div className="pl-6">
                                <span className="text-sm text-gray-500 font-light">Inverters</span>
                                <div className="flex items-center">
                                    <strong className="text-2xl text-gray-700 font-semibold">TBD</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex h-full mt-4 ml-8">
                        <div className="w-1/3 m-4">
                            <div className="h-80 border border-slate-200 m-auto position-relative flex flex-col">
                                <div className="mt-4 ml-4 font-light text-xl text-gray-500">Total Investment</div>
                                <div className="mt-2 text-4xl text-gray-700 font-semibold text-center">${pv_cost}</div>
                                <div className="mt-4 overflow-auto">
                                    <PrimeChart type="pie" data={pieData} options={pieOptions} className="md:w-30rem ml-12" />
                                </div>
                            </div>

                            <div className="h-1/4">
                                <div className="flex gap-4 w-full mt-4 bg-white rounded-sm p-2 flex-1 border border-gray-200 items-center position-relative">
                                    <div className="rounded-full h-20 w-20 flex items-center justify-center">
                                        <img src={payback} className="text-2xl text-white" />
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 font-light">Payback Period</span>
                                        <div className="flex items-center">
                                            <strong className="text-2xl text-gray-700 font-semibold">TBD</strong>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 m-4">
                            <div className=" h-2/3 m-auto border border-slate-200 position-relative">
                                <div className="m-4 text-xl text-gray-500 font-light text-center">Estimated Monthly Solar Production</div>
                                <div className="w-5/6 m-auto">
                                    <PrimeChart type="bar" data={barData} options={barOptions} width={600} height={250} className="md:w-30rem ml-8 mr-8" />
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </section >
        </PrimeReactProvider >
    );
}
export default SolarProduction;