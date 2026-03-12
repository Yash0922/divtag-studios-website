'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { SERVICES, CONTACT_FORM_RECIPIENT } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
}

/**
 * ContactForm component with validation and submission handling
 * Validates Requirements: 5.1, 5.2, 5.3, 5.4
 */
export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      service: '',
      message: '',
    },
  });

  const serviceValue = watch('service');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      setErrorMessage('Email service is not configured. Please add EmailJS keys to .env.local.');
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceTitle = SERVICES.find((s) => s.id === data.service)?.title ?? data.service;
      await emailjs.send(serviceId, templateId, {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        service: serviceTitle,
        to_email: CONTACT_FORM_RECIPIENT,
      }, publicKey);

      setSuccessMessage("Thank you for contacting us. We'll get back to you soon.");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Failed to send message. Please try again.');
      } else {
        setErrorMessage('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
          {...register('name')}
          onBlur={() => trigger('name')}
        />
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            className="text-sm text-destructive mt-1"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
          {...register('email')}
          onBlur={() => trigger('email')}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="text-sm text-destructive mt-1"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Service Field */}
      <div className="space-y-2">
        <Label htmlFor="service">
          Service Interest <span className="text-destructive">*</span>
        </Label>
        <Select
          value={serviceValue}
          onValueChange={(value) => {
            setValue('service', value, { shouldValidate: true });
          }}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="service"
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p
            id="service-error"
            role="alert"
            className="text-sm text-destructive mt-1"
          >
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project..."
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
          {...register('message')}
          onBlur={() => trigger('message')}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="text-sm text-destructive mt-1"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 rounded-md bg-primary/5 border border-primary/20 text-foreground"
        >
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 rounded-md bg-destructive/10 border border-destructive/30 text-destructive"
        >
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[44px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
