const welcomeTemplate = ({ name }) => {
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
                <h3 style="color:#E6391E;">Bienvenido al blog</h3>
  
                <p>Hola <strong>${name}</strong>,</p>
  
                <p>
                  Tu cuenta ha sido creada correctamente.
                </p>
  
                <p>
                  Ya puedes explorar análisis, recomendaciones y noticias del mundo anime.
                </p>
  
                <p style="margin-top:20px;">
                  Prepárate para descubrir contenido nuevo cada semana.
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
  
  export default welcomeTemplate;