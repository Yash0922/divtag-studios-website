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
        'group rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md shadow-sm h-full flex flex-col justify-between',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 hover:bg-card/90',
        'motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
    >
      <CardHeader className="p-6 sm:p-7 flex-1">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-105 transition-transform duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
