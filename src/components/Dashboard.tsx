import React from 'react';

interface DashboardProps {
  user?: any;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#C9A961', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Bem-vindo ao Dashboard</h1>
      {user && <p>Usuário: {user.name || user.email}</p>}
      <button onClick={onLogout} style={{ marginTop: 24, padding: 10, background: '#C9A961', color: '#222', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>
        Sair
      </button>
    </div>
  );
};

export default Dashboard;
