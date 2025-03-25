
// This is a simple Node.js backend file for handling email submissions
// In a real implementation, this would be deployed to a server or serverless function

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-password' // Replace with your email password or app password
  }
});

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, company, projectType, message } = req.body;
  
  try {
    // Email content
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email
      to: 'eduardocruz@fexol.com.br',
      subject: `Novo contato do site: ${name} - ${company}`,
      html: `
        <h2>Novo contato recebido do site Fexol</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
        <p><strong>Empresa:</strong> ${company || 'Não informada'}</p>
        <p><strong>Tipo de Projeto:</strong> ${projectType || 'Não informado'}</p>
        <h3>Mensagem:</h3>
        <p>${message || 'Nenhuma mensagem'}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar email.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Usage instructions:
// 1. Install dependencies: npm install express cors nodemailer body-parser
// 2. Run the server: node sendEmail.js
// 3. Call the API from your frontend: POST to http://localhost:3001/api/send-email
