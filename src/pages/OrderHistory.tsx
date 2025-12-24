import React from "react";

function OrderHistory() {
    return (
        <React.Fragment>
            <div className="mt-8 bg-gray-50">
                <div className="flex flex-wrap justify-between items-center gap-4 px-4 py-3">
                    <p className="text-[#111118] text-4xl font-black leading-tight tracking-[-0.033em]">Order History</p>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-indigo-500 text-white text-sm font-medium leading-normal gap-2">
                        <span className="material-symbols-outlined text-lg">download</span>
                        <span className="truncate">Export All</span>
                    </button>
                </div>
                <div className="mt-6 px-4 py-3 @container">
                    <div className="flex overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
                        <table className="w-full">
                            <thead className="bg-background-light" style={{ backgroundColor: "#f6f6f8" }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider w-1/5">Order #</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider w-1/5">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider w-1/5">Total</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider w-1/5">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider w-1/5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e5e7eb]">
                                <tr>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111118] ">#ORD-12345</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">June 1, 2024</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">$125.50</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="inline-flex items-center rounded-full bg-green-100  px-3 py-1 text-xs font-semibold leading-5 text-green-800 ">Delivered</span>
                                    </td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-primary cursor-pointer hover:underline text-right">View Details</td>
                                </tr>
                                <tr>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111118] ">#ORD-12344</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">May 28, 2024</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">$89.99</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="inline-flex items-center rounded-full bg-green-100  px-3 py-1 text-xs font-semibold leading-5 text-green-800 ">Delivered</span>
                                    </td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-primary cursor-pointer hover:underline text-right">View Details</td>
                                </tr>
                                <tr>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111118] ">#ORD-12343</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">May 25, 2024</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">$210.00</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="inline-flex items-center rounded-full bg-yellow-100  px-3 py-1 text-xs font-semibold leading-5 text-yellow-800">Processing</span>
                                    </td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-primary cursor-pointer hover:underline text-right">View Details</td>
                                </tr>
                                <tr>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111118] ">#ORD-12342</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">May 22, 2024</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">$45.20</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="inline-flex items-center rounded-full bg-red-100  px-3 py-1 text-xs font-semibold leading-5 text-red-800">Cancelled</span>
                                    </td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-primary cursor-pointer hover:underline text-right">View Details</td>
                                </tr>
                                <tr>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111118] ">#ORD-12341</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">May 19, 2024</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-[#6b7280] ">$150.75</td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="inline-flex items-center rounded-full bg-green-100  px-3 py-1 text-xs font-semibold leading-5 text-green-800 ">Delivered</span>
                                    </td>
                                    <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-primary cursor-pointer hover:underline text-right">View Details</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex items-center justify-center p-4 mt-4">
                    <a className="flex size-10 items-center justify-center text-[#6b7280] " href="#">
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </a>
                    <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-indigo-500" href="#">1</a>
                    <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118]  rounded-full hover:bg-background-light " href="#">2</a>
                    <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118]  rounded-full hover:bg-background-light " href="#">3</a>
                    <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#6b7280]  rounded-full">...</span>
                    <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118]  rounded-full hover:bg-background-light " href="#">8</a>
                    <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118]  rounded-full hover:bg-background-light " href="#">9</a>
                    <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111118]  rounded-full hover:bg-background-light " href="#">10</a>
                    <a className="flex size-10 items-center justify-center text-[#6b7280] " href="#">
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </a>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OrderHistory;