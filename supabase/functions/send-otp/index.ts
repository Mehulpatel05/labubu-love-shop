import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory OTP store (resets on function cold start — fine for low budget)
const otpStore = new Map<string, { otp: string; expires: number }>();

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const { action, phone, otp } = await req.json();

  // --- SEND OTP ---
  if (action === "send") {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { otp: generatedOtp, expires: Date.now() + 2 * 60 * 1000 });

    const fast2smsKey = Deno.env.get("FAST2SMS_API_KEY");

    if (fast2smsKey) {
      const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: { authorization: fast2smsKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          route: "q",
          message: `Your Labubu Store OTP is ${generatedOtp}. Valid for 2 minutes.`,
          language: "english",
          flash: 0,
          numbers: phone,
        }),
      });
      const data = await res.json();
      console.log("Fast2SMS response:", data);
    } else {
      // Dev mode — log OTP
      const safePhone = phone.replace(/[\r\n\t]/g, '');
      console.log(`[DEV] OTP for ${safePhone}: ${generatedOtp}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // --- VERIFY OTP ---
  if (action === "verify") {
    const record = otpStore.get(phone);
    if (!record) {
      return new Response(JSON.stringify({ success: false, error: "OTP not found. Please resend." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (Date.now() > record.expires) {
      otpStore.delete(phone);
      return new Response(JSON.stringify({ success: false, error: "OTP expired. Please resend." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (record.otp !== otp) {
      return new Response(JSON.stringify({ success: false, error: "Wrong OTP. Try again." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    otpStore.delete(phone);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers: corsHeaders });
});
