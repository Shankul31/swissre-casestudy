import type { Customer } from '../constants/app.constants';
import axiosInstance from './axiosInstance';

const CUSTOMER_ENDPOINTS = {
  list: 'customers.json',
} as const;

export async function getCustomers() {
  const response = await axiosInstance.get<Customer[]>(CUSTOMER_ENDPOINTS.list, {
    baseURL: import.meta.env.BASE_URL,
  });
  return response.data;
}
