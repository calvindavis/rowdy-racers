import { createClient, type User } from "@supabase/supabase-js";

import type { Racer } from "@/types/Racer";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const client = createClient(supabaseUrl, supabaseKey);

export async function getRacers(): Promise<Racer[]> {
  const response = await client.from("racers").select();
  return response.data as Racer[];
}

export async function getRacersByUserId(id: string): Promise<Racer[]> {
  const response = await client.from("racers").select().eq("user_id", id);
  return response.data as Racer[];
}

export async function getRacer(racerId: string): Promise<Racer | null> {
  const { data } = await client
    .from("racers")
    .select()
    .eq("id", racerId)
    .maybeSingle();

  return data as Racer | null;
}

export async function saveRacer(racer: Racer): Promise<void> {
  const user = await getUser();

  await client.from("racers").insert({
    border1: racer.border1,
    border2: racer.border2,
    image: racer.image,
    name: racer.name,
    ruleDescription: racer.ruleDescription,
    ruleTitle: racer.ruleTitle,
    user_id: user?.id,
  });
}

export async function getUser(): Promise<User | null> {
  const response = await client.auth.getUser();
  return response.data.user;
}

export async function logIn(email: string): Promise<User | null> {
  const response = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  return response.data.user;
}

export async function logOut(): Promise<void> {
  await client.auth.signOut();
}
