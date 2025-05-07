import { useEffect, useState, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";
import "../../components/css/account.css";

export default function AccountPage() {
  const { session } = useContext(SessionContext);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [toastVisible, setToastVisible] = useState(false); 

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    };

    if (session) getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event, newAvatarUrl = avatar_url) => {
    event.preventDefault();
    setLoading(true);

    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: newAvatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);
    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(newAvatarUrl);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }

    setLoading(false);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="profile-card position-relative">
        <h2 className="text-center mb-4 spatial-title">Profile Settings</h2>
        <form onSubmit={updateProfile}>
          <div className="d-flex justify-content-center">
            <Avatar
              url={avatar_url}
              size={150}
              className="profile-avatar"
              onUpload={(e, url) => updateProfile(e, url)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              className="form-control"
              value={session?.user?.email || ""}
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              value={first_name || ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              value={last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button type="submit" className="btn-update" disabled={loading}>
              {loading ? "Loading .." : "Update"}
            </button>
          </div>
        </form>

        {toastVisible && (
          <div className="custom-toast">
            <span className="saved-check">Profile updated successfully!</span>
          </div>
        )} 
      </div>
    </div>
  );
}
