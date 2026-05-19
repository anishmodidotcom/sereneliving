"use client";

import { COUNTRIES } from "@/lib/booking";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface GuestFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
}

interface GuestFormProps {
  values: GuestFormValues;
  onChange: (next: GuestFormValues) => void;
  errors?: Partial<Record<keyof GuestFormValues, string>>;
}

export function GuestForm({ values, onChange, errors }: GuestFormProps) {
  function patch<K extends keyof GuestFormValues>(
    key: K,
    value: GuestFormValues[K],
  ) {
    onChange({ ...values, [key]: value });
  }

  return (
    <form className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(e) => patch("firstName", e.target.value)}
          />
          {errors?.firstName && (
            <p className="text-xs text-terracotta">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(e) => patch("lastName", e.target.value)}
          />
          {errors?.lastName && (
            <p className="text-xs text-terracotta">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => patch("email", e.target.value)}
        />
        {errors?.email && (
          <p className="text-xs text-terracotta">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="With country code"
          required
          value={values.phone}
          onChange={(e) => patch("phone", e.target.value)}
        />
        {errors?.phone && (
          <p className="text-xs text-terracotta">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country of residence</Label>
        <select
          id="country"
          required
          value={values.country}
          onChange={(e) => patch("country", e.target.value)}
          className="flex h-11 w-full rounded-sm border border-sand bg-cream px-3 py-2 text-sm font-light text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
        >
          <option value="">Select a country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors?.country && (
          <p className="text-xs text-terracotta">{errors.country}</p>
        )}
      </div>
    </form>
  );
}
