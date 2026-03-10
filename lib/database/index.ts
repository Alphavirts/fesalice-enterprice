import { supabase } from "../supabaseClient"

export async function createClient(clientData: {
  name: string
  phone: string
  idNumber: string
  tenantId: string
  serialNumber?: string
  status?: string
  notes?: string
}) {
  const { data, error } = await supabase
    .from("Client")
    .insert([clientData])
    .select()

  if (error) throw error
  return data[0]
}

export async function getClients(tenantId: string) {
  const { data, error } = await supabase
    .from("Client")
    .select("*")
    .eq("tenantId", tenantId)

  if (error) throw error
  return data
}

export async function registerLine(registrationData: {
  clientId: string
  simCardId: string
  tenantId: string
}) {
  // Assuming 'registerLine' corresponds to creating an Assignment
  const { data, error } = await supabase
    .from("Assignment")
    .insert([registrationData])
    .select()

  if (error) throw error
  return data[0]
}

export async function getRegistrations(tenantId: string) {
  // Assuming 'getRegistrations' corresponds to fetching Assignments
  const { data, error } = await supabase
    .from("Assignment")
    .select(`
      *,
      client:Client(*),
      simCard:SIMCard(*)
    `)
    .eq("tenantId", tenantId)

  if (error) throw error
  return data
}
