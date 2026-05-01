export default function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <h1 className="heading">Settings</h1>
        <p className="subtext">Manage your account preferences and application settings</p>
      </header>

      <div className="settings-content glass">
        <div className="settings-section">
          <h3>Profile Settings</h3>
          <p>Update your personal information and profile picture.</p>
          <button className="btn-secondary" disabled>Coming Soon</button>
        </div>
        <div className="settings-section">
          <h3>Notifications</h3>
          <p>Configure how you receive updates about your tasks.</p>
          <button className="btn-secondary" disabled>Coming Soon</button>
        </div>
        <div className="settings-section">
          <h3>Security</h3>
          <p>Change your password and manage two-factor authentication.</p>
          <button className="btn-secondary" disabled>Coming Soon</button>
        </div>
      </div>
    </div>
  )
}
