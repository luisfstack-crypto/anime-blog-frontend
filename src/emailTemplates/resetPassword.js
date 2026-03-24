const resetPasswordTemplate = ({ name, link }) => {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; padding:30px 0;">
      <tr>
        <td align="center">
  
          <table width="600" cellpadding="0" cellspacing="0" style="background:#111827; font-family:Arial, sans-serif; color:#e5e7eb; border-radius:8px; overflow:hidden;">
  
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
              <td style="padding:30px;">
                <h3 style="color:#E6391E;">Restablecer contraseña</h3>
  
                <p>Hola <strong>${name}</strong>,</p>
  
                <p>
                  Recibimos una solicitud para cambiar tu contraseña.
                </p>
  
                <p>
                  Si fuiste tú, haz clic en el botón para continuar.
                </p>
  
                <p style="text-align:center; margin:30px 0;">
                  <a href="${link}" 
                    style="background:#E6391E; color:#0A0806; padding:14px 26px; text-decoration:none; border-radius:4px; font-weight:bold; letter-spacing:1px;">
                    RESTABLECER CONTRASEÑA
                  </a>
                </p>
  
                <p style="font-size:12px; color:#9ca3af;">
                  Este enlace expirará en 15 minutos.
                </p>
  
                <p style="word-break:break-all; font-size:12px;">
                  ${link}
                </p>
  
                <p style="margin-top:20px; font-size:12px; color:#6b7280;">
                  Si no solicitaste este cambio, puedes ignorar este correo.
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
  
  export default resetPasswordTemplate;