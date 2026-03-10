"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleSignUp(formData: { 
  email?: string, 
  phone?: string, 
  password: string, 
  fullName: string 
}) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
      }
    }
  });

  if (error) return { error: error.message };
  
  return { success: true, user: data.user };
}

export async function handleVerifyOTP(emailOrPhone: string, token: string, type: 'signup' | 'recovery') {
  const { data, error } = await supabase.auth.verifyOtp({
    email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
    phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined,
    token,
    type: type === 'signup' ? 'signup' : 'recovery',
  });

  if (error) return { error: error.message };

  if (type === 'signup' && data.user) {
    // Mark profile as verified
    await supabase.from('profiles').update({ is_verified: true }).eq('id', data.user.id);
    
    // Initial password history entry
    // Note: We'd need the password hash here, usually handled via a trigger or after user sets password
  }

  return { success: true, session: data.session };
}

export async function handleResetRequest(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXTAUTH_URL}/auth/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function handleUpdatePassword(userId: string, newPassword: string) {
  // 1. Check password history
  const { data: history, error: historyError } = await supabase
    .from('password_history')
    .select('password_hash')
    .eq('user_id', userId);

  if (historyError) return { error: "Could not verify password history." };

  for (const entry of history) {
    const isMatch = await bcrypt.compare(newPassword, entry.password_hash);
    if (isMatch) return { error: "You cannot reuse a previous password." };
  }

  // 2. Update password in Supabase Auth
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (updateError) return { error: updateError.message };

  // 3. Add to history
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await supabase.from('password_history').insert([
    { user_id: userId, password_hash: hashedPassword }
  ]);

  return { success: true };
}
