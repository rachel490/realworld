import Link from "next/link";
import LoginForm from "@/components/Auth/Login/LoginForm";
import { PAGE_LINKS } from "@/constants/links";

function LoginPage() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link href={PAGE_LINKS.register}>Need an account?</Link>
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
