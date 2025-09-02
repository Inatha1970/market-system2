import { useState, useEffect } from 'react';
import { salesAPI } from '../services/api';
import { DollarSign, Package, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await salesAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value={`$${dashboardData?.today_sales?.total_amount || 0}`}
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="Week's Sales"
          value={`$${dashboardData?.week_sales?.total_amount || 0}`}
          icon={TrendingUp}
          color="text-blue-600"
        />
        <StatCard
          title="Month's Sales"
          value={`$${dashboardData?.month_sales?.total_amount || 0}`}
          icon={Calendar}
          color="text-purple-600"
        />
        <StatCard
          title="Total Sales"
          value={`$${dashboardData?.total_sales?.total_amount || 0}`}
          icon={Package}
          color="text-indigo-600"
        />
      </div>

      {/* Recent Sales */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Sales</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Your latest transactions</p>
        </div>
        <ul className="divide-y divide-gray-200">
          {dashboardData?.recent_sales?.map((sale) => (
            <li key={sale.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{sale.product_name}</div>
                    <div className="text-sm text-gray-500">
                      {sale.customer_name} • Qty: {sale.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">${sale.total_amount}</div>
                  <div className="text-sm text-gray-500">{sale.receipt_number}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;