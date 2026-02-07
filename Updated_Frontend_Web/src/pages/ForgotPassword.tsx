import { useState } from "react";
import { sendOtpApi, verifyOtpApi } from "@/services/api";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");

  const sendOtp = async () => {
    try {
      await sendOtpApi(email);
      alert("OTP sent to your email");
      setStep("otp");
    } catch {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await verifyOtpApi({ email, otp });
      alert("OTP verified");
      setStep("reset"); // ✅ Move to reset step
    } catch {
      alert("Invalid OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        email,
        password,
      });

      alert("Password reset successful");
      setStep("email");
      setEmail("");
      setOtp("");
      setPassword("");
    } catch {
      alert("Password reset failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Recover Password</h2>

      {/* ---------------- EMAIL STEP ---------------- */}
      {step === "email" && (
        <>
          <input
            className="border p-2 w-full mb-3"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-accent text-white p-2 w-full" onClick={sendOtp}>
            Send OTP
          </button>
        </>
      )}

      {/* ---------------- OTP STEP ---------------- */}
      {step === "otp" && (
        <>
          <input
            className="border p-2 w-full mb-3"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            className="bg-green-600 text-white p-2 w-full"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>
        </>
      )}

      {/* ---------------- RESET PASSWORD STEP ---------------- */}
      {step === "reset" && (
        <>
          <input
            className="border p-2 w-full mb-3"
            placeholder="New Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-accent text-white p-2 w-full"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
}
