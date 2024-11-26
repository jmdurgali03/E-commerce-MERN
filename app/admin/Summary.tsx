'use client';

import { Order, Product, User } from "@prisma/client";
import { useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Legend, Bar } from "recharts";

interface SummaryProps {
    orders: Order[];
    products: Product[];
    users: User[];
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: { label: "Total Sale", digit: 0 },
        products: { label: "Total Products", digit: 0 },
        orders: { label: "Total Orders", digit: 0 },
        paidOrders: { label: "Paid Orders", digit: 0 },
        unpaidOrders: { label: "Unpaid Orders", digit: 0 },
        users: { label: "Total Users", digit: 0 },
    });

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [salesData, setSalesData] = useState<{ date: string; total: number }[]>([]);
    const [productSalesData, setProductSalesData] = useState<{ name: string; quantity: number }[]>([]);

    const handleStartDateChange = (value: string) => {
        setStartDate(value);
        if (endDate && new Date(value) > new Date(endDate)) setEndDate(null);
    };

    const handleEndDateChange = (value: string) => {
        if (!startDate || new Date(value) >= new Date(startDate)) setEndDate(value);
        else alert("La fecha final no puede ser menor que la fecha de inicio.");
    };

    const applyFilter = () => {
        const filteredOrders = orders.filter((order) => {
            const orderDate = new Date(order.createdDate).getTime();
            const start = startDate ? new Date(startDate).getTime() : null;
            const end = endDate ? new Date(endDate).getTime() : null;

            if (start && end) return orderDate >= start && orderDate <= end;
            if (start) return orderDate >= start;
            if (end) return orderDate <= end;
            return true;
        });

        const totalSale = filteredOrders.reduce((acc, item) => 
            item.status === "complete" ? acc + item.amount / 100 : acc, 0);

        const paidOrders = filteredOrders.filter((order) => order.status === "complete");
        const unpaidOrders = filteredOrders.filter((order) => order.status === "pending");

        setSummaryData({
            sale: { label: "Total Sale", digit: totalSale },
            products: { label: "Total Products", digit: products.length },
            orders: { label: "Total Orders", digit: filteredOrders.length },
            paidOrders: { label: "Paid Orders", digit: paidOrders.length },
            unpaidOrders: { label: "Unpaid Orders", digit: unpaidOrders.length },
            users: { label: "Total Users", digit: users.length },
        });

        const salesByDate: { [key: string]: number } = {};
        filteredOrders.forEach((order) => {
            const dateKey = new Date(order.createdDate).toISOString().split("T")[0]; // Fecha como string
            if (order.status === "complete") {
                salesByDate[dateKey] = (salesByDate[dateKey] || 0) + order.amount / 100;
            }
        });

        const salesDataArray = Object.entries(salesByDate).map(([date, total]) => ({
            date,
            total,
        }));
        setSalesData(salesDataArray);

        const productQuantities: { [key: string]: number } = {};
        filteredOrders.forEach((order) => {
            order.products.forEach((product) => {
                productQuantities[product.name] = (productQuantities[product.name] || 0) + product.quantity;
            });
        });

        const productDataArray = Object.entries(productQuantities).map(([name, quantity]) => ({
            name,
            quantity,
        }));
        setProductSalesData(productDataArray);
    };

    const chartData = [
        { name: "Paid Orders", value: summaryData.paidOrders.digit },
        { name: "Unpaid Orders", value: summaryData.unpaidOrders.digit },
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <Heading tittle="Stats" center />
            </div>

            <div className="flex gap-4 mb-4 justify-center">
                <input
                    type="date"
                    value={startDate || ""}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="date"
                    value={endDate || ""}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <button
                    onClick={applyFilter}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto mb-6">
                {Object.keys(summaryData).map((key) => (
                    <div
                        key={key}
                        className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
                    >
                        <div className="text-xl md:text-4xl font-bold">
                            {summaryData[key].label === "Total Sale"
                                ? formatPrice(summaryData[key].digit)
                                : formatNumber(summaryData[key].digit)}
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                ))}
            </div>

            {/* Gráfico Circular */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Líneas */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Sales Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

             {/* Gráfico de Barras */}
             <div className="bg-white shadow rounded-lg p-6 mb-6 mt-4" >
                <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productSalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#22c55e" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default Summary;

