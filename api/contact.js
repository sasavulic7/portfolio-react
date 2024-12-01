import nodemailer from "nodemailer";

// SMTP konfiguracija za Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email adresa
    pass: process.env.EMAIL_PASS // Lozinka ili App Password
  }
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Tvoj email na koji ćeš primati poruke
      subject: `Kontakt forma - poruka od ${name}`,
      text: `Ime: ${name}\nEmail: ${email}\nPoruka:\n${message}`
    };

    try {
      // Slanje emaila
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email je uspešno poslat!" });
    } catch (error) {
      console.error("Greška pri slanju emaila:", error);
      res
        .status(500)
        .json({ message: "Došlo je do greške pri slanju emaila." });
    }
  } else {
    // Odbijanje drugih HTTP metoda osim POST
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
