const transporter = require("../../config/brevomail");


const sendVerificationEmail  = async(email , otp) => {

    const email_verify_url = process.env.FRONTEND_URL+"/auth/verify_email";

    try{

    let d = await transporter.sendMail({

        from: `Shop E-Commerces <${process.env.SEND_EMAIL}>`,
        to:email,
        subject:`Verify your email`,
        html: ` <div style="margin:0;padding:32px 12px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

      <!-- Brand header -->
      <div style="padding:28px 24px;text-align:center;background:#ffffff;">
        <div style="font-size:26px;font-weight:700;color:#2563eb;letter-spacing:-0.5px;">
          Shop <span style="color:#111827;">E-Commerces</span>
        </div>
        <p style="margin:8px 0 0;color:#6b7280;font-size:13px;">
          Your shopping journey starts here
        </p>
      </div>

      <!-- Main content -->
      <div style="padding:12px 28px 32px;text-align:center;">
        <h2 style="margin:12px 0;color:#111827;font-size:23px;">
          Verify your email address
        </h2>

        <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">
          Welcome to Shop E-Commerces! Please verify your email address
          to activate your account.
        </p>

        <a href="${email_verify_url}"
           style="display:inline-block;background:#000;color:#ffffff;padding:13px 28px;text-decoration:none;border-radius:7px;font-size:15px;font-weight:600;">
          Verify Email
        </a>

        <p style="margin:26px 0 10px;color:#6b7280;font-size:13px;">
          Or use this verification code
        </p>

        <div style="display:inline-block;padding:14px 28px;background:#eff6ff;border:1px dashed #93c5fd;border-radius:8px;">
          <span style="font-size:28px;font-weight:700;letter-spacing:6px;color:#1d4ed8;">
            ${otp}
          </span>
        </div>

        <p style="margin:18px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
          This verification link expires in 1 hour.
          If you didn't create this account, you can ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:18px 20px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:12px;">
          &copy; ${new Date().getFullYear()} Shop E-Commerces. All rights reserved.
        </p>
      </div>

    </div>
  </div>
    `,
  });

  console.log(d);
}
catch(e){

  console.error("Verification email failed:", error.message);
  throw error;
  
}
  
}




const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

const sendOrderConfirmationEmail = async (order, user) => {

  
  
  const {
    _id,
    cartItems = [],
    addressInfo = {},
    totalAmount = 0,
    orderDate,
    orderStatus,
    paymentStatus,
    paymentMethod,
    paymentId,
  } = order;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  const productsHtml = cartItems.map((item) => `
    <tr>
      <td style="padding:14px 8px;border-bottom:1px solid #eee;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:12px;">
              ${
                item.image?.url
                  ? `<img src="${escapeHtml(item.image.url)}"
                       alt="${escapeHtml(item.title)}"
                       width="64" height="64"
                       style="display:block;object-fit:cover;border-radius:6px;">`
                  : ""
              }
            </td>
            <td>
              <strong>${escapeHtml(item.title)}</strong><br>
              <span style="color:#6b7280;font-size:13px;">
                Qty: ${Number(item.quantity) || 0}
              </span>
            </td>
          </tr>
        </table>
      </td>
      <td style="padding:14px 8px;text-align:right;border-bottom:1px solid #eee;white-space:nowrap;">
        ${formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 0))}
      </td>
    </tr>
  `).join("");

  const deliveryAddress = [
    addressInfo.address,
    addressInfo.city,
    addressInfo.pincode,
  ].filter(Boolean).join(", ");

  const html = `
    <div style="margin:0;padding:28px 10px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

        <div style="padding:28px 20px;text-align:center;background:#eff6ff;">
          <h1 style="margin:0;color:#2563eb;font-size:26px;">
            Shop <span style="color:#111827;">E-Commerces</span>
          </h1>
          <div style="margin-top:22px;font-size:36px;">✓</div>
          <h2 style="margin:8px 0;color:#111827;">Thank you for your order!</h2>
          <p style="margin:0;color:#4b5563;line-height:1.6;">
            Your order has been placed successfully.
          </p>
        </div>

        <div style="padding:24px;">
          <p>Hello ${escapeHtml(user.username || "Customer")},</p>
          <p style="color:#4b5563;line-height:1.7;">
            Thank you for shopping with us. Here are your order details.
          </p>

          <div style="padding:16px;background:#f9fafb;border-radius:8px;">
            <p style="margin:0 0 8px;">
              <strong>Order ID:</strong> ${escapeHtml(_id)}
            </p>
            <p style="margin:0;">
              <strong>Order Date:</strong>
              ${orderDate ? escapeHtml(new Date(orderDate).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Kolkata",
              })) : "N/A"}
            </p>
          </div>

          <h3 style="margin-top:28px;color:#111827;">Order Summary</h3>

          <table role="presentation" cellpadding="0" cellspacing="0"
                 style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:12px 8px;text-align:left;">Product</th>
                <th style="padding:12px 8px;text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>${productsHtml}</tbody>
          </table>

          <div style="margin-top:18px;text-align:right;">
            <span style="color:#6b7280;">Total Amount</span>
            <h2 style="margin:6px 0;color:#2563eb;">
              ${formatPrice(totalAmount)}
            </h2>
          </div>

          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

          <h3 style="color:#111827;">Payment Details</h3>
          <p><strong>Method:</strong> ${escapeHtml(paymentMethod || "N/A")}</p>
          <p><strong>Payment Status:</strong>
            <span style="color:${paymentStatus === "paid" ? "#15803d" : "#b45309"};">
              ${escapeHtml(paymentStatus || "Pending")}
            </span>
          </p>
          ${paymentId ? `<p><strong>Payment Reference:</strong> ${escapeHtml(paymentId)}</p>` : ""}

          <h3 style="color:#111827;">Delivery Address</h3>
          <div style="padding:14px;background:#f9fafb;border-radius:8px;color:#4b5563;line-height:1.8;">
            ${escapeHtml(deliveryAddress || "Address unavailable")}<br>
            ${addressInfo.phone ? `Phone: ${escapeHtml(addressInfo.phone)}` : ""}
            ${addressInfo.notes ? `<br>Note: ${escapeHtml(addressInfo.notes)}` : ""}
          </div>

          <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:8px;">
            <strong style="color:#1d4ed8;">
              Order Status: ${escapeHtml(orderStatus || "confirmed")}
            </strong>
            <p style="margin-bottom:0;color:#4b5563;line-height:1.6;">
              We'll notify you when your order status changes.
            </p>
          </div>

          <p style="margin-top:28px;color:#4b5563;line-height:1.6;">
            Thanks for choosing Shop E-Commerces!
          </p>
        </div>

        <div style="padding:18px;text-align:center;background:#f9fafb;color:#6b7280;font-size:12px;">
          &copy; ${new Date().getFullYear()} Shop E-Commerces. All rights reserved.
        </div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: `"Shop E-Commerces" <${process.env.SEND_EMAIL}>`,
    to: user.email,
    subject: `Order Confirmed - #${_id}`,
    html,
    text: `Your order ${_id} is confirmed. Total: ${formatPrice(totalAmount)}. Payment status: ${paymentStatus}.`,
  });
};


const sendSellerOrderEmail = async (
  order,
  seller,
  sellerItems
) => {
  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  const itemsHtml = sellerItems.map((item) => `
    <tr>
      <td style="padding:12px 8px;border-bottom:1px solid #eee;">
        ${item.image?.url
          ? `<img src="${escapeHtml(item.image.url)}"
                 alt="${escapeHtml(item.title)}"
                 width="55" height="55"
                 style="object-fit:cover;border-radius:6px;">`
          : ""}
        <div style="margin-top:6px;">
          <strong>${escapeHtml(item.title)}</strong>
        </div>
      </td>
      <td style="padding:12px 8px;text-align:center;border-bottom:1px solid #eee;">
        ${Number(item.quantity) || 0}
      </td>
      <td style="padding:12px 8px;text-align:right;border-bottom:1px solid #eee;">
        ${formatPrice(
          (Number(item.price) || 0) *
          (Number(item.quantity) || 0)
        )}
      </td>
    </tr>
  `).join("");

  const itemTotal = sellerItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) *
            (Number(item.quantity) || 0),
    0
  );

  const html = `
    <div style="padding:24px 10px;background:#f3f4f6;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

        <div style="padding:28px 20px;text-align:center;background:#eff6ff;">
          <h1 style="margin:0;color:#2563eb;">Shop E-Commerces</h1>
          <h2 style="color:#111827;">New Order Received!</h2>
          <p style="color:#4b5563;">
            Hello ${escapeHtml(seller?.username || "Seller")},
            you have received a new order for your products.
          </p>
        </div>

        <div style="padding:24px;">
          <p><strong>Order ID:</strong> ${escapeHtml(order._id)}</p>
          <p><strong>Order date:</strong>
            ${escapeHtml(new Date(order.orderDate).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata"
            }))}
          </p>
          <p><strong>Order status:</strong>
            ${escapeHtml(order.orderStatus)}
          </p>

          <h3>Your Ordered Products</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:12px 8px;text-align:left;">Product</th>
                <th style="padding:12px 8px;">Qty</th>
                <th style="padding:12px 8px;text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <h2 style="text-align:right;color:#2563eb;">
            Your item total: ${formatPrice(itemTotal)}
          </h2>

          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

          <h3>Payment Information</h3>
          <p><strong>Method:</strong> ${escapeHtml(order.paymentMethod)}</p>
          <p><strong>Status:</strong> ${escapeHtml(order.paymentStatus)}</p>

          <p style="padding:14px;background:#eff6ff;border-radius:8px;color:#1d4ed8;">
            Please open your dashboard to review this order
            and manage its status.
          </p>

          <p style="color:#6b7280;font-size:12px;text-align:center;">
            Shop E-Commerces Seller Notifications
          </p>
        </div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: `"Shop E-Commerces" <${process.env.SEND_EMAIL}>`,
    to: [seller?.email, `${process.env.SEND_EMAIL}` ],
    subject: `New Order Received - #${order._id}`,
    html,
    text: `New order ${order._id}. Your item total is ${formatPrice(itemTotal)}.`,
  });
};




module.exports = { sendVerificationEmail , sendOrderConfirmationEmail , sendSellerOrderEmail}