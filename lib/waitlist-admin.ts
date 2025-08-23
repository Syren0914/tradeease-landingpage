import { supabase } from './supabase';

export interface WaitlistEntry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  business_name: string;
  industry: string;
  solutions: string;
  features: string;
  created_at: string;
}

export async function getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching waitlist entries:', error);
      throw new Error('Failed to fetch waitlist entries');
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllWaitlistEntries:', error);
    throw error;
  }
}

export async function getWaitlistStats() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching waitlist count:', error);
      throw new Error('Failed to fetch waitlist stats');
    }

    // Get entries from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: recentCount, error: recentError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (recentError) {
      console.error('Error fetching recent waitlist count:', recentError);
    }

    return {
      total: count || 0,
      recent: recentCount || 0,
    };
  } catch (error) {
    console.error('Error in getWaitlistStats:', error);
    throw error;
  }
}
