import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setStatus('error');
        setMessage(data.msg || 'Verification failed. The link may have expired.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader size={48} className="mx-auto text-primary mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
