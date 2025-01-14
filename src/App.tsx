import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './auth/AuthContext';
import { WalletProvider } from './web3/WalletContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/index';
import Users from './pages/Users';
import Transactions from './pages/Transactions';
import TokenOperations from './pages/TokenOperations';
import Distribution from './pages/Distribution';
import Tokenomics from './pages/Tokenomics';
import APIManagement from './pages/APIManagement';
import Deploy from './pages/Deploy';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/api-management" element={<APIManagement />} />
                <Route path="/token-operations" element={<TokenOperations />} />
                <Route path="/distribution" element={<Distribution />} />
                <Route path="/deploy" element={<Deploy />} />
                <Route path="/tokenomics" element={<Tokenomics />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </Router>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}