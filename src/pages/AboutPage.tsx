import type { FC } from 'react'

export const AboutPage: FC = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>About us</h1>
          <h2>We're not just launching an inbox.<br />We're starting a shift.</h2>
        </div>

        <div className="content-section">
          <p>
            For too long, companies have controlled how they talk to us.<br />
            Flooding our inboxes with spam, ads, and useless updates.
          </p>
          
          <h3>We're two friends who decided to fix that.</h3>
          
          <p>
            Beeylo is the world's first inbox built for people, not brands.<br />
            It only shows what actually matters.
          </p>
          
          <p>
            And we're building it with the people.<br />
            For the people.
          </p>
          
          <p>
            Because inbox noise was never your choice.
          </p>
        </div>
      </div>
    </div>
  )
}