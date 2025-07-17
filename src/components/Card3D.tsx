import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Card3DVariant = 'default' | 'elevated' | 'subtle';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  variant?: Card3DVariant;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  onClick
}) => {
  const baseClasses = clsx(
    'card-3d',
    `card-3d-${variant}`,
    { 'card-3d-interactive': interactive },
    className
  );

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      whileHover={interactive ? {
        scale: 1.02,
        rotateY: 2,
        z: 10
      } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

interface TaskRowProps {
  icon?: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  className?: string;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  icon,
  title,
  actions,
  className = ''
}) => {
  return (
    <div className={`task-row ${className}`}>
      {icon && <div className="task-row-icon">{icon}</div>}
      <div className="task-row-title">{title}</div>
      {actions && <div className="task-row-actions">{actions}</div>}
    </div>
  );
};

interface TaskCardProps {
  title: string;
  tasks: Array<{
    id: string;
    title: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
  }>;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  tasks,
  className = ''
}) => {
  return (
    <Card3D variant="default" className={`task-card ${className}`}>
      <div className="task-card-header">{title}</div>
      <div className="task-card-body">
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            icon={task.icon}
            title={task.title}
            actions={task.actions}
          />
        ))}
      </div>
    </Card3D>
  );
};

interface IntegrationCardProps {
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  title,
  description,
  status,
  icon,
  actions,
  className = ''
}) => {
  return (
    <Card3D variant="elevated" className={`integration-card ${className}`}>
      <div className="integration-card-content">
        {icon && <div className="integration-card-icon">{icon}</div>}
        <div className="integration-card-info">
          <div className="integration-card-title">{title}</div>
          <div className="integration-card-description">{description}</div>
          <div className={`integration-card-status integration-card-status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
      </div>
      {actions && <div className="integration-card-actions">{actions}</div>}
    </Card3D>
  );
};