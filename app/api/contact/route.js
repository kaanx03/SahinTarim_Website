// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Form verilerini doğrula
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Tüm alanları doldurunuz." },
        { status: 400 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Geçerli bir email adresi giriniz." },
        { status: 400 }
      );
    }

    // Gmail SMTP transporter oluştur
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS kullan
      auth: {
        user: process.env.EMAIL_USER, // sahintarimcilik@gmail.com
        pass: process.env.EMAIL_PASS,
      },
    });

    // Size gidecek ana mesaj
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: "sahintarimcilik@gmail.com", // Size gidecek
      subject: `Şahintarım İletişim Formu: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            Yeni İletişim Formu Mesajı
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Gönderen Bilgileri:</h3>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Mesaj:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          
          <div style="background-color: #f0f8f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              Bu mesaj Şahintarım web sitesi iletişim formu üzerinden gönderilmiştir.
              <br>
              Gönderim Tarihi: ${new Date().toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
      `,
    };

    // Müşteriye gidecek otomatik cevap
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Müşterinin maili
      subject: "Mesajınız Alındı - Şahintarım",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; text-align: center;">
            Mesajınız için Teşekkürler!
          </h2>
          
          <div style="background-color: #f0f8f0; padding: 20px; border-radius: 8px; text-align: center;">
            <h3 style="color: #4CAF50;">Sayın ${name},</h3>
            <p style="color: #555; line-height: 1.6;">
              İletişim formumuz üzerinden gönderdiğiniz mesajı aldık. 
              En kısa sürede size dönüş yapacağız.
            </p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <h4 style="color: #333;">Gönderdiğiniz Mesaj:</h4>
            <p><strong>Konu:</strong> ${subject}</p>
            <p><strong>Mesaj:</strong> ${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666;">
              <strong>Şahintarım</strong><br>
              📞 +90 530 399 3246<br>
              📧 sahintarimcilik@gmail.com<br>
              📍 Niğde, Türkiye
            </p>
          </div>
        </div>
      `,
    };

    // Emailleri gönder
    console.log("Email gönderiliyor:", {
      from: process.env.EMAIL_USER,
      toYou: "sahintarimcilik@gmail.com",
      toCustomer: email,
    });

    const result1 = await transporter.sendMail(mailOptionsToYou);
    console.log("Size email gönderildi:", result1.messageId);

    const result2 = await transporter.sendMail(autoReplyOptions);
    console.log("Müşteriye otomatik cevap gönderildi:", result2.messageId);

    return Response.json(
      { success: true, message: "Mesajınız başarıyla gönderildi!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email gönderimi hatası:", error);
    return Response.json(
      {
        error: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.",
      },
      { status: 500 }
    );
  }
}
