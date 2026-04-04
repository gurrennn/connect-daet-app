import { supabase } from './supabaseClient'

export const addPoints = async (userId: string, points: number, source: string) => {
  try {
    // 1. Update Profile Points
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ points: supabase.rpc('increment_points', { user_id: userId, points_to_add: points }) })
      .eq('id', userId)

    if (updateError) {
      // Fallback if RPC doesn't exist - fetch current points first
      const { data: profile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', userId)
        .single()

      const newPoints = (profile?.points || 0) + points
      
      const { error: fallbackError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', userId)

      if (fallbackError) throw fallbackError
    }

    // 2. Insert into reward_history
    const { error: historyError } = await supabase
      .from('reward_history')
      .insert({
        user_id: userId,
        subsystem_source: source,
        points_earned: points
      })

    if (historyError) throw historyError

    return { success: true }
  } catch (error) {
    console.error('Error adding points:', error)
    return { success: false, error }
  }
}
