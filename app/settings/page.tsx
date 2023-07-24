import { authApi } from "@/api/domain/auth";
import LogoutButton from "@/components/@Shared/Button/LogoutButton/LogoutButton";
import SettingsForm from "@/components/Settings/SettingsForm";

async function SettingsPage() {
  const currentUser = await authApi.currentUser();

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingsForm currentUser={currentUser} />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
