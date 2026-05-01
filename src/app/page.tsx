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
        <h1 className="hero-title animate-fade-in">
          Manage Projects <br /> 
          <span className="gradient-text">Like a Pro.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Assign tasks, track progress, and collaborate with your team in a sleek, high-performance workspace.
        </p>
        <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Link href="/signup" className="primary-btn">Start Managing Now</Link>
          <Link href="#features" className="secondary-btn">Learn More</Link>
        </div>
      </main>

      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  )
}
