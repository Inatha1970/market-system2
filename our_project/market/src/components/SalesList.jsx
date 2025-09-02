import { useState, useEffect } from 'react';
import { salesAPI } from '../services/api';
import { Receipt, Eye, Download } from 'lucide-react';
import { format } from 'date-fns';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await salesAPI.getAll();
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewReceipt = async (saleId) => {
    try {
      const response = await salesAPI.getReceipt(saleId);
      setSelectedReceipt(response.data);
    } catch (error) {
      console.error('Error fetching receipt:', error);
    }
  };

  const printReceipt = (sale) => {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${sale.receipt_number}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; margin: 5px 0; }
            .total { border-top: 1px solid #000; padding-top: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>SALES RECEIPT</h2>
            <p>Receipt #: ${sale.receipt_number}</p>
          </div>
          <div class="row"><span>Date:</span><span>${format(new Date(sale.sale_date), 'PPP')}</span></div>
          <div class="row"><span>Product:</span><span>${sale.product_name}</span></div>
          <div class="row"><span>Quantity:</span><span>${sale.quantity}</span></div>
          <div class="row"><span>Unit Price:</span><span>$${sale.unit_price}</span></div>
          <div class="row"><span>Customer:</span><span>${sale.customer_name}</span></div>
          ${sale.customer_email ? `<div class="row"><span>Email:</span><span>${sale.customer_email}</span></div>` : ''}
          ${sale.customer_phone ? `<div class="row"><span>Phone:</span><span>${sale.customer_phone}</span></div>` : ''}
          <div class="row total"><span>Total Amount:</span><span>$${sale.total_amount}</span></div>
          ${sale.notes ? `<div style="margin-top: 20px;"><strong>Notes:</strong><br>${sale.notes}</div>` : ''}
        </body>
      </html>
    `);
    receiptWindow.document.close();
    receiptWindow.print();
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
      <h2 className="text-xl font-bold text-gray-900">Sales History</h2>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sales.map((sale) => (
            <li key={sale.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Receipt className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{sale.product_name}</div>
                    <div className="text-sm text-gray-500">
                      {sale.customer_name} • {format(new Date(sale.sale_date), 'PPp')}
                    </div>
                    <div className="text-xs text-gray-400">Receipt: {sale.receipt_number}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {sale.quantity} × ${sale.unit_price} = ${sale.total_amount}
                    </div>
                  </div>
                  <button
                    onClick={() => viewReceipt(sale.id)}
                    className="p-2 text-indigo-600 hover:text-indigo-900"
                    title="View Receipt"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => printReceipt(sale)}
                    className="p-2 text-green-600 hover:text-green-900"
                    title="Print Receipt"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {sales.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No sales yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start selling products to see your sales history</p>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Receipt Details</h3>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Receipt Number:</span>
                <span>{selectedReceipt.receipt_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{format(new Date(selectedReceipt.sale_date), 'PPP')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Product:</span>
                <span>{selectedReceipt.product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{selectedReceipt.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Unit Price:</span>
                <span>${selectedReceipt.unit_price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span>{selectedReceipt.customer_name}</span>
              </div>
              {selectedReceipt.customer_email && (
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{selectedReceipt.customer_email}</span>
                </div>
              )}
              {selectedReceipt.customer_phone && (
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{selectedReceipt.customer_phone}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-3 text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">${selectedReceipt.total_amount}</span>
              </div>
              {selectedReceipt.notes && (
                <div className="border-t pt-3">
                  <span className="font-medium">Notes:</span>
                  <p className="text-sm text-gray-600 mt-1">{selectedReceipt.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => printReceipt(selectedReceipt)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesList;