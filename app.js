import nodeMailer from "nodemailer";
import express from "express";
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/mails', (req, res)=> {
  try {
      const emails = req.body.emails;
      const contenidoEmail = req.body.content;
      const asunto = req.body.asunto;
      
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com', // Servidor SMTP (Gmail en este caso)
          port: 465, // Puerto para conexión segura
          secure: true, // Usa TLS para una conexión segura
          auth: {
              user: 'sebasjimenez1121@gmail.com', // Tu correo electrónico
              pass: 'psix jcxy tjgg aoqx', // Contraseña de aplicación (NO tu contraseña normal)
          },
      });
  
      const opcionesCorreo = []
      emails.forEach(Email => {
          opcionesCorreo.push( {
              from: 'sebasjimenez1121@gmail.com', // Remitente
              to: Email, // Destinatario(s)
              subject: asunto, // Asunto del correo
              html: contenidoEmail, // Contenido en HTML
          });
      });
  
      
  
  } catch (error) {
    
  }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});

