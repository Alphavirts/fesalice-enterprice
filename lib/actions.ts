"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a server-side Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getBatches() {
  try {
    const { data, error } = await supabase
      .from("batches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error in getBatches:", error.message);
    throw new Error(error.message || "Failed to fetch batches");
  }
}

export async function createBatch(batchData: { id: string, total_sims: number }) {
  try {
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

    if (error) throw error;
    revalidatePath("/batches");
    return data;
  } catch (error: any) {
    console.error("Error in createBatch:", error.message);
    throw new Error(error.message || "Failed to create batch");
  }
}

export async function getClients() {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error in getClients:", error.message);
    throw new Error(error.message || "Failed to fetch clients");
  }
}

export async function createDistribution(distributionData: { 
  client_id: string, 
  batch_id: string, 
  count: number,
  distributed_by: string 
}) {
  try {
    const { data, error } = await supabase
      .from("distributions")
      .insert([
        { 
          ...distributionData,
          otp_verified: true 
        }
      ]);

    if (error) throw error;
    
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
  } catch (error: any) {
    console.error("Error in createDistribution:", error.message);
    throw new Error(error.message || "Failed to process distribution");
  }
}

export async function getActivityLogs() {
  try {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*, profiles(full_name)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error in getActivityLogs:", error.message);
    return []; // Return empty array instead of crashing for non-critical dashboard logs
  }
}

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getDistributionStats() {
  const { data, error } = await supabase
    .from("distributions")
    .select("count, created_at");

  if (error) throw new Error(error.message);
  
  const monthlyData: { [key: string]: number } = {};
  data.forEach((d: any) => {
    const month = new Date(d.created_at).toLocaleString('default', { month: 'short' });
    monthlyData[month] = (monthlyData[month] || 0) + d.count;
  });

  return Object.entries(monthlyData).map(([name, value]) => ({ name, value }));
}
