import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin?: (email: string, password: string) => void;
  error?: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      <form onSubmit={handleSubmit} style={{ background: '#222', padding: 32, borderRadius: 8, minWidth: 320 }}>
        <h2 style={{ color: '#C9A961', marginBottom: 24 }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #444' }}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #444' }}
          required
        />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#C9A961', color: '#222', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
