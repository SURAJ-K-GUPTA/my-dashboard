/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { supabase } from '../../supabaseClient';

// POST request to add new metric
export async function POST(req: Request) {
  const { name, value, category } = await req.json();

  // Insert the new metric into the 'metrics' table
  const { data, error } = await supabase.from('metrics').insert([
    { name, value, category }
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

// GET request to retrieve all metrics
export async function GET() {
  const { data, error } = await supabase.from('metrics').select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
