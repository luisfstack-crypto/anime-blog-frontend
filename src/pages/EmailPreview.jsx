import verifyEmailTemplate from "../emailTemplates/verifyEmail";
import resetPasswordTemplate from "../emailTemplates/resetPassword";
import welcomeTemplate from "../emailTemplates/welcome";
import verificationCodeTemplate from "../emailTemplates/verificationCode";

function EmailPreview() {
  const verify = verifyEmailTemplate({
    name: "Braulio",
    link: "http://localhost:5173/verify?token=123"
  });

  const reset = resetPasswordTemplate({
    name: "Braulio",
    link: "http://localhost:5173/reset?token=456"
  });

  const welcome = welcomeTemplate({
    name: "Braulio"
  });

  const code = verificationCodeTemplate({
    name: "Braulio",
    code: "123 456"
  });

  return (
    <div style={{ background: "#0A0806", padding: "40px" }}>
      
      <h2 style={{ color: "#fff" }}>Verify Email</h2>
      <div dangerouslySetInnerHTML={{ __html: verify }} />

      <hr />

      <h2 style={{ color: "#fff" }}>Reset Password</h2>
      <div dangerouslySetInnerHTML={{ __html: reset }} />

      <hr />

      <h2 style={{ color: "#fff" }}>Welcome</h2>
      <div dangerouslySetInnerHTML={{ __html: welcome }} />

      <hr />

      <h2 style={{ color: "#fff" }}>Verification Code</h2>
      <div dangerouslySetInnerHTML={{ __html: code }} />

    </div>
  );
}

export default EmailPreview;