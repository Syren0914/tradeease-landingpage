"use client"
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type Provider = "google" | "github" | "x";

type Props = {
  initialMode?: "login" | "signup";
  onLogin?: (payload: { email: string; password: string }) => Promise<void> | void;
  onSignup?: (payload: { name: string; email: string; password: string }) => Promise<void> | void;
  onSocial?: (provider: Provider) => Promise<void> | void;
  loginError?: string;
};

export default function SignInPage({
  initialMode = "login",
  onLogin,
  onSignup,
  onSocial,
  loginError,
}: Props) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin?.({ email, password });
      } else {
        await onSignup?.({ name, email, password });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: Provider) => {
    if (loading) return;
    setLoading(true);
    try {
      await onSocial?.(provider);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
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
          <div className="flex items-center justify-center px-5 pb-2 pt-4 sm:px-6">
            <div
              className="flex gap-1 rounded-full bg-white/10 p-1 dark:bg-white/5
            light:bg-blue-100/50"
            >
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  mode === "login"
                    ? "bg-white/80 text-black shadow-sm dark:bg-white/90 light:bg-blue-600 light:text-white"
                    : "text-white/80 hover:text-white light:text-blue-800 light:hover:text-blue-950"
                }`}
              >
                Sign in
              </button>
              {/* <button
                type="button"
                onClick={() => setMode("signup")}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  mode === "signup"
                    ? "bg-white/80 text-black shadow-sm dark:bg-white/90 light:bg-blue-600 light:text-white"
                    : "text-white/80 hover:text-white light:text-blue-800 light:hover:text-blue-950"
                }`}
              >
                Create account
              </button> */}
            </div>
          </div>

                {/* Body */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <h2 id="auth-modal-title" className="sr-only">
                    {mode === "login" ? "Sign in" : "Create account"}
                  </h2>

                  {/* Social auth */}
                  {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <SocialButton
                      label="Google"
                      onClick={() => handleSocial("google")}
                      loading={loading}
                      Icon={
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="dark:text-white/90 light:text-blue-700"
                        >
                          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                          <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fontSize="12"
                            fill="currentColor"
                            fontWeight="700"
                          >
                            G
                          </text>
                        </svg>
                      }
                    />
                    <SocialButton
                      label="GitHub"
                      onClick={() => handleSocial("github")}
                      loading={loading}
                      Icon={
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          fill="currentColor"
                          className="dark:text-white/90 light:text-blue-700"
                        >
                          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.35-1.77-1.35-1.77-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.31 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
                        </svg>
                      }
                    />
                    <SocialButton
                      label="X"
                      onClick={() => handleSocial("x")}
                      loading={loading}
                      Icon={
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          fill="currentColor"
                          className="dark:text-white/90 light:text-blue-700"
                        >
                          <path d="M18.244 2H21l-6.63 7.57L22 22h-7.137l-4.99-6.567L3.4 22H1l7.1-8.12L2 2h7.24l4.54 6.083L18.244 2Zm-1.25 18h2.052L8.097 4H6.03l10.964 16Z" />
                        </svg>
                      }
                    />
                  </div> */}

                  {/* Divider */}
                  {/* <div
                    className="my-4 flex items-center gap-3
                  light:text-blue-800"
                  >
                    <div
                      className="h-px flex-1 bg-white/20 dark:bg-white/10
                    light:bg-blue-200/70"
                    />
                    <span className="text-xs uppercase tracking-wide text-white/70 light:text-blue-700">or</span>
                    <div
                      className="h-px flex-1 bg-white/20 dark:bg-white/10
                    light:bg-blue-200/70"
                    />
                  </div> */}

                  {/* Error Message */}
                  {loginError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                      {loginError}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {mode === "signup" && (
                      <Field
                        ref={firstFieldRef}
                        label="Full name"
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                      />
                    )}

                    {mode === "login" && (
                      <Field
                        ref={firstFieldRef}
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    )}

                    {mode === "signup" && (
                      <Field
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    )}

                    <Field
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                      trailing={
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="rounded-md px-2 py-1 text-xs text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30
                          light:text-blue-700 light:hover:bg-blue-100/50 light:hover:text-blue-900 light:focus:ring-blue-300"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      }
                    />

                    {mode === "login" && (
                      <div className="flex items-center justify-between pt-1">
                        <label
                          className="flex items-center gap-2 text-sm text-white/80
                        light:text-blue-800"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-white/30 bg-white/10 text-white/90 focus:ring-white/30
                            light:border-blue-300/50 light:bg-blue-100/30 light:text-blue-600 light:focus:ring-blue-400"
                          />
                          Remember me
                        </label>
                        <button
                          type="button"
                          className="text-sm text-white/80 underline-offset-4 hover:underline
                          light:text-blue-800 light:hover:text-blue-950"
                          onClick={() => {
                            // Stub: implement forgot password
                          }}
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        (mode === "signup" && (!name || !email || !password)) ||
                        (mode === "login" && (!email || !password))
                      }
                      className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/80 px-4 py-2.5 font-semibold text-black shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:hover:bg-white/90
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
                      {mode === "login" ? "Sign in" : "Create account"}
                    </button>

                    <p
                      className="pt-1 text-center text-xs text-white/70
                    light:text-blue-700"
                    >
                      By continuing you agree to our Terms and acknowledge the
                      Privacy Policy.
                    </p>
                  </form>
          </div>
        </div>
      </motion.div>
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
          className={`w-full rounded-xl bg-transparent px-3 py-2.5 text-white placeholder-white/50 outline-none [color-scheme:dark]
          light:text-blue-950 light:placeholder-blue-400/70 light:[color-scheme:light] ${className}`}
          {...rest}
        />
        {trailing ? <div className="flex items-center pr-2">{trailing}</div> : null}
      </div>
    </label>
  );
});

function SocialButton({
  label,
  Icon,
  onClick,
  loading,
}: {
  label: string;
  Icon: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-md transition hover:bg-white/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10
      light:border-blue-300/50 light:bg-blue-100/30 light:text-blue-900 light:hover:bg-blue-100/50"
    >
      <span
        className="text-white/90
      light:text-blue-700"
      >
        {Icon}
      </span>
      <span
        className="text-white
      light:text-blue-900"
      >
        {label}
      </span>
    </button>
  );
}