import type { FC } from 'react'

export const AboutPage: FC = () => (
  <div className="page-content">
    <div className="about-content">
      <h2>About <span className="text-accent">Beeylo</span></h2>
      <div className="about-text">
        <p>
          We believe in creating tools that make life simpler. 
          Beeylo was born from the need for a clean, energetic and powerful app 
          that does exactly what you expect.
        </p>
        <p>
          Our team works hard on a product that is not only functional, 
          but also a pleasure to use.
        </p>
      </div>
      <div className="team-section">
        <h3>The Team</h3>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <h4>Development Team</h4>
            <p>Passion for clean code and UX</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">🎨</div>
            <h4>Design Team</h4>
            <p>Minimalist with maximum impact</p>
          </div>
        </div>
      </div>
    </div>
  </div>
) 