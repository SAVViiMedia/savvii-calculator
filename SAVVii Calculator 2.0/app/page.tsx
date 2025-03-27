// The corrected version of the component with proper nesting and tag closure
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FunnelProjectionApp() {
  const [inputs, setInputs] = useState({
    churnRate: 10,
    dailyAdSpend: 300,
    registrationCost: 15,
    sloConversion: 25,
    showUpRate: 32,
    closeRate: 20,
    upgradeRate: 20,
    sloPrice: 17,
    membershipPrice: 97,
    upgradePrice: 5000,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const monthlyAdSpend = Math.ceil(inputs.dailyAdSpend * 30);
  const registrations = submitted ? Math.ceil(monthlyAdSpend / inputs.registrationCost) : 0;
  const sloSales = Math.ceil(registrations * (inputs.sloConversion / 100));
  const sloRevenue = Math.ceil(sloSales * inputs.sloPrice);
  const attendees = Math.ceil(registrations * (inputs.showUpRate / 100));
  const membershipSales = Math.ceil(attendees * (inputs.closeRate / 100));
  const membershipRevenue = Math.ceil(membershipSales * inputs.membershipPrice);
  const upgrades = Math.ceil(membershipSales * (inputs.upgradeRate / 100));
  const upgradeRevenue = Math.ceil(upgrades * inputs.upgradePrice);

  const churnRate = inputs.churnRate / 100;
  const months = 12;
  const mrrData = [];
  const costVsRevenueMonthlyData = [];
  let activeMembers = 0;

  for (let i = 1; i <= months; i++) {
    activeMembers = activeMembers * (1 - churnRate) + membershipSales;
    const mrr = Math.ceil(activeMembers * inputs.membershipPrice);
    mrrData.push({ month: `Month ${i}`, value: mrr });

    const monthlyRevenue = sloRevenue + mrr + upgradeRevenue;
    costVsRevenueMonthlyData.push({
      month: `Month ${i}`,
      adSpend: monthlyAdSpend,
      revenue: monthlyRevenue,
      mrr,
    });
  }

  const formatNumber = (num) => num.toLocaleString();
  const formatCurrency = (num) => `$${Math.ceil(num).toLocaleString()}`;

  return (
    <div className="p-6 grid gap-6 max-w-4xl mx-auto bg-gradient-to-br from-orange-100 via-white to-yellow-50 rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-black text-orange-600 tracking-tight leading-tight drop-shadow-lg bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 bg-clip-text text-transparent">Webinar Growth Calculator</h1>
      </div>
      <Card className="border-orange-500 shadow-xl rounded-2xl">
        <CardContent className="grid gap-4 p-4 bg-white rounded-xl">
          <h2 className="text-sm font-semibold text-center text-indigo-600 uppercase tracking-widest">Set Your Funnel Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-left font-medium text-sm text-gray-700">Daily Ad Spend ($)</div>
              <input
                type="range"
                name="dailyAdSpend"
                min="50"
                max="5000"
                step="50"
                value={inputs.dailyAdSpend}
                onChange={(e) => setInputs({ ...inputs, dailyAdSpend: parseFloat(e.target.value) })}
                className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
              />
<div className="text-sm text-center mt-1">${inputs.dailyAdSpend.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-left font-medium text-sm text-gray-700">Registration Cost ($)</div>
              <input
                type="range"
                name="registrationCost"
                min="3"
                max="30"
                step="1"
                value={inputs.registrationCost}
                onChange={(e) => setInputs({ ...inputs, registrationCost: parseFloat(e.target.value) })}
                className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
              />
              <div className="text-sm text-center mt-1">${inputs.registrationCost.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-left font-medium text-sm text-gray-700">SLO Price ($)</div>
              <input
                type="range"
                name="sloPrice" min="0"
                max="97"
                step="1"
                value={inputs.sloPrice}
                onChange={(e) => setInputs({ ...inputs, sloPrice: parseFloat(e.target.value) })}
                className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
              />
              <div className="text-sm text-center mt-1">${inputs.sloPrice.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-left font-medium text-sm text-gray-700">SLO Conversion Rate (%)</div>
              <input
                type="range"
                name="sloConversion"
                min="0"
                max="100"
                step="1"
                value={inputs.sloConversion}
                onChange={(e) => setInputs({ ...inputs, sloConversion: parseFloat(e.target.value) })}
                className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
              />
              <div className="text-sm text-center mt-1">{inputs.sloConversion.toLocaleString()}%</div>
            </div>
            <div>
  <div className="text-left font-medium text-sm text-gray-700">Show Up Rate (%)</div>
  <input
    type="range"
    name="showUpRate"
    min="1"
    max="100"
    step="1"
    value={inputs.showUpRate}
    onChange={(e) => setInputs({ ...inputs, showUpRate: parseFloat(e.target.value) })}
    className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
  />
  <div className="text-sm text-center mt-1">{inputs.showUpRate.toLocaleString()}%</div>
</div>
            <div>
  <div className="text-left font-medium text-sm text-gray-700">Webinar Close Rate (%)</div>
  <input
    type="range"
    name="closeRate"
    min="1"
    max="100"
    step="1"
    value={inputs.closeRate}
    onChange={(e) => setInputs({ ...inputs, closeRate: parseFloat(e.target.value) })}
    className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
  />
  <div className="text-sm text-center mt-1">{inputs.closeRate.toLocaleString()}%</div>
</div>
            <div>
  <div className="text-left font-medium text-sm text-gray-700">Membership Price ($)</div>
  <input
    type="range"
    name="membershipPrice"
    min="27"
    max="297"
    step="1"
    value={inputs.membershipPrice}
    onChange={(e) => setInputs({ ...inputs, membershipPrice: parseFloat(e.target.value) })}
    className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
  />
  <div className="text-sm text-center mt-1">${inputs.membershipPrice.toLocaleString()}</div>
</div>
            <div>
  <div className="text-left font-medium text-sm text-gray-700">Churn Rate (%)</div>
  <input
    type="range"
    name="churnRate"
    min="1"
    max="100"
    step="1"
    value={inputs.churnRate}
    onChange={(e) => setInputs({ ...inputs, churnRate: parseFloat(e.target.value) })}
    className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
  />
  <div className="text-sm text-center mt-1">{inputs.churnRate.toLocaleString()}%</div>
</div>
            <div>
  <div className="text-left font-medium text-sm text-gray-700">High-Ticket Price ($)</div>
  <input
    type="range"
    name="upgradePrice"
    min="1000"
    max="25000"
    step="100"
    value={inputs.upgradePrice}
    onChange={(e) => setInputs({ ...inputs, upgradePrice: parseFloat(e.target.value) })}
    className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
  />
  <div className="text-sm text-center mt-1">${inputs.upgradePrice.toLocaleString()}</div>
</div>
            <div>
  <div className="text-left font-medium text-sm text-gray-700">High-Ticket Close Rate (%)</div>
  <input
    type="range"
    name="upgradeRate"
    min="1"
    max="100"
    step="1"
    value={inputs.upgradeRate}
    onChange={(e) => setInputs({ ...inputs, upgradeRate: parseFloat(e.target.value) })}
    className="w-full h-2 bg-indigo-400 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500"
  />
  <div className="text-sm text-center mt-1">{inputs.upgradeRate.toLocaleString()}%</div>
</div>
          </div>
          <div className="mt-4 w-1/2 mx-auto text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-4 px-4 rounded-md shadow-md w-full flex flex-col items-center" onClick={handleSubmit}>
              <span className="text-base font-semibold">Webinar Funnel Results</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {submitted && (
        <>
          <Card className="border-orange-300">
  <CardContent className="p-4 text-center">
    <h2 className="text-xl font-bold mb-2 text-orange-600">Funnel Projection Summary</h2>
              <ul className="grid gap-2 justify-center">
                <li><strong>Registrations:</strong> {formatNumber(registrations)}</li>
                <li><strong>SLO Sales:</strong> {formatNumber(sloSales)} ({formatCurrency(sloRevenue)})</li>
                <li><strong>Attendees:</strong> {formatNumber(attendees)}</li>
                <li><strong>Membership Sales:</strong> {formatNumber(membershipSales)} ({formatCurrency(membershipRevenue)})</li>
                <li><strong>High-Ticket Calls:</strong> {formatNumber(Math.ceil(membershipSales * 0.9))}</li>
<li><strong>High-Ticket Sales:</strong> {formatNumber(upgrades)} ({formatCurrency(upgradeRevenue)})</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-300">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-2 text-orange-600 text-center">Monthly Cost vs Revenue</h2>
              <div className="flex justify-center">
              <ResponsiveContainer width="95%" height={250}>
                <LineChart data={costVsRevenueMonthlyData}>
                  <XAxis dataKey="month" tickFormatter={(value) => value.replace('Month ', '')} label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                  <YAxis width={80} tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="adSpend" stroke="#FF6600" strokeWidth={2} name="Ad Spend" />
                  <Line type="monotone" dataKey="revenue" stroke="#28a745" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="mrr" stroke="#8884d8" strokeWidth={2} name="MRR" />
                </LineChart>
              </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase border-b border-gray-300">
                    <tr>
                      <th scope="col" className="px-2 py-1">Month</th>
                      <th scope="col" className="px-2 py-1">Ad Spend</th>
                      <th scope="col" className="px-2 py-1">MRR</th>
                      <th scope="col" className="px-2 py-1">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costVsRevenueMonthlyData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-2 py-1 whitespace-nowrap">{row.month}</td>
                        <td className="px-2 py-1 whitespace-nowrap">{formatCurrency(row.adSpend)}</td>
                        <td className="px-2 py-1 whitespace-nowrap">{formatCurrency(row.mrr)}</td>
                        <td className={`px-2 py-1 whitespace-nowrap ${row.revenue - row.adSpend >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(row.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-gray-300 font-semibold">
                    <tr>
                      <td className="px-2 py-1">Total</td>
                      <td className="px-2 py-1">{formatCurrency(costVsRevenueMonthlyData.reduce((sum, row) => sum + row.adSpend, 0))}</td>
                      <td className="px-2 py-1">{formatCurrency(costVsRevenueMonthlyData.reduce((sum, row) => sum + row.mrr, 0))}</td>
                      <td className="px-2 py-1">{formatCurrency(costVsRevenueMonthlyData.reduce((sum, row) => sum + row.revenue, 0))}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
