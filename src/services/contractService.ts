import api from '../lib/api';
import { ContractTemplate } from '../pages/Deploy/types';

export async function fetchContractTemplates(): Promise<ContractTemplate[]> {
  const response = await api.get('/contract-templates');
  return response.data;
}

export async function deployContract(templateId: string, parameters: Record<string, any>) {
  const response = await api.post(`/contract-templates/${templateId}/deploy`, parameters);
  return response.data;
}

export async function getDeploymentStatus(deploymentId: string) {
  const response = await api.get(`/deployments/${deploymentId}`);
  return response.data;
}

export async function verifyContract(address: string, network: string) {
  const response = await api.post('/contract/verify', { address, network });
  return response.data;
}

export async function getContractRegistry() {
  const response = await api.get('/contract/registry');
  return response.data;
}