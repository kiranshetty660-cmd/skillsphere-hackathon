import React from 'react';
import classNames from 'classnames';

type ColorKey = 'violet' | 'blue' | 'teal' | 'green' | 'amber' | 'orange' | 'pink' | 'red' | 'indigo' | 'cyan';

export const Chip = ({ color, children, className, onClick, active }: { color: ColorKey, children: React.ReactNode, className?: string, onClick?: () => void, active?: boolean }) => (
  <span 
    className={classNames('chip', color, className, { active })} 
    onClick={onClick}
    style={onClick ? { cursor: 'pointer' } : undefined}
  >
    {children}
  </span>
);

export const ProgressBar = ({ percent, color, className }: { percent: number, color: ColorKey, className?: string }) => (
  <div className={classNames('progress-track', className)}>
    <div className={`progress-fill pf-${color}`} style={{ width: `${percent}%` }}></div>
  </div>
);

export const StatCard = ({ title, value, trend, icon, color }: { title: string, value: string | number, trend: string, icon: string, color: ColorKey }) => (
  <div className={`stat-card ${color}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{title}</div>
    <div className="stat-trend">{trend}</div>
  </div>
);
