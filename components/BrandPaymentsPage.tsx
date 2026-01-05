import React from 'react';
import { User, Transaction } from '../types';
import { WalletIcon } from './Icons';

interface BrandPaymentsPageProps {
  user: User;
  transactions: Transaction[];
}

const BrandPaymentsPage: React.FC<BrandPaymentsPageProps> = ({ user, transactions }) => {
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    // NOTE: This assumes 'debit' transactions for a brand are payments made.
    // The transaction model might need to be more robust in a real application.
    const paymentsMade = transactions.filter(tx => tx.type === 'debit');
    const totalInvested = paymentsMade.reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-display flex items-center gap-3">
                        <WalletIcon className="w-8 h-8 text-brand-primary"/>
                        Meus Pagamentos
                    </h1>
                    <p className="text-brand-text-secondary mt-1">Acompanhe seus investimentos e transações na plataforma.</p>
                </div>
                 <div className="text-left sm:text-right">
                    <p className="text-sm text-brand-text-secondary">Total Investido</p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-brand-primary to-yellow-400">
                        {currencyFormatter.format(totalInvested)}
                    </p>
                </div>
            </header>

            <main>
                <h2 className="text-2xl font-bold text-white font-display mb-4">Histórico de Pagamentos</h2>
                <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden">
                    {paymentsMade.length > 0 ? (
                        <ul className="divide-y divide-brand-border">
                            {paymentsMade.map(tx => (
                                <li key={tx.id} className="p-4 flex justify-between items-center hover:bg-brand-light-gray/50 transition-colors">
                                    <div>
                                        <p className="font-bold text-brand-text">{tx.description}</p>
                                        <p className="text-sm text-brand-text-secondary">{tx.date}</p>
                                    </div>
                                    <p className="font-bold text-lg text-red-400">
                                        -{currencyFormatter.format(tx.amount)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-brand-text-secondary">Nenhum pagamento registrado ainda.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BrandPaymentsPage;
