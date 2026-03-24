const verificationCodeTemplate = ({ name, code }) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF; padding:30px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#111111; font-family:Arial, sans-serif; color:#F5F0EB; border-radius:8px; overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="padding:18px 24px; background:#0A0806; border-bottom:1px solid rgba(230,57,30,0.2);">
              <table width="100%">
                <tr>
                  <td>
                    <span style="color:#E6391E; font-size:11px; letter-spacing:2px;">
                      アニメ
                    </span>
                    <span style="color:#F5F0EB; font-size:22px; font-weight:bold; letter-spacing:1px;">
                      AnimeBlog<span style="color:#E6391E;">.</span>
                    </span>
                  </td>

                  <td align="right" style="color:#6b7280; font-size:11px; letter-spacing:2px;">
                     VOL. 26 · 2026
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENIDO -->
          <tr>
            <td style="padding:30px; text-align:center;">

              <h3 style="color:#E6391E; margin-bottom:10px;">
                Código de verificación
              </h3>

              <p>Hola <strong>${name}</strong>,</p>

              <p style="margin-bottom:25px;">
                Usa el siguiente código para continuar:
              </p>

              <!-- CODIGO -->
              <div style="font-size:32px; font-weight:bold; letter-spacing:8px; background:#0A0806; padding:15px 20px; display:inline-block; border-radius:6px; border:1px solid rgba(230,57,30,0.3);">
                ${code}
              </div>

              <p style="margin-top:25px; font-size:12px; color:#9ca3af;">
                Este código expirará en 10 minutos.
              </p>

              <p style="margin-top:15px; font-size:12px; color:#6b7280;">
                No compartas este código con nadie.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px; text-align:center; background:#0A0806; font-size:12px; color:#6b7280;">
              © 2026 AnimeBlog 
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
  `;
};

export default verificationCodeTemplate;