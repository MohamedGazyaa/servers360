"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Spinner from "@/components/ui/Spinner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      aria-busy={pending}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {pending && <Spinner className="w-4 h-4" />}
      {pending ? "Adding…" : "Add Server"}
    </button>
  );
}

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

const errorInputClass =
  "w-full rounded-lg border border-red-400 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent";

export default function AddServerForm({ action }) {
  const [state, formAction] = useActionState(action, null);
  const locationError = state?.errors?.location;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state?.errors?.general && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state.errors.general}
        </div>
      )}

      <Field label="Server Name" name="name">
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="e.g. Production API"
          className={inputClass}
        />
      </Field>

      <Field label="IP Address" name="ipAddress">
        <input
          id="ipAddress"
          type="text"
          name="ipAddress"
          required
          placeholder="e.g. 192.168.1.1"
          className={inputClass}
        />
      </Field>

      <Field label="Status" name="status">
        <select id="status" name="status" required defaultValue="" className={inputClass}>
          <option value="" disabled>Select status</option>
          <option value="Up">Up</option>
          <option value="Down">Down</option>
          <option value="Degraded">Degraded</option>
        </select>
      </Field>

      <div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" name="city">
            <input
              id="city"
              type="text"
              name="city"
              aria-invalid={locationError ? true : undefined}
              aria-describedby={locationError ? "location-error" : undefined}
              placeholder="e.g. London"
              className={locationError ? errorInputClass : inputClass}
            />
          </Field>
          <Field label="Country" name="country">
            <input
              id="country"
              type="text"
              name="country"
              aria-invalid={locationError ? true : undefined}
              aria-describedby={locationError ? "location-error" : undefined}
              placeholder="e.g. UK"
              className={locationError ? errorInputClass : inputClass}
            />
          </Field>
        </div>
        {locationError && (
          <p id="location-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {locationError}
          </p>
        )}
      </div>

      <Field label="Response Time (ms)" name="responseTime">
        <input
          id="responseTime"
          type="number"
          name="responseTime"
          required
          min="0"
          placeholder="e.g. 120"
          className={inputClass}
        />
      </Field>

      <Field label="Uptime (%)" name="upTime">
        <input
          id="upTime"
          type="number"
          name="upTime"
          required
          min="0"
          max="100"
          step="0.1"
          placeholder="e.g. 99.9"
          className={inputClass}
        />
      </Field>

      <div className="flex justify-end pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
