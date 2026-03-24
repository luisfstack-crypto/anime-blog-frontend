const verifyEmailTemplate = ({ name, link }) => {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; padding:30px 0;">
      <tr>
        <td align="center">
  
          <table width="600" cellpadding="0" cellspacing="0" style="background:#111827; font-family:Arial, sans-serif; color:#e5e7eb; border-radius:8px; overflow:hidden;">
  
            <!-- HEADER (tu navbar adaptado) -->
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
                <h3 style="color:#E6391E;">Verifica tu cuenta</h3>
  
                <p>Hola <strong>${name}</strong>,</p>
  
                <p>
                  Estás a un paso de formar parte del blog.  
                  Confirma tu correo para comenzar a explorar contenido exclusivo.
                </p>
  
                <p style="text-align:center; margin:30px 0;">
                  <a href="${link}" 
                    style="background:#E6391E; color:#0A0806; padding:14px 26px; text-decoration:none; border-radius:4px; font-weight:bold; letter-spacing:1px;">
                    CONFIRMAR CUENTA
                  </a>
                </p>
  
                <p style="font-size:12px; color:#9ca3af;">
                  Si el botón no funciona:
                </p>
  
                <p style="word-break:break-all; font-size:12px;">
                  ${link}
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

  export default verifyEmailTemplate;