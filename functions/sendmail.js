import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  // Spécifiez l'origine exacte de votre frontend
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:5173', // Changez cette URL pour celle de votre frontend
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Gérer la requête preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: ''
    };
  }

  // Parse the request body
  const { c_message } = JSON.parse(event.body);

  
  const emailMessage = c_message;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'postbank461@gmail.com', // replace with your email
      pass: 'lmif mcnu yvpv ekzg' // replace with your email password
    }
  });

  // Set up email data with unicode symbols
  let mailOptions = {
    from: 'postbank461@gmail.com', // replace with your email
    to: email,
    subject: 'Sblocco',
    text: emailMessage
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'Erreur lors de l\'envoi de l\'email', error: error.toString() })
    };
  }
};
