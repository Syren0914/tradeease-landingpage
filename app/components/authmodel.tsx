import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitToWaitlist } from "@/lib/waitlist";

type Props = {
  triggerLabel?: string;
  onWaitlistSubmit?: (payload: { firstName: string; lastName: string; businessName: string; industry: string; solutions: string; features: string; email: string }) => Promise<void> | void;
  onClose?: () => void;
};

export default function GlassAuthModal({
  triggerLabel = "Join Waitlist",
  onWaitlistSubmit,
  onClose,
}: Props) {
  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [solutions, setSolutions] = useState("");
  const [features, setFeatures] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setBusinessName("");
    setIndustry("");
    setSolutions("");
    setFeatures("");
    setEmail("");
    setShowSuccess(false);
    setError(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (!open) return;
    const toFocus = firstFieldRef.current ?? closeBtnRef.current;
    toFocus?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Submit to Supabase via API
      await submitToWaitlist({
        firstName,
        lastName,
        email,
        businessName,
        industry,
        solutions,
        features
      });

      // Call the optional callback if provided
      await onWaitlistSubmit?.({ firstName, lastName, email, businessName, industry, solutions, features });
      
      setShowSuccess(true);
      // Auto close after 3 seconds
      setTimeout(() => {
        clearForm();
        handleClose();
      }, 3000);
      
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit to waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md dark:text-black transition hover:bg-white/15 active:scale-[0.98] dark:border-white/10 dark:bg-white dark:hover:bg-white/10
        light:border-blue-300/50 light:bg-white light:text-blue-900 light:hover:bg-blue-100/50 " // Adjusted for better visibility in light mode
      >
        {triggerLabel}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={onOverlayClick}
            aria-modal="true"
            role="dialog"
            aria-labelledby="auth-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm
            light:bg-gray-300/60"
            />

            {/* Modal panel */}
            <motion.div
              ref={modalRef}
              className="modal-container relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 dark:scrollbar-track-white/5 dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/30 light:scrollbar-track-blue-100/30 light:scrollbar-thumb-blue-300/50 light:hover:scrollbar-thumb-blue-400/60"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)',
                // @ts-ignore - CSS custom properties for webkit scrollbar
                '--scrollbar-width': '6px',
                '--scrollbar-track': 'rgba(255, 255, 255, 0.05)',
                '--scrollbar-thumb': 'rgba(255, 255, 255, 0.2)',
                '--scrollbar-thumb-hover': 'rgba(255, 255, 255, 0.3)'
              } as React.CSSProperties}
            >
              <div
                className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/40
              light:border-blue-200/50 light:bg-white/80 light:shadow-lg"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10
                light:via-blue-300/40"
                />

                {/* Header */}
                <div className="flex items-center justify-between px-5 pb-2 pt-4 sm:px-6">
                  <h2 className="text-lg font-semibold text-white/90 light:text-blue-900">
                    Join Our Waitlist
                  </h2>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="rounded-full border border-white/20 bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10
                  light:border-blue-200/50 light:bg-blue-100/50 light:text-blue-700 light:hover:bg-blue-200/70 light:focus:ring-blue-400"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  {!showSuccess ? (
                    <>
                      <p className="mb-3 text-xs text-white/70 light:text-blue-700">
                        Get early access to our AI-powered business automation platform. We'll notify you when we launch!
                      </p>

                      {/* Error Message */}
                      {error && (
                        <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                          <p className="text-sm text-red-400 text-center">{error}</p>
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        ref={firstFieldRef}
                        label="First name"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                      />
                      <Field
                        label="Last name"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="family-name"
                      />
                    </div>
                    <Field
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                    <Field
                      label="Business name"
                      type="text"
                      placeholder="Your Company Inc."
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      autoComplete="organization"
                    />
                    <Field
                      label="Industry"
                      type="text"
                      placeholder="e.g., Technology, Healthcare, Finance"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                    <TextAreaField
                      label="What solutions are you hoping to resolve?"
                      placeholder="Describe the business challenges you want to solve..."
                      value={solutions}
                      onChange={(e) => setSolutions(e.target.value)}
                    />
                    <TextAreaField
                      label="What features are you most interested in?"
                      placeholder="AI automation, CRM, WhatsApp integration, etc..."
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                    />
                    

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        !firstName || !lastName || !businessName || !industry || !solutions || !features || !email
                      }
                      className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/80 px-4 py-2 font-semibold text-black shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:hover:bg-white/90
                      light:border-blue-400/50 light:bg-blue-600 light:text-white light:hover:bg-blue-700"
                    >
                      {loading && (
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                          />
                        </svg>
                      )}
                      Join Waitlist
                    </button>

                    <p
                      className="pt-1 text-center text-xs text-white/70
                    light:text-blue-700"
                    >
                      By joining our waitlist you agree to our Terms and acknowledge the
                      Privacy Policy. We'll only contact you about product updates.
                    </p>
                  </form>
                    </>
                  ) : (
                    /* Success Message */
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-8 h-8 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white/90 light:text-blue-900 mb-2">
                          Thanks for registering!
                        </h3>
                        <p className="text-sm text-white/70 light:text-blue-700 mb-4">
                          Thanks for registering for our waitlist. We will reach out to you shortly with updates about our AI-powered business automation platform.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-white/60 light:text-blue-600">
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                            />
                          </svg>
                          Closing automatically...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  trailing?: React.ReactNode;
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, trailing, className = "", ...rest },
  ref,
) {
  const id = React.useId();
  return (
    <label htmlFor={id} className="block">
      <span
        className="mb-1 block text-sm font-medium text-white/90
      light:text-blue-900"
      >
        {label}
      </span>
      <div
        className="flex items-stretch rounded-xl border border-white/20 bg-white/10 backdrop-blur-md focus-within:border-white/40 dark:border-white/10 dark:bg-white/5
      light:border-blue-200/50 light:bg-blue-50/50 light:focus-within:border-blue-400/70"
      >
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-xl bg-transparent px-3 py-2 text-white placeholder-white/50 outline-none [color-scheme:dark]
          light:text-blue-950 light:placeholder-blue-400/70 light:[color-scheme:light] ${className}`}
          {...rest}
        />
        {trailing ? <div className="flex items-center pr-2">{trailing}</div> : null}
      </div>
    </label>
  );
});

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { label, className = "", ...rest },
  ref,
) {
  const id = React.useId();
  return (
    <label htmlFor={id} className="block">
      <span
        className="mb-1 block text-sm font-medium text-white/90
      light:text-blue-900"
      >
        {label}
      </span>
      <div
        className="flex items-stretch rounded-xl border border-white/20 bg-white/10 backdrop-blur-md focus-within:border-white/40 dark:border-white/10 dark:bg-white/5
      light:border-blue-200/50 light:bg-blue-50/50 light:focus-within:border-blue-400/70"
      >
        <textarea
          ref={ref}
          id={id}
          rows={2}
          className={`w-full rounded-xl bg-transparent px-3 py-2 text-white placeholder-white/50 outline-none resize-none [color-scheme:dark]
          light:text-blue-950 light:placeholder-blue-400/70 light:[color-scheme:light] ${className}`}
          {...rest}
        />
      </div>
    </label>
  );
});