import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adepusanjay444@gmail.com",
    pass: "lrnesuqvssiognej", // App Password
  },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const mailOptions = {
      from: email,
      to: "adepusanjay444@gmail.com",
      subject: `Portfolio Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f7fb; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            
            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">📩 New Contact Form Submission</h2>
            
            <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f0f4f8; border-left: 4px solid #3498db; border-radius: 5px;">
              <p style="margin: 0; font-size: 15px; color: #555;"><strong>Message:</strong></p>
              <p style="margin-top: 8px; font-size: 15px; color: #333; line-height: 1.6;">${message}</p>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #888; text-align: center;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Error sending email" }),
      { status: 500 }
    );
  }
}