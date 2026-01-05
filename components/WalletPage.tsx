
import React from 'react';
// FIX: Corrected import path for types.
import { User, Transaction } from '../types';
import { WalletIcon, ArrowRightIcon } from './Icons';

interface WalletPageProps {
  user: User;
  transactions: Transaction[];
}

const WalletPage: React.FC<WalletPageProps> = ({ user, transactions }) => {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary font-display flex items-center gap-3">
                        <WalletIcon className="w-8 h-8 text-brand-primary"/>
                        Minha Carteira
                    </h1>
                    <p className="text-brand-text-secondary mt-1">Gerencie seus ganhos e transações.</p>
                </div>
                 <div className="text-left sm:text-right">
                    <p className="text-sm text-brand-text-secondary">Saldo Disponível</p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400 bg-[length:200%_auto] animate-background-pan">
                        {currencyFormatter.format(user.balance)}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                    onClick={() => alert('Funcionalidade de saque em desenvolvimento.')}
                    className="w-full bg-gradient-to-br from-yellow-500 to-brand-primary text-brand-dark font-bold py-3 px-6 rounded-md hover:brightness-110 transition-all duration-300">
                    Solicitar Saque
                </button>
                 <button 
                    onClick={() => alert('Funcionalidade de adicionar fundos em desenvolvimento.')}
                    className="w-full bg-brand-light-gray text-brand-text-secondary font-bold py-3 px-6 rounded-md hover:bg-brand-border hover:text-brand-text transition-colors">
                    Adicionar Fundos
                </button>
            </div>

            <main>
                <h2 className="text-2xl font-bold text-brand-text font-display mb-4">Histórico de Transações</h2>
                <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden">
                    <ul className="divide-y divide-brand-border">
                        {transactions.map(tx => (
                            <li key={tx.id} className="p-4 flex justify-between items-center hover:bg-brand-light-gray/50 transition-colors">
                                <div>
                                    <p className="font-bold text-brand-text">{tx.description}</p>
                                    <p className="text-sm text-brand-text-secondary">{tx.date}</p>
                                </div>
                                <p className={`font-bold text-lg ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                                    {tx.type === 'credit' ? '+' : ''}{currencyFormatter.format(tx.amount)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="text-center mt-6">
                    <button className="text-brand-primary font-bold hover:underline inline-flex items-center gap-2">
                        Ver todas as transações <ArrowRightIcon className="w-4 h-4"/>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default WalletPage;
