'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import { supabase } from '../supabaseClient';
import MetricForm from '../components/MetricForm';
import { ChartBar } from '../components/ChartBar';
import { ChartLine } from '../components/ChartLine';
import { ChartPie } from '../components/ChartPie';
import { exportToCSV } from '../utils/exportToCSV';
import Link from 'next/link';

interface Metric {
  id: number;
  name: string;
  value: number;
  category?: string;
  created_at?: string;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility on mobile
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter(); // For navigation
  const [session, setSession] = useState<any>(null); // Store session

  // Check if user is authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        setSession(session); // Set session if authenticated
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data, error } = await supabase.from('metrics').select('*');
      if (error) {
        console.error('Error fetching metrics:', error.message);
      } else {
        setMetrics(data as Metric[]);
      }
    };

    fetchMetrics();

    const channel = supabase
      .channel('metrics-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'metrics' }, (payload: any) => {
        setMetrics((prevMetrics) => [...prevMetrics, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addMetric = (newMetric: Metric) => {
    setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
  };

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    session && ( // Render dashboard only if the session exists
      <div className={`${darkMode ? 'dark' : ''}`}>
        {/* Main wrapper applies dark mode */}
        <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 flex">
          {/* Sidebar for Desktop and Hamburger Menu for Mobile */}
          
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-200 dark:bg-gray-800 shadow-lg p-4 transition-transform duration-300 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0`}
          >
            <h2 className="text-lg font-bold mb-6 text-black dark:text-white">Navigation</h2>
            <ul className="space-y-4">
              <li><Link href="#" className="block py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md px-2">Dashboard</Link></li>
              <li><Link href="#" className="block py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md px-2">Settings</Link></li>
              <li><Link href="#" className="block py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md px-2">Profile</Link></li>
              <li>
                <Link
                  href="/"
                  className="block py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md px-2"
                >
                  Go to Main Page
                </Link>
              </li>
              <li>
                <button
                  className="block py-2 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md px-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Hamburger Button for Small Screens */}
          <button
            className="p-4 md:hidden text-white bg-gray-800 fixed top-4 left-4 z-50 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          {/* Main Content */}
          <div className="ml-0 md:ml-64 w-full p-6">
            {/* Toggle and Export Buttons */}
            <div className="flex justify-between mb-6">
              <button
                className="p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700"
                onClick={() => setDarkMode(!darkMode)}
              >
                Toggle Dark Mode
              </button>

              <button
                className="p-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-400"
                onClick={() => exportToCSV(metrics, 'metrics_data')}
              >
                Export Data to CSV
              </button>
            </div>

            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <MetricForm addMetric={addMetric} />

            {/* Adjust grid spacing on larger screens */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 mt-8">
              <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800 h-96">
                <h3 className="text-lg font-bold mb-4">Bar Chart</h3>
                <ChartBar data={metrics} />
              </div>

              <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800 h-96">
                <h3 className="text-lg font-bold mb-4">Line Chart</h3>
                <ChartLine data={metrics} />
              </div>

              <div className="shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800 h-96">
                <h3 className="text-lg font-bold mb-4">Pie Chart</h3>
                <ChartPie data={metrics} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
