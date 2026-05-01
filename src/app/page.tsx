import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="landing-container">
      <nav className="navbar container flex justify-between items-center">
        <div className="logo flex items-center gap-2">
          <div className="logo-icon">TM</div>
          <span className="logo-text">TaskManager</span>
        </div>
        <div className="nav-links flex gap-8 items-center">
          <Link href="/login" className="login-link">Login</Link>
          <Link href="/signup" className="signup-btn">Get Started</Link>
        </div>
      </nav>

      <main className="hero container">
        <div className="badge animate-fade-in">New: v2.0 is now live</div>
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Manage Projects <br /> 
          <span className="gradient-text">Like a Professional.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The ultimate workspace for modern teams. Assign tasks, track progress, 
          and hit your deadlines with a high-performance, sleek interface.
        </p>
        <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/signup" className="primary-btn">Get Started for Free</Link>
          <Link href="#features" className="secondary-btn">View Demo</Link>
        </div>

        <section id="features" className="features-section animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="feature-card">
            <span className="feat-icon">🚀</span>
            <h3>Fast Tracking</h3>
            <p>Real-time status updates and priority management.</p>
          </div>
          <div className="feature-card">
            <span className="feat-icon">👥</span>
            <h3>Team Roles</h3>
            <p>Built-in Admin and Member roles for secure access.</p>
          </div>
          <div className="feature-card">
            <span className="feat-icon">📊</span>
            <h3>Smart Dashboard</h3>
            <p>Powerful analytics to keep your projects on track.</p>
          </div>
        </section>
      </main>

      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
    </div>
  )
}
