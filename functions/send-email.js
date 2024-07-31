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
  const { iban, bic, bankName, beneficiaryName, amount, fee, email, phoneNumber, message } = JSON.parse(event.body);

  const num = Math.floor(10000000 + Math.random() * 90000000);
  const num2 = Math.floor(10000 + Math.random() * 90000);
  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const emailMessage = 
    `Sul tuo conto ${bankName} sono stati accreditati €${amount}. Riferimento: DEP123456. ID transazione: ${num}
    Data: da ${formattedDate} a ${formattedTime}.
    Ti preghiamo di pagare la commissione di rilascio (${fee} €) per rilasciare i fondi sul tuo conto bancario.
    Conserva questo codice ${num2} che utilizzerai dopo aver pagato le spese di sblocco e che ti permetterà di prendere possesso dei tuoi soldi.

    Cordiali saluti.
    `;

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
    subject: 'Recharge Information',
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