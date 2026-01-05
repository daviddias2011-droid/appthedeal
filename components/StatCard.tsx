
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass: string;
  onClick?: () => void;
  children?: React.ReactNode;
  isExpanded?: boolean;
  tooltipText?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, colorClass, onClick, children, isExpanded, tooltipText }) => {
  return (
    <div className={`bg-brand-gray border border-brand-border rounded-lg ${onClick ? 'cursor-pointer hover:border-brand-primary/50' : ''} transition-all`}>
      <div className="p-4 flex items-center gap-4 relative" onClick={onClick}>
        <div className={`p-3 rounded-md ${colorClass}`}>
          {icon}
        </div>
        <div className="group">
          <p className="text-sm text-brand-text-secondary flex items-center gap-1">
            {label}
            {tooltipText && (
                <span className="text-gray-400 cursor-help">(?)</span>
            )}
          </p>
          <p className="text-xl font-bold text-brand-text">{value}</p>
          {tooltipText && (
            <div className="absolute bottom-full left-0 mb-2 w-64 bg-brand-text text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none shadow-lg">
                {tooltipText}
            </div>
          )}
        </div>
      </div>
      {isExpanded && children && (
        <div className="p-4 border-t border-brand-border animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default StatCard;
