import { supabase } from './supabaseClient';

/**
 * The "Glue" Function
 * @param {string} userId - The ID of the logged-in user
 * @param {number} pointsToAdd - How many points they earned
 * @param {string} source - Which subsystem gave the points (e.g., 'museum_qr')
 */
export const addPoints = async (userId, pointsToAdd, source) => {
  try {
    // 1. Get the current points first
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    const newTotal = (profile.points || 0) + pointsToAdd;

    // 2. Update the Profile with the new total
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ points: newTotal })
      .eq('id', userId);

    if (updateError) throw updateError;

    // 3. Log the history so we can see who earned what and where
    const { error: logError } = await supabase
      .from('reward_history')
      .insert([
        { 
          user_id: userId, 
          points_earned: pointsToAdd, 
          subsystem_source: source 
        }
      ]);

    if (logError) throw logError;

    console.log(`Successfully added ${pointsToAdd} points from ${source}`);
    return { success: true };

  } catch (error) {
    console.error('Error in Rewards Engine:', error.message);
    return { success: false, error: error.message };
  }
};