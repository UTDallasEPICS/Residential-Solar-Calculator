import { PrimeReactProvider } from "primereact/api";
import { Knob } from "primereact/knob";
import { RadioButton } from "primereact/radiobutton";
import Chart from "chart.js/auto";
import { Chart as PrimeChart } from "primereact/chart";
import { React, useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import panel from "../assets/panel.png";
import battery from "../assets/battery.png";
import payback from "../assets/payback.png";
import annotationPlugin from "chartjs-plugin-annotation";
import { useLocation } from "react-router-dom";

const SolarProduction = () => {
  Chart.register(annotationPlugin);

  const [consumption, setConsumption] = useState(100); //default value is 100%
  const [components, setComponents] = useState("solar"); //default value is solar only

  const [pieData, setPieData] = useState({});
  const [pieOptions, setPieOptions] = useState({});
  const [barData, setBarData] = useState({});
  const [barOptions, setBarOptions] = useState({});

  const location = useLocation();
  const { PVWResult_JSON } = location.state || {};

  const annualCost = PVWResult_JSON?.annualCost || 0;
  const og_battery_capacity = PVWResult_JSON?.battery_capacity || "";
  const num_panels =
    Math.ceil(
      (consumption / 100) *
        Math.ceil(
          (PVWResult_JSON?.num_panels[0] + PVWResult_JSON?.num_panels[1]) / 2
        )
    ) || "";
  const panel_cost = Math.round(PVWResult_JSON?.panel_cost) || "";
  const pv_system_cost = panel_cost * num_panels || "";
  const og_battery_cost = PVWResult_JSON?.battery_cost || "";
  const monthlyEnergyUse = PVWResult_JSON?.annualEnergyUse / 12;
  const ac_monthly = PVWResult_JSON?.ac_monthly || "";

  const [battery_capacity, setBatteryCapacity] = useState(0);
  const [battery_cost, setBatteryCost] = useState(0);
  const totalCost = battery_cost + pv_system_cost || "";
  const paybackPeriod = Math.ceil(
    totalCost / ((consumption / 100) * (annualCost / 12))
  );

  useEffect(() => {
    const costData = {
      labels: ["Panels", "Batteries"],
      datasets: [
        {
          label: "Cost",
          data: [pv_system_cost, battery_cost, 0], //need to change to include batteries and inverters if selected
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const costOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          position: "right",
        },
      },
    };

    const monthlyProdData = [
      ac_monthly[0].toFixed(2) * num_panels,
      ac_monthly[1].toFixed(2) * num_panels,
      ac_monthly[2].toFixed(2) * num_panels,
      ac_monthly[3].toFixed(2) * num_panels,
      ac_monthly[4].toFixed(2) * num_panels,
      ac_monthly[5].toFixed(2) * num_panels,
      ac_monthly[6].toFixed(2) * num_panels,
      ac_monthly[7].toFixed(2) * num_panels,
      ac_monthly[8].toFixed(2) * num_panels,
      ac_monthly[9].toFixed(2) * num_panels,
      ac_monthly[10].toFixed(2) * num_panels,
      ac_monthly[11].toFixed(2) * num_panels,
    ];

    const prodData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "kWh",
          data: monthlyProdData,
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const prodOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            line1: {
              type: "line",
              mode: "horizontal",
              scaleID: "y",
              value: monthlyEnergyUse, // Value where the line should be
              borderColor: "red",
              borderWidth: 2,
            },
            label1: {
              type: "label",
              position: "start",
              yValue: monthlyEnergyUse,
              content: "Your Average Monthly Energy Consumption",
              font: {
                size: 12,
              },
              color: "red",
            },
          },
        },
      },
    };

    setPieData(costData);
    setPieOptions(costOptions);
    setBarData(prodData);
    setBarOptions(prodOptions);
  }, [consumption, components]);

  return (
    <PrimeReactProvider value={{ unstyled: true }}>
      <section id="layout" className="flex bg-white overflow-auto">
        <div className="w-1/4 p-6 bg-gradient-to-b from-gray-100 to-gray-200 shadow-xl rounded-l-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Advanced Settings
            </h2>
          </div>

          <Card className="p-6 bg-white rounded-lg shadow-md mb-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-sm text-gray-500 font-semibold">
                Coverage By Solar
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Knob
                  ptOptions={{ mergeSections: false }}
                  pt={{
                    range:
                      "stroke-current transition duration-100 ease-in stroke-gray-200 dark:stroke-gray-700 fill-none",
                    value: "animate-dash-frame stroke-blue-500 fill-none",
                    label: "text-center text-xl",
                  }}
                  min={0}
                  max={100}
                  value={consumption}
                  onChange={(e) => setConsumption(e.value)}
                  strokeWidth={6}
                  style={{ width: "80px", height: "80px", marginRight: "15px" }}
                />
                <InputNumber
                  value={consumption}
                  onValueChange={(e) => setConsumption(e.value)}
                  min={0}
                  max={100}
                  suffix="%"
                  size="5"
                  inputClassName="text-center w-16 text-black mt-2 ml-3"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col gap-4">
              <div className="text-sm text-gray-500 font-semibold">
                Solar Energy System
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <RadioButton
                    inputId="option1"
                    value="solar"
                    onChange={(e) => {
                      setComponents(e.value);
                      setBatteryCapacity(0);
                      setBatteryCost(0);
                    }}
                    checked={components === "solar"}
                  />
                  <label htmlFor="option1" className="ml-2 text-gray-700">
                    Solar Only
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioButton
                    inputId="option2"
                    value="batteries"
                    onChange={(e) => {
                      setComponents(e.value);
                      setBatteryCapacity(og_battery_capacity);
                      setBatteryCost(og_battery_cost);
                    }}
                    checked={components === "batteries"}
                  />
                  <label htmlFor="option2" className="ml-2 text-gray-700">
                    Battery Backup
                  </label>
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
                <span className="text-sm text-gray-500 font-light">
                  Solar Panels
                </span>
                <div className="flex items-center">
                  <strong className="text-2xl text-gray-700 font-semibold">
                    {num_panels}
                  </strong>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-sm p-2 mr-4 flex-1 border border-gray-200 flex items-center">
              <div className="rounded-full h-20 w-20 flex items-center justify-center">
                <img src={battery} className="text-2xl text-white" />
              </div>
              <div className="pl-6">
                <span className="text-sm text-gray-500 font-light">
                  Battery Capacity
                </span>
                <div className="flex items-center">
                  <strong className="text-2xl text-gray-700 font-semibold">
                    {battery_capacity} kWh
                  </strong>
                </div>
                <span className="text-sm text-gray-500 font-light">
                  *Capacity to support backup energy for 1 day
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-full mt-4 ml-4">
            <div className="w-1/3 m-4">
              <div className="h-80 border border-slate-200 m-auto position-relative flex flex-col">
                <div className="mt-4 ml-4 font-light text-xl text-gray-500">
                  Total Investment
                </div>
                <div className="mt-2 text-4xl text-gray-700 font-semibold text-center">
                  ${totalCost}
                </div>
                <div className="mt-4 overflow-auto">
                  <PrimeChart
                    type="pie"
                    data={pieData}
                    options={pieOptions}
                    className="md:w-30rem ml-12"
                  />
                </div>
              </div>

              <div className="h-1/4">
                <div className="flex gap-4 w-full mt-4 bg-white rounded-sm p-2 flex-1 border border-gray-200 items-center position-relative">
                  <div className="rounded-full h-20 w-20 flex items-center justify-center">
                    <img src={payback} className="text-2xl text-white" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 font-light">
                      Payback Period
                    </span>
                    <div className="flex items-center">
                      <strong className="text-2xl text-gray-700 font-semibold">
                        {paybackPeriod} Months
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-2/3 p-4">
              <div className="h-[500px] border border-slate-200 flex flex-col p-4">
                <div className="text-xl text-gray-500 font-light text-center">
                  Estimated Monthly Solar Production
                </div>
                <div className="w-full h-full mt-4">
                  <PrimeChart
                    type="bar"
                    data={barData}
                    options={barOptions}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PrimeReactProvider>
  );
};
export default SolarProduction;
