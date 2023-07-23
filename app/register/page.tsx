import Link from "next/link";
import RegisterForm from "@/components/Register/RegisterForm";
import { PAGE_LINKS } from "@/constants/links";

function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link href={PAGE_LINKS.login}>Have an account?</Link>
            </p>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
