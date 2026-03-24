import verifyEmailTemplate from "../emailTemplates/verifyEmail";
import resetPasswordTemplate from "../emailTemplates/resetPassword";
import welcomeTemplate from "../emailTemplates/welcome";

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

  return (
    <div>
      <h2>Verify Email</h2>
      <div dangerouslySetInnerHTML={{ __html: verify }} />

      <hr />

      <h2>Reset Password</h2>
      <div dangerouslySetInnerHTML={{ __html: reset }} />

      <hr />
      
      <h2>Welcome</h2>
      <div dangerouslySetInnerHTML={{ __html: welcome }} />
    </div>
    
  );
}

export default EmailPreview;