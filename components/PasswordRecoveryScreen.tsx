
import React, { useState } from 'react';
import { ArrowLeftIcon, CheckCircleIcon } from './Icons';

interface PasswordRecoveryScreenProps {
  onBackToLogin: () => void;
}

const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log(`Password recovery requested for: ${email}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark p-4 relative">
        {!submitted && (
            <button
            onClick={onBackToLogin}
            className="absolute top-8 left-8 text-brand-text-secondary hover:text-white group flex items-center gap-2 z-10 transition-colors"
            aria-label="Voltar para o Login"
            >
            <ArrowLeftIcon className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-widest">Voltar</span>
            </button>
        )}
      <div className="w-full max-w-sm">
        <div className="bg-brand-gray border border-brand-border rounded-lg p-8 shadow-xl">
            {submitted ? (
                <div className="text-center">
                    <CheckCircleIcon className="w-16 h-16 text-brand-primary mx-auto mb-4"/>
                    <h2 className="text-2xl font-bold text-white font-display mb-2">Verifique seu e-mail</h2>
                    <p className="text-brand-text-secondary mb-6">Se uma conta com este e-mail existir, enviamos um link para redefinir sua senha.</p>
                     <button
                        onClick={onBackToLogin}
                        className="w-full font-bold py-3 px-6 rounded-md bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Voltar para o Login
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-white font-display mb-2">Recuperar Senha</h2>
                    <p className="text-brand-text-secondary mb-6">Insira seu e-mail e enviaremos um link para você voltar a acessar sua conta.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-brand-text-secondary mb-1">Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-brand-light-gray border border-brand-border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full font-bold py-3 px-6 rounded-md bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark hover:brightness-110 transition-all duration-300"
                        >
                            Enviar Link de Recuperação
                        </button>
                    </form>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryScreen;
