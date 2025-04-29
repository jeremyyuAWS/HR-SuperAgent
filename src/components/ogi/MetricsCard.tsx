import React from 'react';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { MetricData } from '../../types';

interface MetricsCardProps {
  metric: MetricData;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metric }) => {
  const renderTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <ArrowUp size={14} className="text-green-500" />;
      case 'down':
        return <ArrowDown size={14} className={metric.label.includes('Turnover') || metric.label.includes('Time') ? 'text-green-500' : 'text-red-500'} />;
      default:
        return <ArrowRight size={14} className="text-gray-400" />;
    }
  };
  
  const getTrendColor = () => {
    if (metric.trend === 'up') {
      return 'text-green-500';
    } else if (metric.trend === 'down') {
      return metric.label.includes('Turnover') || metric.label.includes('Time') 
        ? 'text-green-500' 
        : 'text-red-500';
    }
    return 'text-gray-500';
  };
  
  return (
    <Card className="h-full">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {metric.label}
          </h3>
          <div className={`flex items-center ${getTrendColor()}`}>
            {renderTrendIcon()}
            <span className="text-xs ml-1">{metric.change}{metric.unit || '%'}</span>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-xl font-medium text-gray-900 dark:text-white">
            {metric.value}{metric.unit || '%'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MetricsCard;