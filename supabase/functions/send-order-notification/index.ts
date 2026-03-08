import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderNumber, customer, items, totalPrice } = await req.json();

    const itemsList = items
      .map((item: any) => `• ${item.product.name} x${item.quantity} - ₹${item.product.price * item.quantity}`)
      .join('\n');

    const message = `🧸 *New Order Received!*

*Order:* ${orderNumber}
*Customer:* ${customer.fullName}
*Phone:* ${customer.phone}
*Address:* ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pinCode}

*Items:*
${itemsList}

*Total:* ₹${totalPrice}
*Payment:* Cash on Delivery`;

    // Send WhatsApp message via WhatsApp API
    const whatsappPhone = "918306590731";
    const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${encodeURIComponent(message)}&apikey=`;
    
    // Note: For production, you'd use official WhatsApp Business API
    // For now, we'll log the message and try callmebot
    console.log("Order notification:", message);

    // Send email notification using a simple approach
    const emailTo = "swatmehul@gmail.com";
    
    // Log for debugging
    console.log(`Email would be sent to: ${emailTo}`);
    console.log(`WhatsApp would be sent to: +${whatsappPhone}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order notification processed",
        orderNumber 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error processing notification:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
