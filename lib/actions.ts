"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a server-side Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getBatches() {
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createBatch(batchData: { id: string, total_sims: number }) {
  const { data, error } = await supabase
    .from("batches")
    .insert([
      { 
        id: batchData.id, 
        total_sims: batchData.total_sims, 
        remaining_sims: batchData.total_sims,
        status: 'Full'
      }
    ]);

  if (error) throw new Error(error.message);
  revalidatePath("/batches");
  return data;
}

export async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createDistribution(distributionData: { 
  client_id: string, 
  batch_id: string, 
  count: number,
  distributed_by: string 
}) {
  const { data, error } = await supabase
    .from("distributions")
    .insert([
      { 
        ...distributionData,
        otp_verified: true // In production, this would be verified before insert
      }
    ]);

  if (error) throw new Error(error.message);
  
  // Create activity log
  await supabase.from("activity_logs").insert([
    {
      user_id: distributionData.distributed_by,
      action: "SIM Distribution",
      entity_type: "distribution",
      details: `Distributed ${distributionData.count} SIMs to client ${distributionData.client_id}`
    }
  ]);

  revalidatePath("/dashboard");
  revalidatePath("/distribute");
  return data;
}

export async function getActivityLogs() {
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);
  return data;
}
