
# Fexol Email Backend

Este é um servidor Node.js simples para lidar com o envio de emails do formulário de contato do site Fexol.

## Instalação e Execução

1. Instale as dependências necessárias:
```bash
npm install express cors nodemailer body-parser
```

2. Configure as credenciais de email:
Abra o arquivo `sendEmail.js` e substitua os campos `user` e `pass` com suas credenciais de email reais. 
Para Gmail, é recomendado usar uma "senha de app" ao invés da sua senha regular.

3. Execute o servidor:
```bash
node sendEmail.js
```

O servidor será iniciado na porta 3001 por padrão.

## Implantação

Para um ambiente de produção, você pode:

1. Implantar em um servidor VPS (Digital Ocean, AWS EC2, etc.)
2. Usar um serviço serverless como AWS Lambda ou Vercel Serverless Functions
3. Implantar em plataformas como Heroku, Railway ou Render

## Segurança

Lembre-se de:
- Nunca armazenar credenciais no código em produção
- Usar variáveis de ambiente para senhas e informações sensíveis
- Implementar rate limiting para prevenir abusos
- Configurar CORS apropriadamente para aceitar apenas o domínio do seu site

## Ambiente de Produção

Para produção, modifique a URL no componente ContactForm para apontar para o endereço real do seu backend.

## Email de Contato

O email para onde os formulários serão enviados é: contato@fexol.com.br
