import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Always save the message into the database first
    const savedMessage = await prisma.message.create({
      data: {
        name,
        email,
        message,
        status: 'UNREAD',
      },
    });

    // 2. Dispatch email notification to inbox if SMTP is configured
    let emailSent = false;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Inquiries" <${smtpUser}>`,
          to: smtpUser,
          replyTo: email,
          subject: `[Portfolio] New Message from ${name}`,
          text: `You received a new inquiry on your portfolio:\n\nName: ${name}\nEmail: ${email}\nDate: ${new Date().toLocaleString()}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #ededed; border: 1px solid #262626; border-radius: 8px;">
              <div style="border-bottom: 2px solid #f97316; padding-bottom: 12px; margin-bottom: 20px;">
                <span style="color: #f97316; font-family: monospace; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Portfolio Notification</span>
                <h2 style="margin: 6px 0 0; color: #ffffff; font-size: 20px;">New Message from ${name}</h2>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #a3a3a3; width: 80px; font-weight: bold;">Sender:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a3a3a3; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a3a3a3; font-weight: bold;">Received:</td>
                  <td style="padding: 8px 0; color: #737373; font-family: monospace; font-size: 12px;">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div style="background: #171717; border-left: 3px solid #f97316; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; font-size: 14px; color: #e5e5e5;">${message}</p>
              </div>

              <div style="text-align: center; border-top: 1px solid #262626; padding-top: 16px;">
                <a href="mailto:${email}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background: #f97316; color: #0a0a0a; font-weight: bold; text-decoration: none; padding: 10px 24px; border-radius: 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Reply Directly</a>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailErr) {
        console.error('SMTP Mail Dispatch Warning:', mailErr);
      }
    }

    return NextResponse.json(
      { 
        message: 'Message received and stored successfully', 
        id: savedMessage.id, 
        emailSent 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
