import { Leaf, Shield, Users } from 'lucide-react';
import { Feature } from '@/types';

export const features: Feature[] = [
  {
    icon: <Leaf className="h-8 w-8 text-emerald-500" />,
    title: 'Natural Awareness',
    description: 'Understand the natural and artificial components in your products to make informed decisions.',
  },
  {
    icon: <Shield className="h-8 w-8 text-emerald-500" />,
    title: 'Safety First',
    description: 'Identify potential allergens and harmful ingredients before they affect your health.',
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-500" />,
    title: 'Community Driven',
    description: 'Join a community of health-conscious individuals making better choices together.',
  },
];