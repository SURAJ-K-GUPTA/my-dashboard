"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function WelcomePage() {
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  // Check for an active session
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If the session exists, set the username
      if (session) {
        setSession(session);
        const email = session?.user?.email || ""; // Provide fallback if email is undefined
        const name = email.charAt(0).toUpperCase() + email.split("@")[0].slice(1); // Safely split the email
        setUsername(name);
      }
    };
    checkSession();
  }, []);

  // Handle navigation to the dashboard
  const handleGoToDashboard = () => {
    if (session) {
      router.push("/dashboard"); // If logged in, go to the dashboard
    } else {
      router.push("/login"); // If not logged in, go to login page
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-6">
          Welcome {username ? `"${username}"` : `"Guest"`} to the Dashboard App
        </h1>
        <p className="mb-6">Manage your metrics, view charts, and more.</p>

        <button
          onClick={handleGoToDashboard}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
