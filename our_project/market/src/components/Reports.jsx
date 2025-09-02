import { useState, useEffect } from 'react';
import { reportsAPI } from '../services/api';
import { FileText, Download, Send, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await reportsAPI.getAll();
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType) => {
    setGenerating(true);
    try {
      const response = await reportsAPI.generate(reportType);
      setReports([response.data, ...reports]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  const downloadReport = (report) => {
    const reportData = {
      reportType: report.report_type,
      period: `${report.start_date} to ${report.end_date}`,
      totalSales: report.total_sales,
      totalQuantity: report.total_quantity,
      totalTransactions: report.total_transactions,
      generatedAt: report.generated_at
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sales-report-${report.report_type}-${report.start_date}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reportTypeLabels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    semi_yearly: 'Semi-Yearly'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Sales Reports</h2>
      </div>

      {/* Generate Reports */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Generate New Report</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(reportTypeLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => generateReport(type)}
              disabled={generating}
              className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Calendar className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">{label}</span>
            </button>
          ))}
        </div>
        {generating && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Generating report...
          </div>
        )}
      </div>

      {/* Reports List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Generated Reports</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your sales reports are automatically sent to admin
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {reports.map((report) => (
            <li key={report.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {reportTypeLabels[report.report_type]} Report
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(report.start_date), 'MMM dd')} - {format(new Date(report.end_date), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-gray-400">
                      Generated: {format(new Date(report.generated_at), 'PPp')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${report.total_sales}</div>
                    <div className="text-xs text-gray-500">
                      {report.total_transactions} transactions
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.sent_to_admin && (
                      <div className="flex items-center text-green-600" title="Sent to Admin">
                        <Send className="h-4 w-4" />
                      </div>
                    )}
                    <button
                      onClick={() => downloadReport(report)}
                      className="p-2 text-indigo-600 hover:text-indigo-900"
                      title="Download Report"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No reports generated</h3>
          <p className="mt-1 text-sm text-gray-500">Generate your first sales report above</p>
        </div>
      )}
    </div>
  );
};

export default Reports;