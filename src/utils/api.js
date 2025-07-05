import axios from 'axios';

const BASE_URL = 'http://server.dexterrtech.com:8000/api/';


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MOCK_MODE = false;// false if backend is ready

// --- MOCK DATA --- //
const mockShops = [
  { id: 'shop123', name: 'SuperMart Andheri', location: 'Andheri, Mumbai', category: 'Grocery' },
  { id: 'shop124', name: 'Salon Pune', location: 'Pune, Maharashtra', category: 'Salon' },
];
const mockCustomers = [
  { phoneNumber: '9876543210', locationsVisited: ['Andheri', 'Bandra'], totalSpent: 1450, categories: ['Grocery', 'Electronics'] },
];
const mockInvoices = [
  { invoiceId: 'inv101', shopId: 'shop123', customerNumber: '9876543210', amount: 750, date: '2025-06-01', category: 'Grocery', location: 'Andheri, Mumbai', whatsappDelivery: true },
];

// --- API FUNCTIONS --- //

// 1. Create Shop (Onboard New Shop)
export async function createShop(data) {
  if (MOCK_MODE) {
    return Promise.resolve({
      data: {
        success: true,
        message: 'Shop created successfully',
        shop: { id: 'shop999', ...data },
      },
    });
  }
  return api.post('business/onboard/', data);
}

// 2. Get All Shops
export async function getShops() {
  if (MOCK_MODE) {
    return Promise.resolve({ data: mockShops });
  }
  return api.get('/shops');
}

// 3. Get Shop Details
export async function getShop(shopId) {
  if (MOCK_MODE) {
    const shop = mockShops.find(s => s.id === shopId);
    return Promise.resolve({ data: shop });
  }
  return api.get(`/shops/${shopId}`);
}

// 4. Get All Customers
export async function getCustomers() {
  if (MOCK_MODE) {
    return Promise.resolve({ data: mockCustomers });
  }
  return api.get('/customers');
}

// 5. Get Customer Details
export async function getCustomer(phoneNumber) {
  if (MOCK_MODE) {
    const customer = mockCustomers.find(c => c.phoneNumber === phoneNumber);
    return Promise.resolve({ data: customer });
  }
  return api.get(`/customers/${phoneNumber}`);
}

// 6. Get All Invoices
export async function getInvoices() {
  if (MOCK_MODE) {
    return Promise.resolve({ data: mockInvoices });
  }
  return api.get('/invoices');
}

// 7. Get Invoice Details
export async function getInvoice(invoiceId) {
  if (MOCK_MODE) {
    const invoice = mockInvoices.find(i => i.invoiceId === invoiceId);
    return Promise.resolve({ data: invoice });
  }
  return api.get(`/invoices/${invoiceId}`);
}

// 8. Analytics Endpoints (customize as needed)
export async function getShopAnalytics() {
  if (MOCK_MODE) {
    return Promise.resolve({ data: { kpis: {}, filters: {} } });
  }
  return api.get('/analytics/shops');
}
export async function getCustomerAnalytics() {
  if (MOCK_MODE) {
    return Promise.resolve({ data: { kpis: {}, filters: {} } });
  }
  return api.get('/analytics/customers');
}
export async function getInvoiceAnalytics() {
  if (MOCK_MODE) {
    return Promise.resolve({ data: { kpis: {}, filters: {} } });
  }
  return api.get('/analytics/invoices');
}
export async function getDashboardAnalytics() {
  if (MOCK_MODE) {
    // Provide a mock response structure similar to backend
    return Promise.resolve({
      data: {
        totalInvoices: { allTime: 7, last7Days: 7, today: 1, custom: null },
        totalRevenue: { allTime: 80432, last7Days: 80432, today: 3100, custom: null },
        uniqueCustomers: { allTime: 7, last7Days: 7, today: 1, custom: null },
        activeShops: { allTime: 2, last7Days: 2, today: 1, custom: null },
        whatsappDelivered: { allTime: 7, last7Days: 7, today: 1, custom: null },
        whatsappNotDelivered: { allTime: 0, last7Days: 0, today: 0, custom: null },
        avgInvoiceValue: { allTime: 11490.29, last7Days: 11490.29, today: 3100, custom: null },
        invoicesPerCustomer: { allTime: 1, last7Days: 1, today: 1, custom: null },
        invoicesPerShop: { allTime: 3.5, last7Days: 3.5, today: 1, custom: null },
        revenueByShop: [
          { shop: 'SUPERMART GROCERY', revenue: 3100 },
          { shop: 'SONAL SHREE CREATION', revenue: 77332 }
        ],
        categoryWisePurchases: [
          { category: 'Grocery', revenue: 3100 },
          { category: 'Textiles', revenue: 77332 }
        ]
      }
    });
  }
  return api.get('/analytics/dashboard/');
}

// --- Error Handling Helper --- //
export function getApiError(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'Unknown error';
}

// --- Usage --- //
// import { getShops, createShop, ... } from '../utils/api';
// Call these functions in your components/pages.
// When backend is ready, set MOCK_MODE = false. 