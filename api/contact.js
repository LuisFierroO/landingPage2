import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, phone, desc } = req.body;

    if (!email || !phone) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Landing Leads" <${process.env.EMAIL_USER}>`,
            to: 'luisfierroor@gmail.com',
            subject: `New Lead Personal Page — ${email}`,
            text: `
---------NEW POTENTIAL CLIENT---------
=======================================

Email:       ${email}
Phone:       ${phone}
Description:
${desc || '(not provided)'}

--
Sent from Personal Page landing page
      `
        });

        return res.status(200).json({ message: 'Email sent' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending email' });
    }
}
