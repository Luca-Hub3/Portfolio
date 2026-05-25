import { NextResponse } from "next/server"
import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY non configurata")
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tutti i campi sono obbligatori" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email non valida" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Servizio email non configurato correttamente" }, { status: 500 })
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"

    // Email di notifica a Luca
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: "luca.musso.dev@gmail.com",
      replyTo: email,
      subject: `Nuovo messaggio da ${name}`,
      html: `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuovo messaggio dal portfolio</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;border-bottom:2px solid #ab41ff;">
              <div style="display:inline-block;background:rgba(171,65,255,0.15);border:1px solid rgba(171,65,255,0.4);border-radius:50%;width:56px;height:56px;line-height:56px;font-size:24px;margin-bottom:16px;">✉️</div>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Nuovo messaggio</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#ab41ff;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Dal tuo portfolio</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#141414;padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background-color:#1e1e1e;border:1px solid #2a2a2a;border-left:3px solid #ab41ff;border-radius:8px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#ab41ff;text-transform:uppercase;letter-spacing:1.2px;">Nome</p>
                    <p style="margin:0;font-size:16px;color:#f0f0f0;font-weight:600;">${name}</p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background-color:#1e1e1e;border:1px solid #2a2a2a;border-left:3px solid #ab41ff;border-radius:8px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#ab41ff;text-transform:uppercase;letter-spacing:1.2px;">Email</p>
                    <a href="mailto:${email}" style="margin:0;font-size:15px;color:#c97cff;text-decoration:none;font-weight:500;">${email}</a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#1e1e1e;border:1px solid #2a2a2a;border-left:3px solid #ab41ff;border-radius:8px;padding:16px 20px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#ab41ff;text-transform:uppercase;letter-spacing:1.2px;">Messaggio</p>
                    <p style="margin:0;font-size:15px;color:#d0d0d0;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Il tuo messaggio" style="display:inline-block;background:linear-gradient(135deg,#ab41ff,#7c2dbf);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:8px;letter-spacing:0.3px;">Rispondi a ${name} →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#0f0f0f;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid #1e1e1e;">
              <p style="margin:0;font-size:12px;color:#555555;">Ricevuto tramite il form contatti di <span style="color:#ab41ff;font-weight:600;">rg-dev.lat</span></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      console.error("Errore Resend:", error)
      const errorMessage = error.message || "Errore nell'invio dell'email"
      return NextResponse.json({
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined,
      }, { status: 500 })
    }

    console.log("Email inviata con successo:", data)
    return NextResponse.json({ message: "Messaggio inviato con successo!" }, { status: 200 })
  } catch (error) {
    console.error("Errore nell'invio del messaggio:", error)
    return NextResponse.json({ error: "Errore nell'invio del messaggio. Riprova più tardi." }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}