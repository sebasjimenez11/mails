import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.post("/mails", async (req, res) => {
  try {
    const { emails, content, asunto } = req.body;
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ message: "La lista de correos es inválida o está vacía." });
    }

    if (!content || !asunto) {
      return res
        .status(400)
        .json({
          message: "El asunto y el contenido del correo son obligatorios.",
        });
    }

    // Configuración del transportador
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

 
    const promises = emails.map((email) =>
      transporter.sendMail({
        from: process.env.EMAIL_USER, // Remitente
        to: email, // Destinatario
        subject: asunto, // Asunto del correo
        html: content, // Contenido del correo en HTML
      })
    );

    // Ejecutar todas las promesas
    const results = await Promise.allSettled(promises);

    // Filtrar resultados exitosos y fallidos
    const enviados = results.filter(
      (result) => result.status === "fulfilled"
    ).length;
    const fallidos = results.filter((result) => result.status === "rejected");

    if (fallidos.length > 0) {
      console.error("Errores al enviar algunos correos:", fallidos);
    }

    res.json({
      message: "Proceso de envío completado.",
      enviados,
      fallidos: fallidos.length,
    });
  } catch (error) {
    console.error("Error inesperado al enviar correos:", error);
    res.status(500).json({ message: "Error inesperado al enviar correos." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
