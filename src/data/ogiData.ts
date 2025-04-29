import { OGINode, OGILink, MetricData } from '../types';

// Simulated knowledge graph nodes
export const ogiNodes: OGINode[] = [
  { id: 'n1', label: 'Maternity Leave', category: 'policy', size: 25, connections: ['n2', 'n8', 'n12'] },
  { id: 'n2', label: 'Leave Policy', category: 'policy', size: 30, connections: ['n1', 'n3', 'n6'] },
  { id: 'n3', label: 'Remote Work', category: 'policy', size: 35, connections: ['n2', 'n5', 'n7', 'n11'] },
  { id: 'n4', label: 'Performance Reviews', category: 'process', size: 40, connections: ['n5', 'n9', 'n10'] },
  { id: 'n5', label: 'Employee Satisfaction', category: 'metric', size: 45, connections: ['n3', 'n4', 'n7', 'n13'] },
  { id: 'n6', label: 'Compensation', category: 'policy', size: 30, connections: ['n2', 'n10', 'n14'] },
  { id: 'n7', label: 'Work-Life Balance', category: 'concept', size: 35, connections: ['n3', 'n5', 'n15'] },
  { id: 'n8', label: 'Benefits', category: 'policy', size: 25, connections: ['n1', 'n6', 'n14'] },
  { id: 'n9', label: 'Career Development', category: 'process', size: 30, connections: ['n4', 'n10', 'n15'] },
  { id: 'n10', label: 'Promotions', category: 'process', size: 25, connections: ['n4', 'n6', 'n9'] },
  { id: 'n11', label: 'Office Policy', category: 'policy', size: 20, connections: ['n3', 'n13'] },
  { id: 'n12', label: 'Paternity Leave', category: 'policy', size: 15, connections: ['n1', 'n2'] },
  { id: 'n13', label: 'Office Environment', category: 'concept', size: 20, connections: ['n5', 'n11'] },
  { id: 'n14', label: 'Salary Structure', category: 'policy', size: 25, connections: ['n6', 'n8'] },
  { id: 'n15', label: 'Learning & Development', category: 'process', size: 30, connections: ['n7', 'n9'] }
];

// Simulated knowledge graph links
export const ogiLinks: OGILink[] = ogiNodes.flatMap(node => 
  node.connections.map(target => ({
    source: node.id,
    target,
    strength: Math.random() * 0.5 + 0.5 // Random strength between 0.5 and 1
  }))
);

// Simulated HR metrics
export const hrMetrics: MetricData[] = [
  { label: 'Employee Satisfaction', value: 4.2, trend: 'up', change: 0.3, unit: '/5' },
  { label: 'Turnover Rate', value: 12, trend: 'down', change: 2, unit: '%' },
  { label: 'Time to Hire', value: 21, trend: 'down', change: 3, unit: 'days' },
  { label: 'Offer Acceptance', value: 82, trend: 'up', change: 5, unit: '%' },
  { label: 'Learning Engagement', value: 67, trend: 'up', change: 8, unit: '%' },
  { label: 'Performance Score', value: 3.8, trend: 'up', change: 0.2, unit: '/5' }
];

// Simulated chat messages
export const chatHistory = [
  { 
    id: '1', 
    sender: 'user', 
    text: 'Show me the current turnover rate', 
    timestamp: new Date(Date.now() - 3600000) 
  },
  { 
    id: '2', 
    sender: 'assistant', 
    text: 'The current turnover rate is 12%, which is down 2% compared to last quarter. Engineering department has the highest turnover at 15%, while Product has the lowest at 8%.', 
    timestamp: new Date(Date.now() - 3590000),
    attachments: [
      {
        type: 'chart',
        data: {
          type: 'bar',
          labels: ['Engineering', 'Marketing', 'Sales', 'Product'],
          values: [15, 10, 14, 8]
        }
      }
    ]
  },
  { 
    id: '3', 
    sender: 'user', 
    text: 'What are the top reasons for employee attrition?', 
    timestamp: new Date(Date.now() - 3500000) 
  },
  { 
    id: '4', 
    sender: 'assistant', 
    text: 'Based on exit interviews, the top reasons for employee attrition are: Career growth opportunities (45%), Compensation (30%), Work environment (15%), and Work-life balance (10%).', 
    timestamp: new Date(Date.now() - 3490000),
    attachments: [
      {
        type: 'chart',
        data: {
          type: 'pie',
          labels: ['Career Growth', 'Compensation', 'Work Environment', 'Work-life Balance'],
          values: [45, 30, 15, 10]
        }
      }
    ]
  }
] as ChatMessage[];