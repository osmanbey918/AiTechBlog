import nodemailer from 'nodemailer';

export async function POST(req) {
  const { firstName, lastName, email, phoneNumber, message } = await req.json();

  // Server-side validation
  if (!firstName || !lastName || !email || !message) {
    return Response.json(
      { 
        success: false, 
        message: 'Missing required fields' 
      }, 
      { status: 400 }
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      { 
        success: false, 
        message: 'Invalid email format' 
      }, 
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL, // Use your own email as sender
      to: process.env.MY_EMAIL, // Send to yourself
      replyTo: email, // Set reply-to as user's email
      subject: `New Contact from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phoneNumber || 'N/A'}
Message: 
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ 
      success: true,
      message: 'Email sent successfully' 
    });

  } catch (err) {
    console.error('Email send error:', err);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to send email',
        error: err.message 
      }, 
      { status: 500 }
    );
  }
}