
// This is a secure Node.js backend file for handling email submissions
// In a real implementation, this would be deployed to a server or serverless function

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const xss = require('xss-clean');

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(xss()); // Sanitize user input

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Configure CORS to only allow requests from your domain
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://fexol.com.br', 'https://www.fexol.com.br'] 
    : 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Parse JSON with size limits to prevent large payload attacks
app.use(bodyParser.json({ limit: '10kb' }));

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Use environment variables
    pass: process.env.EMAIL_PASSWORD || 'your-password' // Use environment variables
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production' // Verify SSL in production
  }
});

// Input validation middleware
const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório').escape(),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('phone').optional({ checkFalsy: true }).trim().escape(),
  body('company').optional({ checkFalsy: true }).trim().escape(),
  body('projectType').optional({ checkFalsy: true }).trim().escape(),
  body('message').optional({ checkFalsy: true }).trim().escape()
];

// API endpoint for sending emails with validation
app.post('/api/send-email', validateContactForm, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone, company, projectType, message } = req.body;
  
  try {
    // Logging (in production, use a proper logging system)
    console.log(`Contact form submission from: ${email}`);
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'contato@fexol.com.br',
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
    // Don't reveal error details in production
    res.status(500).json({ 
      success: false, 
      message: process.env.NODE_ENV === 'production' 
        ? 'Erro ao enviar email.' 
        : `Erro ao enviar email: ${error.message}`
    });
  }
});

// Security headers for all responses
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app; // Export for testing

// Usage instructions:
// 1. Install dependencies:
// npm install express cors nodemailer body-parser helmet express-rate-limit express-validator xss-clean
// 2. Set up environment variables for EMAIL_USER and EMAIL_PASSWORD
// 3. Run the server: node sendEmail.js
// 4. Call the API from your frontend: POST to http://localhost:3001/api/send-email
