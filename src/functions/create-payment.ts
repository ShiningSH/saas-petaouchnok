
// Exemple de Edge Function Supabase pour Stripe
// À déployer dans le dossier supabase/functions/create-payment

/*
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Récupérer les données de la requête
    const { bookingId } = await req.json();

    // Créer un client Supabase avec la clé de service
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Récupérer les informations de la réservation
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select(`
        id,
        price,
        users!inner(id, email, full_name),
        facilities!inner(name, type),
        time_slots!inner(start_time, end_time)
      `)
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error(`Erreur lors de la récupération de la réservation: ${bookingError?.message ?? "Réservation introuvable"}`);
    }

    // Initialiser Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2023-10-16",
    });

    // Créer une session de paiement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Réservation de ${booking.facilities.name}`,
              description: `Du ${new Date(booking.time_slots.start_time).toLocaleString()} au ${new Date(booking.time_slots.end_time).toLocaleString()}`,
            },
            unit_amount: Math.round(booking.price * 100), // Conversion en centimes
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_id: booking.id,
      },
      customer_email: booking.users.email,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancel`,
    });

    // Mettre à jour la réservation avec l'ID de la session
    await supabaseClient
      .from("bookings")
      .update({ payment_id: session.id })
      .eq("id", bookingId);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
*/
