import ProfileHero from "@/components/Profile/ProfileHero";

interface IProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

function ProfileLayout({ params, children }: IProps) {
  return (
    <div className="profile-page">
      <ProfileHero username={params.username} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
