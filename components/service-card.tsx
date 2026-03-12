'use client';

import { Code2, Smartphone, Palette, Image, Video, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Map icon names to actual Lucide icon components
const iconMap = {
  Code2,
  Smartphone,
  Palette,
  Image,
  Video,
  TrendingUp,
};

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  className?: string;
}

/**
 * ServiceCard component displays individual service information with hover animation
 * 
 * Features:
 * - Displays service title, description, and icon
 * - Hover effect with lift animation (translateY) and shadow increase
 * - Built on shadcn/ui Card component
 * - Client component for interactive hover states
 * 
 * @param title - Service name
 * @param description - Service description
 * @param iconName - Name of the Lucide icon to display
 * @param className - Optional additional CSS classes
 */
export function ServiceCard({ title, description, iconName, className }: ServiceCardProps) {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  return (
    <Card
      className={cn(
        'rounded-2xl border border-border bg-card shadow-sm',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-xl hover:border-primary/30',
        'motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
    >
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
