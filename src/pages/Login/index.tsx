import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { useAuth } from '../../auth/AuthContext';

export default function Login() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
}